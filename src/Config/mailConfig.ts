import nodemailer from "nodemailer";

interface MailOptions {
  from: string;
  to: string[];
  subject: string;
  html: string; 
}

const leaveInfoMail = async (
  sender: string,
  senderName: string,
  receivers: string[],
  leaveStatus: string,
  leaveInfo?: any,
  userName?: string
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, 
      auth: {
        user: process.env.SENDER_EMAIL as string,
        pass: process.env.PASSWORD as string,
      },
    });

    let messageContent = "";
    if (leaveStatus === "Approved") {
      messageContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Leave Request Approved</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Dear Team,<br><br>
            This is to inform you that <strong>${userName}</strong> has requested leave for the following dates:
          </p>
          <ul style="list-style-type: none; padding-left: 0; margin-top: 15px;">
            <li style="font-size: 16px; color:black"><strong>From:</strong> ${new Date(leaveInfo.from).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>To:</strong> ${new Date(leaveInfo.to).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>Total Days:</strong> ${leaveInfo.totalDays}</li>
            <li style="font-size: 16px; color:black"><strong>Leave Reason:</strong> ${leaveInfo.leaveReason}</li>
          </ul>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            We have reviewed the request, and I am pleased to inform you that it has been approved.<br><br>
            <strong>Leave Status:</strong> Approved by ${senderName}<br><br>
            Please adjust schedules and responsibilities accordingly during ${userName}'s absence.<br>
            If you have any questions or concerns, feel free to reach out.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Best regards,<br>
            ${senderName}<br>
          </p>
        </div>
      `;
    } else if (leaveStatus === "Declined") {
      messageContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Leave Request Rejected</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Dear Team,<br><br>
            This is to inform you that <strong>${userName}</strong> has requested leave for the following dates:
          </p>
          <ul style="list-style-type: none; padding-left: 0; margin-top: 15px;">
            <li style="font-size: 16px; color:black"><strong>From:</strong> ${new Date(leaveInfo.from).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>To:</strong> ${new Date(leaveInfo.to).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>Total Days:</strong> ${leaveInfo.totalDays}</li>
            <li style="font-size: 16px; color:black"><strong>Leave Reason:</strong> ${leaveInfo.leaveReason}</li>
          </ul>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            We regret to inform you that the leave request could not be approved at this time.<br><br>
            Please ensure proper coverage during the specified dates.
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Best regards,<br>
            ${senderName}<br>
          </p>
        </div>
      `;
    } else if (leaveStatus === "Pending"){
      messageContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; border-radius: 5px;">
          <h2 style="color: #333; font-size: 18px; margin-bottom: 10px;">Leave Request Pending</h2>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Dear Admin and HR,<br><br>
            This is to inform you that <strong>${userName}</strong> has requested leave, which is currently pending approval. Below are the details of the request:
          </p>
          <ul style="list-style-type: none; padding-left: 0; margin-top: 15px;">
            <li style="font-size: 16px; color:black"><strong>From:</strong> ${new Date(leaveInfo.from).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>To:</strong> ${new Date(leaveInfo.to).toDateString()}</li>
            <li style="font-size: 16px; color:black"><strong>Total Days:</strong> ${leaveInfo.totalDays}</li>
            <li style="font-size: 16px; color:black"><strong>Leave Reason:</strong> ${leaveInfo.leaveReason}</li>
          </ul>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
           Please review the request at your earliest convenience. 
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.5;">
            Best regards,<br>
            ${senderName}<br>
          </p>
        </div>
      `;
    }

    const mailOptions: MailOptions = {
      from: sender,
      to: receivers,
      subject: `${leaveStatus} Leave Request for ${userName}`,
      html: messageContent, 
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to: ", receivers);
  } catch (error) {
    console.log("Oops, there was an error sending the email: ", error);
    throw error; 
  }
};

export default leaveInfoMail;