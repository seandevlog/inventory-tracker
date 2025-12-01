// import { get, persist } from './database.js';
// import { validateUserInfo } from './validation.js';
import { $, $$ } from './utils.js';
import { showModal } from './modal.js';

// const STATE = "user-key";

init();

function init() {
    // let data = get(STATE);
    // let [ users, indexes ] = data;

    // setModal(false);
    showModal(false);
    // renderTable(users);
    // setSort();
    // setFilter();

    const form = $(document, 'div#modal form');
    // const idElement = $(form, 'span#user-id');
    // const idWrapper = idElement.parentElement;
    // const usernameInput = form.elements['username'];
    // const passwordInput = form.elements['password'];
    // const givenNameInput = form.elements['given-name'];
    // const familyNameInput = form.elements['family-name'];
    // const contactInput = form.elements['contact'];
    // const addressInput = form.elements['address'];
    // const selectedStatus = form.elements['status'];
    const deleteButton = $(modal, 'div#modal button#delete');

    // Create
    const createButton = $(document, 'div#users>main>button#create');
    // open modal with create function
    createButton.onclick = () => {
        // idWrapper.classList.add('hide');
        deleteButton.classList.add('hide');

        showModal(true, 'Create User', async (e) => {
            e.preventDefault();

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
            
            handleErrors(res);

            // const userInputs = data.body;
            // const inputs = $$(form, 'fieldset#info inputs')
            // for (const input of inputs) {
            //     input.value = userInputs[`${userInputs.dataset.id}`];
            // }
        });
        // setModal(true, 'Create User', async () => {
            // const randomId = `U${generateRandomId(10)}`;
            // const arrLength = users.push({
                // id: randomId,
            //     username: usernameInput.value,
            //     password: passwordInput.value,
            //     givenName: givenNameInput.value,
            //     familyName: familyNameInput.value,
            //     contact: contactInput.value,
            //     address: addressInput.value,
            //     dateCreated: new Date(),
            //     dateUpdated: new Date(),
            //     status: selectedStatus.value
            // });
            // indexes[randomId] = arrLength - 1; // [[[index], {id1, username1 ...}], {id1: index}] 
            // save();
            // const res = await fetch('/users/store', {
            //     username: usernameInput.value,
            //     password: passwordInput.value,
            //     givenName: givenNameInput.value,
            //     familyName: familyNameInput.value,
            //     contact: contactInput.value,
            //     address: addressInput.value,
            // });

        // });
    }

    async function handleErrors(response) {
        const data = await response.json();

        // Handle errors
        const errors = data.errors;
        const validationMessages = $$(form, 'span')
        for (const validationMessage of validationMessages) {
            // e.g. validationMessage.dataset.id = username
            // then, errors[validationMessage.dataset.id] = errors['username']
            validationMessage.textContent = errors[`${validationMessage.dataset.id}`];
        } 
    }

    // Read
    // function renderTable(users) {
    //     
    //     body.innerHTML = "";
    //     users.forEach(user => fillRow(row))
    // }

    const rows = $$(document, 'table>tbody tr');
    setAllRowsOnclick(rows);

    function setAllRowsOnclick(rows) {
        rows.forEach(row => {
            // const newRow = body.insertRow();
            // newRow.innerHTML = `
            // <td></td>
            // <td>${user.id}</td>
            // <td>${user.username}</td>
            // <td>${user.givenName}</td>
            // <td>${user.familyName}</td>
            // <td>${user.contact}</td>
            // <td>${user.address}</td>`;
            // newRow.classList.add('row','row:hover');

            row.onclick = () => setRowOnclick(row);
        }
    )}

    async function setRowOnclick(row) {
        // idWrapper.classList.remove('hide');
        deleteButton.classList.remove('hide');

        // usernameInput.value = row.username;
        // passwordInput.value = row.password;
        // givenNameInput.value = row.givenName;
        // familyNameInput.value = row.familyName;
        // contactInput.value = row.contact;
        // addressInput.value = row.address;

        // get specific user's data from database and display the values when modal opens
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

        showModal(true, 'Edit User', () => updateUser(data.currentUser['username']));

        // Update & Delete
        // setModal(true, 'Edit User', {} , () => {
        //     const idx = indexes[user.id];
        //     delete indexes[user.id];
        //     users.splice(idx, 1);

        //     data = [users, indexes];
        //     save();
        // });

        // passwordInput.type = "text";
    }

    async function updateUser(username) {
        // TODO - get username inside userInput.value, and update it directly using patch method and findOneAndUpdate
        const res = await fetch(`/users/${username}`, {
            method: 'PATCH',
            body: JSON.stringify({
                username: form.elements['username'].value,
                password: form.elements['password'].value,
                givenName: form.elements['givenName'].value,
                familyName: form.elements['familyName'].value,
                contact: form.elements['contact'].value,
                address: form.elements['address'].value,
                status: form.elements['status'].value 
            })
        })

        handleErrors(res);

        // const rowId = idElement.innerText;
        // const index = indexes[rowId];
        // const user = users[index];

        // user.username = usernameInput.value;
        // user.password = passwordInput.value;
        // user.givenName = givenNameInput.value;
        // user.familyName = familyNameInput.value;
        // user.contact = contactInput.value;
        // user.address = addressInput.value;
        // user.dateCreated = user.dateCreated;
        // user.dateUpdated = new Date();
        // user.status = selectedStatus.value;

        // save();
    }

    function save() {
        persist(STATE, data);
        location.reload();
    }

    // All user properties can only be sorted one at a time
    // Sort image changes
    function setSort() {
        const [ usernameBtn, firstNameBtn, lastNameBtn, contactBtn, addressBtn ] = $$(document,'table>thead th:has(img)');
        
        const [ usernameSort, firstNameSort, lastNameSort, contactSort, addressSort ] = [ 
            createSort('username', usernameBtn), 
            createSort('givenName', firstNameBtn),
            createSort('familyName', lastNameBtn),
            createSort('contact', contactBtn),
            createSort('address', addressBtn)
        ];

        usernameBtn.onclick = e => {
            e.preventDefault();
            usernameSort.reset();
            usernameSort.toggle();
        }
        firstNameBtn.onclick = e => {
            e.preventDefault();
            firstNameSort.reset();
            firstNameSort.toggle();
        }
        lastNameBtn.onclick = e => {
            e.preventDefault();
            lastNameSort.reset();
            lastNameSort.toggle();
        }
        contactBtn.onclick = e => {
            e.preventDefault();
            contactSort.reset();
            contactSort.toggle();
        }
        addressBtn.onclick = e => {
            e.preventDefault();
            addressSort.reset();
            addressSort.toggle();
        }

        function createSort(property, button) {
            return {
                current: 0,
                img: $(button, 'img'),
                toggle() {
                    // noSort
                    if (this.current === 2) {
                        this.current = 0;
                        users.sort((a,b) => Date.parse(b.dateCreated) - Date.parse(a.dateCreated));
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
                reset() {
                    [ usernameSort, firstNameSort, lastNameSort, contactSort, addressSort ].forEach(_ => {
                        // if not self => no sort
                        if (_ != this) {
                            _.current = 2;
                            _.toggle();
                        }
                    })
                }
            };
        } 
    }

    // Filter
    function setFilter() {
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

    // function setModal(display = true, title, saveOps, deleteOps) {
    //     const modal = $(document, 'div#modal');
    //     const header = $(modal, 'header');
    //     const form = $(modal, 'form');
    //     const closeButton = $(modal, 'button#close');
    //     const saveButton = $(modal, 'button#save');
    //     const deleteButton = $(modal, 'button#delete');
    //     const inputs = $$(form, 'fieldset#info input');
    //     const modalWrapper = modal.parentElement;
    //     let isValid = false;

    //     closeButton.onclick = e => setModal(false);
    //     modalWrapper.onclick = e => (e.target === e.currentTarget) ? setModal(false): null;

    //     saveButton.onclick = e => {
    //         e.preventDefault();
    //         if (isValid = validateUserInfo(form)) saveOps();
    //     }; 
    //     saveButton.onkeydown = e => { 
    //         e.preventDefault();
    //         if (e.key === 'Enter' && (isValid = validateUserInfo(form))) saveOps();
    //     };

    //     deleteButton.onclick = e => {
    //         e.preventDefault();
    //         deleteOps();
    //     }

    //     if (!display) {
    //         modalWrapper.classList.add('hide');
    //         if (setModal.isShown && inputs) {
    //             clearInputs(inputs);
    //         }
    //         setModal.isShown = false;
    //     } else {
    //         header.innerHTML = `<h1>${title}</h1>`;
    //         modalWrapper.classList.remove('hide');
    //         form.elements['password'].type = 'password';
    //         setModal.isShown = true;
    //     }
    // }
}

