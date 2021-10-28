import React, {useState,useEffect} from 'react'
import './style.css'


function BottomSelect({changeIndex}) {
    
    const [selectedIndex, setSelectedIndex] = useState(1);
    console.log(selectedIndex);
    let index1_className = selectedIndex === 1 ? "indexOption selectedOption" : "indexOption";
    let index2_className = selectedIndex === 2 ? "indexOption selectedOption" : "indexOption";
    let index3_className = selectedIndex === 3 ? "indexOption selectedOption" : "indexOption";
    let index4_className = selectedIndex === 4 ? "indexOption selectedOption" : "indexOption";
    let index5_className = selectedIndex === 5 ? "indexOption selectedOption" : "indexOption";

    const changeSelectedIndex =(value) => {
        
        setSelectedIndex(parseInt(value));
        changeIndex(value-1)
        index1_className = value === 1 ? "indexOption selectedOption" : "indexOption";
        index2_className = value === 2 ? "indexOption selectedOption" : "indexOption";
        index3_className = value === 3 ? "indexOption selectedOption" : "indexOption";
        index4_className = value === 4 ? "indexOption selectedOption" : "indexOption";
        index5_className = value === 5 ? "indexOption selectedOption" : "indexOption";
    }   

    

    // useEffect(() => {
        
    //     changeIndex(selectedIndex);
    // },[selectedIndex])

    // const changeSelectedIndex = (value) => {
    //     changeIndex(value)
    // };

    return (
        <div className="watchList_bottomSelect">
            <button className={index1_className} name="1" onClick={e =>changeSelectedIndex(1)}>1</button>
            <button className={index2_className} name="2" onClick={e =>changeSelectedIndex(2)}>2</button>
            <button className={index3_className} name="3" onClick={e =>changeSelectedIndex(3)}>3</button>
            <button className={index4_className} name="4" onClick={e =>changeSelectedIndex(4)}>4</button>
            <button className={index5_className} name="5" onClick={e =>changeSelectedIndex(5)}>5</button>
            <div className="indexFill">#</div>
        </div>
    )
}

export default BottomSelect
