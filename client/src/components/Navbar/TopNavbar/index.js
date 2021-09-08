import React, {useState} from 'react'
import './style.css'
import { FiLogOut } from "react-icons/fi";
import {
    Link,
} from "react-router-dom";

function TopNavbar({window}) {

    const [selected, setSelected] = useState(1);

    
    let nav1_className = selected === 1 ? "topNavbar__navItem selected_nav" : "topNavbar__navItem";
    let nav2_className = selected === 2 ? "topNavbar__navItem selected_nav" : "topNavbar__navItem";
    let nav3_className = selected === 3 ? "topNavbar__navItem selected_nav" : "topNavbar__navItem";
    
    
    return (
        <div className="topNavbar">
            <div className="topNavbar__brand">
                P TRADE
            </div>
            <ul className="topNavbar__navItems">
                <li className={nav1_className} onClick={() => {setSelected(1)}}><Link className={nav1_className} to="/dashBoard/portfolio">Portfolio</Link></li>    
                <li className={nav2_className} onClick={() => {setSelected(2)}}><Link className={nav2_className} to="/dashBoard/watchList">WatchList</Link></li>
                <li className={nav3_className} onClick={() => {setSelected(3)}}><Link className={nav3_className} to="/dashBoard/charts">Charts</Link></li>
                
            </ul>
            <button className="topNavbar__logout">
                Logout <FiLogOut /> 
            </button>
        </div>
    )
}

export default TopNavbar
