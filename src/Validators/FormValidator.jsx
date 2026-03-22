import passwordValidator from "password-validator"
var schema = new passwordValidator();
schema
    .is().min(8)                                    // Minimum length 8
    .is().max(100)                                  // Maximum length 100
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(1)                             // Must have at least 1 digits
    .has().symbols(1)                              // Must have at least 1 special character 
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password@123', 'admin@123', 'User@123']); // Blacklist these values

export default function FormValidator(e) {
    let { name, value } = e.target

    switch (name) {
        case "name":
        case "username":
        case "icon":
        case "pin":
        case "city":
        case "state":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + "Field length must be 3-100 characters"
            else
                return ""

        case "email":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (value.length < 13 || value.length > 100)
                return name + "Field length must be 3-100 characters"
            else
                return ""

        case "phone":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (value.length < 10 || value.length > 10)
                return name + "Field length must be 10 digits "
            else if (!(value.startsWith("6") || value.startsWith("7") || value.startsWith("8") || value.startsWith("9")))
                return "Invalid Phone Number"
            else
                return ""

        case "password":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (!schema.validate(value))
                return schema.validate('value', { details: true }).map(x => x.message.replaceAll("string", "password")).join(". ")
            else
                return ""


        case "message":
        case "question":
        case "answer":
        case "address":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"

            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (parseInt(value) < 1)
                return "Base price must be a value greater than 0"
            else
                return ""

        case "discount":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount must be with in 0 to 100"
            else
                return ""


        case "stockQuantity":
            if (!value || value.length === 0)
                return name + "Filed is mendatory"
            else if (parseInt(value) < 0)
                return "Stock Quantity must be a value greater than or equal to 0"
            else
                return ""
        default:
            return ""
    }

}
