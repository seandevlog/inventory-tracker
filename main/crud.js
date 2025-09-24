const tableBody = document.getElementById("crud-table-body")
const addUserBtn = document.getElementById("add-user")
const editUserBtn = document.querySelectorAll(".edit-btn")
const modalWrapper = document.getElementById("modal-wrapper")
const modal = document.getElementById("modal")
const backArrow = document.getElementById("back-arrow")

// modal form
const crudForm = document.getElementById("crud-form")
const userId = document.getElementById("user-id")
const password = document.getElementById("password")
const legalName = document.getElementById("legal-name")
const email = document.getElementById("email")
const contact = document.getElementById("contact")
const address = document.getElementById("address")
const statusWrapper = document.getElementById("status-wrapper")

let saveDataBtn = null
let userCounter = 0

addUserBtn.addEventListener('click', (e) => {
    e.preventDefault()

    statusWrapper.style.display = "none"

    modalWrapper.style.display = "flex"

    modal.querySelector("header h1").innerText = "Add User"

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
    if (saveDataBtn != null) {
        saveDataBtn.addEventListener('click', (e) => {
            e.preventDefault()
        
            localStorage.setItem("user" + ++userCounter,JSON.stringify({
                userId: userId.value,
                password: password.value,
                legalName: legalName.value,
                email: email.value,
                contact: contact.value,
                address: address.value
            }))
            
            // const newRow = tableBody.insertRow()
            // newRow.insertCell().textContent = "123"
            // newRow.insertCell().textContent = "123"

            // add function to parse data from temporary stored object
            // then make a modal function to store an object
        })  
    }
}