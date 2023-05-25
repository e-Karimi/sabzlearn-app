const requiredValue = 'REQUIRED_VALUE'
const mindValue = 'MIN_VALUE'
const maxValue = 'MAX_VALUE'
const phoneValue = 'PHONE_VALUE'
const emailValue = 'EMAIL_VALUE'

const requiredValidator = () => ({ value: requiredValue })
const minValidator = (min) => ({ value: mindValue, min: min })
const maxValidator = (max) => ({ value: maxValue, max: max })
const phoneValidator = () => ({ value: phoneValue })
const emailValidator = () => ({ value: emailValue })


export default {requiredValue,mindValue,maxValue,phoneValue,emailValue}
export  {requiredValidator,minValidator,maxValidator,phoneValidator,emailValidator}