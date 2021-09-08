import axios from 'axios';

const stocks_csv_url = 'http://www1.nseindia.com/content/equities/EQUITY_L.csv'
const headers = {
    'Accespt' : '*/*',
    'Accespt-Language' : 'en-Us, en;q=0.5',
    'Host' : 'www1.nseindia.com',
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:28.0) Gecko/20100101 Firefox/28.0',
    'X-Requested-With': 'XMLHttpRequest'
}



export const get_stock_codes = () => {

    axios.get(stocks_csv_url,{
        headers: headers
    }).then((data) => {
        console.log(data);
    }).catch((error) => {
        console.log(error);
    })
}