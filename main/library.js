/* Creates error box */
function doErrorBox(messages, form) {
    doErrorBox.current ??= null;
    const errorBox = document.createElement('div');

    errorBox.setAttribute("id", "errorBox");
    Object.assign(errorBox.style, {
        display         : 'block',
        padding         : '1em',
        width           : '100%',
        background      : 'white',
        'font-size'     : '1em',
        border          : '1px solid black',
        'margin-top'    : '1.2em'
    });

    const errorBoxText = document.createElement('span');
    errorBoxText.textContent = messages;
    errorBox.append(errorBoxText);

    if(doErrorBox.current) doErrorBox.current.remove();
    doErrorBox.current = errorBox;
    form.insertAdjacentElement('afterend',doErrorBox.current);
}

function doUserInfo(form) {
    const email = doUserInfo.email = form.elements['email'];
    const password = doUserInfo.password = form.elements['password'];
    const firstName = doUserInfo.firstName = form.elements['first-name'];
    const lastName = doUserInfo.lastName = form.elements['last-name'];
    const contact = doUserInfo.contact = form.elements['contact'];
    const address = doUserInfo.address = form.elements['address'];
    // const button = form.elements['button'];
    
    // button.addEventListener('click', validateInputs);
    // button.addEventListener('keydown', e => { if (e.key === 'Enter') return validateInputs});

    /* Redirects to user page if login is successful */
    doUserInfo.validate = function validateInput (e) {
        e.preventDefault(); 

        let messages = []

        const emailRegex = /\w+\@\w+\.\w+/  // someone@example.com
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/


        // if (email.value === "" || email.value == null) {
        //     messages.push("Email is required")
        // } else if (emailRegex.test(email.value) == false) {
        //     messages.push("Email should be formatted as \"someone@example.com\"")
        // }

        // TODO 1. - Transition from error box to direct input checker labels 

        const emailChecker = email.previousElementSibling;
        if (email.value === "" || email.value == null) {
            emailChecker.innerText += "Email is required";
        } else if (emailRegex.test(email.value) == false) {
            emailChecker.innerText += "Email should be formatted as \"someone@example.com\"";
        }

        if (password.value === "" || password.value === null) {
            messages.push("Password is required")
        } else if (password.value.length < 12) {
            messages.push("Create a password at least 12 characters")
        } else if (passwordRegex.test(password.value) == false) {
            messages.push("Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols")
        }

        if (firstName.value === "" || firstName.value === null) {
            messages.push("First name is required")
        }

        if (lastName.value === "" || lastName.value === null) {
            messages.push("Last name is required")
        }

        if (contact.value === "" || contact.value === null) {
            messages.push("Contact is required")
        }

        if (address.value === "" || address.value === null) {
            messages.push("Address is required")
        }

        // if (messages) {
        //     doErrorBox(messages, form);
        // } else {
        //     // add UX for verification check beside each label
        // }
    }
}

function persist(state) {
    localStorage.setItem(state.key, state.value);
}