
import nodemailer from 'nodemailer';
import { envConfig } from '../config/config';

interface ImailInformation{
    to:string,
    from:string,
    subject:string,
    html:string
}

const sendMail=async(mailInformation:ImailInformation)=>{
    const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:envConfig.gmailUser,
        pass:envConfig.gmailPass
    }
})
//mail format onbject useer define
const mailFormat={
    from:mailInformation.from,
    to:mailInformation.to,
    subject:mailInformation.subject,
    html:mailInformation.html
}
//send mail
try{
    transporter.sendMail(mailFormat)
}catch(e){
    console.log((e))
}
}

export default sendMail