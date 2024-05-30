const express=require('express');
const router=express.Router();                                         // the router converts the hhtp into get or post etc.
const User=require('../models/User');
const { body, validationResult } = require('express-validator');
var fetchuser=require('../middleware/fetchuser');


// Route 1:
  router.post('/createuser', [
    body('name').isLength({ min: 3 }),
  ], async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      // Check if the userid is already taken
      let user = await User.findOne({ userid: req.body.userid });
      if (user) {
        return res.status(400).json({ success: false, error: "This userid is already7882 taken" });
      }
  
      // Create a new user
      user = new User({
        name: req.body.name,
        gender: req.body.gender,
        country: req.body.country,
        state: req.body.state,
        interest: req.body.interest,
        standard: req.body.standard,
        userid: req.body.userid,
        coordinates:req.body.coordinates,
      });
  
      await user.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  });

  // Route 2: get login user detail using: POST api/auth/getuser does require authentication
  router.post('/getuser',fetchuser,async (req,res)=>{      // here fetchuser is a middleware which is extratcing user data form the token and is calling next function 
  try{
    let userId=req.user.id;          // the id of the user information is random and is assigned by the computer only not by ourselves it is same id which we used for making token for the user
    const user=await User.findById(userId)
    res.json(user)
  }catch (error){
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
})


module.exports=router
