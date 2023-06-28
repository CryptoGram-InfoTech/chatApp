const {
    // addUserInBulk,
    
   sendOTP,emailVerify,
   sendEmailOTP,
   verifyOtp,
   
  } = require("../business/user.business");
     


exports.sendOTP = async (req, res) => await sendOTP(req.body);

exports.sendEmailOTP = async (req, res) => await sendEmailOTP(req.body);


exports.emailVerify = async (req, res) => await emailVerify(req.body)

exports.verifyOtp = async (req, res) => await verifyOtp(req.body)
