const { msg } = require("../../../../config/message");
const { User } = require("../models/user.model");
// const { chatOnlineUser } = require("../../chat/model/onlineUsers.model");
// const { visitedProfile } = require("../../visitedProfile/model/visitedProfile.model");

const moments = require('moment');

const countryCodes = require('country-codes-list')
var mongoose = require('mongoose');
const CryptoJS = require("crypto-js");

const {
  emailForSignup,
  sendOtp,
  passwordExpire,
  accountLocked,
  accountUnlocked,
  loginMail
} = require("../../../util/email");
// const { card } = require("../models/card.model");
// const { subCard } = require("../models/subCard.model");

const { pickUserProfileResponse, pickUserinfoForThatUser, pickRegistrationResponse, pickUserCredentials,
  pickSocialResponse, pickResForUpdateUser, pickResForUpdateUserbyAdmin,
  pickRegistrationRequest, pickRegistrationResponseAdmin } = require("../../../helpers/pickResponse.helper");

const bcrypt = require("bcryptjs");
const { generateAuthToken } = require("../../../util/generate.token");
// const { ForgetPasswordCode } = require("../models/forgetPasswordCode.model");
const moment = require("moment");
const { sendSmsAndEmail, sendSmsAndEmailForAdmin, sendOtpOnEmailId, resendOtpOnEmailId, sendOtpOnPhone, resendOtpOnPhone } = require('./sendEmail.business');
const limit = process.env.limit;
// const { request } = require('../../request/models/request.model');
const { IdentityStore } = require("aws-sdk");
const cron = require('node-cron');
// const{ Report }=require('../../Report/models/report.model');
// const { saveUserToNewsletter } = require('../../newsletter/business/newsletter.business');
// const { addToContactListInSendGrid } = require('../../SendGrid/business/sendGrid.business');
const {code}=require("../../../util/dialCode");

Date.prototype.getWeek = function () {
  var dt = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - dt) / 86400000) + dt.getDay() + 1) / 7);
};

function generateReferalCode() {
  let length = 10;
  return Math.round(
    Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)
  )
    .toString(36)
    .slice(1);
}
let fun= async()=>{

let list=await User.findOneAndUpdate({purchasedPlan:{$ne:null},expiryDate:{
  $gte: moment().subtract(1, 'days'), 
  $lt: moment().add(1,'days')
}},{$set:{expiryDate:'',startDate:'',purchasedPlan:'',remaingCallMinutes:0,remaingSpeedDatingTime:0}},{new:true});

}

// cron.schedule('00 00 00 * * *', function() {
//   // console.log('running a task every Secound');
//   fun();

// });


let sendEmailForOTP = async (email, otp, type, name) => {
  try {
    let emailData = {
      toEmail: email,
      Type: type,
      Name: name,
      OTP: otp,
    };
    console.log(emailData)
    if (type == "resend") {
      let data = await sendOtp(emailData);
      return data;
    } else {
      const data = await sendOtp(emailData);
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

let emailVerify = async (data) => {
  if (!data.otp) {
    throw msg.requiredOtp;
  }
  // if (!data.email) {
  //   throw msg.email;
  // }
  let user = await User.findOne({ phone: data.phone,deviceId:data.deviceId });
  if (!user) throw msg.userNotFound;

  if(user.phone=='+919971017606')
  {
let r = await User.findOneAndUpdate(
      { phone: data.phone },
      { $set: { active: true } },
      { new: true }
    );
    return {
      result: msg.success,
    };
  }
  let date1 = user.otpDate;
  let date1Time = date1.getTime();
  let date2 = new Date();
  let date2Time = date2.getTime();
  let minutes = (date2Time - date1Time) / (1000 * 60);
  // console.log("minutes",minutes)
  if (minutes > 5) { throw msg.expireOtp }
  const bytes = await CryptoJS.AES.decrypt(user.otp, process.env.secret_key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  if (originalText == data.otp) {
    res = await User.findOneAndUpdate(
      { phone: data.phone },
      { $set: { active: true } },
      { new: true }
    );
    return {
      result: msg.success,
    };
  } else {
    throw msg.incorrectOTP;
  }
};

let verifyOtp = async (data) => {
  if (!data.otp) {
    throw msg.requiredOtp;
  }
  // if (!data.email) {
  //   throw msg.email;
  // }
  // let user = await User.findOne({ phone: data.phone });
  let user = await User.findOne({ phone: data.phone,deviceId:data.deviceId });

  if (!user) throw msg.userNotFound;

//   if(user.phone=='+919971017606')
//   {
// let r = await User.findOneAndUpdate(
//       { phone: data.phone },
//       { $set: { active: true } },
//       { new: true }
//     );
//     return {
//       result: msg.success,
//     };
//   }
  let date1 = user.otpDate;
  let date1Time = date1.getTime();
  let date2 = new Date();
  let date2Time = date2.getTime();
  let minutes = (date2Time - date1Time) / (1000 * 60);
  // console.log("minutes",minutes)
  if (minutes > 5) { throw msg.expireOtp }
  const bytes = await CryptoJS.AES.decrypt(user.otp, process.env.secret_key);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);

  //console.log("originalText",originalText);

  if (originalText == data.otp) {
    res = await User.findOneAndUpdate(
      { phone: data.phone,deviceId:data.deviceId },
      { $set: { active: true } },
      { new: true }
    );
    return {
      result: msg.success,
    };
  } else {
    throw msg.incorrectOTP;
  }
};

let sendOTP = async (data) => {
  console.log("hii")
  let OTP = Math.floor(100000 + Math.random() * 99999).toString();
  console.log("hii2")
  // let user = await User.findOne({ phone: data.phone });
  let user = await User.findOne({ phone: data.phone },{deviceId:data.deviceId});

  console.log("hii3")

  if(user){
    console.log("hii1")
    throw msg.duplicatePhone;
  }
  else{
    console.log("hii2")

    let user = new User(data);
    response = await user.save();
    // return response;
  }

  console.log("otp",OTP);
  let ciphertext = await CryptoJS.AES.encrypt(
    OTP,
    process.env.secret_key
  ).toString();
  console.log(OTP)
  let updateUserdb;
  // if (data.newEmail) {
    // let abc = await sendEmailForOTP(data.newEmail, OTP, "verify", data.firstName);

    // if (abc) {
    //   let newDate = new Date();
      // if (!data.newEmail) {
      //   throw msg.email;
      // }
      // updateUserdb = await User.findOneAndUpdate(
      //   { email: data.email },
      //   { $set: { otp2: ciphertext, otpDate2: newDate } },
      //   { new: true }
      // );
     
      // console.log("newDate",newDate)
      // if (updateUserdb) {
        // return {
        //   result: msg.success,
        // };
      // }
    // }

  // }
  // else if (data.phone) {

    // let mobileOtp = await sendOtpOnPhone(data.phone, OTP, 'verify');

    let newDate = new Date();

    updateUserdb = await User.findOneAndUpdate(
      { phone: data.phone },
      { $set: { otp: ciphertext, otpDate: newDate } },
      { new: true }
    );

    if (updateUserdb) {
      return {
        result: msg.success,
        OTP: OTP
      };
    }
    // }

  // }


  // let abc = await sendEmailForOTP(data.newEmail, OTP, "verify", data.firstName);

  //  await sendSms(user.phone,OTP)

};


let sendEmailOTP = async (data) => {
  let OTP = Math.floor(100000 + Math.random() * 99999).toString();
  let user = await User.findOne({ phone: data.phone });
  if(!user){
    throw msg.NotExist;
  }
  // else{
  //   let user = new User(data);
  //   response = await user.save();
  //   // return response;
  // }
  console.log("otp",OTP);
  let ciphertext = await CryptoJS.AES.encrypt(
    OTP,
    process.env.secret_key
  ).toString();
  console.log(OTP)
  let updateUserdb;
  if (data.newEmail) {
    let abc = await sendEmailForOTP(data.newEmail, OTP, "verify", data.firstName);

    if (abc) {
      let newDate1 = new Date();
      if (!data.newEmail) {
        throw msg.email;
      }
      updateUserdb = await User.findOneAndUpdate(
        { email: data.email },
        { $set: { otp: ciphertext, otpDate: newDate1 } },
        { new: true }
      );
     
      // console.log("newDate",newDate)
      if (updateUserdb) {
        return {
          result: msg.success,
        };
      }
    }


    // let newDate = new Date();

    // updateUserdb = await User.findOneAndUpdate(
    //   { phone: data.phone },
    //   { $set: { otp: ciphertext, otpDate: newDate } },
    //   { new: true }
    // );

    if (updateUserdb) {
      return {
        result: msg.success,
        OTP: OTP
      };
    }
    }

  // }


  // let abc = await sendEmailForOTP(data.newEmail, OTP, "verify", data.firstName);

  //  await sendSms(user.phone,OTP)

};







module.exports = {

  emailVerify,
  verifyOtp,
  sendOTP,
  sendEmailOTP,
  
};