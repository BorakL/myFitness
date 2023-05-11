import React, { useContext } from "react";
import "./supplementItem.css"
import { Link } from "react-router-dom";
import CartContext from "../../context/cartContext";
import { apiURL } from "../../definitions";

const SupplementItem = ({supplement})=>{
    const weight = `${supplement.weight.weight}${supplement.weight.measure}`
    const cart = useContext(CartContext)

    return(
        <div className="supplementItem">
            <div className="image">
                <Link to={`${supplement._id}`}>
                    <img src={`${apiURL}/img/supplements/${supplement._id}.jpg`} alt="supplement"/>
                </Link>
            </div>
            <div className="info">
                <Link to={`${supplement._id}`}>
                    {supplement.name} {supplement.category} {weight}
                </Link> 
                <div className="price">               
                    {supplement.price}€
                </div>
            </div>
            <div className="button">
                <Link 
                    className="linkButton" 
                    onClick={()=>cart.addToCart(supplement._id,1,supplement)} 
                    to="/cart"
                >
                    Quick purchase
                </Link>
            </div>
        </div>
    )
}

export default SupplementItem;