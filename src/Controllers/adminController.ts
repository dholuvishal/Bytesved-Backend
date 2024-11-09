import { Request, Response, NextFunction } from "express";
import { successResponse } from "../Utils/responseMessages";
import dotenv from "dotenv";
dotenv.config();
import requestBodyMiddleware from "../Middlewares/reqBodyMiddleware";
import * as path from "path";
import * as fs from "fs";
import deleteFile from "../Utils/commonFunctions";
import Model from "../Models/employeeModel";
import HolidayInfo, { HolidayInterface } from "../Models/holidayModel";
import DepartmentInfo from "../Models/departmentInfoModel";
import DesignationInfo from "../Models/designationInfoModel";
import LeaveInfo, { LeaveInfoInterface } from "../Models/leaveInfoModel";
import ClientInfo, { ClientInfoInterface} from "../Models/clientInfoModel";
import ProjectInfo, { ProjectInfoInterface} from "../Models/projectInfoModel";
import AttendanceInfo, { AttendanceInfoInterface } from "../Models/attendanceInfoModel";
import LeaveSettingInfo, { LeaveSettingInfoInterface } from "../Models/leaveSettingInfoModel";
import SalaryInfo, { SalaryInfoInterface } from "../Models/salaryInfoModel";
import MonthlySalaryInfo, { MonthlySalaryInfoInterface } from "../Models/monthlySalaryInfoModel";
import TrainingTypeInfo, { TrainingTypeInterface } from "../Models/trainingTypeInfoModel";
import TraineeInfo, { TraineeInterface } from "../Models/traineeInfoModel";
import TrainingInfo, { TrainingInterface } from "../Models/trainingInfoModel";
import TrainerInfo, { TrainerInterface } from "../Models/trainerInfoModel";
import PromotionInfo, { PromotionInterface } from "../Models/promotionInfoModel";
import AssetInfo, { AssetInterface } from "../Models/assetInfoModel";
import leaveInfoMail from "../Config/mailConfig";
import crypto from "crypto";
import { ATTENDANCE, LEAVESTATUS } from "../Config/constant";
import isSameHoliday from "../Utils/sameDayFunction";


const addEmployee = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        firstName,
        lastName,
        userName,
        email,
        password,
        employeeId,
        joiningDate,
        jobPeriod,
        phone,
        company,
        department,
        designation,
        role,
      } = req.body;

      const lowerCaseEmail = email.toLowerCase();

      const hashedPassword = crypto
      .createHash("sha256")
      .update(password)
       .digest("hex");

  
      const existingEmployee = await Model.findOne({lowerCaseEmail})
      if(existingEmployee){
        throw new Error ("This Email already exists")
      }
  
      const newEmployee = new Model({
        firstName,
        lastName,
        userName,
        email:lowerCaseEmail,
        password:hashedPassword,
        employeeId,
        joiningDate,
        jobPeriod,
        phone,
        company,
        department,
        designation,
        role
      });
  
      const newEmp = await newEmployee.save();

      res.json(
        successResponse(
          newEmp,
          201,
          "You are registred successfully"
        )
      );
  
    } catch (error) {
      console.log(
        `There was an issue into adminController:newEmployee => ${error}`
      );
      next(error);
    }
  
  };

const editEmployee = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        id,
        firstName,
        lastName,
        userName,
        email,
        password,
        employeeId,
        joiningDate,
        phone,
        company,
        department,
        designation,
        role,
      } = req.body;
  
      const user = req.user;
  
      const updateData: any = {
        firstName,
        lastName,
        userName,
        email,
        password,
        employeeId,
        joiningDate,
        phone,
        company,
        department,
        designation,
        role
      };
  
      const editEmployee = await Model.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
  
  
      if (!editEmployee) {
        throw new Error(`Employee not found`);
      }
  
      // Send success response
      res.json(
        successResponse(
          editEmployee,
          200,
          'Employee Details updated successfully'
        )
      );
  
  
    } catch (error) {
      console.log(
        `There was an issue into eadminController:editEmployee => ${error}`
      );
      next(error);
    }
  };

const deleteEmployee = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const { id } = req.body; // Extract id from req.body

        const deleteEmployee = await Model.findByIdAndDelete(id);
  
      res.json(successResponse({ deleteEmployee }, 200, "employee delete successful"));
    } catch (error) {
      console.log(
        `There was an issue into adminController:deleteEmployee => ${error}`
      );
      next(error);
    }
  };

const addHoliday = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        holidayName,
        holidayDate,
        day
      } = req.body;
  
      const existingHoliday = await HolidayInfo.findOne({holidayDate})
      if(existingHoliday){
        throw new Error ("Already this date is declare as a holiday.")
      }
  
      const holiday = new HolidayInfo({
        holidayName,
        holidayDate,
        day
      });
  
      const newHoliday = await holiday.save();

      res.json(
        successResponse(
          newHoliday,
          201,
          "Holiday added successfully."
        )
      );
  
    } catch (error) {
      console.log(
        `There was an issue into adminController:addHoliday => ${error}`
      );
      next(error);
    }
  
  };

const editHolidays = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        id,
        holidayName,
        holidayDate,
        day
      } = req.body;
  
      const updateData: any = {
        holidayName,
        holidayDate,
        day
      };
  
      const editHoliday = await HolidayInfo.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
  
  
      if (!editHoliday) {
        throw new Error(`Holiday not found`);
      }
  
      // Send success response
      res.json(
        successResponse(
          editHoliday,
          200,
          'Holiday Details updated successfully'
        )
      );
  
  
    } catch (error) {
      console.log(
        `There was an issue into adminController:editHolidays => ${error}`
      );
      next(error);
    }
  };

const deleteHoliday = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const { id } = req.body; 

        const deleteHoliday = await HolidayInfo.findByIdAndDelete(id);
  
      res.json(successResponse({ deleteHoliday }, 200, "holiday delete successful"));
    } catch (error) {
      console.log(
        `There was an issue into adminController:deleteEmployee => ${error}`
      );
      next(error);
    }
  };

const addDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const {
        departmentName
      } = req.body;
  
      const existingDepartment = await DepartmentInfo.findOne({departmentName})
      if(existingDepartment){
        throw new Error ("Department already exist.")
      }
  
      const department = new DepartmentInfo({
        departmentName
      });
  
      const newDepartment = await department.save();
  
      res.json(
        successResponse(
          newDepartment,
          201,
          'Department added successfully.'
        )
      );
  
    } catch (error) {
      console.log(
        `There was an issue into adminController:addDepartment => ${error}`
      );
      next(error);
    }
  
  };

const editDepartment = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const {
        id,
        departmentName
      } = req.body;
  
      const updateData: any = {
        departmentName
      };
  
      const editDepartment = await DepartmentInfo.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );
  
  
      if (!editDepartment) {
        throw new Error(`Department not found`);
      }

      res.json(
        successResponse(
          editDepartment,
          200,
          'Department updated successfully'
        )
      );
  
  
    } catch (error) {
      console.log(
        `There was an issue into adminController:editDepartment => ${error}`
      );
      next(error);
    }
  };

const deleteDepartment = async (
    req: any,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
        const { id } = req.body; 

        const deleteDepartment = await DepartmentInfo.findByIdAndDelete(id);
  
      res.json(successResponse({ deleteDepartment }, 200, "department delete successful"));
    } catch (error) {
      console.log(
        `There was an issue into adminController:deleteDepartment => ${error}`
      );
      next(error);
    }
  };

const addDesignation = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
    try {
      const { departmentId, designationName } = req.body;
  
      const existingDesignation = await DesignationInfo.findOne({ departmentId, designationName });
      if (existingDesignation) {
        throw new Error("Designation name already exists for this department.");
      }
  
      const designation = new DesignationInfo({
        departmentId,
        designationName
      });
  
      const newDesignation = await designation.save();

      res.json(
        successResponse(
          newDesignation,
          200,
          'Designation added successfully.'
        )
      );

    } catch (error) {
      console.log(
        `There was an issue into adminController:addDesignationt => ${error}`
      );
      next(error);
    }
  
};

const editDesignation = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      designationId,
      designationName,
      departmentId
    } = req.body;

    const updateData: any = {
      designationName,
      departmentId
    };

    const editDesignation = await DesignationInfo.findByIdAndUpdate(
      designationId,
      updateData,
      { new: true, runValidators: true }
    );


    if (!editDesignation) {
      throw new Error(`Designation not found`);
    }

    // Send success response
    res.json(
      successResponse(
        editDesignation,
        200,
        'Designation updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editDesignation => ${error}`
    );
    next(error);
  }
};

const deleteDesignation = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { designationId } = req.body;

      const deleteDesignation = await DesignationInfo.findByIdAndDelete(designationId);

    res.json(successResponse({ deleteDesignation }, 200, "designation delete successful"));
  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteDesignation => ${error}`
    );
    next(error);
  }
};


const editLeaveStatus = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id, leaveStatus } = req.body;

    const user = req.user;

    const leaveInfo: LeaveInfoInterface | null = await LeaveInfo.findById(id);

    const leaveUser = await Model.findById(leaveInfo?.user)?.select('userName');
    const userName = leaveUser?.userName || 'Unknown User';

      const sender = user.email;
      const senderName = user.userName

      const leaveEmp = leaveInfo?.user;
      const employeeEmail = await Model.findById(leaveEmp).select('email');

      const HREmail = await Model.find({ role: 'HR' }).select('email');
     
      const AdminEmail = await Model.find({ role: 'Admin' }).select('email');
      
      const TeamLeaderEmail = await Model.find({ role: 'TeamLeader' }).select('email');

      const emails: string[] = [];

      if (employeeEmail) {
        emails.push(employeeEmail.email);
      }

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

      TeamLeaderEmail.forEach((tl) => {
        if (tl.email !== sender) {
          emails.push(tl.email);
        }
      });

    if (!leaveInfo) {
      throw new Error('Employee Leave not found');
    }

    const holidays: HolidayInterface[] = await HolidayInfo.find({}).exec();

    const isWeekend = (date: Date): boolean => {
      const dayOfWeek = date.getDay();
      return dayOfWeek === 0 /* Sunday */ || dayOfWeek === 6 /* Saturday */;
    };

    const isHoliday = (date: Date): boolean => {
      return holidays.some(holiday => holiday.holidayDate.getTime() === date.getTime());
    };

    let totalValidDays = 0;

    leaveInfo.totalDates?.forEach(dateObj => {
      const date = new Date(dateObj.date);
      if (!isWeekend(date) && !isHoliday(date)) {
        totalValidDays += leaveInfo.fullLeave == true ? 1 : leaveInfo.halfLeave == true ? 0.5 : 0;
      }
    });

    leaveInfo.considerLeave = totalValidDays;

    if (leaveStatus === LEAVESTATUS.APPROVED) {
      leaveInfo.leaveStatus = LEAVESTATUS.APPROVED;

      const leaveSettingInfo: LeaveSettingInfoInterface | null = await LeaveSettingInfo.findOne({
        user: leaveInfo.user
      });

      if (!leaveSettingInfo) {
        throw new Error('Leave setting info not found');
      }

      if (leaveSettingInfo.quaternaryLeave > 0) {
        const remainingQuaternaryLeave = leaveSettingInfo.quaternaryLeave - leaveInfo.considerLeave;
        if (remainingQuaternaryLeave >= 0) {
          leaveSettingInfo.quaternaryLeave = remainingQuaternaryLeave;
        } else {
          leaveSettingInfo.paidLeave += Math.abs(remainingQuaternaryLeave);
          leaveSettingInfo.quaternaryLeave = 0;
        }
      } else {
        leaveSettingInfo.paidLeave += leaveInfo.considerLeave;
      }

      await leaveSettingInfo.save();

      leaveInfoMail(sender,senderName,emails,leaveStatus,leaveInfo,userName,)

    } else {
      leaveInfo.leaveStatus = leaveStatus;
      leaveInfoMail(sender,senderName,emails,leaveStatus,leaveInfo,userName,)
    }

    const updatedLeaveInfo = await leaveInfo.save();

    res.json(
      successResponse(
        updatedLeaveInfo,
        200,
        'Employee Leave Status updated successfully'
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into adminController:editLeaveStatus => ${error}`
    );
    next(error);
  }
};

const getAttendanceInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { from, to } = req.body;
    
    const fromDate = new Date(from);
    const toDate = new Date(to);

    fromDate.setUTCHours(0, 0, 0, 0);

    toDate.setUTCHours(23, 59, 59, 999);

    const records = await AttendanceInfo.find({
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

const addClientInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
     firstName,
     lastName,
     email,
     mobileNO,
     country,
     review
    } = req.body;

    const existingClient = await ClientInfo.findOne({firstName,lastName})
    if(existingClient){
      throw new Error ("Client Already Exist.")
    }

    const client = new ClientInfo({
      firstName,
      lastName,
      email,
      mobileNO,
      country,
      review
    });

    const newClient = await client.save();

    res.json(
      successResponse(
        newClient,
        201,
        "Client added successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into adminController:addClientInfo => ${error}`
    );
    next(error);
  }

};

const editClientInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      firstName,
      lastName,
      email,
      mobileNO,
      country,
      review
    } = req.body;

    const updateData: any = {
      firstName,
      lastName,
      email,
      mobileNO,
      country,
      review
    };

    const editClientInfo = await ClientInfo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );


    if (!editClientInfo) {
      throw new Error(`Client not found`);
    }

    res.json(
      successResponse(
        editClientInfo,
        200,
        'Client Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editHolidays => ${error}`
    );
    next(error);
  }
};

const deleteClient = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { id } = req.body; 

      const deleteClient = await ClientInfo.findByIdAndDelete(id);

    res.json(successResponse({ deleteClient }, 200, "Client delete successful"));
  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteClient => ${error}`
    );
    next(error);
  }
};

const getAllClient = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await ClientInfo.find();

    res.json(
      successResponse(
        records,
        200,
        'Client Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllClient => ${error}`
    );
    next(error);
  }
};

const getClient = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const {
      id,
    } = req.body

    const records = await ClientInfo.findOne({ _id: id });

    if(!records){
      throw new Error(`Client not found`);
    }

    res.json(
      successResponse(
        records,
        200,
        'Client Information Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into admincontroller:getClient => ${error}`
    );
    next(error);
  }
};

const addProjectInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const {
     projectName,
     client,
     startDate,
     endDate,
     priority,
     projectLeader,
     team,
     description,
     rate,
     status
  } = req.body;

  const user = req.user;

  const filename = req.filenames;

  const fileLinks = `${process.env.APP_BASE_URL}/get/${user._id}/${filename}`

    const existingProject = await ProjectInfo.findOne({projectName})
    if(existingProject){
      throw new Error ("Project Already Exist.")
    }

    const project = new ProjectInfo({
      projectName,
      client,
      startDate,
      endDate,
      priority,
      projectLeader,
      team,
      description,
      rate,
      uploadFile:fileLinks,
      status
    });

    const newProject = await project.save();

    res.json(
      successResponse(
        newProject,
        201,
        "Project added successfully."
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into adminController:addProjectInfo => ${error}`
    );
    next(error);
  }

};

const editProjectInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      projectName,
      client,
      startDate,
      endDate,
      priority,
      projectLeader,
      team,
      description,
      rate,
      status
    } = req.body;

    const user = req.user;
    const filenames = req.filenames; 

    const findProjectFile = await ProjectInfo.findById(id);
    if (!findProjectFile) {
      throw new Error(`Project not found`);
    }

    const updateData: any = {
      projectName,
      client,
      startDate,
      endDate,
      priority,
      projectLeader,
      team,
      description,
      rate,
      status
    };

    if (filenames) {
      const projectFileLink = `${process.env.APP_BASE_URL}/get/${user._id}/${filenames}`;

      if (findProjectFile.uploadFile) {
        const oldProjectFileName = findProjectFile.uploadFile.replace(
          `${process.env.APP_BASE_URL}/get/${user._id}/`,
          ""
        );

        const deleteProjectFilePath = path.join(
          __dirname,
          `../Uploads/${user._id}/${oldProjectFileName}`
        );

        if (fs.existsSync(deleteProjectFilePath)) {
          await deleteFile(deleteProjectFilePath);
        }
      }

      updateData.uploadFile = projectFileLink;
    } else {
      updateData.uploadFile = findProjectFile.uploadFile;
    }

    const editProjectInfo = await ProjectInfo.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!editProjectInfo) {
      throw new Error(`Project not found`);
    }

    res.json(
      successResponse(
        editProjectInfo,
        200,
        'Project Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editProjectInfo => ${error}`
    );
    next(error);
  }
};

const deleteProject = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.body; 
    const user = req.user;

    const findProjectFile = await ProjectInfo.findOne({_id:id});
    if (!findProjectFile) {
      throw new Error("Project file not found.");
    }

    if (findProjectFile.uploadFile) {
      const oldProjectFileName = findProjectFile.uploadFile.replace(
        `${process.env.APP_BASE_URL}/get/${user._id}/`,
        ""
      );
  
      const deleteProjectFilePath = path.join(
        __dirname,
        `../Uploads/${user._id}/${oldProjectFileName}`
      );

      if (fs.existsSync(deleteProjectFilePath)) {
        await deleteFile(deleteProjectFilePath);
      }
    }
    
    const deletedProject = await ProjectInfo.findByIdAndDelete(id);

    if (!deletedProject) {
      throw new Error("Project file not found.");
    }

    res.json({
      success: true,
      message: "Project delete successful",
      deletedProject: deletedProject
    });

  } catch (error) {
    console.log(`There was an issue in adminController:deleteProject => ${error}`);
    next(error);
  }
};

const addSalary = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      employeeId,
      salary,
      PF,
      TDS,
      bonus,
    } = req.body;

    const existingEmployee = await Model.findOne({ employeeId });
    if (!existingEmployee) {
      throw new Error("Employee with this Employee Id not found.");
    }

    const user = existingEmployee._id;

    const existingEmpSalary = await SalaryInfo.findOne({ employeeId });
    if (existingEmpSalary) {
      throw new Error("Already salary added with this Employee Id.");
    }

    const empSalary = new SalaryInfo({
      user,
      employeeId,
      salary,
      PF,
      TDS,
      bonus,
    });

    const newEmpSalary = await empSalary.save();

    res.json(
      successResponse(
        newEmpSalary,
        201,
        'Salary added successfully.'
      )
    );

  } catch (error) {
    console.log(
      `There was an issue into adminController:addSalary => ${error}`
    );
    next(error);
  }
};

const editSalaryInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      employeeId,
      salary,
      PF,
      TDS,
      bonus,
    } = req.body;

    const updateData: any = {
      salary,
      PF,
      TDS,
      bonus,
    };

    const editSalaryInfo = await SalaryInfo.findOneAndUpdate(
      {employeeId},
      updateData,
      { new: true, runValidators: true }
    );


    if (!editSalaryInfo) {
      throw new Error(`Employee with this Employee Id not found.`);
    }

    res.json(
      successResponse(
        editSalaryInfo,
        200,
        'Salary Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editSalaryInfo => ${error}`
    );
    next(error);
  }
};

const getAllEmpSalary = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await SalaryInfo.find().populate({
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
        'All Employee Salary Retrive Successsfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllEmpSalary => ${error}`
    );
    next(error);
  }
};

const deleteEmpSalary = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { employeeId } = req.body; 

      const deleteEmpSalary = await SalaryInfo.findOneAndDelete(employeeId);

    res.json(successResponse({ deleteEmpSalary }, 200, "Employee Salary delete successful"));
  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteEmpSalary => ${error}`
    );
    next(error);
  }
};

const addTrainingType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      type,
      description,
      status
    } = req.body;

    const existingTraining = await TrainingTypeInfo.findOne({ type });
    if (existingTraining) {
      throw new Error("Training Type already available.");
    }

    const training = new TrainingTypeInfo({
      type,
      description,
      status
    });

    const newTraining = await training.save();

    res.json(
      successResponse(
        newTraining,
        201,
        'New Training Type Added SuccessFully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:addTrainingType => ${error}`
    );
    next(error);
  }
};

const editTrainingType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      type,
      description,
      status
    } = req.body;

    const updateData: any = {
      type,
      description,
      status
    };

    const editTrainingTypeInfo = await TrainingTypeInfo.findOneAndUpdate(
      {_id:id},
      updateData,
      { new: true, runValidators: true }
    );


    if (!editTrainingTypeInfo) {
      throw new Error(`Training Type with this Id not found.`);
    }

    res.json(
      successResponse(
        editTrainingTypeInfo,
        200,
        'Training Type Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editTrainingType => ${error}`
    );
    next(error);
  }
};

const deleteTrainingType = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { id } = req.body; 

      const deleteTrainingType = await TrainingTypeInfo.findOneAndDelete(id);

    res.json(successResponse({ deleteTrainingType }, 200, "Training Type Delete Successfully."));
  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteTrainingType => ${error}`
    );
    next(error);
  }
};

const addTrainer = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      role,
      email,
      mobileNo,
      status,
      description
    } = req.body;

    const existingTrainer = await TrainerInfo.findOne({ firstName,email });
    if (existingTrainer) {
      throw new Error("Trainer is already exists.");
    }

    const trainerId:any = await Model.findOne({ email:email });

    const trainer = new TrainerInfo({
      user:trainerId._id,
      firstName,
      lastName,
      role,
      email,
      mobileNo,
      status,
      description
    });

    const newTrainer = await trainer.save();

    res.json(
      successResponse(
        newTrainer,
        201,
        'New Trainer Added SuccessFully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:addTrainer => ${error}`
    );
    next(error);
  }
};

const editTrainer = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      id,
      firstName,
      lastName,
      role,
      email,
      mobileNo,
      status,
      description
    } = req.body;

    const updateData: any = {
      firstName,
      lastName,
      role,
      email,
      mobileNo,
      status,
      description
    };

    const editTrainerInfo = await TrainerInfo.findOneAndUpdate(
      {_id:id},
      updateData,
      { new: true, runValidators: true }
    );


    if (!editTrainerInfo) {
      throw new Error(`Trainer with this Id not found.`);
    }

    res.json(
      successResponse(
        editTrainerInfo,
        200,
        'Trainer Details Update Successfully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editTrainer => ${error}`
    );
    next(error);
  }
};

const deleteTrainer = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { id } = req.body; 

      const deleteTrainer = await TrainerInfo.findOneAndDelete(id);

    res.json(successResponse({ deleteTrainer }, 200, "Trainer Delete Successfully."));
  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteTrainer => ${error}`
    );
    next(error);
  }
};

const assignTraining = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      trainingType,
      trainer,
      employee,
      startDate,
      endDate,
      description,
      status
    } = req.body;

    const existingTrainee = await TraineeInfo.findOne({ employee,trainingType });
    if (existingTrainee) {
      throw new Error("This Training is already assigned to this employee.");
    }

    const trainingInfo = new TraineeInfo({
      trainingType,
      trainer,
      user:employee,
      startDate,
      endDate,
      description,
      status
    });

    const newTrainee:any = await trainingInfo.save();

    let training = await TrainingInfo.findOne({ trainingType, user:trainer });
        if (!training) {
            training = new TrainingInfo({
                trainingType,
                user:trainer,
                employees: [employee], 
            });
        } else {
            training.employees.push(employee);
        }

       await training.save();



    res.json(
      successResponse(
        newTrainee,
        201,
        'NewTrainee'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:assignTraining => ${error}`
    );
    next(error);
  }
};

const getAllTrainingInfo = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await TrainingInfo.find().populate([
      {
        path: 'user',
        select: '_id',
        populate: {
          path: 'profile',
          select: 'image',
        },
      },
      {
        path: 'employees',
        select: '_id',
        populate: {
          path: 'profile',
          select: 'image',
        },
      }
    ]);

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
      `There was an issue into adminController:getAllTrainingInfo => ${error}`
    );
    next(error);
  }
};

const editTrainee = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      employee,
      trainingType,
      trainer,
      startDate,
      endDate,
      description,
      status
    } = req.body;

    const updateData: any = {
      trainingType,
      trainer,
      startDate,
      endDate,
      description,
      status
    };

    const editTraineeInfo = await TraineeInfo.findOneAndUpdate(
      {user:employee},
      updateData,
      { new: true, runValidators: true }
    );


    if (!editTraineeInfo) {
      throw new Error(`Trainee with this Id not found.`);
    }

    res.json(
      successResponse(
        editTraineeInfo,
        200,
        'Trainee Details Update Successfully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editTrainee => ${error}`
    );
    next(error);
  }
};

const deleteTrainee = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
      const { id } = req.body; 

      const deleteTrainer = await TraineeInfo.findOneAndDelete({user:id});

      if (!deleteTrainer) {
        throw new Error("Trainee not found.");
      }
  
      const updateTraining = await TrainingInfo.updateMany(
        { employees: id },
        { $pull: { employees: id } }
      );
  
      res.json(
        successResponse(
           deleteTrainer,
          200,
          "Trainer Delete Successfully."
        )
      );

  } catch (error) {
    console.log(
      `There was an issue into adminController:deleteTrainee => ${error}`
    );
    next(error);
  }
};

const addPromotion = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      employee,
      department,
      designationFrom,
      designationTo,
      promotionDate,
    } = req.body;

    const existingPromotion = await PromotionInfo.findOne({ user:employee, department, designationFrom });
    if (existingPromotion) {
      throw new Error("Promotion is already exists.");
    }

    const promotion = new PromotionInfo({
      user:employee,
      department,
      designationFrom,
      designationTo,
      promotionDate,
    });

    const newPromotion = await promotion.save();

    const updateData: any = {
      department,
      designation:designationTo
    };


    await Model.findOneAndUpdate(
      {_id:employee},
      updateData,
      { new: true, runValidators: true }
    );


    res.json(
      successResponse(
        newPromotion,
        201,
        'New Promotion Added SuccessFully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:addPromotion => ${error}`
    );
    next(error);
  }
};

const editPromotion = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      employee,
      department,
      designationTo,
      promotionDate,
    } = req.body;

    const updateData: any = {
      department,
      designationTo,
      promotionDate,
    };

    const editPromotionInfo = await PromotionInfo.findOneAndUpdate(
      {user:employee},
      updateData,
      { new: true, runValidators: true }
    );


    if (!editPromotionInfo) {
      throw new Error(`Trainee with this Id not found.`);
    }

    const update: any = {
      department,
      designation:designationTo
    };


    await Model.findOneAndUpdate(
      {_id:employee},
      update,
      { new: true, runValidators: true }
    );

    res.json(
      successResponse(
        editPromotionInfo,
        200,
        'Promotion Details Update Successfully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editPromotion => ${error}`
    );
    next(error);
  }
};

const addAsset = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      assetName,
      purchaseDate,
      purchaseFrom,
      manufacturer,
      modelName,
      serialNumber,
      supplier,
      condition,
      warranty,
      value,
      assetUser,
      description,
      status,
    } = req.body;

    const user = req.user;

    const filename = req.filenames;

    const fileLinks = `${process.env.APP_BASE_URL}/get/${user._id}/${filename}`


    const existingAsset = await AssetInfo.findOne({ modelName });
    if (existingAsset) {
      throw new Error("Asset is already exists.");
    }

    const asset = new AssetInfo({
      assetName,
      purchaseDate,
      purchaseFrom,
      manufacturer,
      modelName,
      serialNumber,
      supplier,
      condition,
      warranty,
      value,
      assetUser,
      description,
      status,
      document:fileLinks,
    });

    const newAsset = await asset.save();


    res.json(
      successResponse(
        newAsset,
        201,
        'New Asset Added SuccessFully.'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:addAsset => ${error}`
    );
    next(error);
  }
};

const editAsset = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      assetId,
      assetName,
      purchaseDate,
      purchaseFrom,
      manufacturer,
      modelName,
      serialNumber,
      supplier,
      condition,
      warranty,
      value,
      assetUser,
      description,
      status,
    } = req.body;

    const user = req.user;
    const filename = req.filenames; 

    const findAsset = await AssetInfo.findOne({ assetId });
    if (!findAsset) {
      throw new Error(`Asset not found with this Asset Id.`);
    }

    const updateData: any = {
      assetName,
      purchaseDate,
      purchaseFrom,
      manufacturer,
      modelName,
      serialNumber,
      supplier,
      condition,
      warranty,
      value,
      assetUser,
      description,
      status,
    };

    if (filename) {
      const fileLinks = `${process.env.APP_BASE_URL}/get/${user._id}/${filename}`;

      if (findAsset.document) {
        const oldDocumentName = findAsset.document.replace(
          `${process.env.APP_BASE_URL}/get/${user._id}/`,
          ""
        );

        const deleteDocumentPath = path.join(
          __dirname,
          `../Uploads/${user._id}/${oldDocumentName}`
        );

        if (fs.existsSync(deleteDocumentPath)) {
          await deleteFile(deleteDocumentPath);
        }
      }

      updateData.document = fileLinks;
    } else {
      updateData.document = findAsset.document;
    }

    const editAssetInfo = await AssetInfo.findOneAndUpdate(
      { assetId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!editAssetInfo) {
      throw new Error(`Asset not found with this Asset Id.`);
    }

    res.json(
      successResponse(
        editAssetInfo,
        200,
        'Asset Details updated successfully'
      )
    );


  } catch (error) {
    console.log(
      `There was an issue into adminController:editAsset => ${error}`
    );
    next(error);
  }
};

const deleteAsset = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { id } = req.body; 
    const user = req.user;

    const findDocumentFile = await AssetInfo.findOne({assetId:id});
    if (!findDocumentFile) {
      throw new Error("Asset Not Found.");
    }

    if (findDocumentFile.document) {
      const oldDocumentName = findDocumentFile.document.replace(
        `${process.env.APP_BASE_URL}/get/${user._id}/`,
        ""
      );
  
      const deleteDocumentPath = path.join(
        __dirname,
        `../Uploads/${user._id}/${oldDocumentName}`
      );

      if (fs.existsSync(deleteDocumentPath)) {
        await deleteFile(deleteDocumentPath);
      }
    }
    
    const deletedAsset = await AssetInfo.findOneAndDelete({assetId:id});

    if (!deletedAsset) {
      throw new Error("Asset not found.");
    }

    res.json(
      successResponse(
        deletedAsset,
        200,
        'Asset Deleted Successfully.'
      )
    );
    
  } catch (error) {
    console.log(`There was an issue in adminController:deleteAsset => ${error}`);
    next(error);
  }
};

const getAllAssets = async (
  req: any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    
    const records = await AssetInfo.find();

    if(!records){
      throw new Error(`Asset Not Found.`);
    }

    res.json(
      successResponse(
        records,
        200,
        'All Asset Retrive successfully.'
      )
    );

    
  } catch (error) {
    console.log(
      `There was an issue into adminController:getAllAssets => ${error}`
    );
    next(error);
  }
};

export default{
    addEmployee,
    editEmployee,
    deleteEmployee,
    addHoliday,
    editHolidays,
    deleteHoliday,
    addDepartment,
    editDepartment,
    deleteDepartment,
    addDesignation,
    editDesignation,
    deleteDesignation,
    editLeaveStatus,
    getAttendanceInfo,
    addClientInfo,
    editClientInfo,
    deleteClient,
    getAllClient,
    getClient,
    addProjectInfo,
    editProjectInfo,
    deleteProject,
    addSalary,
    editSalaryInfo,
    getAllEmpSalary,
    deleteEmpSalary,
    addTrainingType,
    editTrainingType,
    deleteTrainingType,
    addTrainer,
    editTrainer,
    deleteTrainer,
    assignTraining,
    getAllTrainingInfo,
    editTrainee,
    deleteTrainee,
    addPromotion,
    editPromotion,
    addAsset,
    editAsset,
    deleteAsset,
    getAllAssets
}


