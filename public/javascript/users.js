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
    const users = getUsersFromRows(rows); // [[],{}]
    // users[0]; // [{ id, created, updated, info: { username: { name: username, value: 'username',... }, ...}},...]
    // users[1]; // { id: index,... }
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
        const users = []; // [[],{}] length = 0
        const indexes = {};
        for (const row of rows) {
            const user = {}; // {}
            indexes[row.dataset.id] = users.length // { id: index }
            user = { ...row.dataset }; // { id: id,... }
            user['info'] = {}; // { id: id, info: {}}
            let idx = 0;
            for (const data of row.children) {
                if (data.dataset) Object.keys(data.dataset).map(key => user['info'][data.dataset.name] = { ...data.dataset, columnIdx: idx++ });
            } // { id, info: { username: { name: username, value: 'username', columnIdx... }, ...}}
            users[0].push(user);
        } // [[{ id, info: { username: { name: username, value: 'username',... }, ...}},...], { id: index, ...}]
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
        const errors = handleInputErrors(data);
        if (errors == null) {
            window.location.href = data.redirect;
            init();
        }
    } 

    // Gets id inside userInput.value, and update it directly using patch method and findOneAndUpdate
    async function updateUser(id) {
        const [ usersInfo, usersIndexes ] = users;
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]); {
            const image = form.elements['profile'].files[0];
            const index = usersIndexes[id];
            const publicId = usersInfo[index].info.profile.public_id;
            const imageData = await replaceImageSigned(image, publicId);
            formData.append('profile[url]', imageData.secure_url);
            formData.append('profile[public_id]', imageData.public_id);
        }

        const res = await fetch(`/users/${id}`, {
            method: 'PATCH',
            body: formData
        });

        if (!res.ok) throw new Error('Failed to update user data');

        const data = await res.json();
        const errors = handleInputErrors(data);

        if (errors == null) {
            window.location.href = data.redirect;
            init();
        }
    }

    async function deleteUser(id) {
        const res = await fetch(`/users/${id}`, {
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
        const id = row.dataset.id;
        const res = await fetch(`/users/${id}`);
        const data = await res.json();

        form.elements['password'].value = data.user['password'];

        deleteButton.classList.remove('hide');
        showModal(true, 'Edit User', () => updateUser(data.user['_id'], data.user.profile.public_id), () => deleteUser(data.user['_id']));
    }

    // All user properties can only be sorted one at a time
    // Sort can change sort profile
    function handleSorting(arr) {
        const [ usersInfo, usersIndexes ] = arr;
        const [ usernameBtn, givenNameBtn, familyNameBtn, contactBtn, addressBtn ] = $$(document,'table>thead th:has(img)');
        
        const [ usernameSort, givenNameSort, familyNameSort, contactSort, addressSort ] = [ 
            createSortObject('username', usernameBtn, usersInfo, usersIndexes), 
            createSortObject('givenName', givenNameBtn, usersInfo, usersIndexes),
            createSortObject('familyName', familyNameBtn, usersInfo, usersIndexes),
            createSortObject('contact', contactBtn, usersInfo, usersIndexes),
            createSortObject('address', addressBtn, usersInfo, usersIndexes)
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

    function createSortObject(property, button, arr, indexes) {
        return {
            current: 0,
            img: $(button, 'img'),
            toggle() {
                let sortedArr;
                // noSort
                if (this.current === 2) {
                    this.current = 0;
                    sortedArr = arr.sort((a,b) => Date.parse(b.created) - Date.parse(a.created));
                    this.img.src = "./assets/arrow-down-arrow-up.svg";
                // ascending
                } else if (this.current === 0) {
                    this.current = 1;
                    sortedArr = arr.sort((a,b) => {
                        if (a[`info[${property}][value]`] < b[`info[${property}][value]`]) return -1;
                        if (a[`info[${property}][value]`] > b[`info[${property}][value]`]) return 1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-up-solid-full.svg";
                // descending
                } else if (this.current === 1) {
                    this.current = 2;
                    sortedArr = arr.sort((a,b) => {
                        if (a[`info[${property}][value]`] < b[`info[${property}][value]`]) return 1;
                        if (a[`info[${property}][value]`] > b[`info[${property}][value]`]) return -1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-down-solid-full.svg";
                }
                for (let i = 0; i < sortedArr.length; i++) {
                    indexes = {};
                    indexes[sortedArr[i].id] = i;
                }

                renderTable(arr);
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
    function handleFiltering(arr) {
        const [ arrInfo, arrIndexes ] = arr;
        const filter = $(document, 'main>select');
        filter.onchange = () => {
            if (filter.selectedOptions[0].value === 'no-filter') {
                renderTable(arrInfo);
                return;
            }
            const filteredArr = users.filter(user => user.status === filter.selectedOptions[0].value);
            renderTable(filteredArr);
        }
    }

    // Read
    // users[0]; // [{ id, created, updated, info: { username: { name: username, value: 'username', columnIdx... }, ...}},...]
    function renderTable(arr) {
        const body = $(document, 'table tbody');
        body.innerHTML = "";

        arr.forEach(objElement => {
            const newRow = body.insertRow();
            Object.keys(objElement).map(key => {
                if (key !== 'info') newRow.setAttribute(`data-${key}`, objElement[key]);
            });

            // TODO - make the info object value an array 
            Object.keys(objElement.info).map(key => {
                newRow.insertCell().setAttribute(``)
            })
            newRow.innerHTML = `
                <td data-id="profile"><img src='${user.profile}' alt=''></td>
                <td data-id='username'>${user.username}</td>
                <td data-id='givenName'>${user.givenName}</td>
                <td data-id='familyName'>${user.familyName}</td>
                <td data-id='contact'>${user.contact}</td>
                <td data-id='address'>${user.address}</td>
            `;
            newRow.classList.add('row', 'row:hover');
        })
        handleRowsOnclick(rows);
    }
}

