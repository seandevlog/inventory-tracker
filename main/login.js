const form = document.getElementById("auth-form")
const email = document.getElementById("email")
const password = document.getElementById("password")
const submitLogin = document.getElementById("login-submit")

const user = JSON.parse(localStorage.getItem("user"))
let currentErrorBox = null

submitLogin.addEventListener('click', (e) => {
    e.preventDefault()

    if (email.value === user.email && password.value === user.password) {
        window.location.href = "users.html"
    } else {
        createErrorBox("Invalid email or password")
    }
})

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