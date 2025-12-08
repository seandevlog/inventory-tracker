import { $, clearForm } from './utils.js';

export const setModal = {
    title: '',
    save: {
        callback: () => {},
        visibility: true
    },
    delete: {
        callback: () => {},
        visibility: true
    },
    data: {},
    set: function () {
        const modal = $(document, 'div#modal');
        const saveButton = $(modal, 'button#save');
        const deleteButton = $(modal, 'button#delete');
        const form = $(modal, 'form');
        const header = $(modal, 'header')

        header.textContent = this.title;
        writeInputElementValues(form, this.data);

        if (this.delete.visibility == false) { 
            deleteButton.classList.add('hide'); 
        } else {
            deleteButton.classList.remove('hide');
        }

        if (this.save.visibility == false) { 
            saveButton.classList.add('hide'); 
        } else {
            saveButton.classList.remove('hide');
        }

        // Save
        saveButton.onclick = e => {
            e.preventDefault();
            this.save.callback();
        }
        saveButton.onkeydown = e => { 
            if (e.key === 'Enter') {
                e.preventDefault();
                this.save.callback(); 
            }
        };

        // Delete
        deleteButton.onclick = (e) => {
            e.preventDefault();
            this.delete.callback();
        }
    },
    show: (display) => showModal(display)
}

const writeInputElementValues = (form, data) => {
    Object.keys(data).map(key => {
        if (typeof form.elements[key] === 'undefined') return
        const type = form.elements[key].type;
        if (type !== 'button' && type !== 'submit' && type !== 'reset' && type !== 'image' && type !== 'checkbox' && type !== 'radio' && type !== 'file' && type !== 'range' && type !== 'color' && type !== 'hidden') {
            form.elements[key].value = data[key];
        }
    })
}

const showModal = (display = true) => {
    const modal = $(document, 'div#modal');
    const modalWrapper = modal.parentElement;
    const closeButton = $(modal, 'button#close');
    const form = $(modal, 'form');

    if (!display) {
        modalWrapper.classList.add('hide');
        clearForm(form);
        return;
    }

    modalWrapper.classList.remove('hide');

    // When user closes modal, inputs and errors are cleared
    closeButton.onclick = e => showModal(false);
    modalWrapper.onclick = e => { if (e.target === e.currentTarget) showModal(false) };
}

export default setModal;