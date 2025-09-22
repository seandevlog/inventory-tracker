const tableBody = document.getElementById("crud-table-body")
const addUser = document.getElementById("add-user")
const editUser = document.querySelectorAll(".edit-btn")
const modalWrapper = document.getElementById("modal-wrapper")
const modal = document.getElementById("modal")

addUser.addEventListener('click', (e) => {
    e.preventDefault()

    // const newRow = tableBody.insertRow()
    // newRow.insertCell().textContent = "123"
    // newRow.insertCell().textContent = "123"

    // add function to parse data from temporary stored object
    // then make a modal function to store an object
    modalWrapper.style.display = "flex"

    modal.querySelector("header h1").innerText = "Add User"
})

editUser.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault()

        modalWrapper.style.display = "flex"

        modal.querySelector("header h1").innerText = "Edit User"
    })
})

modalWrapper.addEventListener('click', (e) => {
    e.preventDefault()

    if (e.target === e.currentTarget) {
        modalWrapper.style.display = "none" 
    }
})