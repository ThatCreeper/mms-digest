import * as firebase from "firebase";
const marked = require("marked");
var quickwrite = false;

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
// Get a reference to the storage service, which is used to create references in your storage bucket
var db = firebase.firestore();

document.getElementById("articles").innerHTML = marked(
  "# Loading page!\n### Patience is a virtue"
);

if (!quickwrite) {
  db.collection("articles")
    .orderBy("ts")
    .limit(3)
    .get()
    .then(doc => {
      //console.log(doc);
      if (doc.empty) return;
      console.log(doc);
      //return;
      //console.log(doc.docs);
      window.globalTest = doc.docs;
      var newHtml = "";
      //data = res.data;
      for (var i = 0; i < doc.docs.length; i++) {
        var post = doc.docs[i];
        var postData = post.data();
        //console.log(doc.docs);
        var authorName = postData.author;
        newHtml +=
          '<div class="report"><header-report>' +
          postData.title +
          "</header-report><hr/><author-report>Written By " +
          authorName +
          "</author-report><hr/><p>" +
          postData.firstText +
          '<a href="/post.html?&title=' +
          postData.title +
          "&author=" +
          authorName +
          "&content=" +
          postData.md +
          '">Read More</a></p></div>';
        document.getElementById("articles").innerHTML = newHtml;
      }
    });

  /*fetchData({
    query: "{posts(first:100){summary,authorID,title,id}authors{id,name}}"
  }).then(res => {
    window.globalTest = res.data;
    var newHtml = "";
    //data = res.data;
    for (var i = 0; i < res.data.posts.length; i++) {
      var post = res.data.posts[i];
      console.log(res.data);
      var authorName = res.data.authors.find(x => x.id == post.authorID).name;
      console.log(authorName);
      newHtml +=
        '<div class="report"><header-report>' +
        post.title +
        "</header-report><hr/><author-report>Written By " +
        authorName +
        "</author-report><hr/><p>" +
        post.summary +
        '<a href="/more.html?id=' +
        post.id +
        "&title=" +
        post.title +
        "&author=" +
        authorName +
        '">Read More</a></p></div>';
      document.getElementById("articles").innerHTML = newHtml;
    }
    console.log("a");
  });*/
}
