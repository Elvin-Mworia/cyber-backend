const express=require('express');
const router=express.Router();
const bcrypt=require("bcrypt");
const {sign}=require("jsonwebtoken");
const {validToken}=require("./Authmiddleware");
const {Users}=require("../models");

//registering
router.post("/register", async (req,res)=>{ 
    const {email,password,username}=req.body;
      //    const email=req.params.email;
      //    const password=req.params.password;
      //    const username=req.params.username;
         console.log(password);
         console.log(email);
         console.log(username);
  
  
      bcrypt.hash(password,10).then(async (hash)=>{
      const newUser={email:email,password:hash,username:username}
      console.log(newUser);
       const user= await Users.create(newUser);
          res.json({message:`Thank ${user.username} for registering`});
          
      });
  });
  



//logging in
router.post("/login",async (req,res)=>{
const {email,password}=req.body;

const user=await Users.findOne({where:{email:email}});
console.log(user);

if(user==null){
    res.json({message:"Username or email was not found"});
}


bcrypt.compare(password,user.password).then((match)=>{
    if(!match) res.json({message:"Wrong username and password combination",status:301});
    const accessToken=sign({username:user.username,id:user.id},"cYbeR-SecUrity-bl0g");
    
    res.send({accessToken:accessToken,
        message:"Logged in successfully",
    status:200});
    console.log(accessToken);
 console.log("logged in successfully.");

})

});
//sending information back to the frontend for the user
router.get("/auth",validToken,(req,res,next)=>{
    res.json(req.user);
    next();
});
module.exports=router;