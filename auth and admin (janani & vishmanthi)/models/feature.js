const mongoose=require('mongoose');

const featureSchema=mongoose.Schema({
    feature:{type:String,required:true},
   
});

module.exports=mongoose.model('Feature',featureSchema);