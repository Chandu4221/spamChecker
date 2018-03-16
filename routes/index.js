var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Spamc = require('spamc');
var spamc = new Spamc();



/* GET home page. */
router
.get('/', function(req, res, next) {
  res.render('index',{message:""});
})
.post('/',function(req,res,next){
  spamc.report(req.body.message, function (result) {
    console.log(result);
    res.render('index',{message:result});

  });
});

module.exports = router;
