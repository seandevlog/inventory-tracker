/* ==============
    Login.js
================= */

init();

function init() {
    doLoginForm('#login>form');
}

function doLoginForm(formId) {
    const form = document.querySelector(formId);
    const email = form.elements['email'];
    const password = form.elements['password'];
    const button = form.elements['button'];
    /* const user = JSON.parse(localStorage.getItem("user")); */
    
    button.addEventListener('click', submitLoginForm);
    button.addEventListener('keydown', e => { if (e.key === 'Enter') return submitLoginForm});

    /* Redirects to user page if login is successful */
    function submitLoginForm(e) {
        e.preventDefault()

        if (email.value && password.value) {
            // window.location.href = "users.html";
            console.log("Login Successful")
        } else {
            doErrorBox("Invalid email or password");
        }
    }

    /* Creates error box */
    function doErrorBox(errors) {
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
        errorBoxText.textContent = errors;
        errorBox.append(errorBoxText);

        if(doErrorBox.current) doErrorBox.current.remove();
        doErrorBox.current = errorBox;
        form.append(doErrorBox.current);
    }
}

