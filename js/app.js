import { setCredentails } from "./validation.js"; // Handles user login validation

// Get the login form element
const loginForm = document.querySelector('#login-form');

if (loginForm) {
    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        document.getElementById("loading").style.display = "flex"; // Show loading indicator
        
        setCredentails(); // Validate user credentials
    });
} else {
    console.warn("Login form not found.");
} 
