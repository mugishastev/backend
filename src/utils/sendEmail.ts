import nodemailer from 'nodemailer';
import { Transporter, SendMailOptions } from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const Transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.APP_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
  tls: { rejectUnauthorized: false
  },
}); 

const mailerSender = async (
    to : string,
    subject : string,
    htmlcontent : string,
):(Promise<boolean>) => {

 try {
    const mailOptions: SendMailOptions = {
      from: process.env.APP_EMAIL,
      to,
      subject,
      html: htmlcontent,
    };
    await Transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return true;
 } catch (error) {
    console.error('Error sending email:', error);
    return false;
    }
    
 } ;



export default mailerSender;

