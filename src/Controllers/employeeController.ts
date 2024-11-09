import { Request, Response, NextFunction } from "express";
import { successResponse } from "../Utils/responseMessages";
import jwt from "jsonwebtoken";
import Model from "../Models/employeeModel";
import PersonalInfo from "../Models/personalInfoModel";
import BankInfo from "../Models/bankInfoModel";
import EducationInfo, { EducationInfoInterface } from "../Models/educationInfoModel";
import ContactInfo, { EmergencyContactInterface } from "../Models/emergencyContactModel";
import FamilyInfo, {FamilyInformationsInterface} from "../Models/familyInfoModel";
import ExperienceInfo, {ExperienceInformationsInterface} from "../Models/experienceInfoModel";
import Profile from "../Models/profileModel";
import DepartmentInfo from "../Models/departmentInfoModel";
import DesignationInfo from "../Models/designationInfoModel";
import LeaveSettingInfo from "../Models/leaveSettingInfoModel";
import AttendanceInfo, { AttendanceInfoInterface } from "../Models/attendanceInfoModel";
import BreakInfo, { BreakInfoInterface } from "../Models/breakInfoModel";
import LeaveInfo, { LeaveInfoInterface } from "../Models/leaveInfoModel";
import ProjectInfo, { ProjectInfoInterface} from "../Models/projectInfoModel";
import TimeSheetInfo, { TimesheetInfoInterface} from "../Models/timeSheetInfoModel";
import dotenv, { populate } from "dotenv";
import leaveInfoMail from "../Config/mailConfig";
import SalaryInfo, { SalaryInfoInterface } from "../Models/salaryInfoModel";
import MonthlySalaryInfo, { MonthlySalaryInfoInterface } from "../Models/monthlySalaryInfoModel";
import { ATTENDANCE, JWT_EXPIRATION } from "../Config/constant";
import TrainingTypeInfo, { TrainingTypeInterface } from "../Models/trainingTypeInfoModel";
import requestBodyMiddleware from "../Middlewares/reqBodyMiddleware";
dotenv.config();
import * as path from "path";
import * as fs from "fs";
import deleteFile from "../Utils/commonFunctions";
import crypto from "crypto";
import HolidayInfo, { HolidayInterface } from "../Models/holidayModel";
import AttendanceInformations from "../Models/attendanceInfoModel";
import LeaveInformations from "../Models/leaveInfoModel";
import { Types } from "mongoose";
import TrainerInfo from "../Models/trainerInfoModel";
import TraineeInfo from "../Models/traineeInfoModel";
import PromotionInfo from "../Models/promotionInfoModel";



//login employee

const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const employee = await Model.findOne({ email: lowerCaseEmail });
    if (!employee) {
      throw new Error("User not registered");
    }

    const token = jwt.sign(
      { userId: employee._id },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "12h", // Example: token expiration time
      }
    );

    // Destructure user object and exclude password field
    const { password: _, ...responseUser } = employee.toJSON();

    res.json(
      successResponse(
        { user: responseUser, token },
        200,
        "Login successful"
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminCOntroller:login => ${error}`
    );
    next(error);
  }
};

//create employee profile

const createEmpProfile = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      state,
      country,
      pinCode,
      phoneNumber,
      department,
      designation,
      reportsTo
    } = req.body;
    const user = req.user;
    const filename = req.filenames;

    const fileLinks = `${process.env.APP_BASE_URL}/get/${user._id}/${filename}`

    const existingEmployee = await Profile.findOne({user})
    if(existingEmployee){
      throw new Error ("Profile already created")
    }

    const newEmpProfile = new Profile({
      user: user._id,
      image: fileLinks,
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      state,
      country,
      pinCode,
      phoneNumber,
      department,
      designation,
      reportsTo,
    });

    await newEmpProfile.save();

    res.json(
      successResponse(
        newEmpProfile,
        201,
        "Your profile has been successfully created. Welcome aboard!"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:createEmpProfile => ${error}`
    );
    next(error);
  }

};

//get the employees frofile

const getEmpProfile = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empProfile: any = await Profile.findOne({ user });
    if (!empProfile) {
      throw new Error(`Employee profile not found`);
    }

    res.json(
      successResponse(empProfile, 200, "Profile retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getEmpProfile => ${error}`
    );
    next(error);
  }
};

//update the employee profile

const updateEmpProfile = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      state,
      country,
      pinCode,
      phoneNumber,
      department,
      designation,
      reportsTo
    } = req.body;

    const user = req.user;

    const updateData: any = {
      firstName,
      lastName,
      birthDate,
      gender,
      address,
      state,
      country,
      pinCode,
      phoneNumber,
      department,
      designation,
      reportsTo
    };

    const updatedEmpProfile = await Profile.findOneAndUpdate(
      { user },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedEmpProfile) {
      throw new Error(`Employee profile not found`);
    }

    // Send success response
    res.json(
      successResponse(
        updatedEmpProfile,
        200,
        'Employee profile updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into employeeController:updatePersonalInfo => ${error}`
    );
    next(error);
  }
};

//update employee profile picture
const updateEmpProfilePic = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user; // Ensure this is correctly populated from your auth middleware
    const filenames = req.filenames; // Ensure this is correctly populated from your file upload middleware

    if (!filenames) {
      throw new Error("No profile picture uploaded.");
    }

    const findEmpProfile = await Profile.findOne({user});
    if (!findEmpProfile) {
      throw new Error("Employee profile not found.");
    }

    if (findEmpProfile.image) {
      const oldProfilePicFileName = findEmpProfile.image.replace(
        `${process.env.APP_BASE_URL}/get/${user._id}/`,
        ""
      );
  
      const deleteProfilePicturePath = path.join(
        __dirname,
        `../Uploads/${user._id}/${oldProfilePicFileName}`
      );

      // Delete the old profile picture file
      if (fs.existsSync(deleteProfilePicturePath)) {
        await deleteFile(deleteProfilePicturePath);
      }
    }

    const profilePictureLink = `${process.env.APP_BASE_URL}/get/${user._id}/${filenames}`;

    findEmpProfile.image = profilePictureLink;
   
    await findEmpProfile.save();

    res.json(
      successResponse(
        findEmpProfile,
        200,
        "Your profile picture has been successfully updated."
      )
    );    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateEmpProfilePic => ${error}`
    );
    next(error);
  }
};

//delete entire frofile

const deleteEmpProfile = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const deleteEmpProfile: any = await Profile.findOneAndDelete({ user });
    if (!deleteEmpProfile) {
      throw new Error(`Employee profile not found`);
    }

    res.json(
      successResponse(deleteEmpProfile, 200, "Profile deleted successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:deleteEmpProfile => ${error}`
    );
    next(error);
  }
};

//add personal information

const addPersonalInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      passportNo,
      passportExpiryDate,
      telephoneNo,
      nationality,
      religion,
      maritalStatus,
      employmentOfSpouse,
      no_ofChildren
    } = req.body;
    const user = req.user;


    const existingEmployee = await PersonalInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("personal information already axists. ")
    }

    const empPersonalInfo = new PersonalInfo({
      user: user._id,
      passportNo,
      passportExpiryDate,
      telephoneNo,
      nationality,
      religion,
      maritalStatus,
      employmentOfSpouse,
      no_ofChildren
    });

    await empPersonalInfo.save();

    res.json(
      successResponse(
        empPersonalInfo,
        201,
        "personal information added successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:addPersonalInfo => ${error}`
    );
    next(error);
  }

};

//get the personal information

const getPersonalInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empPersonalInfo: any = await PersonalInfo.findOne({ user });
    if (!empPersonalInfo) {
      throw new Error(`Employee personal information not found`);
    }

    res.json(
      successResponse(empPersonalInfo, 200, "Personal information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getPersonalInfo=> ${error}`
    );
    next(error);
  }
};

//update personal information

const updatePersonalInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      passportNo,
      passportExpiryDate,
      telephoneNo,
      nationality,
      religion,
      maritalStatus,
      employmentOfSpouse,
      no_ofChildren
    } = req.body;

    const user = req.user;

    const updateData: any = {
      passportNo,
      passportExpiryDate,
      telephoneNo,
      nationality,
      religion,
      maritalStatus,
      employmentOfSpouse,
      no_ofChildren
    };

    const updatedPersonalInfo = await PersonalInfo.findOneAndUpdate(
      { user },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPersonalInfo) {
      throw new Error(`Employee personal information not found`);
    }

    // Send success response
    res.json(
      successResponse(
        updatedPersonalInfo,
        200,
        'Personal information updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into employeeController:updatePersonalInfo => ${error}`
    );
    next(error);
  }
};

//delete personal information

const deletePersonalInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const deletePersonalInfo: any = await PersonalInfo.findOneAndDelete({ user });
    if (!deletePersonalInfo) {
      throw new Error(`Employee personal information not found`);
    }

    res.json(
      successResponse(deletePersonalInfo, 200, "personal information deleted successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:deletePersonalInfo => ${error}`
    );
    next(error);
  }
};

//add bank information

const addBankInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      bankName,
      bankAccountNo,
      ifscCode,
      panNo
    } = req.body;
    const user = req.user;


    const existingEmployee = await BankInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("bank information already axists. ")
    }

    const empBankInfo = new BankInfo({
      user: user._id,
      bankName,
      bankAccountNo,
      ifscCode,
      panNo
    });

    await empBankInfo.save();

    res.json(
      successResponse(
        empBankInfo,
        201,
        "Bank information added successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:addBankInfo => ${error}`
    );
    next(error);
  }

};

//get the bank information

const getBankInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empBankInfo: any = await BankInfo.findOne({ user });
    if (!empBankInfo) {
      throw new Error(`Employee bank information not found`);
    }

    res.json(
      successResponse(empBankInfo, 200, "Bank information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getBankInfo=> ${error}`
    );
    next(error);
  }
};

//update the bank information

const updateBankInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      bankName,
      bankAccountNo,
      ifscCode,
      panNo
    } = req.body;

    const user = req.user;

    const updateData: any = {
      bankName,
      bankAccountNo,
      ifscCode,
      panNo
    };

    const updatedBankInfo = await BankInfo.findOneAndUpdate(
      { user },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedBankInfo) {
      throw new Error(`Employee bank information not found`);
    }

    // Send success response
    res.json(
      successResponse(
        updatedBankInfo,
        200,
        'Bank information updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateBankInfo => ${error}`
    );
    next(error);
  }
};

//delete the bank information

const deleteBankInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const deleteBankInfo: any = await BankInfo.findOneAndDelete({ user });
    if (!deleteBankInfo) {
      throw new Error(`Employee bank information not found`);
    }

    res.json(
      successResponse(deleteBankInfo, 200, "Bank information deleted successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:deleteBankInfo => ${error}`
    );
    next(error);
  }
};

//add the education information

const addEducationInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const educationRecords = req.body.educationRecords; 
    const user = req.user; 
    

    const existingEmployee = await EducationInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("education information already axists. ")
    }


    if (!educationRecords || !Array.isArray(educationRecords) || educationRecords.length === 0) {
      throw new Error(`educationRecords array is required and should contain at least one record.`);
    }

    const newEducationInfo = new EducationInfo({
      user: user._id, 
      educationRecords: educationRecords,
    });

    await newEducationInfo.save();

    res.json(
      successResponse(
        newEducationInfo,
        201,
        "Education information added successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:addEducationInfo => ${error}`
    );
    next(error);
  }

};

//get education information

const getEducationInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empEducationInfo: any = await EducationInfo.findOne({ user });
    if (!empEducationInfo) {
      throw new Error(`Employee education information not found`);
    }

    res.json(
      successResponse(empEducationInfo, 200, "Education information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getEducationInfo=> ${error}`
    );
    next(error);
  }
};

//update education information

const updateEducationInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const userId = req.user._id; // Assuming user ID is available in req.user
      const educationInfoId = req.body.id; // Assuming education info ID is passed as a parameter
  
      const { institution, subject, startingDate, completeDate, degree, grade } = req.body;
  
      // Construct update object based on provided data
      const updateData = {
        institution,
        subject,
        startingDate: new Date(startingDate),
        completeDate: new Date(completeDate),
        degree,
        grade
      };
  
      // Find and update the education record within empEducationInfo based on _id
      const updatedEducationInfo: EducationInfoInterface | null = await EducationInfo.findOneAndUpdate(
        { 
          user: userId,
          'educationRecords._id': educationInfoId
        },
        {
          $set: {
            'educationRecords.$': updateData
          }
        },
        { new: true }
      );
  
      if (!updatedEducationInfo) {
        throw new Error(`Education record with ID ${educationInfoId} not found for user with ID ${userId}`);
      }
  
      res.json(
        successResponse(
          updatedEducationInfo,
          200,
          "Education record updated successfully"
        )
      );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateEducationInfo => ${error}`
    );
    next(error);
  }
};

//delete education information

const deleteEducationInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user._id; 
    const educationInfoId = req.body.id; 
    
    const deletedEducationInfo = await EducationInfo.findOneAndUpdate(
      { user: user },
      { $pull: { educationRecords: { _id: educationInfoId } } },
      { new: true } // To return the updated document
    );

    if (!deletedEducationInfo) {
      throw new Error(`Education record with ID ${educationInfoId} not found for user with ID ${user}`);
    }

    res.json(
      successResponse(
        deletedEducationInfo,
        200,
        "Education record deleted successfully"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:deleteEducationInfo => ${error}`
    );
    next(error);
  }
};

//add emergency contacts information

const addContactsInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const contactsRecords = req.body.emergencyContactRecords; // Assuming the request body contains an array of education records
    const user = req.user; // Assuming user ID or user object is available in req.user
    // Validate if educationRecords array exists and has items

    const existingEmployee = await ContactInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("contacts information already axists. ")
    }


    if (!contactsRecords || !Array.isArray(contactsRecords) || contactsRecords.length === 0) {
      throw new Error(`contactsRecords array is required and should contain at least one record.`);
    }

        const newContactsInfo = new ContactInfo({
      user: user._id, 
      emergencyContactRecords: contactsRecords
    });

    await newContactsInfo.save();

    res.json(
      successResponse(
        newContactsInfo,
        201,
        "Contacts information added successfully."
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into employeeController:addContactsInfo => ${error}`
    );
    next(error);
  }

};

//get all emergency contacts information

const getContactsInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empContactsInfo: any = await ContactInfo.findOne({ user });
    if (!empContactsInfo) {
      throw new Error(`Employee contacts information not found`);
    }

    res.json(
      successResponse(empContactsInfo, 200, "Contacts information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getContactsInfo=> ${error}`
    );
    next(error);
  }
};

//update emergency contacts information

const updateContactsInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const userId = req.user._id; // Assuming user ID is available in req.user
      const contactsInfoId = req.body.id; // Assuming education info ID is passed as a parameter
  
      const { name, relationship, primaryPhone, secondaryPhone } = req.body;
  
      // Construct update object based on provided data
      const updateData = {
       name,
       relationship,
       primaryPhone,
       secondaryPhone
      };
  
      // Find and update the education record within empEducationInfo based on _id
      const updatedContactsInfo: EmergencyContactInterface | null = await ContactInfo.findOneAndUpdate(
        { 
          user: userId,
          'emergencyContactRecords._id': contactsInfoId
        },
        {
          $set: {
            'emergencyContactRecords.$': updateData
          }
        },
        { new: true }
      );
  
      if (!updatedContactsInfo) {
        throw new Error(`Education record with ID ${contactsInfoId} not found for user with ID ${userId}`);
      }
  
      res.json(
        successResponse(
          updatedContactsInfo,
          200,
          "Emergency contacts record updated successfully"
        )
      );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateContactsInfo => ${error}`
    );
    next(error);
  }
};

//delete emergency contact information

const deleteContactsInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user._id; 
    const contactsInfoId = req.body.id; 
    
    const deletedContactsInfo = await ContactInfo.findOneAndUpdate(
      { user: user },
      { $pull: { emergencyContactRecords: { _id: contactsInfoId } } },
      { new: true } // To return the updated document
    );

    if (!deletedContactsInfo) {
      throw new Error(`Education record with ID ${contactsInfoId} not found for user with ID ${user}`);
    }


    res.json(
      successResponse(
        deletedContactsInfo,
        200,
        "Education record deleted successfully"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:deleteContactsInfo => ${error}`
    );
    next(error);
  }
};

//add family information

const addFamilyInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const familyRecords = req.body.familyInformationRecords; 
    const user = req.user;
  
    const existingEmployee = await FamilyInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("family information already axists. ")
    }


    if (!familyRecords || !Array.isArray(familyRecords) || familyRecords.length === 0) {
      throw new Error(`contactsRecords array is required and should contain at least one record.`);
    }

    const newFamilyInfo = new FamilyInfo({
      user: user._id, 
      familyInformationRecords: familyRecords
    });

    await newFamilyInfo.save();

    res.json(
      successResponse(
        newFamilyInfo,
        201,
        "Family information added successfully."
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:addFamilyInfo => ${error}`
    );
    next(error);
  }

};

//get family information

const getFamilyInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empFamilyInfo: any = await FamilyInfo.findOne({ user });
    if (!empFamilyInfo) {
      throw new Error(`Employee family information not found`);
    }

    res.json(
      successResponse(empFamilyInfo, 200, "Family information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getFamilyInfo => ${error}`
    );
    next(error);
  }
};

//update family information

const updateFamilyInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const userId = req.user._id; // Assuming user ID is available in req.user
      const familyInfoId = req.body.id; // Assuming family info ID is passed as a parameter

    const { name, relationship, birthDate, phone } = req.body;

    // Construct update object based on provided data
    const updateData = {
      name,
      relationship,
      birthDate,
      phone
    };

    // Find and update the family information record within FamilyInfo based on _id
    const updatedFamilyInfo: FamilyInformationsInterface | null = await FamilyInfo.findOneAndUpdate(
      {
        user: userId,
        'familyInformationRecords._id': familyInfoId
      },
      {
        $set: {
          'familyInformationRecords.$': updateData
        }
      },
      { new: true }
    );

    if (!updatedFamilyInfo) {
      throw new Error(`Family information record with ID ${familyInfoId} not found for user with ID ${userId}`);
    }

    res.json(
      successResponse(
        updatedFamilyInfo,
        200,
        "Family information record updated successfully"
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateContactsInfo => ${error}`
    );
    next(error);
  }
};

//delete family information

const deleteFamilyInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user._id; 
    const familyInfoId = req.body.id; 
    
    const deletedFamilyInfo = await FamilyInfo.findOneAndUpdate(
      { user: user },
      { $pull: { familyInformationRecords: { _id: familyInfoId } } },
      { new: true } // To return the updated document
    );

    if (!deletedFamilyInfo) {
      throw new Error(`Family record with ID ${ familyInfoId} not found for user with ID ${user}`);
    }


    res.json(
      successResponse(
        deletedFamilyInfo,
        200,
        "family record deleted successfully"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:deleteFamilyInfo => ${error}`
    );
    next(error);
  }
};

//add employee experience information

const addExperienceInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const experienceRecords = req.body.experienceInformationRecords; 
    const user = req.user;
  
    const existingEmployee = await ExperienceInfo.findOne({user})
    if(existingEmployee){
      throw new Error ("experience information already axists. ")
    }


    if (!experienceRecords || !Array.isArray(experienceRecords) || experienceRecords.length === 0) {
      throw new Error(`experienceRecords array is required and should contain at least one record.`);
    }

    const newExperienceInfo = new ExperienceInfo({
      user: user._id, 
      experienceInformationRecords: experienceRecords
    });

    await newExperienceInfo.save();

    res.json(
      successResponse(
        newExperienceInfo,
        201,
        "Experience information added successfully."
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:addExperienceInfo => ${error}`
    );
    next(error);
  }

};

//get employee experience information

const getExperienceInfo= async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user;

    const empExperienceInfo: any = await ExperienceInfo.findOne({ user });
    if (!empExperienceInfo) {
      throw new Error(`Employee Experience information not found`);
    }

    res.json(
      successResponse(empExperienceInfo, 200, "Experience information retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getExperienceInfo => ${error}`
    );
    next(error);
  }
};

//update the employee experience information

const updateExperienceInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
    try {
      const userId = req.user._id; // Assuming user ID is available in req.user
      const experienceInfoId = req.body.id; // Assuming family info ID is passed as a parameter

    const { companyName, location, jobPosition, periodFrom, periodTo } = req.body;

    // Construct update object based on provided data
    const updateData = {
      companyName,
      location,
      jobPosition,
      periodFrom,
      periodTo
    };

    // Find and update the family information record within FamilyInfo based on _id
    const updatedExperienceInfo: ExperienceInformationsInterface | null = await ExperienceInfo.findOneAndUpdate(
      {
        user: userId,
        'experienceInformationRecords._id': experienceInfoId
      },
      {
        $set: {
          'experienceInformationRecords.$': updateData
        }
      },
      { new: true }
    );

    if (!updatedExperienceInfo) {
      throw new Error(`Experience information record with ID ${experienceInfoId} not found for user with ID ${userId}`);
    }

    res.json(
      successResponse(
        updatedExperienceInfo,
        200,
        "Experience information record updated successfully"
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:updateExperienceInfo = async (
 => ${error}`
    );
    next(error);
  }
};

//delete the employee experience information
const deleteExperienceInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = req.user._id; 
    const experienceInfoId = req.body.id; 
    
    const deletedExperienceInfo = await ExperienceInfo.findOneAndUpdate(
      { user: user },
      { $pull: { experienceInformationRecords: { _id: experienceInfoId } } },
      { new: true } // To return the updated document
    );

    if (!deletedExperienceInfo) {
      throw new Error(`Experience record with ID ${ experienceInfoId} not found for user with ID ${user}`);
    }


    res.json(
      successResponse(
        deletedExperienceInfo,
        200,
        "experience record deleted successfully"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:deleteExperienceInfo => ${error}`
    );
    next(error);
  }
};

const getHoliday = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body; 

    const holiday = await HolidayInfo.findById(id);


    if (!holiday) {
      throw new Error(`Holiday not found`);
    }

    res.json(
      successResponse(holiday, 200, "Holiday retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getHoliday => ${error}`
    );
    next(error);
  }
};


const getAllHolidays = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    const skip = (page - 1) * limit;

    const holidays = await HolidayInfo.find()
      .skip(skip)
      .limit(limit);

    const totalCount = await HolidayInfo.countDocuments();

    // Prepare pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;

    res.json(
      successResponse(
        {
          holidays,
          pagination: {
            totalPages,
            currentPage,
            totalHolidays: totalCount,
          },
        },
        200,
        "Holidays retrieved successfully"
      )
    );
  } catch (error) {
    console.log(
      `There was an issue in employeeController:getAllHolidays => ${error}`
    );
    next(error);
  }
};

const getEmployee = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
      const { id } = req.body; 

      const employee = await Model.findById(id);


    if (!employee) {
      throw new Error(`Employee not found`);
    }

    res.json(
      successResponse(employee, 200, "Employee retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getEmployee => ${error}`
    );
    next(error);
  }
};

const getAllEmployees = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    const skip = (page - 1) * limit;

    const employees = await Model.find()
      .skip(skip)
      .limit(limit);

    const totalCount = await Model.countDocuments();

    // Prepare pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;

    res.json(
      successResponse(
        {
          employees,
          pagination: {
            totalPages,
            currentPage,
            totalEmployees: totalCount,
          },
        },
        200,
        "Employees retrieved successfully"
      )
    );
  } catch (error) {
    console.log(
      `There was an issue in employeeController:getAllEmployees => ${error}`
    );
    next(error);
  }
};

const getDepartment = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
      const { id } = req.body; 

      const department = await DepartmentInfo.findById(id);


    if (!department) {
      throw new Error(`Department not found`);
    }

    res.json(
      successResponse(department, 200, "Department retrieved successfully")
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getDepartment => ${error}`
    );
    next(error);
  }
};

const getAllDepartments = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default limit is 10

    const skip = (page - 1) * limit;

    const departments = await DepartmentInfo.find()
      .skip(skip)
      .limit(limit);

    const totalCount = await DepartmentInfo.countDocuments();

    // Prepare pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const currentPage = page;

    res.json(
      successResponse(
        {
          departments,
          pagination: {
            totalPages,
            currentPage,
            totalEmployees: totalCount,
          },
        },
        200,
        "Department retrieved successfully"
      )
    );
  } catch (error) {
    console.log(
      `There was an issue in employeeController:getAllDepartments => ${error}`
    );
    next(error);
  }
};

const getAllDesignations = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { departmentId } = req.body;

    const designations = await DesignationInfo.find({ departmentId });

    if (designations.length == 0) {
      throw new Error(`No designations found for this departmentId`);
    }

    const designationNames = designations.map(designation => designation.designationName);

    res.json(
      successResponse(
        designationNames,
        200,
        "Designations retrieved successfully"
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:getAllDesignations => ${error}`
    );
    next(error);
  }
};

const punchIn = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = req.user;

    const currentDateTime = new Date();

    const currentDateWithoutTime = new Date(Date.UTC(currentDateTime.getUTCFullYear(), currentDateTime.getUTCMonth(), currentDateTime.getUTCDate()));

    const dayOfWeek = currentDateTime.getUTCDay();
    if (dayOfWeek === 6 || dayOfWeek === 0) { 
      throw new Error("You cannot punch in on a weekend (Saturday or Sunday).");
    }

    const holidays: HolidayInterface[] = await HolidayInfo.find();

    const isHoliday = holidays.some(holiday => {
      const holidayDateWithoutTime = new Date(Date.UTC(holiday.holidayDate.getUTCFullYear(), holiday.holidayDate.getUTCMonth(), holiday.holidayDate.getUTCDate()));
      return currentDateWithoutTime.getTime() === holidayDateWithoutTime.getTime();
    });

    if (isHoliday) {
      throw new Error("You cannot punch in on a holiday.");
    }

    const leaveEntries = await LeaveInfo.find({
      user: user._id,
      leaveStatus: "Approved", 
      fullLeave: true
    });

    let leave = false;

    for (const leaveEntry of leaveEntries) {
      if (leaveEntry.totalDates && leaveEntry.totalDates.length > 0) {
        for (const dateObj of leaveEntry.totalDates) {
          if (dateObj.date && dateObj.date.getTime() === currentDateWithoutTime.getTime()) {
            leave = true; 
            break; 
          }
        }
      }
    }

    if (leave) {
      throw new Error("You cannot punch in on a leave");
    }

    const existingPunchIn = await AttendanceInfo.findOne({ user: user._id, presentDate: currentDateWithoutTime });

    if (existingPunchIn) {
      throw new Error("You have already punched in today.");
    }

    const newAttendanceInfo = new AttendanceInfo({
      user: user._id,
      presentDate: currentDateWithoutTime,
      workIn: currentDateTime
    });

    await newAttendanceInfo.save();

    return res.json(
      successResponse(
        newAttendanceInfo,
        201,
        "Punch In Information Added Successfully."
      )
    );
  } catch (error) {
    console.log(
      `There was an issue in employeeController:punchIn => ${error}`
    );
    next(error);
  }
};

const punchOut = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const user = req.user;

    const currentDateTime = new Date();
    const currentDateOnly = new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate());
    const currentDateWithoutTime = new Date(Date.UTC(currentDateTime.getUTCFullYear(), currentDateTime.getUTCMonth(), currentDateTime.getUTCDate()));

    const existingPunchIn = await AttendanceInfo.findOne({
      user: user._id,
      presentDate: {
        $gte: currentDateOnly,
        $lt: new Date(currentDateOnly.getTime() + 24 * 60 * 60 * 1000) 
      },
      workOut: { $exists: false }
    });

    if (!existingPunchIn) {
      throw new Error("You have not punched in today or have already punched out.");
    }

    if (!existingPunchIn.workIn || !(existingPunchIn.workIn instanceof Date) && isNaN(Date.parse(existingPunchIn.workIn))) {
      throw new Error("Invalid workIn time in the database.");
    }

    let totalBreakTime = 0;
    if (existingPunchIn.breakTimes && existingPunchIn.breakTimes.length > 0) {
      totalBreakTime = existingPunchIn.breakTimes.reduce((total, breakTime) => total + breakTime, 0);
    }

    let workInTime: Date = new Date(existingPunchIn.workIn);

    const workOutTime: Date = currentDateTime;
    const timeDifference: number = workOutTime.getTime() - workInTime.getTime();
    const minutesDifference = timeDifference / (1000 * 60); 

    if (isNaN(minutesDifference)) {
      throw new Error("Invalid calculation of total work times.");
    }

    let totalWorkTime = 0;
    if (minutesDifference && totalBreakTime) {
      totalWorkTime = (minutesDifference - totalBreakTime) / 60; 
    }

    const leaveEntries = await LeaveInfo.find({
      user: user._id,
      leaveStatus: "Approved", 
      halfLeave: true
    });

    for (const leaveEntry of leaveEntries) {
      if (leaveEntry.totalDates && leaveEntry.totalDates.length > 0) {
        for (const dateObj of leaveEntry.totalDates) {
          if (dateObj.date && dateObj.date.getTime() === currentDateWithoutTime.getTime()) {
            existingPunchIn.halfLeave = true;
            break; 
          }
        }
      }
    }


    existingPunchIn.workOut = currentDateTime;
    existingPunchIn.totalTimes = minutesDifference;
    existingPunchIn.workHours = totalWorkTime;
    existingPunchIn.attendance = 'True';

    await existingPunchIn.save();

    return res.json(
      successResponse(
        existingPunchIn,
        200,
        "Punch Out Information Added Successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:punchOut => ${error}`
    );
    next(error);
  }
};

const breakIn = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.user;
    const currentDateTime = new Date();

    const currentDate = new Date(Date.UTC(currentDateTime.getUTCFullYear(), currentDateTime.getUTCMonth(), currentDateTime.getUTCDate()));
  
    let breakInfo: BreakInfoInterface | null = await BreakInfo.findOne({ user: userId, presentDate: currentDate });

    if (!breakInfo) {
      breakInfo = new BreakInfo({
        user: userId,
        presentDate: currentDate,
        breakRecords: []
      });
    }

    breakInfo.breakRecords.push({ breakIn: currentDateTime });

    await breakInfo.save();

    return res.json(
      successResponse(
        breakInfo,
        201,
        "Break In Information Added Successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue in employeeController:breakIn => ${error}`
    );
    next(error);
  }
};

const breakOut = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const userId = req.user;
    const currentDateTime = new Date();

    const currentDate = new Date(Date.UTC(currentDateTime.getUTCFullYear(), currentDateTime.getUTCMonth(), currentDateTime.getUTCDate()));

    let breakInfo: BreakInfoInterface | null = await BreakInfo.findOne({ 
      user: userId, 
      presentDate: currentDate
    });

    if (!breakInfo || breakInfo.breakRecords.length === 0) {
      throw new Error("No break in recorded for today or already break out.");
    }

    const lastBreakRecordIndex = breakInfo.breakRecords.length - 1;
    const lastBreakRecord = breakInfo.breakRecords[lastBreakRecordIndex];

    if (lastBreakRecord.breakOut) {
      throw new Error("Break out already recorded for the latest break in.");
    }

    const breakInTime = lastBreakRecord.breakIn as Date;
    const breakOutTime = currentDateTime;
    const timeDifferenceInMilliseconds = breakOutTime.getTime() - breakInTime.getTime();
    const breakDurationInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));

    lastBreakRecord.breakOut = breakOutTime;

    let attendanceInfo: AttendanceInfoInterface | null = await AttendanceInfo.findOne({ 
      user: userId,
      presentDate: {
        $gte: currentDate,
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000) // End of the day
      },
     });

    if (!attendanceInfo) {
      attendanceInfo = new AttendanceInfo({
        user: userId,
        presentDate: currentDate,
        breakTimes: [breakDurationInMinutes] 
      });
    } else {
      attendanceInfo.breakTimes = attendanceInfo.breakTimes || [];
      attendanceInfo.breakTimes.push(breakDurationInMinutes);
    }

    await attendanceInfo.save();
    await breakInfo.save();

    return res.json({
      success: true,
      status: 201,
      message: "Break Out Information Updated Successfully.",
      data: breakInfo
    });
  } catch (error) {
    console.log(
      `There was an issue in employeeController:breakOut => ${error}`
    );
    next(error); 
  }
};

const addLeave = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      from,
      to,
      totalDays,
      fullLeave,
      halfLeave,
      leaveReason
    } = req.body;

    const user = req.user;

    const fromDate = new Date(from);
    const toDate = new Date(to);



      const sender = user.email;

      const senderName = user.userName

      const userName = user.userName

      const leaveStatus = "Pending";

      const HREmail = await Model.find({ role: 'HR' }).select('email');
     
      const AdminEmail = await Model.find({ role: 'Admin' }).select('email');
      

      const emails: string[] = [];

      HREmail.forEach((hr) => {
        if (hr.email !== sender) {
          emails.push(hr.email);
        }
      });

      AdminEmail.forEach((admin) => {
        if (admin.email !== sender) {
          emails.push(admin.email);
        }
      });



    
    const datesWithDayNames = [];
    
    const getDayName = (date: Date): string => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date.getDay()];
    };
    
    for (let date = new Date(fromDate); date <= toDate; date.setDate(date.getDate() + 1)) {
      datesWithDayNames.push({
        date: new Date(date),
        dayName: getDayName(date)
      });
    }

    const leave = new LeaveInfo({
      user: user._id,
      from,
      to,
      totalDays,
      fullLeave,
      halfLeave,
      totalDates:datesWithDayNames,
      leaveReason
    });

    const newLeave = await leave.save();

    const leaveInfo = newLeave;

    if (!leaveInfo) {
      console.log(`Leave information not found for user with ID: ${user._id}`);
    }

    leaveInfoMail(sender,senderName,emails,leaveStatus,leaveInfo,userName)

    res.json(
      successResponse(
        newLeave,
        201,
        'Leave added successfully.'
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:addLeave => ${error}`
    );
    next(error);
  }

};

const getEmpAttendanceInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { from, to } = req.body;

    const user = req.user;
    
    const fromDate = new Date(from);
    const toDate = new Date(to);

    fromDate.setUTCHours(0, 0, 0, 0);

    toDate.setUTCHours(23, 59, 59, 999);

    const records = await AttendanceInfo.find({
      user: user._id,
      presentDate: {
        $gte: fromDate,
        $lte: toDate
      }
    }).populate({
      path: 'user',
      select: 'firstName lastName',
      populate : {
        path: 'profile',
        select: 'image',
      }
      
    })

    res.json(
      successResponse(
        records,
        200,
        'Attendance Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getAttendanceInfo => ${error}`
    );
    next(error);
  }
};

const getAllProject = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    

    const records = await ProjectInfo.find();

    if(!records){
      throw new Error(`Project not found`);
    }

    res.json(
      successResponse(
        records,
        200,
        'Project Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getAllProject => ${error}`
    );
    next(error);
  }
};


const getProject = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const {
      id,
    } = req.body

    const records = await ProjectInfo.find({_id:id});

    if(!records){
      throw new Error(`Project not found`);
    }

    res.json(
      successResponse(
        records,
        200,
        'Project Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getAllProject => ${error}`
    );
    next(error);
  }
};


const getClientProject = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const {
      id,
    } = req.body

    const records = await ProjectInfo.find({client:id});

    if(!records){
      throw new Error(`client not have a project.`);
    }

    res.json(
      successResponse(
        records,
        200,
        'Client Project Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getClientProject => ${error}`
    );
    next(error);
  }
};


const addTimeSheet = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
      project,
      date,
      hours,
      description
    } = req.body;

    const user = req.user;

    const timeSheet = new TimeSheetInfo({
      user: user._id,
      project,
      date,
      hours,
      description
    });

    const newTimeSheet = await timeSheet.save();

    res.json(
      successResponse(
        newTimeSheet,
        201,
        'TimeSheet added successfully.'
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:addTimeSheet => ${error}`
    );
    next(error);
  }

};

const editTimeSheet = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      project,
      date,
      hours,
      description
    } = req.body;

    const updateData: any = {
      project,
      date,
      hours,
      description
    };

    const editTimeSheet = await TimeSheetInfo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );


    if (!editTimeSheet) {
      throw new Error(`TimeSheet Entry Not Found.`);
    }

    res.json(
      successResponse(
        editTimeSheet,
        200,
        'TimeSheet Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminCOntroller:editTimeSheet => ${error}`
    );
    next(error);
  }
};

const deleteTimeSheet = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { id } = req.body; 

      const deleteTimeSheet = await TimeSheetInfo.findByIdAndDelete(id);

    res.json(successResponse({ deleteTimeSheet }, 200, "TimeSheet Details delete successfully."));
  } catch (error) {
    console.log(
      `There was an issue into adminCOntroller:deleteTimeSheet => ${error}`
    );
    next(error);
  }
};

const getAllTimeSheet = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {

      const allTimeSheet = await TimeSheetInfo.find();

    res.json(successResponse({ allTimeSheet }, 200, "Get All TimeSheet Details  successfully."));
  } catch (error) {
    console.log(
      `There was an issue into adminCOntroller:getAllTimeSheet => ${error}`
    );
    next(error);
  }
};


const getEmpTotalHours = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { empId, projectId } = req.body;

    const userId = Types.ObjectId.createFromHexString(empId);

    const totalHoursResult = await TimeSheetInfo.aggregate([
      {
        $match: {
          user: userId,
          project: projectId,
        },
      },
      {
        $group: {
          _id: null,
          totalHours: { $sum: '$hours' },
        },
      },
    ]);

    if (totalHoursResult.length === 0) {
      throw new Error(`No records found for empId: ${empId} and projectId: ${projectId}`);
    }

    const totalHours = totalHoursResult[0].totalHours;

    res.json(
      successResponse(
        totalHours,
        200,
        'Employee Total Work Hours for This Project Retrieved successfully.'
      )
    );
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getEmpTotalHours => ${error}`
    );
    next(error);
  }
};

const getProjectTotalHours = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { projectId } = req.body;

    const totalHoursResult = await TimeSheetInfo.aggregate([
      {
        $match: {
          project: projectId,
        },
      },
      {
        $group: {
          _id: '$user',
          totalHours: { $sum: '$hours' },
        },
      },
    ]);

    const projectTotalHours = totalHoursResult.map(result => ({
      userId: result._id,
      totalHours: result.totalHours,
    }));

    res.json(
      successResponse(
        projectTotalHours,
        200,
        'Total Work Hours for Project Retrieved successfully.'
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into employeeController:getProjectTotalHours => ${error}`
    );
    next(error);
  }
};


const getEmpSalary = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const {
      employeeId
    } = req.body

    const records = await SalaryInfo.findOne({ employeeId });

    if(!records){
      throw new Error(`Employee with this Employee Id not found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Salary Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getEmpSalary => ${error}`
    );
    next(error);
  }
};


const getTotalAttendance = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId, month, year } = req.body;
    console.log(req.body)

    const attendanceRecords = await AttendanceInfo.find({
      user: userId,
      attendance: ATTENDANCE.TRUE,
    });
    console.log("attendanceRecords",attendanceRecords)
    
    let totalAttendance = 0;

    attendanceRecords.forEach((record) => {

      if (record.presentDate instanceof Date && !isNaN(record.presentDate.getTime())) {
        const dateObject = new Date(record.presentDate);
        const recordMonth = dateObject.getUTCMonth() + 1; 
        const recordYear = dateObject.getUTCFullYear();

        if (recordMonth === month && recordYear === year) {
          if (record.halfLeave) {
            totalAttendance += 0.5;
          } else {
            totalAttendance += 1;
          }
        }
      }
    });

    console.log(`Total attendance for userId ${userId} in ${month}/${year}:`, totalAttendance);



  } catch (error) {
    console.log(
      `There was an issue into employeeController:getTotalAttendance => ${error}`
    );
    next(error);
  }
};

const getMonthSalarySlip = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    
    const { employeeId, month, year } = req.body; 

    const records = await MonthlySalaryInfo.findOne({employeeId, month, year}).populate({
      path: 'user',
      select: 'firstName lastName department designation email joiningDate role',
      populate: [
        { path: 'profile', select: 'image' },
        { path: 'salary', select: 'salary' }
      ]
    });

    if(!records){
      throw new Error(`Employee salary not found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Employee Salary Slip Details Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getAllEmpSalary => ${error}`
    );
    next(error);
  }
};


const getSalarySlip = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    
    const { employeeId } = req.body; 

    const records = await MonthlySalaryInfo.findOne({ employeeId }).populate({
      path: 'user',
      select: 'firstName lastName department designation email joiningDate role',
      populate: [
        { path: 'profile', select: 'image' },
        { path: 'salary', select: 'salary' }
      ]
    });

    if(!records){
      throw new Error(`Employee salary not found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Employee Salary Slip Details Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into employeeController:getAllEmpSalary => ${error}`
    );
    next(error);
  }
};

const getAllTrainingType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await TrainingTypeInfo.find();
    if(!records){
      throw new Error(`Training Type Not Found.`);
    }

    res.json(
      successResponse(
        records,
        200,
        'All Training Type Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllTrainingType => ${error}`
    );
    next(error);
  }
};

const getTrainingType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const{
      id,
    } = req.body;
    
    const records = await TrainingTypeInfo.findOne({_id:id});
    if(!records){
      throw new Error(`Training Type Not Found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Training Type Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getTrainingType => ${error}`
    );
    next(error);
  }
};

const getAllTrainer = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await TrainerInfo.find().populate({
      path: 'user',
      select: '_id',
      populate : {
        path: 'profile',
        select: 'image',
      }
      
    })
    if(!records){
      throw new Error(`Trainer Not Found.`);
    }

    res.json(
      successResponse(
        records,
        200,
        'All Trainer Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllTrainer => ${error}`
    );
    next(error);
  }
};

const getTrainer = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const user = req.user;
    
    const records = await TrainerInfo.findOne({user}).populate({
      path: 'user',
      select: '_id',
      populate : {
        path: 'profile',
        select: 'image',
      }
      
    });
    if(!records){
      throw new Error(`Trainer Not Found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Trainer Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getTrainer => ${error}`
    );
    next(error);
  }
};

const getTrainee = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {

    const user = req.user;
    
    const records = await TraineeInfo.findOne({user}).populate({
      path: 'user',
      select: '_id',
      populate : {
        path: 'profile',
        select: 'image',
      }
      
    });
    if(!records){
      throw new Error(`Trainee Not Found. `);
    }

    res.json(
      successResponse(
        records,
        200,
        'Trainee Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getTrainee => ${error}`
    );
    next(error);
  }
};

const getAllPromotionInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await PromotionInfo.find().populate(
      {
        path: 'user',
        select: '_id',
        populate: {
          path: 'profile',
          select: 'image',
        },
      },
     );

    if(!records){
      throw new Error(`Employee Promotion  Not Found.`);
    }

    res.json(
      successResponse(
        records,
        200,
        'All Employee Promotion Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllPromotionInfo => ${error}`
    );
    next(error);
  }
};

export default { 
  login, 
  createEmpProfile,
  getEmpProfile,
  updateEmpProfile,
  updateEmpProfilePic,
  deleteEmpProfile,
  addPersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
  deletePersonalInfo,
  addBankInfo,
  getBankInfo,
  updateBankInfo,
  deleteBankInfo,
  addEducationInfo,
  getEducationInfo,
  updateEducationInfo,
  deleteEducationInfo,
  addContactsInfo,
  getContactsInfo,
  updateContactsInfo,
  deleteContactsInfo,
  addFamilyInfo,
  getFamilyInfo,
  updateFamilyInfo,
  deleteFamilyInfo,
  addExperienceInfo,
  getExperienceInfo,
  updateExperienceInfo,
  deleteExperienceInfo,
  getHoliday,
  getAllHolidays,
  getEmployee,
  getAllEmployees,
  getDepartment,
  getAllDepartments,
  getAllDesignations,
  punchIn,
  punchOut,
  breakIn,
  breakOut,
  addLeave,
  getEmpAttendanceInfo,
  getAllProject,
  getProject,
  getClientProject,
  addTimeSheet,
  editTimeSheet,
  deleteTimeSheet,
  getAllTimeSheet,
  getEmpTotalHours,
  getProjectTotalHours,
  getTotalAttendance,
  getEmpSalary,
  getMonthSalarySlip,
  getSalarySlip,
  getAllTrainingType,
  getTrainingType,
  getAllTrainer,
  getTrainer,
  getTrainee,
  getAllPromotionInfo
};



