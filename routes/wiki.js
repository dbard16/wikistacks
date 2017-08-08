const express = require('express');
const router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', (req, res, next)=>{
  res.redirect('/');
});

router.post('/', (req, res, next)=>{
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  page.save()
  .then(function(newPage){
    res.redirect(newPage.route)
  });


});

router.get('/add', (req, res, next)=>{
  res.render('addpage');
});

router.get('/:urlTitle', (req, res, next)=>{
  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then((page)=>{

    res.render('wikipage', {page : page});
  })
  .catch(next);
});


module.exports = router;
