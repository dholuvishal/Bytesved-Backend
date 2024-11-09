import { Router, Request, Response } from "express";
const router: Router = Router();
import requestBodyMiddleware from "../Middlewares/reqBodyMiddleware";
import validationSchemas from "../Validation/adminValidation";
import multerConfig from "../Config/multerConfig";
import auth from "../Middlewares/authMiddleware";
import adminController from "../Controllers/adminController";
import { ROLES } from "../Config/constant";



router.post(
    "/add-employee",
    requestBodyMiddleware(validationSchemas.addEmployeeValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.addEmployee
);

router.patch(
    "/update-employee",
    requestBodyMiddleware(validationSchemas.editEmployeeValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.editEmployee
);

router.delete(
    "/delete-employee",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteEmployee
);

router.post(
    "/add-holiday",
    requestBodyMiddleware(validationSchemas.addHolidayValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.addHoliday
);


router.patch(
    "/edit-holiday",
    requestBodyMiddleware(validationSchemas.editHolidayValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.editHolidays
);

router.delete(
    "/delete-holiday",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteHoliday
);

router.post(
    "/add-department",
    requestBodyMiddleware(validationSchemas.addDepartmentValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.addDepartment
);

router.patch(
    "/edit-department",
    requestBodyMiddleware(validationSchemas.editDepartmentValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.editDepartment
);

router.delete(
    "/delete-department",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteDepartment
);

router.post(
    "/add-designation",
    requestBodyMiddleware(validationSchemas.addDesignationValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.addDesignation
);

router.patch(
    "/edit-designation",
    requestBodyMiddleware(validationSchemas.editDesignationValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.editDesignation
);

router.delete(
    "/delete-designation",
    requestBodyMiddleware(validationSchemas.deleteDesignationValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteDesignation
);

router.patch(
    "/edit-leavestatus",
    requestBodyMiddleware(validationSchemas.editLeaveStatusValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.editLeaveStatus
);

router.get(
    "/get-attendance",
    requestBodyMiddleware(validationSchemas.getAttendanceValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.getAttendanceInfo
  );

  router.post(
    "/add-client",
    requestBodyMiddleware(validationSchemas.addClientValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.addClientInfo
  );

  router.patch(
    "/edit-client",
    requestBodyMiddleware(validationSchemas.editClientValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.editClientInfo
  );

  router.delete(
    "/delete-client",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteClient
);

router.get(
    "/get-allclient",
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.getAllClient
  );

  router.get(
    "/get-client",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.getClient
  );

  router.post(
    "/add-project",
    auth.verifyToken,
    multerConfig.uploadFile.single("uploadFile"),
    requestBodyMiddleware(validationSchemas.addProjectValidation),
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.addProjectInfo
  );

  router.patch(
    "/edit-project",
    auth.verifyToken,
    multerConfig.uploadFile.single("uploadFile"),
    requestBodyMiddleware(validationSchemas.editProjectValidation),
    auth.checkRole([ROLES.ADMIN]),
    adminController.editProjectInfo
  );

  router.delete(
    "/delete-project",
    requestBodyMiddleware(validationSchemas.recordIdValidation),
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN]),
    adminController.deleteProject
);

router.post(
    "/add-salary",
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.addSalary
  );

router.patch(
    "/edit-salary",
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.editSalaryInfo
);

router.get(
    "/get-allempsalary",
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.getAllEmpSalary
  );

  router.delete(
    "/delete-empsalary",
    auth.verifyToken,
    auth.checkRole([ROLES.ADMIN,ROLES.HR]),
    adminController.deleteEmpSalary
);

router.post(
  "/add-trainingtype",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addTrainingTypeValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.addTrainingType
);

router.patch(
  "/edit-trainingtype",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.editTrainingTypeValidation),
  auth.checkRole([ROLES.ADMIN]),
  adminController.editTrainingType
);

router.delete(
  "/delete-trainingtype",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  auth.verifyToken,
  auth.checkRole([ROLES.ADMIN]),
  adminController.deleteTrainingType
);

router.post(
  "/add-trainer",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addTrainerValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.addTrainer
);

router.patch(
  "/edit-trainer",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.editTrainerValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.editTrainer
);

router.delete(
  "/delete-trainer",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  auth.verifyToken,
  auth.checkRole([ROLES.ADMIN]),
  adminController.deleteTrainer
);

router.post(
  "/assign-training",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addTrainingValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.assignTraining
);

router.get(
  "/get-traininginformation",
  auth.verifyToken,
  adminController.getAllTrainingInfo
);

router.patch(
  "/edit-trainee",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.editTraineeValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.editTrainee
);

router.delete(
  "/delete-trainee",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  auth.verifyToken,
  auth.checkRole([ROLES.ADMIN]),
  adminController.deleteTrainee
);

router.post(
  "/add-promotion",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.addPromotionValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.addPromotion
);

router.patch(
  "/edit-promotion",
  auth.verifyToken,
  requestBodyMiddleware(validationSchemas.editPromotionValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.editPromotion
);

router.post(
  "/add-asset",
  auth.verifyToken,
  multerConfig.document.single("document"),
  requestBodyMiddleware(validationSchemas.addAssetValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.addAsset
);

router.patch(
  "/edit-asset",
  auth.verifyToken,
  multerConfig.document.single("document"),
  requestBodyMiddleware(validationSchemas.ediAssetValidation),
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.editAsset
);

router.delete(
  "/delete-asset",
  requestBodyMiddleware(validationSchemas.recordIdValidation),
  auth.verifyToken,
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.deleteAsset
);

router.get(
  "/get-assetinformation",
  auth.verifyToken,
  auth.checkRole([ROLES.ADMIN,ROLES.HR]),
  adminController.getAllAssets
);

export default router;