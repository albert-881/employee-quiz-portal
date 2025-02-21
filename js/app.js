import { setCredentails } from "./validation.js";
import { startDatabase } from "./database.js";



document.addEventListener("DOMContentLoaded", () => {
    
    let navigation = prompt('If you are the developer would you like to create a quiz or create a new user?');
    if(navigation === 'yes'){
        startDatabase();
    }

    const loginVerification = document.querySelector('#login-form');
    
        loginVerification.addEventListener('submit', (e) => {
            e.preventDefault();
            setCredentails();
        });
    
});
