const express=require("express");
const router=express.Router();
const {Comment}=require('../models');
const {validToken}=require("./Authmiddleware");
const sequelize=require("sequelize");
//to get comments belonging to a post
router.get("/:postid",async(req,res)=>{
    const postid=req.params.postid;

const Postid=postid.substr(1,postid.length);
    console.log("comment is being fetched");
    const comments=await Comment.findAll({where:{PostId:Postid},
    raw:true,order:[[sequelize.literal("createdAt")]]});
   
    res.send(comments);

   
    console.log(comments);
});
//creating a comment in the comment database contaning the user 
/*validToken */
 router.post("/create",async(req,res,next)=>{
    const newcomment=req.body.comment;
    const postid=req.body.postid;
    const username=req.body.username;
    const comments={
        comment:newcomment,
        PostId:postid,
        username:username
    };
   

  const createdComment=  await Comment.create(comments);
    res.send(createdComment);
    console.log("comment created")
    next();
})
//deleting a comment
router.delete("/:commentid",validToken,async(res,req,next)=>{
    const commentid=req.body.id;
    Comment.destory({
        where:{
            id:commentid
        }
    })

next();
})
module.exports=router;