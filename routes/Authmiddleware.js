const dt=require("node-datetime");
const consumer_key=process.env.CONSUMERKEY
const consumer_secret=process.env.CONSUMERSECRET
const axios=require("axios");

//validating if a user is logged by checking and verifying the access token
const validToken=(req,res,next)=>{
    const accessToken=req.header("accessToken");
    if(!accessToken) return res.json({error:"User not logged in!"});
    try{
        const validToken=verify(accessToken,"cYbeR-SecUrity-bl0g");
      if(validToken){
          return next();
      }
    }catch(err){
        return res.json({error:err});
    }
}

//generating mpesa access token 

const accessToken=(req,res,next)=>{
    let url="https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    const auth=  new Buffer.from(consumer_key + ":" + consumer_secret).toString("base64") ;
    const header={
        Authorization: "Bearer " + auth
    }
    axios.get(url,{headers:header}).then((res)=>{
      const token=res.data.access_token;
      req.access_token=token;
      next();
    }
    ).catch((err)=>{
        console.log(err);
    })
   



}
module.exports={validToken,accessToken}