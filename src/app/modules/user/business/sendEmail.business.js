// const { VerificationCode } = require("../models/card.model");
// const { ForgetPasswordCode } = require("../models/forgetPasswordCode.model");
const nodemailer = require("nodemailer");
const axios = require('axios');
// const { sendSms } = require("../../../util/sms")
// const { sendEmail } = require("../../SendGrid/business/sendGrid.business");
// const templates = require("../../sendgridTemplates.json");

generateRandomCode = () => Math.floor(Math.random() * 10000 + 4);


// const smtpTransport = nodemailer.createTransport({
//     host: process.env.SMTP_HOST,
//     port: 2525,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: process.env.SMTP_USER, // generated ethereal user
//         pass: process.env.SMTP_PASSWORD // generated ethereal password
//     }
// });

let verifyEmailCode = async (email, code, name) => {
    var verification = new VerificationCode({ code, email });
    let response = await verification.save();
    let link = `${process.env.baseUrl}user/verify?id=8277&email=${email}`
    // let html = `<h2>${code}</h2><a href="${process.env.emailVerifyBaseUrl}verify?id=${code}&email=${email}"> Click here to verify your account </a>`
    let html = `<div>
    <strong> Dear ${name} </strong>
    <p>Welcome to Healthy Bazar. With more than 35,000 products, the world of Healthy Bazar awaits you.</P>
    <p> To complete the registration process, please follow this link-</P>
    <p> https://www.healthybazaar.tk/api/user/verify?id=${code}&email=${email}</P>
    <p> This link is only valid for 24 hours.If click the link does not work, please copy and paste the URL into your browser instead.</p>
    <p> If you did not make this request, you can ignore this message and your password will remain the same.</p>
    </div>
    <a href="${process.env.baseUrl}user/verify?id=${code}&email=${email}"> Click here to Verify your account</a>`

    let subject = 'Please verify you email';
    // let sms = code;
    let sms = `Your OTP for account verification is ${code}`
    return { html, subject, sms };
};

let forgotPasswordCode = async (toEmail, code, name) => {
    var forgotCode = new ForgetPasswordCode({ code, email: toEmail, time: new Date() });
    let response = await forgotCode.save();
    // let html = `<h2>${code} <a href= "https://www.healthybazaar.tk/api/user/forget-password/verify?id=${code}&email=${email}"> Click here to change your password </a></h2>`
    // let html = `<div>
    // <strong> Dear ${name} </strong>
    // <p>There was recently a request to change the password for your account.</P>
    // <p>If you requested this password change, please click on the following link to reset your password:</P>
    // <p>Your secret OTP is <strong>${code}</strong></p> 
    // </div>`
    // <a href="https://www.healthybazaar.tk/api/user/forget-password/verify?id=${code}&email=${email}"> Click here to change your password</a>`
    let subject = 'Use given code to reset your password';
    // let sms = code;
    let sms = `Your OTP for change password is ${code}`
    return { code, type: { forgetPasswordCode: true }, subject, sms, name, toEmail };
};

let userAddedByAdmin = async (email, password) => {
    let html = `<h2>Login credentials, Email id "${email}" and its password is "${password}"</h2>`
    let subject = 'User Password';
    return { html, subject };
};

let emailObj = {
    verify: verifyEmailCode,
    forgotPassword: forgotPasswordCode,
    resendVerificationCode: forgotPasswordCode,
    userAddedByAdmin: userAddedByAdmin,
};

let sendMail = async (data) => {
    try {
        await sendEmail({ ...data, template_id: templates.generalTemplate });
    } catch (e) {
        console.log(e);
    }
};

let sendSmsAndEmail = async (email, phone, type, name) => {
    let code = generateRandomCode();
    let emailData = await emailObj[type](email, code, name)
    await sendMail(emailData);
    // if (phone) { await sendMessage(phone, sms); }
};

let sendMessage = async (phone, sms) => {
    try {
        let res = await axios({
            url: `http://login.bulksmsgateway.in/sendmessage.php?user=Healthybazar&password=Telwale@234&mobile=${phone}&message=${sms}&sender=TestId&type=3`,
            method: 'get',
        })
        return res;
}
    catch (err) {
        throw err;
    }
};

//.....................................................................
let sendOtpOnEmail = async (code) => {
    let html = `<h2> Your secret OTP is "${code}"</h2>`
    let subject = 'One time password';
    return { html, subject };
};

let sendOtpOnEmailId = async (email) => {
    await VerificationCode.findOneAndDelete({ email: email, type: 'otp' }).lean();
    let code = generateRandomCode();
    let opt = { email: email, code: code, type: 'otp' };
    let data = new VerificationCode(opt);
    let res = await data.save();
    // let { html, subject } = await emailObj[type](code)
    let { html, subject } = await sendOtpOnEmail(code);
    await sendMail(email, html, subject);
};

let resendOtpOnEmailId = async (email) => {
    let code = generateRandomCode();
    await VerificationCode.update({ email: email, type: 'otp' }, { code: code }, { new: true }).lean();
    let { html, subject } = await sendOtpOnEmail(code);
    await sendMail(email, html, subject);
};

// let sendOtpOnPhone = async (phone,code, type = "otp") => {
//     // await VerificationCode.findOneAndDelete({ phone: phone, type: type }).lean();
//     // let code = generateRandomCode();
//     let opt = { phone, code, type };
//     // let data = new VerificationCode(opt);
//     // let res = await data.save();
//     console.log(code)
//     console.log(opt)

//     code = `Your OTP is ${code}`;
//     await sendMessage(phone, code);
// };
let sendOtpOnPhone = async (phone,code, type, event) => {
    let eventId = event || '';
    try {
        // await VerificationCode.findOneAndDelete({ phone: phone, type: type }).lean();
        // let code = generateRandomCode();
        let opt = { phone, code, type, eventId};
        code = `Your OTP is ${code}`;
        // await sendMessage(phone, code);     
            console.log(code)
              console.log(opt)
        let data = await sendSms(phone, code)
        // let data = new VerificationCode(opt);
        // await data.save();
        return data
    } catch (error) {
        throw error
    }
   
};

let resendOtpOnPhone = async (phone, type = "otp") => {
    let code = generateRandomCode();
    await VerificationCode.update({ phone: phone, type: type }, { code: code }, { new: true }).lean();
    code = `Your OTP is ${code}`;
    await sendMessage(phone, code);
};
//..............................................................................

let sendSmsAndEmailForAdmin = async (email, pass, type) => {
    let password = pass
    let { html, subject } = await emailObj[type](email, password)
    await sendMail(email, html, subject);
};

//...............................................................................
// send email in appointment
// let appointmentGetBackToYou = async (name, slot) => {
//     let html = `<div>
//     <strong> Dear ${name} </strong>
//     <p>There was recently a request to book appointment from for your account.</P>
//     <p>Your appointment has been confirmed, the time slot is ${slot}</p>
//     </div>`
//     let subject = 'Appointment with healthy-Bazar';
//     return { html, subject };
// };

// let BookAppointment = async (name, slot) => {
//     let html = `<div>
//     <strong> Dear ${name} </strong>
//     <p>Your appointment with us has been reshedule now, the time slot is ${slot}</p>
//     </div>`
//     let subject = 'Appointment with healthy-Bazar';
//     return { html, subject };
// };

// let sendEmailInAppointment = async (email, name, slot, type) => {
//     if (type == 'BookAppointment') {
//         let { html, subject } = await appointmentGetBackToYou(name, slot);
//         await sendMail(email, html, subject);
//     } else if (type == 'getBackToYou') {
//         let { html, subject } = await BookAppointment(name, slot);
//         await sendMail(email, html, subject);
//     }
// };

//...........................................
// let sendpayudata = async (data) => {
//     let html = `<h2> Your payment status from paumoney is ${data.status} , and its order id is ${data.merchantTransactionId}"</h2>`
//     let subject = 'Your paymeny information from Payumoney ';
//     return { html, subject };
// };
// let sendpayumoneyInfoOnEmail = async (data) => {
//      let { html, subject } = await sendpayudata(data);
//      await sendMail(data.customerEmail, html, subject);
//  };


module.exports = { sendSmsAndEmailForAdmin, sendSmsAndEmail, sendMessage, sendOtpOnEmailId, resendOtpOnEmailId, sendOtpOnPhone, resendOtpOnPhone, };
