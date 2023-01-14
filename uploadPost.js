const multer=require('multer');
const path=require("path");
const moment=require("moment");
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.resolve(__dirname,'./images/post' ));
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
    
})
const uploadPost=multer({
    storage:storage,
    limits:{fileSize:"1000000"},
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|jpg|png/
        const mimtype=fileTypes.test(file.mimetype)
        const extname=fileTypes.test(path.extname(file.originalname))
       if(mimtype && extname ){
           return cb(null,true)
       }  
       cb('give the proper file formats to upload') 
    }
}).single("image")
module.exports=uploadPost;