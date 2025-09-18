const tableBody = document.getElementById("crud-table-body")
const addUser = document.getElementById("add-user")

addUser.addEventListener('click', (e) => {
    e.preventDefault()

    const newRow = tableBody.insertRow()
    
    newRow.insertCell().textContent = "123"
    newRow.insertCell().textContent = "123"

    // add function to parse data from temporary stored object
    // then make a modal function to store an object

})