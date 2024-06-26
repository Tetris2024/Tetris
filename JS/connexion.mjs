import { authenticateUser, userExists } from '../BDD/init_bd.js';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.login-form');
    console.log("connexion");
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

            if (!exists) {
                alert('Utilisateur non trouvé, veuillez vous inscrire.');
                window.location.href = 'inscription.html'; // Redirige vers la page d'inscription
            } else {
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
            }
        });

        form.reset();
    });
});