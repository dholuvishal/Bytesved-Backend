import Model from "../Models/employeeModel";
import LeaveSettingInfo from "../Models/leaveSettingInfoModel";
import SalaryInfo, { SalaryInfoInterface } from "../Models/salaryInfoModel";
import { ATTENDANCE, JWT_EXPIRATION } from "../Config/constant";
import isSameHoliday from "../Utils/sameDayFunction";
import HolidayInfo, { HolidayInterface } from "../Models/holidayModel";
import AttendanceInfo, { AttendanceInfoInterface } from "../Models/attendanceInfoModel";
import MonthlySalaryInfo, { MonthlySalaryInfoInterface } from "../Models/monthlySalaryInfoModel";
import crypto from "crypto";

export const addQuaternaryLeave = async (): Promise<void> => {
    try {
        const employees = await Model.find({});

        const quaternaryLeaveToAdd = 3;

        for (const employee of employees) {
            if (employee.jobPeriod === 'ProbationPeriod') {
                console.log(`Skipping employee ${employee.firstName} ${employee.lastName} due to ProbationPeriod job period.`);
                continue;
            }

            let leaveSetting = await LeaveSettingInfo.findOne({ user: employee._id });

            if (leaveSetting) {
                leaveSetting.quaternaryLeave += quaternaryLeaveToAdd;
                await leaveSetting.save();
                // console.log(`Updated quaternaryLeave for employee ${employee.firstName} ${employee.lastName}: ${leaveSetting.quaternaryLeave}`);
            } else {
                leaveSetting = new LeaveSettingInfo({
                    user: employee._id,
                    quaternaryLeave: quaternaryLeaveToAdd,
                    paidLeave: 0, 
                });
                await leaveSetting.save();
                // console.log(`Added ${quaternaryLeaveToAdd} quaternaryLeave for employee ${employee.firstName} ${employee.lastName}`);
            }
        }
    } catch (error) {
        console.log(
            `There was an issue into employeeController:addQuaternaryLeave => ${error}`
        );
        throw error;
    }
};


export const calculateEncashmentDays = async (): Promise<void> => {
    try {
        const employees = await Model.find({});

        for (const employee of employees) {

            let leaveSetting = await LeaveSettingInfo.findOne({ user: employee._id });

            if (leaveSetting) {
                if(leaveSetting.quaternaryLeave > 0){
                    leaveSetting.encashmentDays = leaveSetting.quaternaryLeave;
                    leaveSetting.quaternaryLeave = 0;
                    await leaveSetting.save();
                }
                
            }
        }
    } catch (error) {
        console.log(
            `There was an issue into employeeController:calculateEncashmentDays => ${error}`
        );
        throw error;
    }
};


export const monthlyPaidLeave = async (): Promise<void> => {
    try {
        const employees = await Model.find({});

        for (const employee of employees) {

            let leaveSetting = await LeaveSettingInfo.findOne({ user: employee._id });

            if (leaveSetting) {
                if(leaveSetting.paidLeave > 0){
                    leaveSetting.totalPaidLeave = leaveSetting.paidLeave;
                    leaveSetting.paidLeave = 0;
                    await leaveSetting.save();
                }
                
            }
        }
    } catch (error) {
        console.log(
            `There was an issue into employeeController:monthlyPaidLeave => ${error}`
        );
        throw error;
    }
};


export const monthlyPaidSalary = async (): Promise<void> => {
  try {

    const currentDate = new Date();

    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear(); 

    let parsedMonth;
    let parsedYear;

    if (currentMonth === 1) {
       parsedMonth = 12; 
       parsedYear = currentYear - 1; 
    } else {
      parsedMonth = currentMonth - 1; 
      parsedYear = currentYear; 
    }



    const numDaysInMonth = new Date(parsedYear, parsedMonth, 0).getDate();

    const holidays: HolidayInterface[] = await HolidayInfo.find({
      holidayDate: {
        $gte: new Date(parsedYear, parsedMonth - 1, 1), 
        $lte: new Date(parsedYear, parsedMonth - 1, numDaysInMonth), 
      },
    });

    const holidayDates: Date[] = holidays.map(holiday => holiday.holidayDate);

    let workingDays = 0;

    for (let day = 1; day <= numDaysInMonth; day++) {
      const date = new Date(parsedYear, parsedMonth - 1, day); 

      if (date.getDay() !== 0 && date.getDay() !== 6) {
        if (!holidayDates.some(holidayDate => isSameHoliday(holidayDate, date))) {
          workingDays++;
        }
      }
    }

    const employees = await Model.find({});

    for (const employee of employees) {

        let employeeId = await SalaryInfo.findOne({ employeeId:employee.employeeId });

        const user = employee._id;

        if(!employeeId){
            console.log("not salary of this employee with this employee Id",employeeId)
            continue;
          }

        let monthlySalary:any = employeeId?.salary;

        let empId = employeeId?.employeeId;

        let oneDaySalary = monthlySalary/workingDays;

        const attendanceRecords = await AttendanceInfo.find({
          user: employee._id, 
          attendance: ATTENDANCE.TRUE, 
        });
        
        let totalAttendance = 0;
    
        attendanceRecords.forEach((record) => {
    
          if (record.presentDate instanceof Date && !isNaN(record.presentDate.getTime())) {
            const dateObject = new Date(record.presentDate);
            const recordMonth = dateObject.getUTCMonth() + 1; 
            const recordYear = dateObject.getUTCFullYear();
    
            if (recordMonth === parsedMonth && recordYear === parsedYear) {
              if (record.halfLeave) {
                totalAttendance += 0.5;
              } else {
                totalAttendance += 1;
              }
            }
          }
        });

        let totalLeave = 0;

        totalLeave = workingDays - totalAttendance;

        const paidLeaveData = await LeaveSettingInfo.findOne({ user: employee._id, });

        let paidLeave:any = paidLeaveData?.totalPaidLeave;

        let encashmentDays:any = paidLeaveData?.encashmentDays;

        let encashmentPayment:any = oneDaySalary * encashmentDays;

         const unpaidLeave = totalLeave - paidLeave;

         const totalWorkingdays = totalAttendance + unpaidLeave;

         const totalWorkingDaysPayment = totalWorkingdays * oneDaySalary;

         let totalPayment = totalWorkingDaysPayment + encashmentPayment;

         let roundedTotalPayment = Math.floor(totalPayment);

         function generatePaySlipId() {
            const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const numChars = '0123456789';
      
            function getRandomChar(charSet: string | any[]) {
              const randomIndex = crypto.randomInt(0, charSet.length);
              return charSet[randomIndex];
            }
      
            let id = '';
            for (let i = 0; i < 3; i++) {
              id += getRandomChar(alphaChars);
            }
            for (let i = 0; i < 3; i++) {
              id += getRandomChar(numChars);
            }
      
            return id;
        }
      
        let paySlipId = generatePaySlipId();

         const empmonthlySalary = new MonthlySalaryInfo({
          user,
          month:parsedMonth,
          year:parsedYear,
          employeeId:empId,
          encashment:encashmentPayment,
          workingDays:totalWorkingdays,
          oneDaySalary:oneDaySalary,
          paidLeave:paidLeave,
          unPaidLeave:unpaidLeave,
          paybleSalary:roundedTotalPayment,
          paySlipId:paySlipId,
        });
    
        const newEmpSalary = await empmonthlySalary.save();

        console.log("newEmpSalary",newEmpSalary)
      }

        
    } catch (error) {
        console.log(
            `There was an issue into employeeController:monthlyPaidSalary => ${error}`
        );
        throw error;
    }
};