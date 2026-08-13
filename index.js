const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const port = process.env.PORT || 1243;
const uri = process.env.MONGO_URI;

const studentModel = require('./models/student.model');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("tan o wa nibe");
});

app.post('/postit', async (req, res) => {
    try {
        const newStudent = new studentModel({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            studentId: req.body.studentId,
        });

        const savedStudent = await newStudent.save();
        console.log('Saved student');
        res.status(200).json({
            status: true,
            message: 'Student saved successfully',
            savedStudent
        });
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: err.message });
    }
});
app.get('/getstudent', async (req, res) => {
    try{
       const allStudents = await studentModel.find();
    //    const studentId = await studentModel.findOne({student_id : ""})
        console.log(allStudents);
        res.status(200).json({ message: 'All students retrieved successfully', allStudents });
    } catch(err){
        console.log(err);
        res.status(401).json({ message: 'Something went wrong Error retrieving students' });
    }
    
});
app.get('/getbyid', async(req, res) => {
    try{
        const student = await studentModel.findById("6a73138dd323cdd89ecd5f2f");
        res.status(200).json({ message: 'All students retrieved successfully', student });
    }
    catch(err){
        console.log(err)
        res.status(401).json({ message: 'Something went wrong Error retrieving students' });
    }
})

app.put('/update', async(req, res) => {
    // console.log(req.body)
    try{
        // find and update by email

        // const result = await studentModel.findOneAndUpdate(
        //     {
        //         email: req.body.email,
        //     }, 
           
        //         req.body
           
        // );


        // Find and update by id
        const result = await studentModel.findByIdAndUpdate('6a74576a7e092833d357aaa0', req.body)

         res.status(200).json({ message: 'Student Record Updated', result });
    }
    catch(err){
        console.log(err)
        res.status(401).json({ message: 'Something went wrong Error retrieving students' });
    }
})

app.delete('/delete/:id', async(req, res) =>{
    try{
        // console.log(req.body)
        const result = await studentModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Record Deleted Successfully', result})
    }
    catch(err){
        console.log(err)
        res.status(401).json({ message: 'Something went wrong Error deleting students record' });
    }
})

console.log('MONGO_URI:', uri);

if (uri) {
    mongoose.connect(uri)
        .then(() => {
            console.log('Database connected successfully');
            app.listen(port, () => {
                console.log(`Server is running on ${port}`);
            });
        })
        .catch((error) => {
            console.error('Error connecting to database:', error);
        });
}
app.set('view engine', 'ejs');


app.get('/signup', (req, res) => {
    res.render('signup');
})

// app.get('/index', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })


// app.post('/submit', (req, res) => {
//     const { firstName, lastName, email, password } = req.body;
//     const payload = {firstName, lastName, email, password};
//     console.log(payload);
//     // res.send(payload);
//     res.status(201).json({status: true, message: 'User created successfully', data: payload});
    
// })

app.listen(port, (req, res) => {
    console.log(`Server is running on ${port}`);
    
});

// const obj = {
//     named: 'Special',
//     aged: '20', 
//     statused: 'single',
// }
// const {named, aged, statused} = obj;
// console.log(named,statused);
