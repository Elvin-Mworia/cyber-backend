const express=require('express');
require("dotenv").config();
const app=express();
const cors=require('cors');
const db=require("./models");
const Sequelize=require("sequelize");
const postrouter=require("./routes/post");
const Auth=require("./routes/auth");
const Malware=require("./routes/malware");
const Vulns=require("./routes/vulns");
const Products=require("./routes/resources");
const {Post}=require("./models");
const bcrypt=require("bcrypt");
const {Users}=require("./models");

const logger=(req,res,next)=>{
    console.log("incoming request");
    next();
}


var corOption={
    origin:'http://localhost:3000'
}
app.use(cors(corOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
  
app.use(logger);

//routers
app.use("/posts",postrouter);
app.use("/auth",Auth);
app.use("/malware",Malware);
app.use("/vulns",Vulns);
app.use("/resources",Products);


app.get("/",(req,res)=>{ res.json( {message:"Let's start builiding the backend "});
});


app.get("/post",async (req,res)=>{
 
   const listofpost= await Post.findAll();
    if(listofpost==null){
        res.json("no posts have been added!");
    }
    res.send(listofpost);
 
    

});






const port=3001;
db.sequelize.sync({logging:console.log,force:false}).then(()=>{
    
    console.log("Connection to the database established");
    
    app.listen(port,()=>{
        console.log(`running on port ${port}`);
});



}).catch(err=>(console.log(`Something went wrong ${err}`)));