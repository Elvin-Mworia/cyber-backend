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
const products=require("./routes/resources");
const addproduct=require("./routes/products");
const productsB=require("./routes/productsBought");



const {Post}=require("./models");
const bcrypt=require("bcrypt");
const {Users}=require("./models");
const {Products}=require("./models");
const upload=require("./upload");
const uploadPost=require("./uploadPost");
const user=require("./routes/users");
const comments=require("./routes/Comments");
const mpesa=require("./routes/mpesasktpush");
const {accessToken}=require('.//routes/Authmiddleware');


const logger=(req,res,next)=>{
    console.log("incoming request");
    next();
 }
 const Allowed_origin=['*'];
 


var corOption={
    origin:Allowed_origin
}
app.use(cors(corOption));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
  
app.use(logger);
//static files
app.use("/images/product",express.static("images/product"));
app.use("/images/post",express.static("images/post"));
//routers
app.use("/posts",postrouter);
app.use("/auth",Auth);
app.use("/malware",Malware);
app.use("/vulns",Vulns);
app.use("/resources",products);
app.use("/user",user);
app.use('/addproduct',upload,addproduct);
app.use("/comments",comments);
app.use("/productBought",productsB);
app.use("/mpesa-online",mpesa);
app.use("/mpesa",accessToken);


 

const port=process.env.PORT;
db.sequelize.sync({logging:console.log,force:false}).then(()=>{
    
    console.log("Connection to the database established");
    
    app.listen(port,()=>{
        console.log(`running on port ${port}`);
});

}).catch(err=>(console.log(`Something went wrong ${err}`)));
