var express = require('express');
var stripe = require('stripe')('sk_test_cmCuicJ1Ub51o7rTxMApy2T000e7w0ifqY');
var app = express();
var bodyParser = require('body-parser');
const {mongoose}= require('./db.js');
var productcontroller=require('./controller/productcontroller.js');
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
//cross origin start
var cors = require('cors');
var originsWhitelist = [
'http://localhost:4200'
];
var corsOptions = {
origin: function(origin, callback){
var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
callback(null, isWhitelisted);
},
credentials:true
}
app.use(cors(corsOptions));
//cross origin end
app.post('/payme',(req,res)=>{
    console.log('The body is ',req.body);
    var charge = stripe.charges.create({
        amount: 230000,
        currency: 'gbp',
        source: req.body.token
      },(err,charge)=>{
          if(err){
              throw err;
          }
          res.json({
              success : true,
              message : "Payment Done"
          })
      });
})

 app.use('/products',productcontroller);
app.listen(3001,()=>{
    console.log('Server starts at port 3001');
});