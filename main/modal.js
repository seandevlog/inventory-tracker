/* ====================
        Modal.js 
==================== */

function setModal(display = true, title, operation) {
    const modal = document.querySelector('div#modal');
    const header = modal.querySelector('header');
    const form = modal.querySelector('form');
    const closeButton = modal.querySelector('button#close');
    const saveButton = modal.querySelector('button#save');
    const inputs = form.querySelectorAll('fieldset#info input');
    const modalWrapper = modal.parentElement;
    let isValid = false;

    closeButton.onclick = e => setModal(false);
    modalWrapper.onclick = e => (e.target === e.currentTarget) ? setModal(false): null;

    saveButton.onclick = e => {
        e.preventDefault();
        if (isValid = validateUserInfo(form)) operation();
    }; 
    saveButton.onkeydown = e => { 
        e.preventDefault();
        if (e.key === 'Enter' && (isValid = validateUserInfo(form))) operation();
    };

    if (!display) {
        modalWrapper.classList.add('hide');
        if (setModal.isShown) {
            clearInputs(inputs);
        }
        setModal.isShown = false;
    } else {
        header.innerHTML = `<h1>${title}</h1>`;
        modalWrapper.classList.remove('hide');
        setModal.isShown = true;
    }
}
