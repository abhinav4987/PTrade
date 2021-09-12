import React from 'react'
import {RiAddFill} from 'react-icons/ri';
import {removeSymbl} from '../../../routes/watchList.routes';
import '../style.css'
import './style.css'

function Add({illustration, add}) {
    
    const onClick = () => {
        add();
    }
    
    return (
        <div className="RemoveButton" >
            <div className="RemoveIllustrationPart">
                {illustration}
            </div>
            
            <button className="RemoveButtonPart" onclick={onClick}>
                <RiAddFill />
            </button>
        </div>
    )
}

export default Add
