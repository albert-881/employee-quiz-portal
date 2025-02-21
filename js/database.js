    export function createQuiz(name, description) {
        return {
            quizName: name,
            quizDescription: description
        };
    }
    
    function createEmployee(name, role, password) {
        return {
            name: name,
            role: role,
            password:password
        };
    }

    export function saveQuiz(newQuiz){
        let quiz = JSON.parse(localStorage.getItem('quiz')) || [];
        quiz.push(newQuiz);
        localStorage.setItem('quiz', JSON.stringify(quiz));
        console.log(quiz);
    }
    

    export function saveEmployee(name,role,password) {  // "saveEmployee" is clearer than "addnewEmployee"
        let newEmp = createEmployee(name,role,password);
        let employees = JSON.parse(localStorage.getItem('employees')) || [];  // "employees" is plural
        employees.push(newEmp);
        localStorage.setItem('employees', JSON.stringify(employees));  // Update with plural name "employees"
        console.log(employees);
    }


   
