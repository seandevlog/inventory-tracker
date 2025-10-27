/* Creates error box */
function doErrorBox(errors, form) {
    doErrorBox.current ??= null;
    const errorBox = document.createElement('div');

    errorBox.setAttribute("id", "errorBox");
    Object.assign(errorBox.style, {
        display         : 'block',
        padding         : '1em',
        width           : '100%',
        background      : 'white',
        'font-size'     : '1em',
        border          : '1px solid black',
        'margin-top'    : '1.2em'
    });

    const errorBoxText = document.createElement('span');
    errorBoxText.textContent = errors;
    errorBox.append(errorBoxText);

    if(doErrorBox.current) doErrorBox.current.remove();
    doErrorBox.current = errorBox;
    form.append(doErrorBox.current);
}