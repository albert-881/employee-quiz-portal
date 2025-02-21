import { setCredentails } from "./validation.js";
import { showMenu } from "./ui.js";



document.addEventListener("DOMContentLoaded", () => {
    
    let navigation = prompt('If you are the developer would you like to create a quiz');
    if(navigation === 'yes'){
        showMenu();
    }
    else{
        return;
    }

    const loginVerification = document.querySelector('#login-form');
    
        loginVerification.addEventListener('submit', (e) => {
            e.preventDefault();
            setCredentails();
        });
    
});
