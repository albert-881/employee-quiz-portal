export async function viewQuizzes() {
  //this allows the admin to see the list of quizzes existing
  console.log("Fetching quizzes...");
  const response = await fetch('https://jq0eto9ne5.execute-api.us-east-2.amazonaws.com/default/getQuizzes');
  console.log("Response received");
  
  let data = await response.json();
  console.table(data);
  return data;
    
}

//*****************************************************************************//

export async function createEmployee(user, pass, role) {
  //this is for the admin to create new users
  try {
    const response = await fetch('https://sgeksxrs8h.execute-api.us-east-2.amazonaws.com/default/createEmployee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: user, password: pass, role: role }),
    });

    // Check if the response status is OK (status 200)
    if (response.ok) {
      const data = await response.json();
      console.log('Employee created successfully:', data.message);
      return data;  
    } else {
      // If the response status is not OK, throw an error
      const errorData = await response.json();  
      throw new Error(errorData.message || 'Failed to create employee');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error('Error:', error.message);
    alert('Error: ' + error.message);
  }
}

//*****************************************************************************//

export async function validateUser(email, password) {
  //when a user tries logging in it should validate them
  try {
    const response = await fetch('https://hjepi7lktg.execute-api.us-east-2.amazonaws.com/default/validateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),  
    });

    if (!response.ok) {
      console.error("Failed to validate user:", response.statusText);
      return null; 
    }

    let data = await response.json();
    console.log("User validation success:", data);
    return data;

  } 
  catch (error) {
    console.error("Error in validateUser:", error);
    return null;
  }
}

//*****************************************************************************//

export async function getUserQuizzes(email, role){
  //if user is validated then they are able to see the list of quizzes they have to take
  try {
    const response = await fetch('https://4fvorp0scg.execute-api.us-east-2.amazonaws.com/default/getUserQuizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, role }),
    });
    if (!response.ok) {
      console.error("Error occured: ", response.statusText);
      return null;  
    }
    let data = await response.json();
    return data;
  }
  catch(error){

  }
}

//*****************************************************************************//

export async function getUserQuestions(selectedQuizID){
  try{
    const response = await fetch('https://tjds31jn5h.execute-api.us-east-2.amazonaws.com/default/getUserQuestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ selectedQuizID }),  
    });
    if(!response.ok) {
      console.error("Error occured: ", response.statusText);
      return null; 
    }
    let data = await response.json();
    return data;
  }
  catch(error){

  }
}

//*****************************************************************************//

export async function completeQuiz(quizId, user) {
  try {
    const response = await fetch("https://wgxag31fp4.execute-api.us-east-2.amazonaws.com/default/completeQuiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quizId, user }),
    });

    console.log(`Current quiz ID: ${quizId}, Current user: ${user}`);

    if (!response.ok) {
      const errorMessage = await response.text(); 
      console.error(`API Error Response: ${errorMessage}`); 
      return; // Stop execution if request failed
    }

    const data = await response.json(); 
    console.log(`Success: ${data.message}`);
  } catch (error) {
    console.error("Fetch error:", error); 
  }
}

//*****************************************************************************//


