function clearInputs(inputs) {
    for (const input of inputs) {
        const validationOutput = input.previousElementSibling;
        validationOutput.innerText = "";
        input.value = "";
    }
}

function generateRandomId(length = 0) {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
}

const $ = (scope, object) => scope.querySelector(object);
const $$ = (scope, objects) => scope.querySelectorAll(objects);