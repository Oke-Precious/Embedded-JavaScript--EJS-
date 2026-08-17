const express = require('express');
const router = express.Router();
const {getHompage, postStudent, getStudent, getStudentById, updateStudent, deleteStudent, getSignupPage} = require('../controllers/student.controller');

router.get('/', getHompage);
router.post('/postit', postStudent);
router.get('/getstudent', getStudent);
router.get('/getstudent/:id', getStudentById);
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);
router.get('/signup', getSignupPage);

module.exports = router;