const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true},
    active_status: { type: Boolean, required: true,  default: true },
    student_id: { type: String, required: true, unique: false },
    password: { type: String, required: true }
})