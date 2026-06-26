const log=(req,res,next)=>{
    console.log("global middleware 1");
    next();
}
module.exports=log;