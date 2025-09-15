const form = document.querySelector(".auth-form")
const submit = document.querySelector(".btn")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const firstName = document.querySelector("#first-name")
const lastName = document.querySelector("#last-name")
const contact = document.querySelector("#contact")
const address = document.querySelector("#address")

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
    if (email.innerText === "" || email.innerText == null) {
        messages.push("Email is required ")
    }
    // password validation
    if (password.innerText === " " || password.innerText === null) {
        messages.push("Password is required ")
    }
    // first name validation
    if (firstName.innerText === " " || firstName.innerText === null) {
        messages.push("First name is required ")
    }
    // last name validation
    if (lastName.innerText === " " || lastName.innerText === null) {
        messages.push("Last name is required ")
    }
    // contact validation
    if (contact.innerText === " " || contact.innerText === null) {
        messages.push("Contact is required ")
    }
    // address validation
    if (address.innerText === " " || address.innerText === null) {
        messages.push("Address is required ")
    }

    return messages
}

// creates error box
function createErrorBox(messages) {

    const errorBox = document.createElement('div')

    errorBox.setAttribute("id", "errorBox")

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

    if (errorBox.parentElement == form) {
        form.errorBox.textContent = messages
    } else {
        form.append(errorBox)
    }
}

