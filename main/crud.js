/* ==============
    Crud.js
================= */

init();

function init() {
    showModal(false);

    renderData();

    doCRUD();
}

function showModal(bool = true, title) {
    const modalWrapper = document.querySelector('div:has(>#modal)');

    if (bool) { 
        modalWrapper.classList.remove('hide');
        return doModal();
    }
    modalWrapper.classList.add('hide');

    function doModal() {
        const modal = document.querySelector('div#modal');
        const header = modal.querySelector('header');
        const closeButton = modal.querySelector('button#close');

        closeButton.onclick = e => showModal(false);
        modalWrapper.onclick = e => {
            if (e.target === e.currentTarget) showModal(false);
        }

        header.innerHTML = `<h1>${title}</h1>`;

        return modal;
    }
}

function renderData() {}

function doCRUD() {
    const createButton = document.querySelector('div#users>main>button#create');

    createButton.onclick = createUser;

    function createUser() {
        const modal = showModal(true, 'Create User');

        // TODO 2. - simulate localStorage as database

        const saveButton = modal.querySelector('button#save');
        const parentForm = modal.querySelector('form');
        const childForm = doUserInfo;
        childForm(parentForm);

        saveButton.addEventListener('click', childForm.validate);
        saveButton.addEventListener('keydown', e => { if (e.key === 'Enter') return childForm.validate});    

        // const state = {
        //     key: "users",
        //     value: JSON.stringify({
        //         "userId": "user1",
        //         "email": user.email,
        //         "password": user.password,
        //         "first-name": user.firstName,
        //         "last-name": user.lastName,
        //         "contact": user.contact,
        //         "address": user.address  
        //     })
        // };

        // saveButton.onclick = e => persist(state);
    }
}

/* User Data */
/* const email = document.getElementById("email")
const password = document.getElementById("password")
const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const contact = document.getElementById("contact")
const address = document.getElementById("address") */

//---------
// Modal
//---------
/* const modalWrapper = document.getElementById("modal-wrapper")
const modal = document.getElementById("modal") */

// modal parts
/* const modalHeader = modal.querySelector("header h1")
const statusWrapper = document.getElementById("status-wrapper")
const errorBox = document.getElementById("error-box") */

// open
/* const createUserBtn = document.getElementById("create-user-btn")
const editUserBtn = null
const saveDataBtn = document.getElementById("save-data-btn")

const closeModalBtn = document.getElementById("close-modal-btn")

function openModal(type) {

    if (type === "create") {
        modalHeader.innerText = "Create User"
        saveDataBtn.style.display = "block"
        statusWrapper.style.display = "none"
    } else if (type === "edit") {
        modalHeader.innerText = "Edit User"
        saveDataBtn.style.display = "none"
        statusWrapper.style.display = "block"
    }

    modalWrapper.style.display = "flex"
}

createUserBtn.addEventListener("click", (e) => {
    openModal("create")
}) */

/*
editUserBtn.addEventListener("click", (e) => {
    openModal("edit")
})
*/

// close

/* function closeModal() {
    modalWrapper.style.display = "none"
    modalHeader.innerText = ""
    saveDataBtn.style.display = "none"
    window.location.reload()
}

closeModalBtn.addEventListener("click", (e) => {
    closeModal()
})

modalWrapper.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
        closeModal()
    }
}) */

// validates inputs
/* function validateInputs() {
    let messages = []

    // email validation
    const emailRegex = /\w+\@\w+\.\w+/  // someone@example.com
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/

    if (email.value === "" || email.value == null) {
        messages.push("Email is required")
    } else if (emailRegex.test(email.value) == false) {
        messages.push("Email should be formatted as \"someone@example.com\"")
    }

    // password validation
    if (password.value === "" || password.value === null) {
        messages.push("Password is required")
    } else if (password.value.length < 12) {
        messages.push("Create a password at least 12 characters")
    } else if (passwordRegex.test(password.value) == false) {
        messages.push("Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols")
    }

    // first name validation
    if (firstName.value === "" || firstName.value === null) {
        messages.push("First name is required")
    }
    // last name validation
    if (lastName.value === "" || lastName.value === null) {
        messages.push("Last name is required")
    }
    // contact validation
    if (contact.value === "" || contact.value === null) {
        messages.push("Contact is required")
    }
    // address validation
    if (address.value === "" || address.value === null) {
        messages.push("Address is required")
    }

    return messages
} */

// creates error box
/* function createErrorBox(messages) {
    errorBox.style.display = "block"
    errorBox.textContent = messages
}

saveDataBtn.addEventListener("click", (e) => {

    if((messages = validateInputs()) == false) {
        // function verified - show verified UX

        // save data
        
        // add function to parse data from temporary stored object
        // then make a modal function to store an object

        closeModal()
    } else {
        createErrorBox(messages)
    }
}) */

//--------------------
// User Data Handling
// -------------------
