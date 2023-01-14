const express=require('express');
const router=express.Router();
const {Products}=require("../models");


router.post("/create", async (req,res,next)=>{ 
    //image:req.file.path,
    const data={
       
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        url:req.body.url
    }
    const product= await Products.create(data);
    res.status(200).json(product);
    console.log(product);
 next();
})
module.exports = router;