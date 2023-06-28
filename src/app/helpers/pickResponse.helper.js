const _ = require("lodash");

//After registration
exports.pickRegistrationResponse = data => {
  var response = _.pick(data, [
    "_id",
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "DOB",
    "countryCode"
  ]);
  return response;
};

exports.pickRegistrationRequest = data => {
  var response = _.pick(data, [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "countryCode",
    "DOB",
    "password",
    "latitude",
    "Longitude"
  ]);
  return response;
};

exports.pickRegistrationResponseAdmin = data => {
  var response = _.pick(data, [
    "firstName",
    "lastName",
    "gender",
    "email",
    "phone",
    "countryCode",
    "DOB",
    "role",
    "roleId",
    "address"
  ]);
  return response;
};

//During login
exports.pickUserCredentials = data => {
  var response = _.pick(data, [
    "email",
    "password"
  ]);
  return response;
};
//After login
exports.pickUserProfileResponse = data => {
  let response = _.pick(data, [
    "_id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "countryCode",
    "wishlist",
    "gender",
    "DOB"
  ]);
  return response;
};

exports.pickUserinfoForThatUser = data => {
  let response = _.pick(data, [
    "_id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "favMusic",
    "audioDescription",
    "zodiacSign",
    "profileImage",
    "countryCode",
    "wishlist",
    "gender",
    "DOB",
    "recentItems",
    "diseases",
    "isPhoneVerified"
  ]);
  return response;
};


exports.pickSocialResponse = data => {
  var response = _.pick(data, [
    "firstName",
    "lastName",
    "email",
    "phone",
    "countryCode",
    "isGoogle",
    "isFacebook",
    "facebook",
    "google",
    "wishlist"
  ]);
  return response;
};

exports.pickOrderResponse = data => {
  var response = _.pick(data, [
    "promoCode",
    "originalPrice",
    "discount",
    "finalPrice",
    "contact",
    "instructions",
    "foodItems",
    "status"
  ]);
  return response;
};

exports.pickForgetPasswordResponse = data => {
  var response = _.pick(data, [
    "_id",
    "firstName",
    "lastName",
    "email",
    "phone",
    "countryCode",
  ]);
  return response;
};

let commProForUser = ["firstName","email","username", "lastName", "gender", "DOB", "phone", "countryCode", "address", "diseases", "isPhoneVerified", "latitude", "Longitude"]
//For Edit user profile
exports.pickResForUpdateUser = data => {
  var response = _.pick(data, [...commProForUser]);
  return response;
};
exports.pickResForUpdateUserbyAdmin = data => {
  var response = _.pick(data, [...commProForUser, "roleId", "role", "active", "newsLetter", "orderNo", "category", "recentItems", "recentItems", "isPhoneVerified"]);
  return response;
};

//For User address Management
exports.pickAddressRes = data => {
  var response = _.pick(data, ["address"]);
  return response;
};

//.............................................................
var commonProductPro = [
  "name",
  "state",
  "usage",
  "description",
  "categories",
  "brand",
  "disease",
  "variables",
  "discount",
  "sku",
  "images",
  "manufacturer",
  "vendors",
  "suitableFor",
  "metaTitle",
  "metaDescription",
  "metaTags",
  "is",
  "related",
  "maxSaleQty",
  // "price",
  "tags",
  "route",
  "rating",
  "stockVisible",
  "inactivePayment"
];

//writter data for product
exports.pickProductAdmin = data => {
  var response = _.pick(data, [...commonProductPro]);
  return response;
};




var commonBrandPro = [
  "name",
  "subBrand",
  "logo",
  "description",
  "address",
  "sellers",
  "metaTitle",
  "metaDescription",
  "metaTags",
  "discount",
  "category",
  "visibleLogo"
];
exports.pickBrandProps = data => {
  var response = _.pick(data, [
    ...commonBrandPro,
    "noOfProducts",
    "active"
  ]);
  return response;
};

exports.pickBrandPropsForUsers = data => data.map(d => _.pick(d, [...commonBrandPro]));


//.........................................
var commonCategoryPro = [
  "name",
  "dailyUsableProduct",
  "metaTitle",
  "discountCategory",
  "metaDescription",
  "metaTags",
  "_id",
  "image",
  "bannerImage",
  "description",
  "sequence"
];
//writter data for category
exports.pickCateProperties = data => {
  var response = _.pick(data, [...commonCategoryPro]);
  return response;
};

exports.pickCategoryForUser = data => data.map(d => _.pick(d, [...commonCategoryPro, "subCategories"]));

//...........................................
//user(full Information)
exports.pickProductForUserFullInfo = data => {
  var response = _.pick(data, [
    "_id",
    "name",
    "color",
    "storage",
    "details",
    "state",
    "ageGroup",
    "usage",
    "variables",
    "description",
    "categories",
    "brand",
    "disease",
    "variables",
    "discount",
    "socialMediaSharing",
    "images",
    "manufacturer",
    "vendors",
    "is",
    "related",
    "suitableFor",
    "price",
    "inactivePayment",
    "reviews",
    "rating",
    "maxSaleQty",
    "route",
    "averageRating",
    "tags"
  ])
  return response;
};




exports.pickSimilarProductForUserFullInfo = data => {
  var response = _.pick(data, [
    // "_id",
    // "name",
    // "color",
    // "storage",
    // "details",
    // "state",
    // "ageGroup",
    // "usage",
    // "variables",
    // "description",
    // "categories",
    // "brand",
    // "disease",
    // "variables",
    // "discount",
    // "socialMediaSharing",
    // "images",
    // "manufacturer",
    // "vendors",
    // "is",
    "related",
    // "suitableFor",
    // "price",
    // "inactivePayment",
    // "reviews",
    // "rating",
    // "maxSaleQty",
    // "route",
    // "averageRating",
    // "tags"
  ])
  return response;
};

//user(List Information)
exports.pickProductForUserList = data => data.map(d => _.pick(d, [
  "_id",
  "name",
  "hindiName",
  "stockVisible",
  "averageRating",
  // "categories",
  "brand",
  "images",
  "variables",
  "price",
  "discount",
  "maxSaleQty",
  "route",
  "tags"
]));

//.........................................

exports.pickProductDataByUser = data => {
  var response = _.pick(data, ["productId", "size", "quantity"]);
  return response;
};
exports.pickProductDataForUpdate = data => {
  var response = _.pick(data, ["size", "quantity"]);
  return response;
};
//................................................ 
const commonblogPro = [
  "title",
  "content",
  "category",
  "products",
  "image",
  "name",
  "metaTitle",
  "metaDescription",
  "metaTags",
  "searchTerms",
  "relatedBlogs",
  "relatedLinks",
  "routes",
  "schemaMarkupCode",
  "H1Tag"
];

exports.pickDataForBlog = data => {
  var response = _.pick(data, [...commonblogPro]);
  return response;
};

exports.pickDataForBlogUpdateByAdmin = data => {
  var response = _.pick(data, [...commonblogPro, "isHBrecommended", "disease"]);
  return response;
};
//.......................................................

const commonOrderPro = [
  "userType",
  "user",
  "paymentMethod",
  "products",
  "discountCode",
  "totalAmount",
  "discountedPrice",
  "shippingCharge",
  "totalPayableAmt",
  "billingInfo",
  "shippingInfo",
  "giftOptions",
  // "discountCode",
  "couponDiscount"
];

exports.pickDataForOrder = data => {
  var res = _.pick(data, [...commonOrderPro, "statusDetails"]);
  return res;
};



exports.pickForUpdateAppointment = data => {
  let res = _.pick(data, ["type", "status"]);
  return res;
};
