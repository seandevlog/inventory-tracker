"use strict";

/* =====================
        Users.js
====================== */

const STATE = "user-key";

init();

function init() {
    let data = get(STATE);
    let [ users, indexes ] = data;

    setModal(false);
    renderTable(users);
    setSort();
    setFilter();

    const form = $(document, 'div#modal form');
    const idElement = $(form, 'span#user-id');
    const idWrapper = idElement.parentElement;
    const emailInput = form.elements['email'];
    const passwordInput = form.elements['password'];
    const firstNameInput = form.elements['first-name'];
    const lastNameInput = form.elements['last-name'];
    const contactInput = form.elements['contact'];
    const addressInput = form.elements['address'];
    const deleteButton = $(modal, 'div#modal button#delete');

    // Create
    const createButton = $(document, 'div#users>main>button#create');
    createButton.onclick = () => {
        idWrapper.classList.add('hide');
        deleteButton.classList.add('hide');

        setModal(true, 'Create User', () => {
            const randomId = `U${generateRandomId(10)}`;
            const arrLength = users.push({
                id: randomId,
                email: emailInput.value,
                password: passwordInput.value,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                contact: contactInput.value,
                address: addressInput.value,
                dateCreated: new Date(),
                dateUpdated: new Date()
            });
            indexes[randomId] = arrLength - 1; // [[[index], {id1, email1 ...}], {id1: index}] 
            save();
        });
    }

    // Read
    function renderTable(users) {
        const body = $(document, 'table tbody');
        body.innerHTML = "";
        users.forEach(user => {
            const newRow = body.insertRow();
            newRow.innerHTML = `
            <td></td>
            <td>${user.id}</td>
            <td>${user.email}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.contact}</td>
            <td>${user.address}</td>`;
            newRow.classList.add('row','row:hover');

            newRow.onclick = e => {
                e.preventDefault();

                idWrapper.classList.remove('hide');
                deleteButton.classList.remove('hide');

                idElement.innerText = user.id;
                emailInput.value = user.email;
                passwordInput.value = user.password;
                firstNameInput.value = user.firstName;
                lastNameInput.value = user.lastName;
                contactInput.value = user.contact;
                addressInput.value = user.address;

                // Update & Delete
                setModal(true, 'Edit User', () => {
                    const rowId = idElement.innerText;
                    const index = indexes[rowId];
                    const user = users[index];

                    user.email = emailInput.value;
                    user.password = passwordInput.value;
                    user.firstName = firstNameInput.value;
                    user.lastName = lastNameInput.value;
                    user.contact = contactInput.value;
                    user.address = addressInput.value;
                    user.dateCreated = user.dateCreated;
                    user.dateUpdated = new Date();

                    save();
                }, () => {
                    const idx = indexes[user.id];
                    delete indexes[user.id];
                    users.splice(idx, 1);

                    data = [users, indexes];
                    save();
                });

                passwordInput.type = "text";
            };
        })
    }

    function save() {
        persist(STATE, data);
        location.reload();
    }

    // All user properties can only be sorted one at a time
    // Sort image changes
    function setSort() {
        const [ emailBtn, firstNameBtn, lastNameBtn, contactBtn, addressBtn ] = $$(document,'table>thead th:has(img)');
        
        const [ emailSort, firstNameSort, lastNameSort, contactSort, addressSort ] = [ 
            createSort('email', emailBtn), 
            createSort('firstName', firstNameBtn),
            createSort('lastName', lastNameBtn),
            createSort('contact', contactBtn),
            createSort('address', addressBtn)
        ];

        emailBtn.onclick = e => {
            e.preventDefault();
            emailSort.reset();
            emailSort.toggle();
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
                    [ emailSort, firstNameSort, lastNameSort, contactSort, addressSort ].forEach(_ => {
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

    // TODO 
    function setFilter() {
        
    } 

    function setModal(display = true, title, saveOps, deleteOps) {
        const modal = $(document, 'div#modal');
        const header = $(modal, 'header');
        const form = $(modal, 'form');
        const closeButton = $(modal, 'button#close');
        const saveButton = $(modal, 'button#save');
        const deleteButton = $(modal, 'button#delete');
        const inputs = $$(form, 'fieldset#info input');
        const modalWrapper = modal.parentElement;
        let isValid = false;

        closeButton.onclick = e => setModal(false);
        modalWrapper.onclick = e => (e.target === e.currentTarget) ? setModal(false): null;

        saveButton.onclick = e => {
            e.preventDefault();
            if (isValid = validateUserInfo(form)) saveOps();
        }; 
        saveButton.onkeydown = e => { 
            e.preventDefault();
            if (e.key === 'Enter' && (isValid = validateUserInfo(form))) saveOps();
        };

        deleteButton.onclick = e => {
            e.preventDefault();
            deleteOps();
        }

        if (!display) {
            modalWrapper.classList.add('hide');
            if (setModal.isShown && inputs) {
                clearInputs(inputs);
            }
            setModal.isShown = false;
        } else {
            header.innerHTML = `<h1>${title}</h1>`;
            modalWrapper.classList.remove('hide');
            form.elements['password'].type = 'password';
            setModal.isShown = true;
        }
    }
}

