const express = require('express');
const app = express();
const port =1243;

app.set('view engine', 'ejs');

const name = 'Special';
app.get('/', (req, res) => {
    res.render('dashboard', { name: name });
})
app.get('/signup', (req, res) => {
    res.render('signup');
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
    
});