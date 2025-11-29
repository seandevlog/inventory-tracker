import { $ } from './utils.js';

init();

function init() {
    toggleAuthForm();

    function toggleAuthForm(string = 'login') {
        const redirect = $(document, 'span#redirect');
        redirect.onclick = e => {
            if (string === 'login') {
                toggleAuthForm('signup');
                window.location.href = redirect.dataset.url;
            } else if (string === 'signup') {
                toggleAuthForm('login');
                window.location.href = redirect.dataset.url
            }
        };
    }
}



