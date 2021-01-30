const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require('body-parser');
var firebase = require("firebase/app");
require("firebase/auth");
const app = express();

var firebaseConfig = {
    apiKey: "AIzaSyDYeycKnctIqoRn5APAltOFffR2u87EQWc",
    authDomain: "dogoodwhile.firebaseapp.com",
    projectId: "dogoodwhile",
    storageBucket: "dogoodwhile.appspot.com",
    messagingSenderId: "391295060864",
    appId: "1:391295060864:web:9410e872d66b083f794f65",
    measurementId: "G-PQVDJ2RE3R"
  };

  firebase.initializeApp(firebaseConfig);

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
    res.render('loggedIn');
})

app.get('/profile',(req,res)=>{
    res.render('profile');
})
//POST Requests



app.post('/register', (req,res)=>{

    
      // Initialize Firebase
    

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
    // Signed in 
        res.render('login');
  })
  .catch((error) => {
    
    var errorCode = error.code;
    var errorMessage = error.message;

    res.render('index');

  });

})

app.post('/login', (req,res)=>{
    
})

app.listen(PORT,()=>console.log('Listening on port 3000'))
