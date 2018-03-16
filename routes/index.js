var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Spamd = require("node-spamd");
var spamd  = new Spamd('root', 'root', 'localhost', 783);


/* GET home page. */
router
.get('/', function(req, res, next) {
  res.render('index',{message:""});
})
.post('/',function(req,response,next){

  spamd.evaluate(req.body.subject, req.body.message, function(res, err){
    if(err) {
     response.render('index',{
       errMsg : "Error occured "+err
     })
    } else {
      if(res.spam) {
        var spamdResult = "The message is Spam, is evaluated with "+ res.evaluation + " points in a maximun of " + res.allowed;
        response.render('index',{
          message:spamdResult,
          subject:req.body.subject,
          messageBody:req.body.message,
          spam:true,
          rules:res.rules
        });
      }else{
        var spamdResult = 'The message is not Spam, is evaluated with ' + res.evaluation + " points in a maximun of " + res.allowed;
        response.render('index',{
          message:spamdResult,
          subject:req.body.subject,
          messageBody:req.body.message,
          spam:false
        });
      }
    }
  });

});

module.exports = router;
