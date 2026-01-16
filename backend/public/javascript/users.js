import { $, $$ } from './dom.js';
import handlers from './handlers.js';
import modal from './modal.js';
import cloud from './cloud.js';
import Token from './token.js';

init();

function init() {
    modal.show(false);

    const form = $(document, 'div#modal form');
    const rows = $$(document, 'table>tbody tr');
    const users = handlers.getDataFromRows(rows); // [[],{}]
    // users[0]; // [{ id, info: [{ name: username, value: 'username',... }, ...]},...]
    // users[1]; // { id: index,... }

    handlers.allRowsOnclick({
        modalCallback: (row) => {
            modal.save.callback = async () => await updateUser(row);
            modal.delete.callback = async () => await deleteUser(row);
            modal.title = 'Edit User';
            modal.hideInputElements = ['password'];
        },
        getDataCallback: getUser
    });

    handlers.creation(() => {
        modal.save.callback = async () => await createUser();
        modal.title = 'Create User';
    });

    handlers.statusFiltering(users);
    handlers.sorting(users);

    async function getUser(id, row) {
        if (typeof row.dataset.password === 'undefined') {
            const res = await fetch(`/users/${id}`, {
                headers: {
                    authorization: `Bearer ${Token.accessToken}`
                } 
            });
            const data = await res.json();

            if (data.err?.name === 'TokenExpiredError') {
                Token.accessToken = Token.refresh();
                getUser(id, row);
            }

            return data.user;
        } else {
            return { ...row.dataset, info: [ ...row.children.map(child => child.dataset)] }
        }
    }

    async function createUser() {
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]) {
            const profile = form.elements['profile'].files[0];
            const profileData = await cloud.uploadImageSigned(profile);
            formData.append('profile[url]', profileData.secure_url);
            formData.append('profile[public_id]', profileData.public_id);
        }

        // const res = await fetch('/users/store', {
        //     method: 'POST',
        //     headers: {
        //         authorization: `Bearer ${Token.accessToken}`
        //     },
        //     body: formData
        // });
        
        // if (!res.ok) throw new Error('Failed to store user data');

        // const data = await res.json();

        // if (data.err.name === 'TokenExpiredError') {
        //     Token.accessToken = Token.refresh();
        //     createUser();
        // }

        // TODO - replace with display input errors from client side validation
        // const errors = handlers.displayInputErrors(data, form);
        // if (errors == null) {
            // window.location.href = data.redirect;
            // init();
        // }
    } 

    // Gets id inside userInput.value, and update it directly using patch method and findOneAndUpdate
    async function updateUser(row) {
        const { id } = row.dataset;
        const formData = new FormData(form);
        if (form.elements['profile'].files[0]) {
            const profile = form.elements['profile'].files[0];
            const public_id = row.dataset.profile?.public_id;
            let profileData;
            if (public_id) { 
                profileData = await cloud.replaceImageSigned(profile, public_id);
            } else {
                profileData = await cloud.uploadImageSigned(profile);
            }
            formData.append('profile[url]', profileData.secure_url);
            formData.append('profile[public_id]', profileData.public_id);
        } else {
            formData.delete('profile');
        }

        const res = await fetch(`/users/${id}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${Token.accessToken}`
            },
            body: formData
        });

        if (!res.ok) throw new Error('Failed to update user data');

        const data = await res.json();

        if (data.err.name === 'TokenExpiredError') {
            Token.accessToken = Token.refresh();
            updateUser(row);
        }

        // const errors = handlers.displayInputErrors(data, form);

        // if (errors == null) {
            window.location.href = data.redirect;
            init();
        // }
    }

    async function deleteUser(row) {
        const { id } = row.dataset; 
        const res = await fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearers ${Token.accessToken}`
            }
        });

        if (!res.ok) throw new Error('Failed to delete user data');
        
        const data = await res.json();

        if (data.err.name === 'TokenExpiredError') {
            Token.accessToken = Token.refresh();
            deleteUser(row);
        }

        // const { errors } = data;
        
        // if (errors == null) {
            window.location.href = data.redirect;
            init();
        // }
    }
}


