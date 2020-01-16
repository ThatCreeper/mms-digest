var firebase = require("firebase");
var marked = require("marked");
if (!firebase.apps.length) {
  var firebaseConfig = {
    apiKey: "AIzaSyAbG4ayeyB61Gf-FbxqIapvbjI-c2Sevcg",
    authDomain: "orchestra-land-time-signature.firebaseapp.com",
    databaseURL: "https://orchestra-land-time-signature.firebaseio.com",
    projectId: "orchestra-land-time-signature",
    storageBucket: "orchestra-land-time-signature.appspot.com",
    messagingSenderId: "125062570113",
    appId: "1:125062570113:web:a36a200f73c7b4d952ad80"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}
setTimeout(() => {
  firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(function() {
      var provider = new firebase.auth.GoogleAuthProvider();
      // In memory persistence will be applied to the signed in Google user
      // even though the persistence was set to 'none' and a page redirect
      // occurred.
      //debugger;
      if (firebase.auth().currentUser) return;
      return firebase.auth().signInWithRedirect(provider);
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    });
}, 3000);

var db = firebase.firestore();

window.submitPost = () => {
  debugger;
  var title = document.getElementById("title").value;
  var author = document.getElementById("author").value;
  var markdown = document.getElementById("markdown").value;
  var firsttext = document.getElementById("firsttext").value;
  db.collection("articles").add({
    author,
    firstText: firsttext,
    md: markdown,
    title,
    ts: firebase.firestore.Timestamp.fromDate(new Date())
  });
  alert(1);
};

function preview() {
  var markdown = document.getElementById("markdown").value;
  document.getElementById("preview").innerHTML = marked(markdown);
}
