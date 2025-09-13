const form = document.getElementById('form')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const firstNameInput = document.getElementById('first-name')
const lastNameInput = document.getElementById('last-name')
const contactInput = document.getElementById('contact')
const addressInput = document.getElementById('address')
const errorMessage = document.getElementById('error-message')

form.addEventListener('submit', (e) => {
    let errors = []

    if(firstNameInput) {
        errors = getRegisterFormErrors(emailInput.value, passwordInput.value, firstNameInput.value, lastNameInput.value, contactInput.value, addressInput.value)
    } else {
        errors = getLoginFormErrors(emailInput.value, passwordInput.value) 
    }

    if (errors.length > 0) {
        e.preventDefault()
        errorMessage.innerText = errors.join(". ")
    }
})

function getRegisterFormErrors(email, password, firstName, lastName, contact, address) {
    let errors = []

    if (email === '' || email === null) {
        errors.push('Email is empty')
        emailInput.parentElement.classList.add('incorrect')
    }
    if (password === '' || password === null) {
        errors.push('Password is empty')
        passwordInput.parentElement.classList.add('incorrect')
    }
    if (firstName === '' || firstName === null) {
        errors.push('First name is empty')
        firstNameInput.parentElement.classList.add('incorrect')
    }
    if (lastName === '' || lastName === null) {
        errors.push('Last name is empty')
        lastNameInput.parentElement.classList.add('incorrect')
    }
    if (contact === '' || contact === null) {
        errors.push('Contact is empty')
        contactInput.parentElement.classList.add('incorrect')
    }
    if (address === '' || address === null) {
        errors.push('Address is empty')
        addressInput.parentElement.classList.add('incorrect')
    }

    return errors
}