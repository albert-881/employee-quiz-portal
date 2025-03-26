import { createEmployee } from "./backendLogic.js";

const logoutBtn = document.querySelector('#logout-btn');
// Select form elements for user creation
const userForm = document.querySelector('#user-form');
const userNameInput = document.querySelector('#user-name');
const userRoleInput = document.querySelector('#user-role');
const userTempPassword = document.querySelector('#user-password');
// Select elements for quiz assignment



// Handle new user creation
userForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    let user = userNameInput.value;
    let role = userRoleInput.value;
    let tempPassword = userTempPassword.value;
    await createEmployee(user,tempPassword,role);
    window.location.reload();
});

logoutBtn.addEventListener('click', (e) => {
    window.location.href = 'index.html';
});

