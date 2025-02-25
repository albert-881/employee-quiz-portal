// Import function to save employees
import { saveEmployee } from "./database.js";

const logoutBtn = document.querySelector('#logout-btn');
// Select form elements for user creation
const userForm = document.querySelector('#user-form');
const userNameInput = document.querySelector('#user-name');
const userRoleInput = document.querySelector('#user-role');
const userTempPassword = document.querySelector('#user-password');
// Select elements for quiz assignment
const assignQuizBtn = document.querySelector('#assign-quiz-btn');
const quizSelect = document.querySelector('#quiz-select');
const userSelect = document.querySelector('#user-select');
// Select elements for quiz list & creation (if needed)
const quizListItems = document.querySelector('#quiz-list-items');
const quizForm = document.querySelector('#quiz-form');
const quizNameInput = document.querySelector('#quiz-name');
const quizDescInput = document.querySelector('#quiz-desc');

// Handle new user creation
userForm.addEventListener('submit', (e) => {
    // Prevent page reload

    let user = userNameInput.value;
    let role = userRoleInput.value;
    let tempPassword = userTempPassword.value;

    saveEmployee(user, role, tempPassword);
});

// Handle quiz assignment (To be implemented)
assignQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Assign quiz button clicked');  // Placeholder for future logic
});

logoutBtn.addEventListener('click', (e) => {
    window.location.href = 'index.html';
});

