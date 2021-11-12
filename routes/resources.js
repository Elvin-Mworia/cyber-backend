const express=require('express');
const router=express.Router();
const {Products}=require("../models");


router.get("/", async (req,res,next)=>{ 
    const Products= await Products.findall();
    res.send(Products);
next();
})

module.exports = router;