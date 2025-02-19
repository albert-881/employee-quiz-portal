export function createquiz() {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Check if quizzes are already created to avoid duplicates
    if (quizzes.length > 0) {
        console.log("Quizzes already exist in localStorage:", quizzes);
        return; // Stop function to prevent overwriting
    }

    

    quizzes.push(quiz1, quiz2); // Add both quizzes
    localStorage.setItem('quizzes', JSON.stringify(quizzes)); // Save to localStorage

    console.log("Quizzes saved:", quizzes); // Debugging
}
