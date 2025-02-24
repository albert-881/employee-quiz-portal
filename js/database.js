// Create a new quiz object
export function createQuiz(name, description, role) {
    return {
        quizName: name,
        quizDescription: description,
        role: role
    };
}

// Create a new employee object
function createEmployee(name, role, password) {
    return {
        name: name,
        password: password,
        role: role
    };
}

// Save quiz data to localStorage
export function saveQuiz(newQuiz) {
    let quiz = JSON.parse(localStorage.getItem('quiz')) || [];
    quiz.push(newQuiz);
    localStorage.setItem('quiz', JSON.stringify(quiz));
    console.log(quiz);
}

export function saveEmployee(name, role, password) {
    let newEmp = createEmployee(name, role, password);
    let employees = JSON.parse(localStorage.getItem('employees')) || [];

    // Get all quizzes that match the user's role
    let quizzes = JSON.parse(localStorage.getItem('quiz')) || [];
    newEmp.assignedQuizzes = quizzes.filter(quiz => quiz.role === role);

    // Add the new employee with assigned quizzes
    employees.push(newEmp);
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log(`User ${name} created and assigned quizzes:`, newEmp.assignedQuizzes);
}
