const mongoose=require('mongoose');

const librarySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
    },
    price:{
        type:Number,
        required:true

    },
    quantity:{
        type:Number,
        required:true
    }
})

const libraryModel=mongoose.model('libraryModel',librarySchema);

module.exports=libraryModel;




