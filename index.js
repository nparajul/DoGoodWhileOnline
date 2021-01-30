const express = require("express");
const ejs = require("ejs");
const PORT = 3000;
const bodyParser = require('body-parser');
const auth = firebase.auth();

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

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

//POST Requests

app.post('/register', (req,res)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
})

app.post('/login', (req,res)=>{
    
})

app.listen(PORT,()=>console.log('Listening on port 3000'))
