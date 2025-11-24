/* ==========================================
            ValidationOutput class
    Structure:
        <label></label>
        <span></span>   < Validation Output
        <input></input>
============================================= */

export class ValidationOutput {
    constructor(outputLocation) {
        this.validators = []; // [{message, condition},...]
        this.empty = true;
        if (outputLocation) this.outputLocation = outputLocation;
    }

    get() {
        return this.validators;
    }

    set(outputLocation) {
        if (outputLocation) this.outputLocation = outputLocation;
        return this;
    }
    
    add(message, condition) {
        if (message != null && condition != null) {
            for (let i = 0; i < this.validators.length; i++) {
                if (message === this.validators[i]['message']) {
                    this.validators.splice(i, 1, {
                        "message": message,
                        "condition": condition
                    })
                    return this;
                }
            }
            this.validators.push({ 
                "message": message, 
                "condition": condition 
            });
        }
        return this;
    }

    print() {
        for (const validator of this.validators) {
            if (validator['condition']) {
                this.outputLocation.innerText = validator['message'];
                this.empty = false;
                return;
            }    
        }
        this.outputLocation.innerText = "";
        this.empty = true;
        return this.outputLocation.innerText;
    }

    isEmpty() {
        return this.empty;
    }
}

export function validateUserInfo(form) {
    const email = form.elements['email'];
    const password = form.elements['password'];
    const givenName = form.elements['given-name'];
    const familyName = form.elements['family-name'];
    const contact = form.elements['contact'];
    const address = form.elements['address'];

    return validate();

    function validate () {
        const eValidationOutput = new ValidationOutput(email.previousElementSibling); 
        const emailRegex = /\w+\@\w+\.\w+/;  // someone@example.com
        eValidationOutput
            .add("Email is required", email.value === "" || email.value == null)
            .add("Email should be formatted as \"someone@example.com\"", emailRegex.test(email.value) == false)
            .print();

        const pValidationOutput = new ValidationOutput(password.previousElementSibling);
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/;
        pValidationOutput
            .add("Password is required", password.value === "" || password.value === null)
            .add("Create a password at least 12 characters", password.value.length < 12)
            .add("Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols", passwordRegex.test(password.value) == false)
            .print();

        const fValidationOutput = new ValidationOutput(givenName.previousElementSibling);
        fValidationOutput.add("First name is required", givenName.value === "" || givenName.value === null).print();

        const lValidationOutput = new ValidationOutput(familyName.previousElementSibling);
        lValidationOutput.add("Last name is required", familyName.value === "" || familyName.value === null).print();

        const cValidationOutput = new ValidationOutput(contact.previousElementSibling);
        cValidationOutput.add("Contact is required", contact.value === "" || contact.value === null).print();

        const aValidationOutput = new ValidationOutput(address.previousElementSibling);
        aValidationOutput.add("Address is required", address.value === "" || address.value === null).print();

        if (eValidationOutput.isEmpty() && pValidationOutput.isEmpty() && fValidationOutput.isEmpty() &&
            lValidationOutput.isEmpty() && cValidationOutput.isEmpty() && aValidationOutput.isEmpty()) 
        return true;
    }
}