import { test } from "./validation.js";
import { createquiz } from "./quizzes.js";

document.addEventListener("DOMContentLoaded", () => {
    createquiz(); // Ensures quizzes exist when the app starts

    const loginVerification = document.querySelector('#login-form');
    if (loginVerification) {
        loginVerification.addEventListener('submit', (e) => {
            e.preventDefault();
            test();
        });
    }
});
