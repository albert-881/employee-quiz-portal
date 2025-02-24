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

// Save quiz data to localStorage and assign it to users with the same role
export function saveQuiz(newQuiz) {
    // Retrieve the existing quizzes and employees
    let quiz = JSON.parse(localStorage.getItem('quiz')) || [];
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    
    // Add the new quiz to the quizzes array
    quiz.push(newQuiz);
    localStorage.setItem('quiz', JSON.stringify(quiz));  // Save the new quiz

    // Loop through employees to assign the new quiz based on their role
    employees.forEach(employee => {
        if (employee.role === newQuiz.role) {  // Check if employee's role matches quiz role
            if (!employee.assignedQuizzes) {
                employee.assignedQuizzes = [];  // Initialize assigned quizzes if not already set
            }
            employee.assignedQuizzes.push(newQuiz);  // Assign the new quiz to the user
        }
    });

    // Save the updated employees list back to localStorage
    localStorage.setItem('employees', JSON.stringify(employees));

    console.log('Quiz assigned to users:', newQuiz);
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
