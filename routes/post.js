const  router=require('express').Router();
//const router=express.Router();
const {Post}=require("../models");

router.get("/",async (req,res)=>{
  
  const  listofpost= await Post.findAll();
    if(listofpost==null){
        res.json("no posts have been added!");
    }
    res.send(listofpost);
 
    

});
//finding a specific post based on id
router.get("/byid/:id",async (req,res)=>{
    const id=req.body.id;
    const post=await Post.findByPk(id);
    res.json(post);
 
})
router.post("/create",async(req,res)=>{
    const {title,postText,image,username,isvulnerability,ismalware}=req.body;
   const post= await Post.create({title,postText,image,username,isvulnerability,ismalware});
    res.json({post:post,message:'post created'});
    
});

module.exports=router;