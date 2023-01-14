const  router=require('express').Router();
//const router=express.Router();
const {Post}=require("../models");
const sequelize=require("sequelize");

router.get("/",async (req,res)=>{
  
  const  listofpost= await Post.findAll({order:[[sequelize.literal("updatedAt")]]});
    if(listofpost==null){
        res.json("no posts have been added!");
    }
    res.send(listofpost.reverse());
 
    

});
router.put("/click", async (req,res)=>{
    const id=req.body.id;
    const clickcount=req.body.Clickcount;
   const post= await Post.update({where:{id:id},
    clickcount:clickcount})
    console.log(clickcount);
    console.log(post);
})
router.get("/getclick", async (req,res)=>{
    const id=req.params.id;
    const click= await Post.findByPk({where:{id:id},
    })
    
})
//get malware post
router.get("/popular",async (req,res)=>{
  
    const  listofpost= await Post.findAll(
      {order:[[sequelize.literal("clickcount"),"DESC"]]}
    );
      if(listofpost==null){
          res.json("no posts have been added!");
      }
      const Popularpost=listofpost.slice(0,5);
      res.send(Popularpost);
   
      
  
  });
//get vulns post
router.get("/vulns",async (req,res)=>{
  
    const  listofpost= await Post.findAll(
        {where:{isvulnerability:true}}
    );
      if(listofpost==null){
          res.json("no posts have been added!");
      }
      res.send(listofpost);
   
      
  
  });
  
//finding a specific post based on id
router.get("/:id",async (req,res)=>{
    const postid=req.params.id;

   const Postid=postid.substr(2,postid.length);
   console.log(Postid);
    const post=await Post.findByPk(Postid);
    res.send(post);
    console.log(post);
 
})

router.post("/create",async(req,res)=>{
    // image:req.file.path;
    const data= {title:req.body.title,
        postText:req.body.postText,username:req.body.username,isvulnerability:req.body.isvulnerability,ismalware:req.body.ismalware};
   const post= await Post.create(data);
    res.json({post:post,message:'post created'});
    
});

module.exports=router;