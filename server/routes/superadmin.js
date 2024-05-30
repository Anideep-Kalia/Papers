const express=require('express');
const router=express.Router(); 
const Admin=require('../models/Admin');
const User=require('../models/User');
var fetchuser=require('../middleware/fetchuser')


// Route 0 
router.get('/fetchalladmin', async (req, res) => {
  try {
      const admin = await Admin.find();
      res.json(admin);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
  }
});
// route 1
router.get('/fetchallusers', async (req, res) => {
  try {
      const user = await User.find();
      res.json(user);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
  }
});

    // Route 2
    router.post('/getuser',fetchuser,async (req,res)=>{      
    try{
      let userId=req.user.id; 
      const user=await Admin.findById(userId)
      res.send(user)
    }catch (error){
      console.error(error.message);
      res.status(500).send("Internal error occured");
    }
  })

  
//   Router 3
router.post('/registeradmin', async (req, res) => {
    try {
      // Check if the username is already taken
      let user = await Admin.findOne({ userid: req.body.userid });
      if (user) {
        return res.status(400).json({ success: false, error: "This userid is already taken" });
      }
  
      // Create a new user
      user = new Admin({
        name: req.body.name,
        userid: req.body.userid,
      });
  
      await user.save();
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  });

  module.exports=router
