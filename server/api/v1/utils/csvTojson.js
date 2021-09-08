const csv=require('csvtojson');
const papa = require('papaparse');
const Obj2CSV = require('objects-to-csv');
const data = require('../EQUITY_L');
const fs = require('fs');


module.exports =  function CSV2Json(){
    console.log(data);
    let newData = [];
    data.forEach((stock,idx) => {
        newData.push({
            "Sr.No" : idx,
            "SYMBL" : stock.SYMBOL,
            "CMPNY" : stock["NAME OF COMPANY"],
            "FACE_VALUE" : stock["FACE VALUE"]
        })
    })

    // console.log(newData);

    newData = JSON.stringify(newData);
    console.log(newData);
    fs.writeFile('symbl.json', newData,(err) => {
        if(err) throw err;
        console.log("done writing");
    });

}