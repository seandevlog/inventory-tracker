/* ==============
    Auth.js
================= */

init();

function init() {
    toggleAuthForm();
}

function toggleAuthForm(string = 'login') {
    const form = document.querySelector('div#auth>form');
    const button = form.elements['button'];
    const inputs = document.querySelectorAll('div#auth>form input');
    const inputsNotInLogin = document.querySelectorAll('div#auth>form input:not(input[name="email"],input[name="password"]');
    const redirect = document.querySelector('div#auth>span#redirect');
    const title = document.querySelector('head>title');

    if (string === 'login') {
        title.innerText = 'Login';

        for (const input of inputsNotInLogin) {
            const label = input.parentElement.firstElementChild;
            input.classList.add('hide');
            label.classList.add('hide');
        }

        button.innerText = 'Login';
        redirect.innerText = 'I don\'t have an account';

        doLoginForm(form);

    } else if (string === 'signup') {
        title.innerText = 'Sign Up';

        for (const input of inputsNotInLogin) {
            const label = input.parentElement.firstElementChild;
            input.classList.remove('hide');
            label.classList.remove('hide');
        }

        button.innerText = 'Sign Up';
        redirect.innerText = 'I already have an account';

        doSignUpForm(form);
    }

    redirect.onclick = e => {
        if (string === 'login') {
            toggleAuthForm('signup');
        } else if (string === 'signup') {
            toggleAuthForm('login');
        }

        clearInputs(inputs);
    };
}

function doLoginForm(form) {
    const email = form.elements['email'];
    const password = form.elements['password'];
    const button = form.elements['button'];
    let isValid = false;

    // TODO - Redirect to user page if login is successful
    // TODO - Check database for account details

    button.onclick = e => {
        e.preventDefault();
        isValid = validate();
    }
    button.onkeydown = e => { 
        e.preventDefault();
        if (e.key === 'Enter') isValid = validate();
    };

    function validate() {
        const eValidationOutput = new ValidationOutput(email.previousElementSibling); 
        eValidationOutput.add("Email is required", email.value === "" || email.value == null).print();

        const pValidationOutput = new ValidationOutput(password.previousElementSibling);
        pValidationOutput.add("Password is required", password.value === "" || password.value === null).print();

        if (eValidationOutput.isEmpty() && pValidationOutput.isEmpty()) return true;
    }
}

function doSignUpForm(form) {
    const button = form.elements['button'];
    let isValid = false;
    
    button.onclick = e => {
        e.preventDefault();
        isValid = validateUserInfo(form);
    }
    button.onkeydown = e => { 
        e.preventDefault();
        if (e.key === 'Enter') isValid = validateUserInfo(form);
    };

    if (isValid) {
        persist()
        // TODO - finish persist function
    }
}

