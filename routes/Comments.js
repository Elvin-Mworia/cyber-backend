const express=require("express");
const router=express.Router();
const {comment}=require('../models');
const {validToken}=require("./Authmiddleware");
//to get comments belonging to a post
router.get("/:postid",async(req,res)=>{
    const postid=req.body.id;
    const comments=await comment.findAll({where:{id:postid}});
    res.json(comments);
});
//creating a comment in the comment database contaning the user 
router.post("/",validToken,async(req,res,next)=>{
    const comments=req.body;
    const username=req.user.username;
    comment.username=username; 

    await comment.create(comments);
    res.json(comment);
    next();
})
//deleting a comment
router.delete("/:commentid",validToken,async(res,req,next)=>{
    const commentid=req.body.id;
    comment.destory({
        where:{
            id:commentid
        }
    })

next();
})
module.exports=router;