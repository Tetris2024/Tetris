import { addUser, userExists } from './init_bd.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.signup-form');

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
                alert('Inscription réussie!');
            }
        });
    });
});