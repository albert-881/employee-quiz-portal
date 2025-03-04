import { setCredentails } from "./validation.js";  // Handles user login validation


// Wait for the DOM to fully load before executing the script

    
    
    
    // Select the login form element
    const loginVerification = document.querySelector('#login-form');

    // Add an event listener to handle login form submission
    loginVerification.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevents the page from reloading when the form is submitted
        
        // Calls the function to validate the user's credentials
        setCredentails();
    });
