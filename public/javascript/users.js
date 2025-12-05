import { $, $$, handleInputErrors } from './utils.js';
import { showModal } from './modal.js';
import { uploadImageSigned, replaceImageSigned } from './cloud.js';

init();

function init() {
    showModal(false);

    const rows = $$(document, 'table>tbody tr');
    const form = $(document, 'div#modal form');
    const deleteButton = $(modal, 'div#modal button#delete');
    const createButton = $(document, 'div#users>main>button#create');
    const users = getUsersFromRows(rows);
    handleFiltering(users);
    handleSorting(users);
    handleRowsOnclick(rows);

    // Create
    createButton.onclick = (e) => {
        e.preventDefault();
        deleteButton.classList.add('hide');
        showModal(true, 'Create User', () => createUser());
    }

    function getUsersFromRows(rows) {
        const users = [];
        for (const row of rows) {
            const info = {};
            for (const data of row.children) {
                if (data.dataset.id) info[data.dataset.id] = data.dataset.value;
            }
            Object.keys(row.dataset).map(key => info[key] = row.dataset[key])
            users.push(info)
        };
        return users;
    }

    async function createUser() {
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]) {
            const profile = form.elements['profile'].files[0];
            const profileData = await uploadImageSigned(profile);
            formData.append('profile[url]', profileData.secure_url);
            formData.append('profile[public_id]', profileData.public_id);
        }

        const res = await fetch('/users/store', {
            method: 'POST',
            body: formData
        });
        
        if (!res.ok) throw new Error('Failed to store user data');
        
        const data = await res.json();
        console.log(data.error);
        const errors = handleInputErrors(data);
        if (errors == null) {
            window.location.href = data.redirect;
            init();
        }
    } 

    // Gets username inside userInput.value, and update it directly using patch method and findOneAndUpdate
    async function updateUser(username) {
        const image = form.elements['profile'].files[0];
        // TODO - extract publicId from database OR html dataset
        const publicId;
        const imageData = await replaceImageSigned(image, publicId);
        const formData = new FormData(form);

        const res = await fetch(`/users/${username}`, {
            method: 'PATCH',
            body: formData
        });

        if (!res.ok) throw new Error('Failed to updated user data');

        const data = await res.json();
        console.log(data.error);
        const errors = handleInputErrors(data);

        if (errors == null) window.location.href = data.redirect;
    }

    async function deleteUser(username) {
        const res = await fetch(`/users/${username}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        console.log(data.error)
        window.location.href = data.redirect;
        init();
    }

    function handleRowsOnclick(rows) {
        rows.forEach(row => {
            row.onclick = () => handleRowOnclick(row);
        }
    )}

    // get particular user's data from database using row values as reference and display those when modal opens
    // TODO - Find a way to move some of this function's content inside the modal function directly
    async function handleRowOnclick(row) {
        const rowData = $$(row, 'td');
        const img = $(modal, 'fieldset#file img');

        for (const data of rowData) {
            if (data.dataset.id !== 'profile') {
                form.elements[data.dataset.id].value = data.dataset.value;
            } else {
                img.src = data.dataset.value;
            }
        }

        const username = $(row, 'td[data-id="username"]').textContent;
        const res = await fetch(`/users/${username}`);
        const data = await res.json();

        form.elements['password'].value = data.user['password'];

        deleteButton.classList.remove('hide');
        showModal(true, 'Edit User', () => updateUser(data.user['username'], data.user.profile.public_id), () => deleteUser(data.user['username']));
    }

    // All user properties can only be sorted one at a time
    // Sort can change sort profile
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
                <td data-id="profile"><img src='${user.profile}' alt=''></td>
                <td data-id='username'>${user.username}</td>
                <td data-id='givenName'>${user.givenName}</td>
                <td data-id='familyName'>${user.familyName}</td>
                <td data-id='contact'>${user.contact}</td>
                <td data-id='address'>${user.address}</td>
            `;
        })
        handleRowsOnclick(rows);
    }
}

