const authHandler=(req,res,next)=>{
    //....auth logic
    //...
    console.log("auth completed..");
    next();
    
}


module.exports=authHandler