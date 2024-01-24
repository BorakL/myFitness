import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../context/cartContext";
import QtySelector from "../../components/qtySelector/qtySelector";
import "./cartPage.css"
import { apiURL } from "../../definitions";
import { Link, useNavigate } from "react-router-dom";
import {GrClose, GrCart} from "react-icons/gr";
import { useIsAuthenticated } from "react-auth-kit";

const CartPage = ()=>{ 
    const cart = useContext(CartContext)
    const[cartItems,setCartItems] = useState([])
    const navigate = useNavigate()
    const isAuthenticated = useIsAuthenticated();

    useEffect(()=>{
        setCartItems(Object.values(cart.cart));
    },[cart])  

    const handlerRemoveFromCart = (id)=>{
        cart.removeFromCart(id) 
    }
 
    return(
        <div className="mainWrapper">
        {
        Object.values(cart.cart || []).length!==0 ? 

        <section> 
            <div className="checkoutPanel"> 
                <div className="checkoutHeader">
                    <div className="checkoutTitle">Name</div>
                    <div className="checkoutDetails">
                        <div className="">Price</div>
                        <div className="">Number of items</div>
                        <div className="">Total</div> 
                    </div>
                </div>
                <div className="checkoutBody">
                    {cartItems.map(c =>
                        <div className="checkoutItem" key={c.item._id}>
                            <Link to={`/supplements/${c.item._id}`}>
                                <div className="checkoutTitle">
                                    <div className="checkoutImg">
                                        <img src={`${apiURL}/img/supplements/${c.item._id}.jpg`}/>
                                    </div>
                                <div>{c.item.name}</div>                                
                                </div>
                            </Link>
                            <div className="checkoutDetails">
                                <div>
                                    <div className="mobileScreen">Price</div>
                                    {c.item.price}€
                                </div>  
                                <QtySelector 
                                    id={c.item._id} 
                                    quantity={c.quantity} 
                                    handlerAddToCart={cart.addToCart} 
                                    inCart={true}
                                    item={c.item}
                                />  
                                <div>
                                    <div className="mobileScreen">Total</div>
                                    {(c.item.price*c.quantity).toFixed(2)}€
                                </div> 
                            </div>
                            <div 
                                className="closeButton" 
                                onClick={()=>handlerRemoveFromCart(c.item._id)}>
                                <GrClose/>
                            </div> 
                        </div>
                    )}
                </div>
                <div>Total: {cart.totalItems}</div>
                <div>Total for payment: {cart.totalForPayment ? cart.totalForPayment.toFixed(2) : 0} €</div>
                <div className="orderButton">
                    <button className="mainButton" onClick={
                    ()=>navigate(isAuthenticated() ? "/shipping" : "/login")}>
                    {isAuthenticated() ? "Order" : "Login"} 
                    </button>
                </div>
            </div> 
        </section>   

        :

        !cart.loadingCart ? 
        <div className="emptyCart">
            <div className="cartIcon"><GrCart/></div>
            <h3>Your cart is empty</h3>
        </div> : null
        
        }
        </div>
    )
}

export default CartPage