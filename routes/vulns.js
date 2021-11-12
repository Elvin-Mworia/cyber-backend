const express=require('express');
const router=express.Router();
const {Post}=require("../models");


router.get("/", async (req,res)=>{ 
    const VulnList= await Post.findAll({where:{isvulnerability:true}});
    res.json(VulnList);


})

module.exports = router;