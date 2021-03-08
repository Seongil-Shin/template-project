var express = require('express');
var router = express.Router();
 
router.get('/api/test', function(req, res, next) {
    console.log('test')
  
    res.send({test:'test'});
  });
   
module.exports = router;
  