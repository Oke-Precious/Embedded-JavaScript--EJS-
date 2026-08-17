const studentModel = require('../models/student.model');

const getHompage =  (req, res) => {
    res.send("tan o wa nibe");
};

const postStudent = async (req, res) => {
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
};

const getStudent = async (req, res) => {
    try{
       const allStudents = await studentModel.find();
    //    const studentId = await studentModel.findOne({student_id : ""})
        console.log(allStudents);
        res.status(200).json({ message: 'All students retrieved successfully', data: allStudents });
    } catch(err){
        console.log(err);
        res.status(401).json({ message: 'Something went wrong Error retrieving students' });
    }
    
};

const getStudentById = async(req, res) => {
    try{
        const student = await studentModel.findById("6a73138dd323cdd89ecd5f2f");
        res.status(200).json({ message: 'All students retrieved successfully', student });
    }
    catch(err){
        console.log(err)
        res.status(401).json({ message: 'Something went wrong Error retrieving students' });
    }
};

const updateStudent = async(req, res) => {
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
};

const deleteStudent = async(req, res) =>{
    try{
        // console.log(req.body)
        const result = await studentModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Record Deleted Successfully', result})
    }
    catch(err){
        console.log(err)
        res.status(401).json({ message: 'Something went wrong Error deleting students record' });
    }
};

const getSignupPage = (req, res) => {
    res.render('signup');
};

module.exports = {
    getHompage,
    postStudent,
    getStudent,
    getStudentById,
    updateStudent,
    deleteStudent,
    getSignupPage
};