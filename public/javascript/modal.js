import { $, clearForm } from './utils.js';

export const showModal = (display = true, title, saveOps, deleteOps) => {
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
        saveOps();
    }
    saveButton.onkeydown = e => { 
        if (e.key === 'Enter') {
            e.preventDefault();
            saveOps(); 
        }
    };

    // Delete
    deleteButton.onclick = e => {
        e.preventDefault();
        deleteOps();
    }

    // When user closes modal, inputs and errors are cleared
    closeButton.onclick = e => showModal(false);
    modalWrapper.onclick = e => { if (e.target === e.currentTarget) showModal(false) };
}