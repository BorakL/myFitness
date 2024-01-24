import React, { useEffect, useState } from "react";
import {SlArrowUp} from "react-icons/sl"

const ScrollToTop = ({scrollParentRef})=>{
    const[showButton,setShowButton] = useState(false)
    
    const handleScrollButtonVisibility = ()=>{
        if(scrollParentRef !== undefined){  
            scrollParentRef.current.scrollTop > 1000 ? setShowButton(true) : setShowButton(false) 
        } 
    }

    useEffect(()=>{
        scrollParentRef.current.addEventListener('scroll', handleScrollButtonVisibility)
        return ()=>{
            scrollParentRef.current.removeEventListener('scroll', handleScrollButtonVisibility)
        }
    },[])

    return(
        showButton && <div 
                        className="scrollToTop"
                        onClick={()=>scrollParentRef.current.scrollTo({top: 0, behavior:'smooth'})}>
                            <SlArrowUp/>
                       </div>        
    )
}

export default ScrollToTop