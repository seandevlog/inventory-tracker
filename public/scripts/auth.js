import { get, persist } from './database.js';
import { validateUserInfo, ValidationOutput } from './validation.js';
import { clearInputs, generateRandomId, $, $$ } from './utils.js';

const STATE = "user-key";   

init();

function init() {
    let data = get(STATE);
    let [ users, indexes ] = data; 

    const form = $(document,'div#auth>form');
    const emailInput = form.elements['email'];
    const passwordInput = form.elements['password'];
    const button = form.elements['button'];

    toggleAuthForm();

    function toggleAuthForm(string = 'login') {
        const inputs = $$(document, 'div#auth>form input');
        const inputsNotInLogin = $$(document, 'div#auth>form input:not(input[name="email"],input[name="password"]');
        const redirect = $(document, 'div#auth>span#redirect');
        const title = $(document, 'head>title');

        if (string === 'login') {
            title.innerText = 'Login';

            for (const input of inputsNotInLogin) {
                const label = input.parentElement.firstElementChild;
                input.classList.add('hide');
                label.classList.add('hide');
            }

            button.innerText = 'Login';
            redirect.innerText = 'I don\'t have an account';

            doLoginForm();

        } else if (string === 'signup') {
            title.innerText = 'Sign Up';

            for (const input of inputsNotInLogin) {
                const label = input.parentElement.firstElementChild;
                input.classList.remove('hide');
                label.classList.remove('hide');
            }

            button.innerText = 'Sign Up';
            redirect.innerText = 'I already have an account';

            doSignUpForm();
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

    function doLoginForm() {
        const eValidationOutput = new ValidationOutput(emailInput.previousElementSibling);
        const pValidationOutput = new ValidationOutput(passwordInput.previousElementSibling);
        
        button.onclick = e => {
            e.preventDefault();
            _();
        };
        button.onkeydown = e => { 
            e.preventDefault();
            if (e.key === 'Enter') {
                _();
            }
        };

        function _() {
            validate();
            authenticate();
            eValidationOutput.print();
            pValidationOutput.print();
            // Redirect to user page if login is successful
            if (eValidationOutput.isEmpty() && pValidationOutput.isEmpty()) location = "./users.html"; 
        }

        function validate() {
            eValidationOutput.add("Email is required", emailInput.value === '' || emailInput.value === null);
            pValidationOutput.add("Password is required", passwordInput.value === '' || passwordInput.value === null);
        }

        // Check database for account details
        function authenticate() {
            const index = users.map(user => user.email).findIndex(value => value === emailInput.value);
            const user = users[index];

            eValidationOutput.add("No matching email", index === -1);
            pValidationOutput.add("Wrong password", (user || index >= 0) && passwordInput.value !== user.password);
        }
    }

    function doSignUpForm() {
        const givenNameInput = form.elements['given-name'];
        const familyNameInput = form.elements['family-name'];
        const contactInput = form.elements['contact'];
        const addressInput = form.elements['address'];

        let isValid = false;
        
        button.onclick = e => {
            e.preventDefault();
            isValid = validateUserInfo(form);
            _();
        }
        button.onkeydown = e => { 
            e.preventDefault();
            if (e.key === 'Enter') isValid = validateUserInfo(form);
            _();
        };

        function _() {
            if (isValid) {
                // Persist function
                const randomId = `U${generateRandomId(10)}`;
                const arrLength = users.push({
                    id: randomId,
                    email: emailInput.value,
                    password: passwordInput.value,
                    givenName: givenNameInput.value,
                    familyName: familyNameInput.value,
                    contact: contactInput.value,
                    address: addressInput.value,
                    dateCreated: new Date(),
                    dateUpdated: new Date(),
                    status: "active"
                });
                indexes[randomId] = arrLength - 1;
                data = [users, indexes];
                persist(STATE, data);

                location = "./users.html";
            }
        }
    }
}



