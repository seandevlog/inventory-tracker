import { $, $$ } from './utils.js';

export const setModal = (display = true, title, saveOps, deleteOps) => {
    const modal = $(document, 'div#modal');
    const header = $(modal, 'header');
    const form = $(modal, 'form');
    const closeButton = $(modal, 'button#close');
    const saveButton = $(modal, 'button#save');
    const deleteButton = $(modal, 'button#delete');
    const inputs = $$(form, 'fieldset#info input');
    const modalWrapper = modal.parentElement;
    let isValid = false;

    closeButton.onclick = e => setModal(false);
    modalWrapper.onclick = e => (e.target === e.currentTarget) ? setModal(false): null;

    saveButton.onclick = e => {
        e.preventDefault();
        if (isValid = validateUserInfo(form)) saveOps();
    }; 
    saveButton.onkeydown = e => { 
        e.preventDefault();
        if (e.key === 'Enter' && (isValid = validateUserInfo(form))) saveOps();
    };

    deleteButton.onclick = e => {
        e.preventDefault();
        deleteOps();
    }

    if (!display) {
        modalWrapper.classList.add('hide');
        if (setModal.isShown && inputs) {
            clearInputs(inputs);
        }
        setModal.isShown = false;
    } else {
        header.innerHTML = `<h1>${title}</h1>`;
        modalWrapper.classList.remove('hide');
        form.elements['password'].type = 'password';
        setModal.isShown = true;
    }
}