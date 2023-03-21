import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import {useIsAuthenticated} from 'react-auth-kit';
import Logo from "../svg/logo";
import {MdLogin} from "react-icons/md"
import {BiUser} from "react-icons/bi"
import "./header.css"

const Header = ()=>{
    const[isNavDisplay,setIsNavDisplay]=useState(false) 
    const location = useLocation();
    const pathName = location.pathname.split("/")[1] || ""; 
    const isAuthenticated = useIsAuthenticated() 
    
    const toggleNav = ()=>{
        setIsNavDisplay(prev=>!prev)
    }
    const hideNav = ()=>{
        setIsNavDisplay(false)
    }

    return(  
    <header>
        <div className="innerHeader">
            <div className="brand">
                <Link to={"/"}><Logo/></Link>
            </div>
            <nav className={!isNavDisplay ? "hideNav" : ""}>
                <ul>
                    <li className={pathName==="workouts" ? "activeLink" : ""}>
                        <Link to={"/workouts"} onClick={hideNav}>Workouts</Link>
                    </li>
                    <li className={pathName==="exercises" ? "activeLink" : ""}>
                        <Link to={"/exercises"} onClick={hideNav}>Exercises</Link>
                    </li>
                    <li className={pathName==="about" ? "activeLink" : ""}>
                        <Link to={"/about"} onClick={hideNav}>About</Link>
                    </li>
                    {
                        !isAuthenticated() ? 
                        <li className="navIcon"><Link to={"/login"} onClick={hideNav}><MdLogin/></Link></li>
                        :
                        <li className="navIcon"><Link to={"/userProfile"} onClick={hideNav}><BiUser/></Link></li>
                    }
                </ul>
            </nav>
            <div className="hamburgerIcon" onClick={toggleNav}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div> 
    </header>
    )
}

export default Header;