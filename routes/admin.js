const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    }).then(function(response){
       res.send("admin created successfully");
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const courseBody = req.body;
    Course.create({
        title : courseBody.title,
        price : courseBody.price,
    }).then(function(response){
        console.log(response);
        res.send("course created successfully");
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    Course.find({})
      .then(function(response){
        res.json({
            response
        })
      })
});

module.exports = router;