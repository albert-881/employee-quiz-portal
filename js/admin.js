import { saveEmployee } from "./database.js";


const userForm = document.querySelector('#user-form');
const userNameInput = document.querySelector('#user-name');
const userRoleInput = document.querySelector('#user-role');
const userTempPassword = document.querySelector('#user-password');
const assignQuizBtn = document.querySelector('#assign-quiz-btn');
const quizSelect = document.querySelector('#quiz-select');
const userSelect = document.querySelector('#user-select');
const quizListItems = document.querySelector('#quiz-list-items');
const quizForm = document.querySelector('#quiz-form');
const quizNameInput = document.querySelector('#quiz-name');
const quizDescInput = document.querySelector('#quiz-desc');

userForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let user = userNameInput.value;
    let role = userRoleInput.value;
    let tempPassword = userTempPassword.value;
    
    console.log(`User: ${user}\nPassword: ${tempPassword}\nRole: ${role}`);
    saveEmployee(user,role,tempPassword);
    // Call assignRole after employee is saved
    
});

assignQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('assign new quiz button works');
});

