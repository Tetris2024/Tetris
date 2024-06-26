import { addUser } from '../BDD/bdd.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        addUser(username, password).then(() => {

        });
        form.reset();
        window.location = "../pages/second_page.html";
        alert('Inscription réussie!');
    });
});
