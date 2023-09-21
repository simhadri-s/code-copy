// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
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
const db = getDatabase();

var titleref = firebase.database().ref('codes/titles');
var pgmnumref = firebase.database().ref('codes/pgmnums');
var coderef = firebase.database().ref('codes/code');

var firebaseRef =firebase.database().ref('codes');

const titlearr=[], pgmnumarr=[], codearr=[], darr=[];

titleref.once("value", function(snapshot){
  var titledata = snapshot.val();
  for(let i in titledata){
    titlearr.push(titledata[i]);
  }
})

pgmnumref.once("value", function(snapshot){
  var pgmnumdata = snapshot.val();
  for(let i in pgmnumdata){
    pgmnumarr.push(pgmnumdata[i]);
  }
})

coderef.once("value", function(snapshot){
  var codedata = snapshot.val();
  for(let i in codedata){
    codearr.push(codedata[i]);
  }
  assisort();
})

//function to assign all elements to an array and sort
function assisort() {
  for(let j=0; j<pgmnumarr.length; j++){
    darr.push({pgmnum: pgmnumarr[j], titleText: titlearr[j], contentText: codearr[j]});
  }
  darr.sort((a, b) => parseInt(a.pgmnum) - parseInt(b.pgmnum));
  crttble();
}

function crttble() {
  const tableBody = document.getElementById('tableBody');
  const buttonText="Copy Code";

    darr.forEach((contentObj, index) => {
      const row = document.createElement('tr');
      tableBody.appendChild(row);

      const slnoc = document.createElement('td');
      const slno = document.createElement('t');
      slno.textContent = contentObj.pgmnum;
      slnoc.appendChild(slno);
      console.log(slno);
      row.appendChild(slnoc);

      const titleCell = document.createElement('td');
      const title = document.createElement('t');
      title.textContent = contentObj.titleText;
      titleCell.appendChild(title);
      console.log(title);
      row.appendChild(titleCell);

      const buttonCell = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = buttonText;
      buttonCell.appendChild(button);
      row.appendChild(buttonCell);

      const contentCell = document.createElement('td');
      const paragraph = document.createElement('p');
      paragraph.textContent = contentObj.contentText;
      paragraph.style.display = 'none';
      contentCell.appendChild(paragraph);
      row.appendChild(contentCell);

      button.addEventListener('click', () => {
        paragraph.style.display = 'block';
        const range = document.createRange();
        range.selectNode(paragraph);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand('copy');

        selection.removeAllRanges();
        paragraph.style.display = 'none';

        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = buttonText;
        }, 2000);
      });
    });
  
}




