import { getAll } from "../services";

const {  useState, createContext, useEffect } = require("react");

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const[cart,setCart] = useState({})
    const[totalItems,setTotalItems] = useState(0)
    const[totalForPayment,setTotalForPayment] = useState(0) 
    const[loadingCart, setLoadingCart] = useState(true)
    

    const loadCartItems = async()=>{
        try{
            setLoadingCart(true)
            const ids = Object.keys(JSON.parse(localStorage.getItem("cart")) || {}) || []; 
            const supplements = await getAll({
                service:"supplements",
                query: {
                    id:ids.join("+")
                }
            }) 
            let items = {};  
            const cartFromLs = JSON.parse(localStorage.getItem("cart")) 
            supplements.data.data.forEach(c => items[c._id]={item:c, quantity:cartFromLs[c._id].quantity})
            setCart(items) 
            setLoadingCart(false)
        }catch(error){
            console.log("error",error)
        }
    }

    const addToCart = (id,q=1,item)=>{ 
        const cartTmp = {...cart, [item._id]:{quantity:q,item} } 
        setCart(cartTmp) 
        const cartFromLs = JSON.parse(localStorage.getItem("cart")) || {} 
        localStorage.setItem("cart", JSON.stringify({...cartFromLs, [item._id]: {quantity:q, price:item.price} }))
    }
 
    const removeFromCart = (id)=>{ 
        const cartTmp = {...cart};
        delete cartTmp[id]
        setCart(cartTmp)
        const cartFromLs = JSON.parse(localStorage.getItem("cart")) || {} 
        delete cartFromLs[id]
        localStorage.setItem("cart", JSON.stringify(cartFromLs))
    }

    useEffect(()=>{
        if(Object.values(JSON.parse(localStorage.getItem("cart")) || {}).length ) { 
            loadCartItems()
        }else{
            setLoadingCart(false)
        }
    },[])

    useEffect(()=>{
        setTotalItems(Object.values(cart).reduce((a,b)=>a+b.quantity,0))
        setTotalForPayment(Object.values(cart).reduce((a,b)=>a+b.quantity*b.item.price, 0))
    },[cart])

    const value={
        cart, 
        addToCart,
        removeFromCart, 
        totalItems,
        totalForPayment,
        loadingCart
    }  
    
    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;