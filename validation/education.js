const validator = require('validator');
const isEmpty = require('./is-empty');
module.exports = function validateExperienceInput(data) {
    let errors = {};
    data.school = !isEmpty(data.school) ? data.school: '';
    data.from = !isEmpty(data.from) ? data.from : '';
    data.degree = !isEmpty(data.degree) ? data.degree: '';
    data.fieldofstudy= !isEmpty(data.fieldofstudy) ? data.fieldofstudy: '';


    if (validator.isEmpty(data.school)) {
        errors.school = "School Field is Required";
    }

    if (validator.isEmpty(data.degree)) {
        errors.degree = "Degree field is Required"
    }


    if (validator.isEmpty(data.from)) {
        errors.from = "from Date Field is required";
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = "fieldofStudy Field is required";
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}