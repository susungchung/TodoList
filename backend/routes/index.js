const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index.ejs', { title: 'Expresss' });
  if(req.session.num === undefined){
      req.session.num = 1;
  } else {
      req.session.num =  req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
});

module.exports = router;
