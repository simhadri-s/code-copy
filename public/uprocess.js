  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAZ1EX8QW2A82m0O14bJYR02n9vOEw066A",
    authDomain: "copy-code-9438c.firebaseapp.com",
    databaseURL: "https://copy-code-9438c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "copy-code-9438c",
    storageBucket: "copy-code-9438c.appspot.com",
    messagingSenderId: "51305432297",
    appId: "1:51305432297:web:21d6e8392f0191d0f61c78",
    measurementId: "G-KK9YN3Q2G0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get references to the Firebase Realtime Database
const database = firebase.database();
const titleref = database.ref('codes/titles');
const pgmnumref = database.ref('codes/pgmnums');
const coderef = database.ref('codes/code');
const pgmnumarr=[];
pgmnumref.once("value", function(snapshot){
  var pgmnumdata = snapshot.val();
  for(let i in pgmnumdata){
    pgmnumarr.push(pgmnumdata[i]);
  }
})

// Add an event listener to the "Upload" button
document.querySelector('#uploadButton').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const pgmnum = document.getElementById('pgmnum').value;
  const content = document.getElementById('content').value;

  // Check if any field is empty
  if (!title || !pgmnum || !content) {
    // Display an error message
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'block';

    // Hide the success message if it was displayed previously
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none';

    return; // Prevent further execution
  }

  //Check whether program already exists
  if (pgmnumarr.includes(pgmnum)){
    const myElement =  document.getElementById('errorMessage');
    myElement.textContent="The selected program already exists!";
    myElement.style.display = 'block';
    setTimeout(function () {
      myElement.textContent = initialText;
      myElement.style.display = 'none';
  }, 3000);
  return;
  }

  // Push the data to the respective Firebase database references
  titleref.push(title);
  pgmnumref.push(pgmnum);
  coderef.push(content);

  // Display the success message
  const successMessage = document.getElementById('successMessage');
  successMessage.style.display = 'block';
  alert("upload success!");

  // Clear the input fields after a short delay (optional)
  setTimeout(() => {
    document.getElementById('title').value = '';
    document.getElementById('pgmnum').value = '';
    document.getElementById('content').value = '';
    location.reload();
  }, 1000); // 1 second (adjust as needed)

  // Hide the error message if it was displayed previously
  const errorMessage = document.getElementById('errorMessage');
  errorMessage.style.display = 'none';
});