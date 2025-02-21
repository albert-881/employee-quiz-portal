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
});

assignQuizBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('assign new quiz button works');
});

export function assignRole(role, user) {
    let quizzes = JSON.parse(localStorage.getItem('quiz')) || [];
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Find the user to assign quizzes
    let selectedUser = employees.find(emp => emp.name === user);

    if (!selectedUser) {
        console.log('User not found!');
        return;
    }

    // Filter quizzes based on role
    let assignedQuizzes = quizzes.filter(quiz => quiz.role === role);

    // Assign quizzes to the user
    selectedUser.assignedQuizzes = assignedQuizzes;

    // Save the updated employees array to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    
    console.log(employees);
}