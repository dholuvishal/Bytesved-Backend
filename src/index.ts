import express,{Request, Response, NextFunction}  from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./Config/connectDB"
import router from "./Routes/index";
import * as path from 'path';
import cron from 'node-cron';
import { addQuaternaryLeave, calculateEncashmentDays, monthlyPaidLeave, monthlyPaidSalary } from "./cronjobs/cronfunction"

const app = express();
const port = process.env.PORT || 8001;
const url = process.env.DATABASE_URL as string;
app.use(cors());
app.use(express.json());

connectDB(url);

app.use("/",router);
app.use("/get", express.static(path.join(__dirname, "/Uploads")));

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error(`Can't find ${req.originalUrl} on the server.`);
    err.status = "Fail to load..";
    err.statusCode = 404;
    next(err);
  });
  
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    error.statusCode = error.statusCode || 400;
    error.status = error.status || "Error";
    res.status(error.statusCode).json({
      success: false,
      status: error.statusCode,
      message: error.message,
    });
  });

app.listen(port, () => {
    console.log(`connection created successfully on post: ${port}`);
})

// Define a cron job that runs every three months
cron.schedule('0 0 1 1,4,7,10 *', async () => {
  try {
    await addQuaternaryLeave();
    console.log('Cron job executed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
},{
  scheduled: true,
  timezone: 'Asia/Kolkata'
});


// Define a cron job that runs 31 march of every year
cron.schedule('0 0 31 3 *', async () => {
  try {
    await calculateEncashmentDays()
    console.log('Cron job executed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Adjust timezone as per your requirement
});


// This function will be called on the last day of every month at midnight (00:00:00)
cron.schedule('0 0 28-31 * *', async () => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Calculate the last day of the current month
    const lastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();

    // Schedule the cron job to run on the last day of the current month at midnight (00:00:00)
    if (currentDate.getDate() === lastDayOfMonth) {
      await monthlyPaidLeave();
      console.log('Cron job executed successfully.');
    }
  } catch (error) {
    console.error('Error in cron job:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata'
});



cron.schedule('0 0 1 * *', async () => { // Run at 00:00 on the 1st day of every month
  try {
    await monthlyPaidSalary();
    console.log('Cron job executed successfully.');
  } catch (error) {
    console.error('Error in cron job:', error);
  }
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata' // Adjust timezone as per your requirement
});


