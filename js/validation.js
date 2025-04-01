import { validateUser, getUserQuizzes } from "./backendLogic.js";
import { storeQuizzes, errorMSG } from "./ui.js";

const ADMIN_EMAIL = "quinteroalberto88@gmail.com";
const ADMIN_PASSWORD = "4321";

// Handles login validation and user redirection
export async function setCredentails() {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    // Redirect admin users to the admin panel
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        window.location.href = "demoAdmin.html";
        return;
    }

    // Validate regular user credentials
    const { role } = await validateUser(email, password);
    if (!role) {
        errorMSG(); // Display login error
        return;
    }

    // Store user session data
    sessionStorage.setItem("currUser", JSON.stringify({ email, role }));
    console.log(`User role: ${role}`);

    // Retrieve and store user quizzes
    const userQuizzes = await getUserQuizzes(email, role);

    storeQuizzes(userQuizzes);
    window.location.href = "quiz-list.html"; // Navigate to quiz list
    
}
