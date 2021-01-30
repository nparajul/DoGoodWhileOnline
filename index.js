const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require('body-parser');
var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");
const app = express();

var firebaseConfig = {
    apiKey: "AIzaSyDYeycKnctIqoRn5APAltOFffR2u87EQWc",
    authDomain: "dogoodwhile.firebaseapp.com",
    projectId: "dogoodwhile",
    databaseURL: "https://dogoodwhile-default-rtdb.firebaseio.com",
    storageBucket: "dogoodwhile.appspot.com",
    messagingSenderId: "391295060864",
    appId: "1:391295060864:web:9410e872d66b083f794f65",
    measurementId: "G-PQVDJ2RE3R"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.database();


app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//GET Requests
app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/login',(req,res)=>{
    res.render('login');
})

app.get('/loggedIn',(req,res)=>{
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          res.render('loggedIn')
        } else {
          res.render('login')
        }
      });
})

//POST Requests



app.post('/register', (req,res)=>{

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
        var user = userCredential.user;
        database.ref('users/'+user.uid).set({
            first: firstName,
            last: lastName,
            email: email,
            hobby: "Philanthrohpy"
        });
        res.render('login');
  })
  .catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;

    res.render('index');

  });

})

app.post('/login', (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid);
    res.render('loggedIn');
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.render('login');
  });
})

app.listen(PORT,()=>console.log('Listening on port 3000'))
