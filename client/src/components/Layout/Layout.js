// import React, { useEffect, useRef } from "react";
// import { useLocation } from "react-router";

// const Layout = ({children})=>{
//     const scrollParentRef = useRef()
//     const { pathname } = useLocation();

//     useEffect(() => {
//         scrollParentRef.current.scrollTop=0;
//     }, [pathname])

//     return(
//         <LayoutContext.Provider>
//             {children} 
//         </LayoutContext.Provider>
        
//     )
// }

// export default Layout