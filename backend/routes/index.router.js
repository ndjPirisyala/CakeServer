const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
//const businessRoutes = express.Router();

// Require Business model in our routes module
let User = mongoose.model('User');

 
const ctrlUser = require('../controllers/user.controller');
const jwtHelper = require('../config/jwtHelper');

router.post('/register', ctrlUser.register);
router.post('/authenticate', ctrlUser.authenticate);
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/edit',function (req, res) {
    console.log("Check");
    let id = req.body._id;
    console.log(req.body._id);
    User.findOne({_id:id}, function (err, user){
        if(!err){
          res.status(200).json(user);
        }
    });
  });
 
module.exports = router;