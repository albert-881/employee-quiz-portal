    import { assignRole } from "./admin.js";
    
    export function createQuiz(name, description,role) {
        return {
            quizName: name,
            quizDescription: description,
            role:role
        };
    }
    
    function createEmployee(name, role, password) {
        return {
            name: name,
            password:password,
            role: role
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
        localStorage.setItem('employees', JSON.stringify(employees)); 
        assignRole(role,name)
        console.log(employees);
    }


   
