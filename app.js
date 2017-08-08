const express = require('express');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const path = require('path');
const routes = require('./routes');


const app = express();

//setting up Port
const port = process.env.PORT || 3000;
const models = require('./models');

//setting up bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//configure nunjucks
nunjucks.configure('views', {noCache: true});
app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);

models.User.sync({})
.then(function(){
  return models.Page.sync({})
})
.then(function(){
  app.listen(port, function(){
    console.log(`server is listening on port ${port}`);
  })
})
.catch(console.error);
