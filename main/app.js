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

    if(messages = validateInputs()) {
        // function verified - show verified UX

        return // does not create error box if no error
    } else {
        createErrorBox(messages)
    }
})

// validates inputs
function validateInputs() {
    // add input logic
}

// creates error box
function createErrorBox(messages) {
    const errorBox = document.createElement('div')
    Object.assign(errorBox.style, {
        display : "block",
        padding : "1em",
        width : "100%",
        background : "white"
    })

    const errorBoxText = document.createElement('span')
    errorBoxText.textContent = messages
    errorBox.append(errorBoxText)

    form.append(errorBox)
}

