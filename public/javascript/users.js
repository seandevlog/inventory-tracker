import { $, $$ } from './utils.js';
import { showModal } from './modal.js';

init();

function init() {
    showModal(false);

    const rows = $$(document, 'table>tbody tr');
    const users = getUsersFromRows(rows);
    handleFiltering(users);
    handleSorting(users);

    function getUsersFromRows(rows) {
        const users = [];
        for (const row of rows) {
            const info = {};
            for (const data of row.children) {
                if (data.dataset.id) info[data.dataset.id] = data.textContent;
            }
            Object.keys(row.dataset).map(key => info[key] = row.dataset[key])
            users.push(info)
        };
        return users;
    }

    const form = $(document, 'div#modal form');
    const deleteButton = $(modal, 'div#modal button#delete');

    // Create
    const createButton = $(document, 'div#users>main>button#create');
    createButton.onclick = () => {
        deleteButton.classList.add('hide');
        showModal(true, 'Create User', () => createUser());
    }

    async function createUser() {
        const res = await fetch('/users/store', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: form.elements['username'].value,
                password: form.elements['password'].value,
                givenName: form.elements['givenName'].value,
                familyName: form.elements['familyName'].value,
                contact: form.elements['contact'].value,
                address: form.elements['address'].value,
                status: form.elements['status'].value 
            })
        });
        
        const data = await res.json();
        const errors = handleInputErrors(data);
        if (errors == null) window.location.href = data.redirect;
    } 

    function handleInputErrors(data) {
        console.log(data.errors);
        if (typeof data.errors == 'undefined') return null;

        const errors = data.errors;
        const validationMessages = $$(form, 'span')
        for (const validationMessage of validationMessages) {
            // e.g. validationMessage.dataset.id = username
            // then, errors[validationMessage.dataset.id] = errors['username']
            validationMessage.textContent = errors[`${validationMessage.dataset.id}`];
        }
        return errors;
    }

    // Sets all user row's event listeners
    handleRowsOnclick(rows);
    function handleRowsOnclick(rows) {
        rows.forEach(row => {
            row.onclick = () => handleRowOnclick(row);
        }
    )}

    // get particular user's data from database using row values as reference and display those when modal opens
    async function handleRowOnclick(row) {
        const username = $(row, 'td[data-id="username"]').textContent;
        const res = await fetch(`/users/${username}`);

        const data = await res.json();

        // ! do not move this inside modal
        form.elements['username'].value = data.currentUser['username'];
        form.elements['password'].value = data.currentUser['password'];
        form.elements['givenName'].value = data.currentUser['givenName'];
        form.elements['familyName'].value = data.currentUser['familyName'];
        form.elements['contact'].value = data.currentUser['contact'];
        form.elements['address'].value = data.currentUser['address'];
        form.elements['status'].value = data.currentUser['status'];

        deleteButton.classList.remove('hide');
        showModal(true, 'Edit User', () => updateUser(data.currentUser['username']), () => deleteUser(data.currentUser['username']));
    }

    async function deleteUser(username) {
        const res = await fetch(`/users/${username}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        window.location.href = data.redirect;
    }

    // Gets username inside userInput.value, and update it directly using patch method and findOneAndUpdate
    async function updateUser(username) {
        const res = await fetch(`/users/${username}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: form.elements['username'].value,
                password: form.elements['password'].value,
                givenName: form.elements['givenName'].value,
                familyName: form.elements['familyName'].value,
                contact: form.elements['contact'].value,
                address: form.elements['address'].value,
                status: form.elements['status'].value 
            })
        });

        const data = await res.json();
        const errors = handleInputErrors(data);

        if (errors == null) window.location.href = data.redirect;
    }

    // All user properties can only be sorted one at a time
    // Sort can change sort image
    function handleSorting(users) {
        const [ usernameBtn, givenNameBtn, familyNameBtn, contactBtn, addressBtn ] = $$(document,'table>thead th:has(img)');
        
        const [ usernameSort, givenNameSort, familyNameSort, contactSort, addressSort ] = [ 
            createSort('username', usernameBtn, users), 
            createSort('givenName', givenNameBtn, users),
            createSort('familyName', familyNameBtn, users),
            createSort('contact', contactBtn, users),
            createSort('address', addressBtn, users)
        ];
        const siblingSorts = [ usernameSort, givenNameSort, familyNameSort, contactSort, addressSort ];

        usernameBtn.onclick = () => {
            usernameSort.reset(siblingSorts);
            usernameSort.toggle();
        }
        givenNameBtn.onclick = () => {
            givenNameSort.reset(siblingSorts);
            givenNameSort.toggle();
        }
        familyNameBtn.onclick = () => {
            familyNameSort.reset(siblingSorts);
            familyNameSort.toggle();
        }
        contactBtn.onclick = () => {
            contactSort.reset(siblingSorts);
            contactSort.toggle();
        }
        addressBtn.onclick = () => {
            addressSort.reset(siblingSorts);
            addressSort.toggle();
        }
    }

    function createSort(property, button, users) {
        return {
            current: 0,
            img: $(button, 'img'),
            toggle() {
                // noSort
                if (this.current === 2) {
                    this.current = 0;
                    users.sort((a,b) => Date.parse(b.created) - Date.parse(a.created));
                    this.img.src = "./assets/arrow-down-arrow-up.svg";
                // ascending
                } else if (this.current === 0) {
                    this.current = 1;
                    users.sort((a,b) => {
                        if (a[`${property}`] < b[`${property}`]) return -1;
                        if (a[`${property}`] > b[`${property}`]) return 1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-up-solid-full.svg";
                // descending
                } else if (this.current === 1) {
                    this.current = 2;
                    users.sort((a,b) => {
                        if (a[`${property}`] < b[`${property}`]) return 1;
                        if (a[`${property}`] > b[`${property}`]) return -1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-down-solid-full.svg";
                }

                renderTable(users);
            },
            reset(siblingSorts) {
                siblingSorts.forEach(_ => {
                    // e.g. if "this" is referencing username, then all others except username will be set back to no sort
                    if (_ != this) {
                        _.current = 2;
                        _.toggle();
                    };
                });
            }
        };
    } 

    // Read
    function renderTable(users) {
        const body = $(document, 'table tbody');
        body.innerHTML = "";

        users.forEach(user => {
            const newRow = body.insertRow();
            newRow.setAttribute('data-created', `${user.created}`); 
            newRow.setAttribute('data-updated', `${user.created}`);
            newRow.classList.add('row', 'row:hover');
            newRow.innerHTML = `
                <td></td>
                <td data-id='username'>${user.username}</td>
                <td data-id='givenName'>${user.givenName}</td>
                <td data-id='familyName'>${user.familyName}</td>
                <td data-id='contact'>${user.contact}</td>
                <td data-id='address'>${user.address}</td>
            `;
        })
        handleRowsOnclick(rows);
    }

    // Filter
    function handleFiltering(users) {
        const filter = $(document, 'main>select');
        filter.onchange = () => {
            if (filter.selectedOptions[0].value === 'no-filter') {
                renderTable(users);
                return;
            }
            const filteredUsers = users.filter(user => user.status === filter.selectedOptions[0].value);
            renderTable(filteredUsers);
        }
    }
}

