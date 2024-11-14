const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://arunkrishna0232:123@cluster0.ivfl7au.mongodb.net/course_sellinf_app");

const AdminSchema = new mongoose.Schema({
    username : String,
    password : String,
});

const UserSchema = new mongoose.Schema({
    username : String,
    password : String,
    purchased_courses : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Course'
    }]
});

const CourseSchema = new mongoose.Schema({
    title : String,
    description : String,
    price : Number
});

const User = mongoose.model("Users",UserSchema);
const Admin = mongoose.model("Admins",AdminSchema);
const Course = mongoose.model("Courses",CourseSchema);

module.exports = {
   User,
   Admin,
   Course
};
