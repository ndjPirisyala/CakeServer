const mongoose=require('mongoose');



const emailSchema=mongoose.Schema({
    to:{type:String,required:true},
    subject:{type:String,required:true},
    message:{type:String,required:true}
   
});

module.exports=mongoose.model('Email',emailSchema);