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

export function $ (scope, object) { return scope.querySelector(object); }
export function $$ (scope, objects) { return scope.querySelectorAll(objects); }