import { authenticateUser } from '../BDD/bdd.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    console.log("connexion");
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        authenticateUser(username, password, (err, success) => {
            if (err) {
                console.error(err);
                alert('Erreur lors de la connexion');
                return;
            }

            if (success) {
                alert('Connexion réussie!');
                window.location = "../pages/second_page.html";
            } else {
                alert('Nom d\'utilisateur ou mot de passe incorrect');
            }
        });
        form.reset();
    });
});