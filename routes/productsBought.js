const mysql=require('mysql2');
const router=require('express').Router();
const db=mysql.createConnection({
    host: 'localhost',
    user:"angerfist",
    password:"9662@#$%&",
    database: 'blog'


});

router.post("/",(req,res)=>{
    const user=req.body.user.username;

    var list=[];
    req.body.list.map((a)=>{
        list.push(a.id);
    });
    console.log(user);
    console.log(list);
    db.connect((err)=>{
        if(err) throw err;
        console.log("connected to db...");
        
    })
    try{
    list.forEach(  (a)=>{
      db.query(`insert into blog.purchased (username_id,product_id) values("${user}","${a}")`,(err,res)=>{
         if(err) throw err;
         
     });
    })}catch(err){
        console.log("something went wrong");
        
    }finally{
        db.close((err)=>{
        if(err){ throw err};
        
       }); 
       console.log("finished updating from db and safely exiting....");
   } 
   
    


})

router.get("/user",(req,res)=>{
    const a=JSON.parse(JSON.stringify(req.body.user));
    console.log(a);

    db.connect((err)=>{
        if(err) throw err;
        console.log("connected to db...");
         
    })
    try{
    const lis= db.query(`select product_id from blog.purchased where username_id="${a}"`);
    console.log(lis);
   console.log(res.json(lis));
}catch(err){
    console.log("something went wrong");
   
}
finally{
     db.close((err)=>{
     if(err) throw err;
     
    }); 
    console.log("finished selecting from db and safely exiting....");
} 
})
module.exports = router;
