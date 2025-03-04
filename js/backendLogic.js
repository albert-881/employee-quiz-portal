export async function viewQuizzes() {
    console.log("Fetching quizzes...");
    const response = await fetch('https://jq0eto9ne5.execute-api.us-east-2.amazonaws.com/default/getQuizzes');
    console.log("Response received");
  
    let data = await response.json();
    console.log("Data:", data);
  }

export function callFunction(){
  viewQuizzes();
}