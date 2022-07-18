const joi = require("joi");

const isPhoneNumberValid = require("../lib/functions/validation/isPhoneNumberValid.js")
    , isPasswordStrong   = require("../lib/functions/validation/isPasswordStrong.js");

const registerSchema = joi.object({
    firstName: joi
                  .string()
                  .min(1)
                  .max(64)
                  .required(),
    middleName: joi
                   .string()
                   .min(1)
                   .max(64)
                   .required(),
    lastName: joi
                 .string()
                 .min(1)
                 .max(64)
                 .required(),
    emailAddress: joi
                     .string()
                     .min(3)
                     .max(320)
                     .email()
                     .lowercase(),
    phoneNumber: joi
                    .when("emailAddress", {
                        is: "",
                        then: joi
                                 .required()
                    })
                    .custom(isPhoneNumberValid, "phoneNumber")
                    .messages({
                        "any.custom": "Your phone number is invalid!"
                    }),
    username: joi
                 .string()
                 .alphanum()
                 .min(4)
                 .max(40)
                 .lowercase()
                 .when("emailAddress", {
                    is: "",
                    then: joi.when("phoneNumber", {
                        is: "",
                        then: joi.required()
                    })
                 }),
    password: joi
                 .string()
                 .min(8)
                 .max(64)
                 .required()
                 .custom(isPasswordStrong, "password")
                 .messages({
                    "any.custom": "Your password strength is not strong enough!"
                 })                
});

module.exports = registerSchema;