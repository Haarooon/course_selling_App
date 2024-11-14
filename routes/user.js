const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.create({
        username,
        password
    })
    res.send("user created successfully");
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await  Course.find({})
    res.json({
        message : "all courses are listed"+courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
   const response = await User.updateOne({
    username
   },{
    $push : {
        purchased_courses : courseId
    }
   })
   res.json({
    response,
    msg : "Updated succesfully"
   })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    const user = await User.findOne({
        username
    })
  Course.find({
    _id : {
     "$in" :  user.purchased_courses
    }
  }).then(function(response){
    res.json({
        myCourses : response
    })
  })
});

module.exports = router