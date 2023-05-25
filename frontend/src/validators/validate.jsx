import rules from './rules'
import regex from './regex'


const validate = (value, validations) => {

    let validationResult = [];

    validations.forEach(validator => {

        if (validator.value === rules.requiredValue) {
            value.trim().length === 0 && (validationResult.push(false))
        }

        if (validator.value === rules.mindValue) {
            value.trim().length < validator.min && (validationResult.push(false))
        }

        if (validator.value === rules.maxValue) {
            value.trim().length > validator.max && (validationResult.push(false))
        }

        if (validator.value === rules.emailValue) {
           !regex.testEmail(value.trim()) && (validationResult.push(false))
        }
        if (validator.value === rules.phoneValue) {
            !regex.testPhoneNumber(value.trim()) && (validationResult.push(false))
         }

    });

    if (validationResult.includes(false)) {
        return false;
    }else{
        return true;
    }

}


export default validate;