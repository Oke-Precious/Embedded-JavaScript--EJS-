const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true, minlength: 2, maxlength: 100 },
    lastName: { type: String, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, required: true, unique: true },
    active_status: { type: Boolean, required: true, default: true },
    studentId: { type: String, required: true, unique: false },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const studentModel = mongoose.model('Student', studentSchema);

module.exports = studentModel;