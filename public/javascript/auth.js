import { $ } from './dom.js';

init();

function init() {
    toggleAuthForm();

    // TODO - try running and complete auth page with client-side validation then server-side validation

    async function toggleAuthForm(page = 'login') {
        const redirect = $(document, 'span#redirect');
        const form = $(document, 'form');
        
        let data = {};
        
        if (page === 'login') {
            data = await loginHandler(form);
        } else {
            data = await registerHandler(form);
        }

        redirect.onclick = async (e) => {
            if (page === 'login') {
                toggleAuthForm('signup');
                window.location.href = redirect.dataset.url;
            } else if (page === 'signup') {
                registerHandler(form);
                toggleAuthForm('login');
                window.location.href = redirect.dataset.url;
            }
        };
    }

    async function loginHandler(form) {
        const submitButton = $(form, 'button');
        const formData = new FormData(form);
        let data = {};

        submitButton.onclick = async (e) => {
            e.preventDefault();

            const errors = isValidated(formData);
            if (!errors) {
                const res = await fetch('/auth/login')
                data = await res.json();
            } else {
                showValidation(form, errors);
            }
        }

        return data;
    }

    async function registerHandler() {
        return data;
    }

    function isValidated(formData) {
        // TODO - add logic
        const errors = {};
        formData.keys().forEach(key => errors[key] = '');

        for(const entry of formData.entries()) {
            if (!entry[1]) errors[`${entry[0]}`] = `${entry[0].substring(0,1).toUpperCase()}${entry[0].substring(1)} is required`; 
        }

        return errors; // or errors object
    }

    function showValidation(form, errors) {
        for (const [key, value] of Object.entries(errors)) {
            const span = document.createElement('span');
            const inputEl = $(form, `input#${key}`) 
            inputEl.insertAdjacentElement('beforebegin', span);

            span.textContent = value;
        }
    }
}



