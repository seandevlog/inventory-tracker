const form = document.getElementById("auth-form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const firstName = document.getElementById("first-name")
const lastName = document.getElementById("last-name")
const contact = document.getElementById("contact")
const address = document.getElementById("address")
const submitSignUp = document.getElementById("sign-up-submit")

let currentErrorBox = null // saves the state of the current error box

submitSignUp.addEventListener("click", (e) => {
    e.preventDefault()

    let messages = []

    if((messages = validateInputs()) == false) {
        // function verified - show verified UX

        localStorage.setItem("user", JSON.stringify({ email: email.value, password: password.value }))
        window.location.href = "login.html" // goes to login page if no error
    } else {
        createErrorBox(messages)
    }
})

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