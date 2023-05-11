import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import {useIsAuthenticated} from 'react-auth-kit';
import Logo from "../svg/logo";
import {MdLogin} from "react-icons/md"
import {BiCart, BiUser} from "react-icons/bi"
import "./header.css"
import CartContext from "../../context/cartContext";


const Header = ()=>{
    const[isNavDisplay,setIsNavDisplay]=useState(false) 
    const location = useLocation();
    const pathName = location.pathname.split("/")[1] || ""; 
    const isAuthenticated = useIsAuthenticated() 
    const cart = useContext(CartContext)
    const[cartItems,setCartItems] = useState(0)
    
    const toggleNav = ()=>{
        setIsNavDisplay(prev=>!prev)
    }
    const hideNav = ()=>{
        setIsNavDisplay(false)
    }

    useEffect(()=>{
        setCartItems(cart.totalItems)
    },[cart]) 

    const loginButton = <div className="navIcon">
                            {
                                !isAuthenticated() ?
                                <Link to={"/login"} onClick={hideNav}> <MdLogin/> </Link> :
                                <Link to={"/userProfile"} onClick={hideNav}> <BiUser/> </Link>
                            }
                        </div> 

    return(  
    <header>
        <div className="innerHeader">
            <div className="brand">
                <Link to={"/"}><Logo/></Link>
            </div>
            <nav className={!isNavDisplay ? "hideNav" : ""}>
                <ul>
                    {/* ////// */}
                    <li className={pathName==="supplements" ? "activeLink" : ""}>
                        <Link to={"/supplements"} onClick={hideNav}>Store</Link>
                    </li>
                    {/* ///////// */}
                    <li className={pathName==="workouts" ? "activeLink" : ""}>
                        <Link to={"/workouts"} onClick={hideNav}>Workouts</Link>
                    </li>
                    <li className={pathName==="exercises" ? "activeLink" : ""}>
                        <Link to={"/exercises"} onClick={hideNav}>Exercises</Link>
                    </li>
                    <li className={pathName==="about" ? "activeLink" : ""}>
                        <Link to={"/about"} onClick={hideNav}>About</Link>
                    </li>   
                </ul>   
            </nav>
            <div className="fixedNav">
                <div className="cartIcon">
                    <Link to={"/cart"} onClick={hideNav}>  
                        <BiCart/> 
                        {cartItems ? <span>{cartItems}</span> : null}    
                    </Link>
                </div> 
                {loginButton}                
                <div className="hamburgerIcon" onClick={toggleNav}>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div> 
        </div> 
    </header>
    )
}

export default Header;