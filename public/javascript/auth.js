import { $, $$ } from './dom.js';

init();

function init() {
    toggleAuthForm(window.location.pathname);

    // TODO - try running and complete auth path with client-side validation then server-side validation

    async function toggleAuthForm(path) {
        const redirect = $(document, 'span#redirect');
        const formEl = $(document, 'form');
        
        let data = {};
        
        if (path === '/login') {
            await authHandler(formEl, validateLogin, 
                async (formData) => await fetch('/auth/login', {
                    method: 'POST',
                    body: formData
                })
            );
        } else {
            await authHandler(formEl, validateRegister,
                async (formData) => await fetch('/auth/register', {
                    method: 'POST',
                    body: formData
                })
            );
        }

        redirect.onclick = async (e) => {
            if (path === '/login') {
                window.location.href = redirect.dataset.url;
            } else if (path === '/register') {
                window.location.href = redirect.dataset.url;
            }
        };
    }

    async function authHandler(formEl, validateCallback, fetchCallback) {
        const submitButton = $(formEl, 'button');
        let data = {};

        submitButton.onclick = async (e) => {
            e.preventDefault();

            const formData = new FormData(formEl);
            const errors = validateCallback(formEl);
            if (Object.values(errors).some(value => !value)) {
                const res = await fetchCallback(formData);
                data = await res.json();

                if (data.error) return showErrorBoxMessage(true, formEl, data.error);
                if (data.redirect) window.location.href = data.redirect;
            } else {
                showValidation(true, formEl, errors);
            }
        }

        return data;
    }

    function validateLogin(formEl) {
        const errors = {};
        const inputs = $$(formEl, 'input');

        for (const input of inputs) {
            errors[`${input.id}`] = !input.value ? `${input.dataset.id} is required`: '';
        }

        return errors;
    }

    // TODO - after refactoring with React, make a unified client-server-side validation
    function validateRegister(formEl) {
        const errors = {};
        const inputs = $$(formEl, 'input');

        for (const input of inputs) {
            errors[`${input.id}`] = !input.value ? `${input.dataset.id} is required`: '';
        }

        try {
            const passwordInput = $(formEl, 'input#password');
            if (!errors['password'] && passwordInput.value.length < 12) {
                errors['password'] = 'Password should have 12 or more characters';
                throw errors;
            }

            if (!errors['password'] && !passwordInput.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/)) {
                errors['password'] = 'Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols';
                throw errors;
            }
        } catch (e) {
            return e;
        }
        
        return errors;
    }

    function showValidation(display = true, formEl, errors) {
        if (!formEl || !errors || !display) {
            const spans = $$(document, 'form span#validation-error')
            for (const span of spans) {
                span.classList.add('hide');
            }
            return;
        }
        for (const [key, value] of Object.entries(errors)) {
            const inputEl = $(formEl, `input#${key}`)
            let span;
            for (const child of inputEl.parentElement.children) {
                if (child.tagName === 'SPAN') { 
                    span = child;  
                }
            } 
            span.classList.remove('hide'); 
            span.textContent = value;
        }
        showErrorBoxMessage(false);
    }

    function showErrorBoxMessage(display = true, formEl, error) {
        if (!formEl || !error || !display) {
            const div = $(document, 'form>div#error-box')
            div.classList.add('hide');
            return;
        }
        const div = $(formEl, 'div#error-box');
        div.textContent = error;
        div.classList.remove('hide');
        showValidation(false);
    }
}



