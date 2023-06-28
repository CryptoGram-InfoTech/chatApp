const { msg } = require("../../config/message"),
    passwordValidator = require('password-validator');

//Create a schema
var schema = new passwordValidator();

//Add properties to it
schema.is().min(8) // Minimum length 8
    .has().uppercase() // Must have uppercase letters
    .has().lowercase() // Must have lowercase letters
    .has().digits() // Must have digits
    .has().symbols() // Must have special character
    .has().not().spaces()  // Should not have spaces

// .is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values; 

const password_validator = async (password) => {
    return await new Promise(function (resolve, reject) {
        if (!password) {
            reject(msg.invalidPassword);
        }
        let validate = schema.validate(password);
        resolve(validate);
    });
}
module.exports = { password_validator }

