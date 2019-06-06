const mongoose=require('mongoose');



const cakeSchema=mongoose.Schema({
    name:{type:String},
    category:{type:String},
    price:{type:Number},
    imagePath:{type:String},
    description:{type:String},
    features:[{feature:String}]
});

module.exports=mongoose.model('Cake',cakeSchema);