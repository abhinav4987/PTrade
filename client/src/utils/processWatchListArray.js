export const processWatchListArray = (data) => {
    
    var returnData = [];
    console.log("processing : ", data);
    for(let i  =0;i <data.length;i++) {
        returnData.push(data[i].symbols);
    }

    return returnData;
}