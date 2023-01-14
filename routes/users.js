const express=require('express');
const router=express.Router();
const {Users}=require("../models");

router.get("/byemail/:email",async (req,res)=>{
    const email=req.body.useremail;
    const user=await Users.findAll({where:{email:email}});
    console.log(user);
    res.json(user);
 
})
module.exports = router;