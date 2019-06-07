const express=require("express");
const multer=require('multer');
const Feed=require('../models/feedback');
const Email=require('../models/email');
const router =express.Router();
const nodemailer=require("nodemailer");

router.post('',(req,res,next)=>{
 
    const feed=new Feed({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    });
    console.log(feed);
   
    feed.save().then(result=>{
        res.status(201).json({
            message:'Feedback added successfully',
            feedId:result._id

        });
    });
   
});

router.get("",(req,res,next)=>{
    Feed.find().then(documents=>{
        res.status(200).json({
            message:"Feedbacks fetched successfully",
            feeds:documents
        });
       
    });
   
});

router.post("/sendEmail",(req,res)=>{
    console.log(req.body);
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: 'true',
        port: '465',
        auth: {
          user: 'lourdesfernando95@gmail.com', // must be Gmail
          pass: 'vish1995'
        }
      });

      var mailOptions = {
        from: 'cakeCorner.com',
        to: req.body.to, // must be Gmail
        cc:`<${req.body.to}>`,
        subject: req.body.subject,
        html: `
                <table style="width: 100%; border: none">
                  <thead>
                    <tr style="background-color: #000; color: #fff;">
                     
                      <th style="padding: 10px 0">Dear Customer,</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style="text-align: center">${req.body.message}</td>
                    </tr>
                    <p>Thank you..<p>
                  </tbody>
                </table>
              `
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).json({
            message: 'successfuly sent!'
          })
        }
      });
    
    });
    


router.delete("/:id",(req,res,next)=>{
    // console.log(req.params.id);
     Feed.deleteOne({_id:req.params.id}).then(result=>{
         console.log(result);
         res.status(200).json({
             message:'Feedback deleted'
         });
     });
 });






module.exports=router;