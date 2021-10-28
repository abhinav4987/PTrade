import React, {useState, useEffect} from 'react';
import './style.css';


function BackDrop({open, closeFunc}) {
    
    const [className, setClassName] = useState("closed");
    const onClick = () => {
        console.log("hello ");
        closeFunc(false);
        setClassName("closed")
    }

    useEffect(() => {
        console.log("open value : ", open);
        
        if(open)
        setClassName("backdrop_main");
        else 
        setClassName("closed");

    },[open]);
    return (
        <div className={className} onClick={onClick} >
            .
        </div>
    )
}

export default BackDrop
