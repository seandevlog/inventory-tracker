const tableBody = document.getElementById("crud-table-body")
const addUserBtn = document.getElementById("add-user")
const modalWrapper = document.getElementById("modal-wrapper")
const modal = document.getElementById("modal")
const backArrow = document.getElementById("back-arrow")

// modal form
const crudForm = document.getElementById("crud-form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const contact = document.getElementById("contact")
const address = document.getElementById("address")
const statusWrapper = document.getElementById("status-wrapper")

let saveDataBtn = null

let currentErrorBox = null // saves the state of the current error box

for (let i = 0; i < localStorage.length; i++) {
    const newRow = tableBody.insertRow()
    const userKey = localStorage.key(i)             // email
    const userValue = localStorage.getItem(userKey) // string
    const userValueObj = JSON.parse(userValue)      // obj [password, name, contact, address]

    newRow.insertCell().innerHTML = '<img src="assets/image-solid-full.svg">'
    newRow.insertCell().textContent = userKey

    Object.entries(userValueObj).forEach(([key, value]) => {
        newRow.insertCell().textContent = value
    })

    // add action buttons per row
    // contain the userKey as an ID for each action button
    newRow.insertCell().innerHTML = 
        `<span class="action-icons">
            <img class="edit-btn" id=${userKey} src="./assets/pen-solid-full.svg">
            <img class="delete-btn" id=${userKey} src="./assets/trash-solid-full.svg">
        </span>`
}

const editUserBtn = document.querySelectorAll(".edit-btn") // declare after new rows with edit button has been created

addUserBtn.addEventListener('click', (e) => {
    e.preventDefault()

    statusWrapper.style.display = "none"

    modalWrapper.style.display = "flex"

    modal.querySelector("header h1").innerText = "Add User"

    // ensure all input placeholders are empty
    email.placeholder = ''
    password.placeholder = ''
    firstName.placeholder = ''
    lastName.placeholder = ''
    contact.placeholder = ''
    address.placeholder = ''

    saveDataBtn = document.createElement('input')
    saveDataBtn.type = "submit"
    saveDataBtn.className = "btn"
    saveDataBtn.value = "Save"

    crudForm.append(saveDataBtn)

    addUser();
})

editUserBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

        statusWrapper.style.display = "block"

        modalWrapper.style.display = "flex"

        modal.querySelector("header h1").innerText = "Edit User"

        // get the matching userKey for each action button id
        for (let i = 0; i < localStorage.length; i++) {
            const userKey = localStorage.key(i) // 
            const userValue = localStorage.getItem(userKey) // string
            const userValueObj = JSON.parse(userValue)      // obj [password, name, contact, address]

            if (userKey === btn.id) {
                email.placeholder = userKey
                password.placeholder = userValueObj
            }
        }
    })
})

// to close the modal
modalWrapper.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
        modalWrapper.style.display = "none" 
        if (saveDataBtn) {
            saveDataBtn.remove();
        }
    }
})

backArrow.addEventListener('click', (e) => {
    e.preventDefault()

    modalWrapper.style.display = "none"

    saveDataBtn.remove();
})

function addUser() {
    // check if modal is able to save a new data
    if (saveDataBtn != null) {
        saveDataBtn.addEventListener('click', (e) => {
            e.preventDefault()

            if((messages = validateInputs()) == false) {
                // function verified - show verified UX

                localStorage.setItem(email.value, JSON.stringify({
                    password: password.value,
                    firstName: firstName.value,
                    lastName: lastName.value,
                    contact: contact.value,
                    address: address.value
                }))
                
                // add function to parse data from temporary stored object
                // then make a modal function to store an object

                modalWrapper.style.display = "none"

                window.location.reload()
            } else {
                createErrorBox(messages)
            }
        })  
    }
}

// validates inputs
function validateInputs() {
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
}

// creates error box
function createErrorBox(messages) {

    const errorBox = document.createElement('div')

    errorBox.setAttribute("id", "errorBox")

    // set style of the error box
    Object.assign(errorBox.style, {
        display : "block",
        padding : "1em",
        width : "100%",
        background : "white",
        "font-size": "1em",
        border: "1px solid black"
    })

    const errorBoxText = document.createElement('span')
    
    errorBoxText.textContent = messages

    errorBox.append(errorBoxText)

    if (currentErrorBox != null) {
        currentErrorBox.remove()
    }

    currentErrorBox = errorBox

    if (currentErrorBox.innerText) {
        crudForm.append(currentErrorBox)
    }
}