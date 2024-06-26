import { addUser, userExists } from '../BDD/init_bd.mjs';

console.log("inscription");

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form');
    console.log("inscription");

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        userExists(username, (err, exists) => {
            if (err) {
                console.error(err);
                alert('Erreur lors de la vérification de l\'utilisateur');
                return;
            }

            if (exists) {
                alert('Le nom d\'utilisateur existe déjà');
            } else {
                addUser(username, password);
                form.reset();
                window.location = "../pages/second_page.html";
                alert('Inscription réussie!');
            }
        });
    });
});