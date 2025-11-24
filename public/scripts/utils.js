export function clearInputs(inputs) {
    for (const input of inputs) {
        const validationOutput = input.previousElementSibling;
        validationOutput.innerText = "";
        input.value = "";
    }
}

export function generateRandomId(length = 0) {
    return Math.random().toString(36).substring(2, length + 2).toUpperCase();
}

export function $ (scope, object) { return scope.querySelector(object); }
export function $$ (scope, objects) { return scope.querySelectorAll(objects); }