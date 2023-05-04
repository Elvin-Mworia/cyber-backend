const router=require('express').Router();
const {accessToken}=require('./Authmiddleware');
const dt=require('node-datetime');
const axios=require('axios');
const shortcode=process.env.SHORTCODE; 
const passkey=process.env.PASSKEY;
const mysql=require('mysql2');
const mpesa=require('mpesa-api').Mpesa;
const db=mysql.createConnection({
    host: 'localhost',
    user:"angerfist",
    password:"9662@#$%&",
    database: 'blog'


});
const cred={
     clientKey:process.env.CONSUMERKEY,
     clientSecrect:process.env.CONSUMERSECRET,
     initiatorPassword:"Safaricom584!D" ,
     securityCredential:process.env.SHORTCODE,
     certificatePath:"null"

}
const Mpesa=new mpesa(cred,"live");

router.post("/mpesastk-push",(req,res)=>{
const amount=req.body.amount;
const user=req.body.user;
const list=req.body.list;
const phone=req.body.phone;
// const password=Buffer.from(shortcode+passkey+timestamp).tostring("base64");
 const time=dt.create();
 const timestamp=time.format("YmHMS");
//   const  url="https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
//   const password=Buffer.from(shortcode+passkey+timestamp).toString("base64");
//   const header={Authorization:"Bearer"+req.access_token},
   data={
      "BusinessShortCode":shortcode,
      
      "TransactionType":"CustomerPayBillOnline",
      "Amount":amount,
      "partyA":phone,
      "PartyB":shortcode,
      "PhoneNumber":phone,
      "CallBackURL":"http://localhost:3000/mpesa-online/callback",
      "AccountReference":"Cyber Informant",
      "TransactionDesc":"Payment",
      "passKey":passkey



  }

  Mpesa.lipaNaMpesaOnline(
     data
    ).then(()=>{
    db.connect((err)=>{
        if(err) throw err;
        console.log("connected to db...");
        
    })
 list.foreach(  (a)=>{
      db.query(`insert into blog.products values(${user},${a})`,(err,res)=>{
         if(err) throw err;
         console.log(res);
     });
 });
 db.close((err)=>{
     if(err) throw err;
     console.log("finished updating db and safely exiting....");
 });
  }).catch((err)=>{
      console.log(err);
  })
})

router.post("/callback",(req,res)=>{
    console.log(req.body.Body.stkCallback.CallbackMetadata);
})
 


module.exports=router;