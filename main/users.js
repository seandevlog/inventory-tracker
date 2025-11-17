"use strict";

/* =====================
        Users.js
====================== */

const STATE = "user-key";

init();

function init() {
    const users = get(STATE);
    const data = users[0];
    const indexes = users[1];

    setModal(false);
    renderUsers(users);
    setCrudOps();

    function setCrudOps() {
        const form = document.querySelector('div#modal form');
        const idOutput = form.querySelector('span#user-id');
        const idLabel = idOutput.previousElementSibling;
        const emailInput = form.elements['email'];
        const passwordInput = form.elements['password'];
        const firstNameInput = form.elements['first-name'];
        const lastNameInput = form.elements['last-name'];
        const contactInput = form.elements['contact'];
        const addressInput = form.elements['address'];

        // Create
        const createButton = document.querySelector('div#users>main>button#create');
        createButton.onclick = createUser;
        
        function createUser() {
            idOutput.classList.add('hide');
            idLabel.classList.add('hide');

            setModal(true, 'Create User', () => {
                const randomId = `U${generateRandomId(10)}`;
                const arrLength = data.push({
                    id: randomId,
                    email: emailInput.value,
                    password: passwordInput.value,
                    firstName: firstNameInput.value,
                    lastName: lastNameInput.value,
                    contact: contactInput.value,
                    address: addressInput.value
                });
                indexes[randomId] = arrLength - 1; // [[[index], {id, email ...}], {id1: index}] 
                save();
            });
        }

        // Update
        const body = document.querySelector('table tbody');
        const rows = body.querySelectorAll('tr');

        for (const row of rows) {
            row.onclick = e => {
                e.preventDefault();

                idOutput.classList.remove('hide');
                idLabel.classList.remove('hide');

                idOutput.innerText = row.children[1].innerText;
                emailInput.value = row.children[2].innerText;
                passwordInput.value = row.children[3].innerText;
                firstNameInput.value = row.children[4].innerText;
                lastNameInput.value = row.children[5].innerText;
                contactInput.value = row.children[6].innerText;
                addressInput.value = row.children[7].innerText;

                setModal(true, 'Edit User', () => {
                    const rowId = row.children[1].innerText;
                    const index = indexes[rowId];
                    const curObj = data[index];

                    curObj.email = emailInput.value;
                    curObj.password = passwordInput.value;
                    curObj.firstName = firstNameInput.value;
                    curObj.lastName = lastNameInput.value;
                    curObj.contact = contactInput.value;
                    curObj.address = addressInput.value;

                    save();
                });

                passwordInput.type = "text";
            };
        }

        // TODO - Delete

        function save() {
            persist(STATE, users);
            location.reload();
        }
    }

    // Read
    function renderUsers(data) {
        const body = document.querySelector('table tbody');
        data[0].forEach(datum => {
            const newRow = body.insertRow();
            newRow.innerHTML = `
            <td></td>
            <td>${datum.id}</td>
            <td>${datum.email}</td>
            <td>${datum.password}</td>
            <td>${datum.firstName}</td>
            <td>${datum.lastName}</td>
            <td>${datum.contact}</td>
            <td>${datum.address}</td>`;
            newRow.classList.add('row','row:hover');
        })
    }
}

