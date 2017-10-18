var fs           = require('fs'),
    R            = require('ramda'),
    json2csv     = require('json2csv');

module.exports = function toCSV(records, fileName, header) {
    
  if (!records.length) throw 'Error - Array is empty';
  
  if( typeof header === "undefined" ) header = true //default: true, fallback to original functionality
    
  var options = {data: records, fields: R.keys(records[0]), hasCSVColumnTitle: header};
    
  return new Promise(function(resolve, reject) {
    json2csv(options, function(err, csv) {
      if (err) reject(err);
      fs.writeFile(fileName, csv, function(err) {
        return !err ? resolve() : reject(err);
      });
    });
  });
};
