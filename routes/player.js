var express = require('express')
var router = express.Router()

const players = require('../Players.js');
const fileManager = require('../FileManager.js');

router.get('/', function (req, res) {
  var contentFile = fileManager.load('./players.csv');
  var playerArray=players.convertToArray(contentFile);
  res.render('player/index', {players:playerArray})
})

// Get a player
router.get('/:id', function (req, res) {
  var contentFile = fileManager.load('./players.csv')

  if (req.params.id !== undefined) {
    var playerCSVLine = players.findById(req.params.id, contentFile)
    //response: player csv line
    var newcontentFile = fileManager.load('./players.csv');
    var array=players.convertToArray(newcontentFile);
    res.render('player/index', {players:array})
  }
    else {
    //response: complete player csv
    res.send(contentFile)
  }
})

// Create a new player
router.post('/', function (req, res) {

  var csvFile = fileManager.load('./players.csv')
  var content = players.createPlayer(req, csvFile)
  fileManager.save('./players.csv', content)

  var array=players.convertToArray(content);
  res.render('player/index', {players:array})
})

// Edit a player
router.put('/', function (req, res) {
  var csvFile = fileManager.load('./players.csv')
  var content = players.editPlayernameById(req.body.id, req.body.name, csvFile)
  fileManager.save('./players.csv', content)

  var array=players.convertToArray(content);
  res.render('player/index', {players:array})
})
// Delete a player
router.delete('/', function (req, res) {
  var csvFile = fileManager.load('./players.csv')
  var content = players.deletePlayerById(req.body.id, csvFile)
  fileManager.save('./players.csv', content)

  var array=players.convertToArray(content);
  res.render('player/index', {players:array})
})



module.exports = router