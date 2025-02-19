import { test } from "./validation.js";

document.addEventListener("DOMContentLoaded", () => {
    
    const loginVerification = document.querySelector('#login-form');
    if (loginVerification) {
        loginVerification.addEventListener('submit', (e) => {
            e.preventDefault();
            test();
        });
    }
});
