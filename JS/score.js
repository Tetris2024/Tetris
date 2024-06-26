import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';

const db = new sqlite3.Database('tetris.db');

document.addEventListener('DOMContentLoaded', () => {
    const scoreList = document.getElementById('scoreList');

    // Fonction pour récupérer les 5 meilleurs scores depuis la base de données
    function getTopScores() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT username, best_score FROM users ORDER BY best_score DESC LIMIT 5`, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            });
        });
    }

    // Afficher les scores récupérés dans le tableau HTML
    async function displayTopScores() {
        try {
            const scores = await getTopScores();

            scores.forEach((score, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${score.username}</td>
                    <td>${score.best_score}</td>
                `;
                scoreList.appendChild(row);
            });
        } catch (err) {
            console.error('Erreur lors de la récupération des scores :', err);
        }
    }

    // Appel de la fonction pour afficher les scores au chargement de la page
    displayTopScores();
});