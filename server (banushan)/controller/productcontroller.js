const express=require('express');
var router=express.Router();
var{Products}=require('../models/products');
router.get('/',(req,res)=>{
    Products.find((err,docs)=>{
        if(!err){res.send(docs);}
        else{console.log('Error in Retriving Products:'+JSON.stringify(err,undefined,2));}

    });
});
router.post('/',(req,res)=>{
    var pro=new Products({
        name:req.body.name,
        productId:req.body.productId,
        price:req.body.price,
       
    });
});
module.exports=router;