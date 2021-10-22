import React,{useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import './style.css';

function SellBox({symbl,open, price, closeFun}) {
    
    const [quantity, setQuantity] = useState(1);
    const [netCost, setNetCost] = useState(price*quantity);
    const [stockPrice, setStockPrice] = useState(price);
    const [className, setClassName] = useState(
        open === true ? "buyBox_main" : "buyBox_main closed"
    );
    useEffect(() => {
        setNetCost(price*quantity);
    },[quantity]);

    useEffect(() => {
        setClassName(open === true ? "buyBox_main" : "buyBox_main closed");
    },[open]);

    const close = () => {
        setClassName("buyBox_main closed");
        closeFun(false);
    }
    
    return (
        <div className={className}>
            <div className="sellBox_head">
                SELL<span className="HEAD_SYMBOL">{symbl}</span> <span className="exchangeName">NSE</span>x {quantity} Qty
            </div>
            <div className="sellBox_body">   
                <div className="sellBox_body_top">
                <div className="textField_floor1">    
                    <TextField
                        id="outlined-number"
                        label="Number"
                        type="number"
                        value={quantity}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        onChange={(e) => setQuantity(e.target.value)}
                        variant="outlined"
                        className="textField_floor1"
                    />
                </div>
                <div className="textField_floor1">        
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Price"
                        value={stockPrice}
                        variant="outlined"
                        className="textField_floor1"
                    />
                </div>
                </div>
                <div className="sellBox_body_bottom">
                <div className="textField_floor2">
                    <TextField
                        disabled
                        id="outlined-disabled"
                        label="Net Cost"
                        value={netCost}
                        variant="outlined"
                    />
                </div>
                </div>
                <div className="sellBox_buttons">
                    <button className="sellBox_Sell">
                        Sell
                    </button>
                    <button className="sellBox_Cancel" onClick={close}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SellBox

// net quantity
// price
// net worth