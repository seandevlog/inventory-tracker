const form = document.querySelector(".auth-form")
const submit = document.querySelector(".btn")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const firstName = document.querySelector("#first-name")
const lastName = document.querySelector("#last-name")
const contact = document.querySelector("#contact")
const address = document.querySelector("#address")

let currentErrorBox = null // saves the state of the current error box

submit.addEventListener("click", (e) => {
    e.preventDefault()

    let messages = []

    if((messages = validateInputs()) == true) {
        // function verified - show verified UX

        return // does not create error box if no error
    } else {
        createErrorBox(messages)
    }
})

// validates inputs
function validateInputs() {
    let messages = []

    // email validation
    if (email.value === "" || email.value == null) {
        messages.push("Email is required ")
    }

    // password validation
    if (password.value === "" || password.value === null) {
        messages.push("Password is required ")
    }
    // first name validation
    if (firstName.value === "" || firstName.value === null) {
        messages.push("First name is required ")
    }
    // last name validation
    if (lastName.value === "" || lastName.value === null) {
        messages.push("Last name is required ")
    }
    // contact validation
    if (contact.value === "" || contact.value === null) {
        messages.push("Contact is required ")
    }
    // address validation
    if (address.value === "" || address.value === null) {
        messages.push("Address is required ")
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
        "font-size": "1em" 
    })

    const errorBoxText = document.createElement('span')
    
    errorBoxText.textContent = messages

    errorBox.append(errorBoxText)

    if (currentErrorBox != null) {
        currentErrorBox.remove()
    }

    currentErrorBox = errorBox

    if (currentErrorBox.innerText) {
        form.append(currentErrorBox)
    }
}

