import express, { Router } from "express";
const router: Router = express.Router();
import routeEmployee from "./employee.routes";
import routeAdmin from "./admin.routes";

router.get("/", (req, res) => {
    res.status(200).send("Hello! This is the home page of Get Spouse App.");
  });

router.use("/employee", routeEmployee);
router.use("/admin",routeAdmin);

export default router;