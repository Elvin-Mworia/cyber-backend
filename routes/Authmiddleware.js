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
module.exports={validToken}