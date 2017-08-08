const express = require('express');
const router = express.Router();

const wikiRoute = require('./wiki');
const userRoute = require('./user')

var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req, res, next)=>{
  Page.findAll({})
  .then((pages)=>{
    res.render('index', {pages:pages})
  })
})
router.use('/wiki', wikiRoute);




module.exports = router;
