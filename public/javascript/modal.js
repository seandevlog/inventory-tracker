import { $, clearForm } from './utils.js';

export const showModal = (display = true, title, saveCallback, deleteCallback) => {
    const modal = $(document, 'div#modal');
    const modalWrapper = modal.parentElement;
    const header = $(modal, 'header');
    const closeButton = $(modal, 'button#close');
    const saveButton = $(modal, 'button#save');
    const deleteButton = $(modal, 'button#delete');
    const form = $(modal, 'form');

    if (!display) {
        modalWrapper.classList.add('hide');
        clearForm(form);
        return;
    }

    modalWrapper.classList.remove('hide');
    header.textContent = title;

    // Save
    saveButton.onclick = e => {
        e.preventDefault();
        saveCallback();
    }
    saveButton.onkeydown = e => { 
        if (e.key === 'Enter') {
            e.preventDefault();
            saveCallback(); 
        }
    };

    // Delete
    if (deleteCallback) deleteButton.onclick = (e) => {
        e.preventDefault;
        deleteCallback();
    }

    // When user closes modal, inputs and errors are cleared
    closeButton.onclick = e => showModal(false);
    modalWrapper.onclick = e => { if (e.target === e.currentTarget) showModal(false) };
}