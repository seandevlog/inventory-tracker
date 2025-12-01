import { $, $$ } from './utils.js';
import { showModal } from './modal.js';

init();

function init() {
    showModal(false);
    // setSort();
    // setFilter();

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
    const rows = $$(document, 'table>tbody tr');
    setAllRowsOnclick(rows);

    function setAllRowsOnclick(rows) {
        rows.forEach(row => {
            row.onclick = () => setRowOnclick(row);
        }
    )}

    // get particular user's data from database using row values as reference and display those when modal opens
    async function setRowOnclick(row) {
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

