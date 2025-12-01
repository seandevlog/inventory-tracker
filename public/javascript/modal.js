import { $, $$, clearForm } from './utils.js';

export const showModal = (display = true, title, saveOps) => {
    const modal = $(document, 'div#modal');
    const modalWrapper = modal.parentElement;
    const header = $(modal, 'header');
    const closeButton = $(modal, 'button#close');
    const saveButton = $(modal, 'button#save');
    const form = $(modal, 'form');

    // Save
    saveButton.onclick = e => saveOps(e);
    saveButton.onkeydown = e => { if (e.key === 'Enter') saveOps(e) };
    // saveButton.onkeydown = e => { 
    //     e.preventDefault();
    //     if (e.key === 'Enter')
            //  && (isValid = validateUserInfo(form))) 
    //     saveOps();
    // };

    // When user closes modal, inputs and errors should be cleared
    // Close modal
    closeButton.onclick = e => showModal(false);
    modalWrapper.onclick = e => { if (e.target === e.currentTarget) showModal(false) };

    if (display) {
        modalWrapper.classList.remove('hide');
        header.textContent = title;
    } else {
        modalWrapper.classList.add('hide');
        clearForm(form);
    }
}

// !DO NOT DELETE until all user crud ops are done
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
        // if (isValid = validateUserInfo(form)) 
        saveOps();
    }; 
    saveButton.onkeydown = e => { 
        e.preventDefault();
        if (e.key === 'Enter')
            //  && (isValid = validateUserInfo(form))) 
        saveOps();
    };

    deleteButton.onclick = e => {
        e.preventDefault();
        deleteOps();
    }

    if (!display) {
        modalWrapper.classList.add('hide');
        if (setModal.isShown && inputs) {
            // clearInputs(inputs);
        }
        setModal.isShown = false;
    } else {
        header.innerHTML = `<h1>${title}</h1>`;
        modalWrapper.classList.remove('hide');
        form.elements['password'].type = 'password';
        setModal.isShown = true;
    }
}