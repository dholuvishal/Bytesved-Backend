import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import { errorResponse } from "../Utils/responseMessages";
import Model  from "../Models/employeeModel";

dotenv.config();

const addEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let loginToken:any = req.headers["authorization"];

    if (!loginToken || !loginToken.startsWith('Bearer ')) {
        res.json(
          errorResponse(
            "Authentication Required, please provide a valid login token."
          )
        );
      }
    loginToken = loginToken.split(" ")[1]

    const employeeId = await Jwt.verify(loginToken,process.env.JWT_SECRET_KEY as string) as JwtPayload

    const employee = await Model.findOne({_id: employeeId.userId})

    if(!employee){
        throw new Error("User Not Found, Please Register to Access this Service")
    }
    next();

  } catch (error) {
    console.log("Oops, there was an issue with login token verification. " + error);
    next(error);
  }
};

export default addEmployee;
