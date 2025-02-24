import { setCredentails } from "./validation.js";  // Handles user login validation
import { showMenu } from "./ui.js";  // Displays the developer quiz creation menu

// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    
    // Ask if the user is the developer (to access quiz creation)
    let navigation = prompt('If you are the developer would you like to create a quiz?');
    
    // If the user selects "yes", show the quiz creation menu
    if(navigation === 'yes'){
        showMenu();
    }

    // Select the login form element
    const loginVerification = document.querySelector('#login-form');

    // Add an event listener to handle login form submission
    loginVerification.addEventListener('submit', (e) => {
        e.preventDefault();  // Prevents the page from reloading when the form is submitted
        
        // Calls the function to validate the user's credentials
        setCredentails();
    });
});
