const express = require('express');
const app = express();
const businessRoutes = express.Router();

// Require Business model in our routes module
let Business = require('../models/usermanage');

// Defined store route
businessRoutes.route('/add').post(function (req, res) {
  let business = new Business(req.body);
  business.save()
    .then(business => {
      res.status(200).json({'business': 'business in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

module.exports = businessRoutes;