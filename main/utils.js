function clearInputs(inputs) {
    for (const input of inputs) {
        const validationOutput = input.previousElementSibling;
        validationOutput.innerText = "";
        input.value = "";
    }
}