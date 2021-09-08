import React from 'react'
import {RiDeleteBin6Line} from 'react-icons/ri';
import '../style.css'
import './style.css'

function Remove({illustration}) {
    return (
        <div className="RemoveButton">
            <div className="RemoveIllustrationPart">
                {illustration}
            </div>
            
            <button className="RemoveButtonPart">
                <RiDeleteBin6Line />
            </button>
        </div>
    )
}

export default Remove
