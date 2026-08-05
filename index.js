require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dns = require('dns');

const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

app.use(express.json());

console.log('MONGO_URI:', uri);

if(uri){
    mongoose.connect(uri)
    .then(() => {
        console.log('Database connected successfully');
    }).catch((error) => {
        console.error('Error connecting to database:', error);
    })
}

app.set('view engine', 'ejs');

// const name = 'Special';
// app.get('/', (req, res) => {
//     res.render('dashboard', { name: name });
// })
app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/submit', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const payload = {firstName, lastName, email, password};
    console.log(payload);
    // res.send(payload);
    res.status(201).json({status: true, message: 'User created successfully', data: payload});
    
})

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
    
});

const obj = {
    named: 'Special',
    aged: '20', 
    statused: 'single',
}
const {named, aged, statused} = obj;
console.log(named,statused);
