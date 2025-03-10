export async function viewQuizzes() {
  console.log("Fetching quizzes...");
  const response = await fetch('https://jq0eto9ne5.execute-api.us-east-2.amazonaws.com/default/getQuizzes');
  console.log("Response received");
  
  let data = await response.json();
  console.log(data);
  return data;
    
}

//*****************************************************************************/

export async function createEmployee(user, pass, role) {
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
      const data = await response.json();  // Parse the JSON response
      console.log('Employee created successfully:', data.message);
      return data;  // Return the success data (optional)
    } else {
      // If the response status is not OK, throw an error
      const errorData = await response.json();  // Get the error message from the response
      throw new Error(errorData.message || 'Failed to create employee');
    }
  } catch (error) {
    // Handle any errors that occur during the fetch request
    console.error('Error:', error.message);
    alert('Error: ' + error.message);  // Optional: Display error to user
  }
}

//*****************************************************************************/

export async function validateUser(email, password) {
  try {
    const response = await fetch('https://hjepi7lktg.execute-api.us-east-2.amazonaws.com/default/validateUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),  // Send user data as JSON
    });

    if (!response.ok) {
      // If response is 404, handle it gracefully
      if (response.status === 404) {
        console.warn("Employee not found:", email);  // Log a message to console
        return null;  // Return null if employee not found
      }

      console.error("Failed to validate user:", response.statusText);
      return null;  // Return null if other errors occur
    }

    let data = await response.json();
    console.log("User validation success:", data);
    return data;  // Return the user role and quizzes

  } 
  catch (error) {
    console.error("Error in validateUser:", error);
    return null;
  }
}

//*****************************************************************************/
