const testEmail= (value) => {
    let emailPattern = /^\w+([\.-]?\w)*@[a-zA-Z]+([\.-]?\w)*(\.[a-zA-Z]{2,3})+$/g
   return  emailPattern.test(value)

}

const testPhoneNumber = (value) => {
    let cellPhonePattern = /09(1[0-9]|2[012]|3[1-9]|9[012])\d{7}/g
   return  cellPhonePattern.test(value)
}

export default {testEmail,testPhoneNumber}