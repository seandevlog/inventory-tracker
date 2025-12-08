import { $, $$ } from './dom.js';
import handlers from './handlers.js';
import modal from './modal.js';
import cloud from './cloud.js';

init();

function init() {
    modal.show(false);

    const rows = $$(document, 'table>tbody tr');
    const form = $(document, 'div#modal form');
    const createButton = $(document, 'div#users>main>button#create');
    const buttons = $$(document,'table>thead th:has(img)');
    const filterElement = $(document, 'main>select');
    const users = getUsersFromRows(rows); // [[],{}]
    // users[0]; // [{ id, info: [{ name: username, value: 'username',... }, ...]},...]
    // users[1]; // { id: index,... }
    handlers.allRowsOnclick(rows, { 
        saveCallback: () => updateUser(data.user['_id'], data.user.profile.public_id), 
        deleteCallback: () => deleteUser(data.user['_id']),
        data: async (id, row) => {
            if (typeof row.dataset.password === 'undefined') {
                const res = await fetch(`/users/${id}`);
                const data = await res.json();

                return data.user;
            } else {
                return { ...row.dataset, info: [ ...row.children.map(child => child.dataset)] }
            }
        },
        editTitle: 'Edit User'
    });

    handlers.statusFiltering(users, filterElement);
    handlers.sorting(users, buttons);
    

    // Create
    createButton.onclick = (e) => {
        e.preventDefault();
    
        modal.delete.visibility = false;
        modal.title = 'Create User';
        modal.save.callback = () => createUser(); 
        modal.set();
        modal.show();
    }

    function getUsersFromRows(rows) {
        const users = [[]]; // [[],{}]
        const indexes = {};
        for (const row of rows) {
            indexes[row.dataset.id] = users[0].length - 1; // { id: index }
            const user = { ...row.dataset }; // { id: id,... }
            user['info'] = []; // { id: id, info: []}
            let idx = 0;
            for (const cell of row.children) {
                if (cell.dataset) {
                    user['info'].push({ ...cell.dataset });
                }
            } // { id, info: [{ name: username, value: 'username',... }, ...]}
            users[0].push(user);
        } 
        users.push(indexes); // [[{ id, info: [{ name: username, value: 'username',... }, ...]},...], { id: index, ...}]
        return users;
    }

    async function createUser() {
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]) {
            const profile = form.elements['profile'].files[0];
            const profileData = await cloud.uploadImageSigned(profile);
            formData.append('profile[url]', profileData.secure_url);
            formData.append('profile[public_id]', profileData.public_id);
        }

        const res = await fetch('/users/store', {
            method: 'POST',
            body: formData
        });
        
        if (!res.ok) throw new Error('Failed to store user data');
        
        const data = await res.json();
        const errors = handleInputErrors(data, form);
        if (errors == null) {
            window.location.href = data.redirect;
            init();
        }
    } 

    // Gets id inside userInput.value, and update it directly using patch method and findOneAndUpdate
    async function updateUser(id) {
        const [ usersData, usersIndexes ] = users;
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]) {
            const image = form.elements['profile'].files[0];
            const index = usersIndexes[id];
            let publicId = '';
            usersData[index].info.forEach(objElement => {
                if (objElement.name === 'public_id') publicId = objElement.value;
            })
            const imageData = await cloud.replaceImageSigned(image, publicId);
            formData.append('profile[url]', imageData.secure_url);
            formData.append('profile[public_id]', imageData.public_id);
        } else {
            formData.delete('profile');
        }

        const res = await fetch(`/users/${id}`, {
            method: 'PATCH',
            body: formData
        });

        if (!res.ok) throw new Error('Failed to update user data');

        const data = await res.json();
        const errors = handleInputErrors(data, form);

        if (errors == null) {
            window.location.href = data.redirect;
            init();
        }
    }

    async function deleteUser(id) {
        const res = await fetch(`/users/${id}`, {
            method: 'DELETE'
        });

        const data = await res.json();
        console.log(data.error)
        window.location.href = data.redirect;
        init();
    }
}


