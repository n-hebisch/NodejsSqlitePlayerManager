var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Express'})
})

router.get('/test', function (req, res, next) {
  if (req.query.name !== undefined)
    res.render('index', {title: req.query.name})
  else
    res.render('index', {title: 'Express'})
})

module.exports = router
