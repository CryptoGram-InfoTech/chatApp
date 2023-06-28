const { User } = require("../modules/user/models/user.model");

const message = require("../../config/message"),
  { errorHandler } = require("../helpers/errorHandling.helper");

//User authentication
exports.authenticate = async (req, res, next) => {
  try {
    const auth = req.header("Authorization");
    // console.log("auth",auth);
    // const bytes = await CryptoJS.AES.decrypt(user.otp, process.env.secret_key);
    // const originalText = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!auth) throw message.msg.unauthorisedRequest;
    const token = auth.substr(auth.indexOf(" ") + 1);
    // consolse.log("token",token,await User.findByToken(token, res))
    const user = await User.findByToken(token, res);

    req.user = user;
    if (!user) throw message.msg.unauthorisedRequest;
    return next();
  } catch (err) {
    const error = errorHandler(err, 401);
    return res.status(error.status).send(error);
  }
};
