"use strict";

/* =====================
        Users.js
====================== */

const STATE = "user-key";

init();

function init() {
    const users = get(STATE);
    
    setModal(false);
    renderData(users);
    setCrudOps();

    function setCrudOps() {
        const form = document.querySelector('form');

        const createButton = document.querySelector('div#users>main>button#create');
        createButton.onclick = createUser;

        function createUser() {
            setModal(true, 'Create User', () => {
                users.push({
                    email: form.elements['email'].value,
                    password: form.elements['password'].value,
                    firstName: form.elements['first-name'].value,
                    lastName: form.elements['last-name'].value,
                    contact: form.elements['contact'].value,
                    address: form.elements['address'].value
                });
                save();
            });
        }

        // TODO - Read
        // TODO - Update
        // TODO - Delete

        function save() {
            persist(STATE, users);
            setModal(false);
        }
    }

    function renderData(data) {}
}

