import { $, $$ } from './dom.js';
import modal from './modal.js';

function getDataFromRows() {
    const rows = $$(document, 'table>tbody tr');
    const data = [[]]; // [[],{}]
    const indexes = {};
    for (const row of rows) {
        indexes[row.dataset.id] = data[0].length; // { id: index }
        const datum = { ...row.dataset }; // { id: id,... }
        datum['info'] = []; // { id: id, info: []}
        let idx = 0;
        for (const cell of row.children) {
            if (cell.dataset) {
                datum['info'].push({ ...cell.dataset });
            }
        } // { id, info: [{ name: username, value: 'username',... }, ...]}
        data[0].push(datum);
    } 
    data.push(indexes); // [[{ id, info: [{ name: username, value: 'username',... }, ...]},...], { id: index, ...}]
    return data;
}

export function resetFields(form) {
    const inputs = $$(form,'input[data-type="info"');
    const selects = $$(form,'select'); 
    for (const input of inputs) {
        const validationMessage = input.previousElementSibling instanceof HTMLSpanElement ? input.previousElementSibling: null;
        if (validationMessage) validationMessage.textContent = "";
        input.value = "";
    }
    for (const select of selects) {
        select.value = select.dataset.selected;
    }
}

function displayInputErrors(data, form) {
    if (typeof data.errors == 'undefined') return null;

    const errors = data.errors;
    const validationMessages = $(form,'span')
    for (const validationMessage of validationMessages) {
        // e.g. validationMessage.dataset.id = username
        // then, errors[validationMessage.dataset.id] = errors['username']
        validationMessage.textContent = errors[`${validationMessage.dataset.id}`];
    }
    return errors;
}

/* =============================================================
    Requires: 
        Headers with dataset.name
        An array that has an array of objects
            and map of those objects' indexes
        A Node List of Buttons

    Features:
        All columns can only be sorted one at a time
        Sort can change state of all sort buttons
=============================================================== */
function sorting(arr) {
    const buttons = $$(document,'table>thead th:has(img)');
    const [ info, indexes ] = arr;
    if (buttons) sorting.buttons = buttons;

    // reset buttons
    for (const button of sorting.buttons) {
        button.children[0].src = '/assets/arrow-down-arrow-up.svg';
    }

    // init
    const siblingSorts = [];
    for (const button of sorting.buttons) {
        const sortObject = createSortObject(`${button.dataset.name}`, button, info, indexes);
        siblingSorts.push(sortObject);
    };

    let i = 0;
    for (const button of sorting.buttons) {
        const sortObject = siblingSorts[i];
        button.onclick = () => {
            sortObject.resetSiblings(siblingSorts);
            sortObject.toggle();
        }
        i++;
    };

    function createSortObject(property, button, arr, indexes) {
        return {
            current: 0,
            img: $(button,'img'),
            toggle() {
                if (typeof arr[0] === 'undefined') return;

                // init
                let sortedArr;
                let propIdx = -1;

                for (let i = 0; i < arr[0].info.length || propIdx <= 0; i++) {
                    if (arr[0].info[i].name === property) propIdx = i;
                }
                // to noSort
                if (this.current === 2) {
                    this.current = 0;
                    sortedArr = arr.sort((a,b) => Date.parse(b.created) - Date.parse(a.created));
                    this.img.src = "./assets/arrow-down-arrow-up.svg";
                // to ascending
                } else if (this.current === 0) {
                    this.current = 1;
                    sortedArr = arr.sort((a,b) => {
                        if (a.info[`${propIdx}`].value < b.info[`${propIdx}`].value) return -1;
                        if (a.info[`${propIdx}`].value > b.info[`${propIdx}`].value) return 1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-up-solid-full.svg";
                // to descending
                } else if (this.current === 1) {
                    this.current = 2;
                    sortedArr = arr.sort((a,b) => {
                        if (a.info[`${propIdx}`].value < b.info[`${propIdx}`].value) return 1;
                        if (a.info[`${propIdx}`].value > b.info[`${propIdx}`].value) return -1;
                        return 0;
                    });
                    this.img.src = "./assets/arrow-down-solid-full.svg";
                }
                for (let i = 0; i < sortedArr.length; i++) {
                    indexes[sortedArr[i].id] = i;
                }

                renderTable(sortedArr);
            },
            resetSiblings(siblingSorts) {
                siblingSorts.forEach(_ => {
                    // e.g. if "this" is referencing username, then all others except username will be set back to no sort
                    if (_ != this) {
                        _.current = 2;
                        _.toggle();
                    };
                });
            }
        };
    } 
}

/* =============================================================
    Requires: 
        An array that has an array of objects
            and map of those objects' indexes
        A select element

    Features:
        Filters row based on status dataset
=============================================================== */
function statusFiltering(arr) {
    const filterElement = $(document, 'main>select');
    const [ info, indexes ] = arr;
    filterElement.onchange = () => {
        if (filterElement.selectedOptions[0].value === 'no-filter') {
            renderTable(info);
            sorting([info, indexes]);
            return;
        }
        const filteredInfo = info.filter(objElement => objElement.status === filterElement.selectedOptions[0].value);
        renderTable(filteredInfo);
        sorting([filteredInfo, indexes]); 
    }
}

function allRowsOnclick(callbacks) {
    const rows = $$(document, 'table>tbody tr');
    const { modalCallback, getDataCallback } = callbacks;
    rows.forEach(row => {
        row.onclick = async () => {
            modal.reset();
            const id = row.dataset.id;
            modal.data = await getDataCallback(id, row)

            let profile; 
            for (const child of row.children) {
                if (child.dataset.name === 'profile') {
                    profile = child;
                    break;
                }
            }
            modal.imgUrl = profile ? profile.dataset.value : null;

            modalCallback(row);

            modal.delete.visibility = true;
            modal.set();
            modal.show();
        }
    }
)}

function creation(modalCallback) {
    const createButton = $(document, 'button#create');
    createButton.onclick = (e) => {
        e.preventDefault();

        modal.reset();
        modal.delete.visibility = false;
        modal.delete.callback = () => {};
        modal.showInputElements = ['password']
        
        modalCallback();

        modal.set();
        modal.show();
    }
}

function renderTable(arr) {
    const body = $(document, 'table tbody');
    body.innerHTML = "";

    arr.forEach(objElement => { 
        const newRow = body.insertRow();
        Object.keys(objElement).map(key => {
            if (key !== 'info') newRow.setAttribute(`data-${key}`, objElement[key]);
        });

        objElement.info.forEach(objEl => {
            const newCell = newRow.insertCell();
            Object.keys(objEl).map(key => newCell.setAttribute(`data-${key}`, objEl[key]));
            if (objEl.type === 'image') {
                const img = document.createElement('img');
                newCell.append(img);
                img.src = objEl.value;
            } else {
                newCell.textContent = objEl.value;
            }
        })
        newRow.classList.add('row', 'row:hover');
    })
    const rows = $$(body, 'tr');
    allRowsOnclick(rows);
}

export default {
    resetFields,
    displayInputErrors,
    sorting,
    statusFiltering,
    allRowsOnclick,
    renderTable,
    creation,
    getDataFromRows
};