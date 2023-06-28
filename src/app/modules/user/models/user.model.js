const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const env = require("../../../../environment/environment.json");
const jwt = require("jsonwebtoken");
const secret = process.env.secret_token;
const msg = require("../../../../config/message").msg;
let referralCodeGenerator = require('referral-code-generator')





const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // required: [true, "This field is Required"]
  },
  gender: {
    type: String,
    // enum: ["male", "female", "other"],
  },
rejectedReason:String,
  kycName: String,
  DOB: {
    type: String, //Date of birth
  },

  phone: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
    // required: function () {
    //   return !(this.isFacebook || this.isGoogle);
    // },
  },
  otp: {
    type: String,
    default: 0,
  },
  // otp2: {
  //   type: String,
  //   default: 0,
  // },
  isPhoneVerified: {
    default: false,
    type: Boolean
  },
  email: {
    type: String
    // index: true,
    // // required: true,
    // // unique: true,
    // trim: true,
    // // minlength: 3,
    // validate: {
    //   validator: validator.isEmail,
    //   message: "{VALUE} is not a valid email"
    // },
    // lowercase: true
  },
  myReferalcode: { type: String },

  parentReferalcode: { type: String },
  active: {
    type: Boolean,
    default: false
  },
  profileImage: {
    type: String,
  },

  role: {
    type: String,
    enum: ["Family", "Business","Admin"],
    default: 'Family'
  },

  roleId: {
    type: Number,      
    default: 0       // 0->"Family", 1->"Business"2-> "Admin"
  },
  deviceId: String,
  otpDate: {
    type: Date
  },
  otpDate2: {
    type: Date
  },
 
  blockedByAdmin:{
    type:Boolean,
    default:false
  },


// }
},
  {
    timestamps: true,
    versionKey: false
  }
);

UserSchema.statics.findByToken = function (token, res) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, secret);
  } catch (e) {
    throw e.message || 'Unauthorised request'
  }
  return User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (!user) {
        return Promise.reject({ message: msg.unauthorisedRequest });
      } else {
        return Promise.resolve(user);
      }
    })
    .catch(e => {
      throw msg.unauthorisedRequest
    });
};

let checkGeneratedIdUniqueness = async () => {
  let referalCode = referralCodeGenerator.alphaNumeric('uppercase', 3, 2);
  let ref = await User.findOne({
    referalCode
  }).lean();
  if (ref) checkGeneratedIdUniqueness();
  return referalCode;
}
UserSchema.pre("save", function (next) {

  if (!!this.password) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        this.password = hash;

        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model("User", UserSchema);
User.syncIndexes();




const deleteSchemas = new mongoose.Schema({
  name: String,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  deactivateBy: {
    type: String,
    enum: ['Admin','User']
  },
  reason: String,
},
  {
    timestamps: true,
    versionKey: false
  }

)
const DeactivateAccounts = new mongoose.model("deleteSchema", deleteSchemas)


module.exports = { User, DeactivateAccounts };
