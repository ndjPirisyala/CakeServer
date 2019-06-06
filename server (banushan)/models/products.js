const mongoose=require('mongoose');
var Products=mongoose.model('Products',{
    name:{type:String},
    productId:{type:String},
    price:{type:String}
},'pro');
module.exports={
    Products};