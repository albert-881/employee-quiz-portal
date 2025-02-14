export function createquiz() {
    let quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];

    // Check if quizzes are already created to avoid duplicates
    if (quizzes.length > 0) {
        console.log("Quizzes already exist in localStorage:", quizzes);
        return; // Stop function to prevent overwriting
    }

    const quiz1 = {
        name: 'JavaScript Basics',
        desc: 'Test your knowledge of JavaScript fundamentals',
        questions: [
            { question: 'What is the capital of France?', options: ['Berlin', 'Madrid', 'Paris'], correctAnswer: 'Paris' },
            { question: 'What is 2 + 2?', options: ['3', '4', '5'], correctAnswer: '4' }
        ]
    };

    const quiz2 = {
        name: 'HTML & CSS',
        desc: 'Test your knowledge of HTML and CSS basics',
        questions: [
            { question: 'What does HTML stand for?', options: ['HyperText Markup Language', 'Hyperlinks and Text Markup Language'], correctAnswer: 'HyperText Markup Language' }
        ]
    };

    quizzes.push(quiz1, quiz2); // Add both quizzes
    localStorage.setItem('quizzes', JSON.stringify(quizzes)); // Save to localStorage

    console.log("Quizzes saved:", quizzes); // Debugging
}
