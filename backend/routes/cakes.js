const express=require("express");
const multer=require('multer');
const Cake=require('../models/cake');
const router =express.Router();


const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
};
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const isValid=MIME_TYPE_MAP[file.mimetype];
        console.log(isValid);
        let error=new Error("Invalid mime type");
        if(isValid){
            error=null;
        }
        cb(error,"backend/images")
    },
    filename:(req,file,cb)=>{
        const name=file.originalname.toLowerCase().split(' ').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+'-'+Date.now()+'.'+ext);
    }
});

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './backend/images');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
    
//   });


const multerConf={
    storage:multer.diskStorage({
        destination:function(req,file,next){
            next(null,'./backend/images');
        },
        filename:function(req,file,next){
            console.log(file);
        }
    }),
};
  

router.post('',multer({storage:storage}).single('imagePath'),(req,res,next)=>{
    const url=req.protocol+'://'+req.get("host");
   // console.log(storage.filename);
    console.log(url);
    console.log(req.file.filename);
    console.log(req.body.features);
    console.log(req.body.price);
    const cake=new Cake({
        name:req.body.name,
        category:req.body.category,
        price:JSON.parse(req.body.price),
        imagePath:url+"/images/"+req.file.filename ,
        description:req.body.description,
        features:JSON.parse(req.body.features)
    });
    console.log(cake.name);
    cake.save().then(result=>{
        res.status(201).json({
            message:'Cake added successfully',
            cakeId:result._id,
            imagePath:result.imagePath
        });
    });
   
});

router.delete("/:id",(req,res,next)=>{
    // console.log(req.params.id);
     Cake.deleteOne({_id:req.params.id}).then(result=>{
         console.log(result);
         res.status(200).json({
             message:'Cake deleted'
         });
     });
 });

router.put("/:id",multer({storage:storage}).single('imagePath'),(req,res,next)=>{
    let imagePath=req.body.imagePath;
    let cake;
    if(req.file){
        const url=req.protocol+"://"+req.get("host");
        imagePath=url+"/images/"+req.file.filename;

         cake=new Cake({
            _id:req.body.id,
            name:req.body.name,
            category:req.body.category,
            price:JSON.parse(req.body.price),
            imagePath:imagePath,
            description:req.body.description,
            features:JSON.parse(req.body.features)
        });
    }else{
         cake=new Cake({
            _id:req.body.id,
            name:req.body.name,
            category:req.body.category,
            price:req.body.price,
            imagePath:imagePath,
            description:req.body.description,
            features:req.body.features
        });
    }
   
    Cake.updateOne({_id:req.params.id},cake).then(result=>{
        res.status(200).json({message:"Update successful!",imagePath:cake.imagePath});
    });
});
router.get("",(req,res,next)=>{
    Cake.find().then(documents=>{
        res.status(200).json({
            message:"Cakes fetched successfully",
            cakes:documents
        });
    });
   
});

module.exports=router;
