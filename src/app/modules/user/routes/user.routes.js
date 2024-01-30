let express = require('express');
let { upload } = require("../../../util/multer-s3");
const multer = require('multer');

let router = express.Router(),
        {
                emailVerify,
                verifyOtp,
                sendOTP,
                sendEmailOTP,
              
                } = require("../../user/controllers/user.controller");
const { authenticate } = require('../../../middlewares/jwt.middleware');
const { wrapAsync } = require("../../../helpers/router.helper");
const { wrap } = require('lodash');
const { auth } = require('firebase-admin');



// const multer = require('multer');
// const path = require('path');
//Multer for user //
// var bulkStorage = multer.memoryStorage({
//         destination: 'public/bulkData/userData/',
//         filename: (req, file, cb) => {
//                 cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//         }
// });
// let bulkUpload = multer({ storage: bulkStorage }).single("csv");
//Ends here//
// router.post("/bulk", authenticate, bulkUpload, wrapAsync(addUserInBulk));


router.post("/sendOTP", wrapAsync(sendOTP));

router.post("/sendEmailOTP", wrapAsync(sendEmailOTP));

router.post("/emailVerify", wrapAsync(emailVerify));

router.post("/verifyOtp", wrapAsync(verifyOtp));







module.exports = router;

//6225ebe35f13f2afbc41fa0c