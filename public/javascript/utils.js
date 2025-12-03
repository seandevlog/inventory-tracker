export function clearForm(obj) {
    const inputs = $$(obj, 'input[data-type="info"');
    const selects = $$(obj, 'select') 
    for (const input of inputs) {
        const validationMessage = input.previousElementSibling instanceof HTMLSpanElement ? input.previousElementSibling: null;
        if (validationMessage) validationMessage.textContent = "";
        input.value = "";
    }
    for (const select of selects) {
        select.value = select.dataset.selected;
    }
}

export function handleInputErrors(data) {
    const form = $(document, 'div#modal form');
    if (typeof data.errors == 'undefined') return null;

    const errors = data.errors;
    const validationMessages = $$(form, 'span')
    for (const validationMessage of validationMessages) {
        // e.g. validationMessage.dataset.id = username
        // then, errors[validationMessage.dataset.id] = errors['username']
        validationMessage.textContent = errors[`${validationMessage.dataset.id}`];
    }
    return errors;
}

export function $ (scope, object) { return scope.querySelector(object); }
export function $$ (scope, objects) { return scope.querySelectorAll(objects); }