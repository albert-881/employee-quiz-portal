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

// Save employee data to localStorage
export function saveEmployee(name, role, password) {
    let newEmp = createEmployee(name, role, password);
    let employees = JSON.parse(localStorage.getItem('employees')) || [];
    employees.push(newEmp);
    localStorage.setItem('employees', JSON.stringify(employees));
    console.log(employees);
}
