const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports =  function validateRegisterInput(data) {

    console.log("validating")

    let errors = {};
    data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
    data.userName = !isEmpty(data.userName) ? data.userName : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password1 = !isEmpty(data.password1) ? data.password1 : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";
    


    if(Validator.isEmpty(data.fullName)) {
        errors.fullName = "fullName is required field"
    }
    if(Validator.isEmpty(data.userName)) {
        errors.userName = "userName is required field"
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "email is required field"
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email"
    }

    
    if(Validator.isEmpty(data.password1)) {
        errors.passWord1 = "password is required field"
    }

    
    if(Validator.isEmpty(data.password2)) {
        errors.password2 = "passwords do not match"
    }

    if (!Validator.isLength(data.password1, { min: 6, max: 30 })) {
        errors.password = "Password must be at least 6 characters";
    }

    if (!Validator.equals(data.password1, data.password2)) {
        errors.password2 = "Passwords must match";
    }

    return {
        isValid: isEmpty(errors),
        errors
    };

} 

