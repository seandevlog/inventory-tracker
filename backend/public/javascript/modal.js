import { $, $$ } from './dom.js';
import { resetFields } from './handlers.js';
import globals from './globals.js';

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
    hideInputElements: [],
    showInputElements: [],
    data: {},
    imgUrl: '',
    set: function () {
        const modal = $(document, 'div#modal');
        const saveButton = $(modal, 'button#save');
        const deleteButton = $(modal, 'button#delete');
        const form = $(modal, 'form');
        const header = $(modal, 'header');
        const img = $(modal, 'fieldset#file>img');
        
        this.hideInputElements?.forEach(elementId => {
            const input = $(modal, `fieldset#info div:has(input#${elementId})`);
            input.classList.add('hide');
        })

        this.showInputElements?.forEach(elementId => {
            const input = $(modal, `fieldset#info div:has(input#${elementId})`);
            input.classList.remove('hide');
        })

        if (!this.imgUrl) {
            img.src = globals.defaultProfileUrl;
        } else {
            img.src = this.imgUrl;
        }


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
    show: (display) => showModal(display),
    reset: function () {
        // default
        this.data = {};
        this.title = '';
        this.hideInputElements = [];
        this.showInputElements = [];
        this.imgUrl = '';
    }
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
        resetFields(form);
        return;
    }

    modalWrapper.classList.remove('hide');

    // When user closes modal, inputs and errors are cleared
    closeButton.onclick = e => showModal(false);
    modalWrapper.onclick = e => { if (e.target === e.currentTarget) showModal(false) };
}

export default setModal;