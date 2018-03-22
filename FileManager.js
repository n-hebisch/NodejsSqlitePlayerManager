const fs= require('fs')

//läd und speichert Dateien
var FileManager ={


  save : function save(file, content) {

    fs.writeFileSync(file, content, 'utf8')
  },

  load :function load(file) {
    var csvString = fs.readFileSync(file, 'utf8')
    return csvString
  }
}

module.exports = FileManager;