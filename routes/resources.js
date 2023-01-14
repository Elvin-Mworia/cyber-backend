const express=require('express');
const router=express.Router();
const {Products}=require("../models");


router.get("/", async (req,res)=>{ 
    const productList= await Products.findAll();
    res.send(productList);

})
router.get("/book",async (req,res)=>{ 
    const id=req.body.a;
    const product=await Products.findOne({where: {id:id}});
    res.send(product);
})

module.exports = router;
