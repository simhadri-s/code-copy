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


// Get the Firestore database
const db = firebase.database();

//field references
var titleref = firebase.database().ref('titles');
var pgmnumref = firebase.database().ref('pgmnums');
var coderef = firebase.database().ref('code');
//Code to upload the file to database
document.querySelector('#uploadButton').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const pgmnum = document.getElementById('pgmnum').value;
  const content = document.getElementById('content').value;
  titleref.push(title);
  pgmnumref.push(pgmnum);
  coderef.push(content);
})