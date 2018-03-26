const sqlite3 = require('sqlite3').verbose()

var PlayersDBManager = {

  createPlayer: function createPlayer (playername) {
    return new Promise(function (resolve, reject) {
      var db = new sqlite3.Database('./playersDB')
      db.serialize(function () {
        db.run('INSERT INTO players(name,"exists") VALUES(?,1)', [playername])
        db.close()
        resolve('successful')
      })
    })
  },

  deletePlayerById: function deletePlayerById (id) {
    return new Promise(function (resolve, reject) {
      var db = new sqlite3.Database('./playersDB')
      db.serialize(function () {
        db.run('UPDATE players SET "exists"=0 WHERE id=?', [id])
        db.close()
        resolve('successful')
      })
    })
  },

  editPlayernameById: function editPlayernameById (id, newPlayername) {
    return new Promise(function (resolve, reject) {
      var db = new sqlite3.Database('./playersDB')
      db.serialize(function () {
        db.run('UPDATE players SET name =? WHERE id=?', [newPlayername, id])
        db.close()
        resolve('successful')
      })
    })
  },

  getAllExistingPlayers: function getAllExistingPlayers (callback) {
    var db = new sqlite3.Database('./playersDB')
    var data = []
    db.each('SELECT * FROM players WHERE "exists"=1', function (err, row) {
      data.push(row)
    }, function () {
      callback(data)
      db.close()
    })
  },

  getPlayerById: function getPlayerById (id, callback) {
    var db = new sqlite3.Database('./playersDB')
    var data = []
    db.each('SELECT * FROM players WHERE id= ?', [id], function (err, row) {
      data.push(row)
    }, function () {
      callback(data)
      db.close()
    })
  }
}

module.exports = PlayersDBManager