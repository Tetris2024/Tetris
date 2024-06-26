import {getHash} from "../JS/server.js";

const API_BASE_URL = "http://81.249.208.114:25595";

const addUser = async (username, password) => {
  try {
    const hashedPassword = await getHash(password);
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password: hashedPassword
      })
    });
    const data = await response.json();
    console.log(`User ${username} added successfully:`, data);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const updateUserScore = async (username, score) => {
  try {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, score })
    });
    const data = await response.json();
    console.log(`User ${username}'s score updated to ${score}:`, data);
  } catch (error) {
    console.error('Error updating user score:', error);
  }
};

const authenticateUser = async (username, password, callback) => {
  try {
    const hashedPassword = await getHash(password); // Wait for hash to resolve
    const response = await fetch(`${API_BASE_URL}/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password: hashedPassword
      })
    });
    const data = await response.json();
    callback(null, data.authenticated);
  } catch (error) {
    console.error('Error authenticating user:', error);
    callback(error, null);
  }
};

export {
  addUser,
  updateUserScore,
  authenticateUser
};
