const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.yandex.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  service: "Yandex",
  auth: {
    user: "noreply@cryptogram.com", // generated ethereal user
    pass: "Demo@1234", // generated ethereal password
  },
});

exports.emailForSignup = async (data) => {
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
        <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
        </td>
      </tr>
      <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">Thanks for signing up, ${data.Name}. We're glad you're here.  </h2>
        </td>
      </tr>
      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sendOtp = async (data) => {
  try {
    let info = await transporter.sendMail({
      from: "ashish@cryptogram.com", // sender address
      to: data.toEmail,// sender address
      subject: "chatApp", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
        </td>
        <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${data.Name} your OTP is  </h2>
        </td>
      </tr>

      <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 50px;line-height: 46px;font-weight: 900;">${data.OTP} </h2>
        </td>
      </tr>
  

      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sendEmail = async (data) => {
 
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,// sender address
      subject: "eCom", // Subject line
      text: "hello user", // plain text body
      html: `<p>hi</p>`,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

// password expire after 60 days
exports.passwordExpire = async (data) => {
   ;
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
           
        </td>
        <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${data.Name} your password will be expire after 5 days. Please change your password </h2>
        </td>
      </tr>
  

      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

// account is locked because of wrong password
exports.accountLocked = async (data) => {
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
           
        </td>
   <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${data.Name} your account is locked because of wrong password. </h2>
        </td>
      </tr>

      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.accountUnlocked = async (data) => {
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >           
        </td>
<tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${data.Name} your account is unlocked. Thank you </h2>
        </td>
      </tr>

      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.loginMail = async (data, newData) => {
  try {
    
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: data.toEmail,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
           
        </td>
        <tr>
        <td>
          <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${data.Name} your account has been logged in  </h2>
        </td>
      </tr>
        
      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sendMailToAdmin = async (data) => {
  // console.log("data", data)
  try {
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: process.env.alertEmails,
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
           <tr>
        </td>
        <td>
        <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">hello Admin, Your account is credited with ${data.inputAmount}  amount.  </h2>
      </td>
    </tr>
           
      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};


exports.sendEmailToMultiUser = async (data) => {
  try {
       
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: [data.emails],
      subject: "iMX", // Subject line
      text: " ", // plain text body
      html:`This is subject : ${data.subject} <br>
                This is description : ${data.description} <br>
  <img src= https://imxtest.s3.ap-south-1.amazonaws.com/${data.images} >  `
    });

    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.sendEmailAfterLoginAllUpAuthorites = async(username,role,roleId) => {
  try {
   // console.log("data",data.emails)
    
    let info = await transporter.sendMail({
      from: "noreply@perfectiongeeks.com", // sender address
      to: process.env.alertEmails,
      subject: "iMX", // Subject line
      html: `<a style="text-decoration: none;" href="https://www.imx.global/">
      <table style="background-color:white	;width:800px;  margin:auto;">
      <tr style="width: 94%;height: 300px;background-color: #F1BC18;display: block; margin: 3%;">
        <td style="width: 800px;height: 300px;">
           
            <img src="https://imsmart.s3.ap-south-1.amazonaws.com/logo.png" width="300px" style="margin-left: 224.2px;" >
           <tr>
        </td>
        <td>
        <h2 style="margin-top: 20px;text-align: center;margin-bottom: 0;color: #2a2a2a;padding: 0px 100px;font-size: 34px;line-height: 46px;font-weight: 900;">${username} is logged in iMX having role is ${role}and roleId is ${roleId}. </h2>
      </td>
    </tr>
           
      <tr > 
        <td style="">
          <div style="background-color:#272A30; height: 150px;  ">
            <div style="color:white; text-align: center; margin-top: 50px; ">
                    <p style="padding-top: 50px; margin-bottom: 0;">All Copyright reserved. © 2021 <a href="https://www.imx.global/home" style="color: #f1bc18;
  font-weight: 900;">iMX PVT. LTD</a></p> 
                    <p style="color:white; margin-top: 0; ">imxchange.imx@gmail.com</p> 
                    <a href="https://www.imx.global/" style="color: #777;font-size: 13px;">Design and Developement by PerfectionGeeks</a>
                 </div>
          </div>
        </td>
      </tr>
    </table>
    </a>
  `,
    });
    if (info) {
      return info.messageId;
    } else {
      console.log("error");
    }
  } catch (err) {
    console.log(err);
  }
};

