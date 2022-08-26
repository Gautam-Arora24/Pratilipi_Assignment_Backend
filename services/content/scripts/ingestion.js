const csv = require('csv-parser');
const fs = require('fs');

module.exports = function parseCSV(){
  return new Promise((resolve, reject)=>{
    const results = [];
    const path = './demo.csv';

    fs.createReadStream(path)
      .on('error', (err)=>{
        console.log('Error in ingestion script', err);
        reject('Some Error');
      })
      .pipe(csv())
      .on('data', function (row) {
        results.push(row);
      }).on('end', function(){
        resolve(results);
      });
  });
};


