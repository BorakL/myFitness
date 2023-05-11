import React, { useEffect, useState } from "react";
import "./qtySelector.css"
import ModalInfo from "../modals/modalInfo";

const QtySelector = ({id, quantity=1, item, handlerAddToCart, inCart=false})=> {
    const[num,setNum]=useState(quantity) 
    const[infoShow,setInfoShow] = useState(false)

    const addItem = ()=>{ 
        if(item.quantity<num){ 
            return;
        }else{
            if(inCart){
                handlerAddToCart(id,num+1,item)
            }else{
                setNum(prev=>prev+1)
            }
        }
    }

    const removeItem = ()=>{
        if(num>1){
            setNum(prev=>prev-1)
            if(inCart){
                handlerAddToCart(id,num-1,item)
            }
        }else{
            return;
        }
    }

    useEffect(()=>{
        setNum(quantity)
    },[quantity])
 
    return(
        <>
        {infoShow && <ModalInfo 
            onClose={()=>setInfoShow(false)} 
            title={`${num===1 ? "One" : num } item${num===1 ? "" : "s"} add to cart`}
            info={`${item.name} ${item.weight.weight}${item.weight.measure}`} 
            img={`/supplements/${id}.jpg`}
        />}
        <div className={`qtySelector ${inCart ? "inCart" : ""}`}>
            <div className="selectControlls">
                <button onClick={removeItem}>-</button>
                <span>{num}</span>
                <button 
                    onClick={addItem}
                    disabled={num>=item.quantity}
                    className={num>=item.quantity ? "disabledButton" : ""}
                >+</button>
            </div>
            {
                !inCart &&
                <div className="qtySelectorButton">
                    <button 
                        className="linkButton" 
                        onClick={()=>{
                            handlerAddToCart(id,num,item)
                            setInfoShow(true)
                        }}
                    >
                        Add to cart
                    </button>
                 </div>
            } 
        </div>
        </>
    )
}

export default QtySelector