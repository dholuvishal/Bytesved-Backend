import { Router, Request, Response } from "express";
const router: Router = Router();
import employeeController from "../Controllers/employeeController";
import requestBodyMiddleware from "../Middlewares/reqBodyMiddleware";
import validationSchemas from "../Validation/employeeValidation";
import requestParamsMiddleware from "../Middlewares/reqParamsMiddleware";
import multerConfig from "../Config/multerConfig";
import auth from "../Middlewares/authMiddleware";

router.post("/login", 
    requestBodyMiddleware(validationSchemas.loginValidation),
    employeeController.login
);

router.post(
    "/create-profile",
    auth.verifyToken,
    multerConfig.uploadImage.single("image"),
    requestBodyMiddleware(validationSchemas.profileValidation),
    employeeController.createEmpProfile
  );

router.get(
    "/get-profile",
    auth.verifyToken,
    employeeController.getEmpProfile
);

router.patch(
    "/update-profile",
    auth.verifyToken,
    requestBodyMiddleware(validationSchemas.updateProfileValidation),
    employeeController.updateEmpProfile
  );

  router.patch(
    "/update-profilePic",
    auth.verifyToken,
    multerConfig.uploadImage.single("image"),
    employeeController.updateEmpProfilePic
  );

  router.delete(
    "/delete-profile",
    auth.verifyToken,
    employeeController.deleteEmpProfile
  );

  router.post(
    "/add-personalinfo",
    auth.verifyToken,
    requestBodyMiddleware(validationSchemas.empPersonalInformationValidation),
    employeeController.addPersonalInfo
  );

  router.get(
    "/get-personalinfo",
    auth.verifyToken,
    employeeController.getPersonalInfo
);

router.patch(
  "/update-personalinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updatePersonalInformationValidation),
  employeeController.updatePersonalInfo
);

router.delete(
  "/delete-personalinfo",
  auth.verifyToken,
  employeeController.deletePersonalInfo
);

router.post(
  "/add-bankinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.bankInfoValidation),
  employeeController.addBankInfo
);

router.get(
  "/get-bankinfo",
  auth.verifyToken,
  employeeController.getBankInfo
);

router.patch(
  "/update-bankinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updateBankInfoValidation),
  employeeController.updateBankInfo
);

router.delete(
  "/delete-bankinfo",
  auth.verifyToken,
  employeeController.deleteBankInfo
);

router.post(
  "/add-educationinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.educationInfoValidation),
  employeeController.addEducationInfo
);

router.get(
  "/get-educationinfo",
  auth.verifyToken,
  employeeController.getEducationInfo
);

router.patch(
  "/update-educationinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updateEducationInfoValidation),
  employeeController.updateEducationInfo
);

router.delete(
  "/delete-educationinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.deleteEducationInfo
);

router.post(
  "/add-contactsinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.emergencyContactValidation),
  employeeController.addContactsInfo
);

router.get(
  "/get-contactinfo",
  auth.verifyToken,
  employeeController.getContactsInfo
);

router.patch(
  "/update-contactsinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updateEmergencyContactValidation),
  employeeController.updateContactsInfo
);

router.delete(
  "/delete-contactsinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.deleteContactsInfo
);

router.post(
  "/add-familyinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.familyInfoValidation),
  employeeController.addFamilyInfo
);

router.get(
  "/get-familyinfo",
  auth.verifyToken,
  employeeController.getFamilyInfo
);

router.patch(
  "/update-familyinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updateFamilyInfoValidation),
  employeeController.updateFamilyInfo
);

router.delete(
  "/delete-familyinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.deleteFamilyInfo
);

router.post(
  "/add-experienceinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.experienceInfoValidation),
  employeeController.addExperienceInfo
);

router.get(
  "/get-experienceinfo",
  auth.verifyToken,
  employeeController.getExperienceInfo
);

router.patch(
  "/update-experienceinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.updateExperienceInfoValidation),
  employeeController.updateExperienceInfo
);

router.delete(
  "/delete-experienceinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.deleteExperienceInfo
);

router.get(
  "/get-holiday",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.getHoliday
);

router.get(
  "/get-allholidays",
  employeeController.getAllHolidays
);

router.get(
  "/get-employee",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.getEmployee
);

router.get(
  "/get-allemployees",
  employeeController.getAllEmployees
);

router.get(
  "/get-department",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.getDepartment
);

router.get(
  "/get-alldepartment",
  employeeController.getAllDepartments
);

router.get(
  "/get-designation",
  requestBodyMiddleware(validationSchemas.getDesignationValidation),
  employeeController.getAllDesignations
);

router.post(
  "/add-punchininfo",
  auth.verifyToken,
  employeeController.punchIn
);

router.patch(
  "/add-punchoutinfo",
  auth.verifyToken,
  employeeController.punchOut
);

router.post(
  "/add-breakininfo",
  auth.verifyToken,
  employeeController.breakIn
);

router.patch(
  "/add-breakoutinfo",
  auth.verifyToken,
  employeeController.breakOut
);

router.post(
  "/add-leaveinfo",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addLeaveInfoValidation),
  employeeController.addLeave
);

router.get(
  "/get-empattendance",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.getAttendanceValidation),
  employeeController.getEmpAttendanceInfo
);

router.get(
  "/get-allproject",
  auth.verifyToken,
  employeeController.getAllProject
);

router.get(
  "/get-project",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.getProject
);

router.get(
  "/get-clientproject",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.getClientProject
);

router.post(
  "/add-timesheet",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addTimeSheetValidation),
  employeeController.addTimeSheet
);

router.get(
  "/get-emptotalhours",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.getEmpTotalHoursValidation),
  employeeController.getEmpTotalHours
);

router.get(
  "/get-projecttotalhours",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.getProjectTotalHoursValidation),
  employeeController.getProjectTotalHours
);

router.patch(
  "/edit-timesheet",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.editTimeSheetValidation),
  employeeController.editTimeSheet
);

router.delete(
  "/delete-timesheet",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  employeeController.deleteTimeSheet
);

router.get(
  "/get-alltimesheet",
  auth.verifyToken,
  employeeController.getAllTimeSheet
);

router.get(
  "/get-salary",
  auth.verifyToken,
  employeeController.getEmpSalary
);

router.get(
  "/get-totalattendance",
  auth.verifyToken,
  employeeController.getTotalAttendance
);

router.get(
  "/get-monthsalaryslip",
  auth.verifyToken,
  employeeController.getMonthSalarySlip
);

router.get(
    "/get-salaryslip",
    auth.verifyToken,
    employeeController.getSalarySlip
  );

  router.get(
    "/get-alltrainingtype",
    auth.verifyToken,
    employeeController.getAllTrainingType
  );

  router.get(
    "/get-alltrainer",
    auth.verifyToken,
    employeeController.getAllTrainer
  );

  router.get(
    "/get-trainer",
    auth.verifyToken,
    employeeController.getTrainer
  );

  router.get(
    "/get-trainee",
    auth.verifyToken,
    employeeController.getTrainee
  );

  router.get(
    "/get-allpromotion",
    auth.verifyToken,
    employeeController.getAllPromotionInfo
  );

export default router;
