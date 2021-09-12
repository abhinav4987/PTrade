export const  includedSymbol = (data, symbl) => {

    for(let i = 0; i <data.length;i++) {
        if(data[i].includes(symbl)) {
            return true;
        }
    } 
    return false;
}
