 import {  useAuthHeader, useAuthUser, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";
import { getAll } from "../../services";
import { useEffect, useState } from "react";
import dateFormat from "dateformat";

const UserProfile = ()=>{ 
    const singOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const headers = useAuthHeader();
    const[orders,setOrders] = useState([]);

    const logout = ()=>{
        singOut();
        navigate("/login")
    }
    const e = auth().trainingExpirience;
    const expirienceLevel = e ? e===1 ? "Beginner" : e===2 ? "Intermediate" : "Advanced" : "" 

    const loadOrders = async()=>{
        try{
            const orders = await getAll({
                service: "orders",
                query: {user: auth()._id},
                headers: headers()
            }) 
            setOrders(orders.data.orders) 
        }catch(error){
            console.log("error",error)
        }
    }

    useEffect(()=>{
        loadOrders()
    },[])

    return(
        <div className="mainWrapper">
            <div className="formWrapper">
                <h1>{auth().name}</h1>
                <div> 

                    <p>Email: {auth().email}</p>
                    {auth().gender && <p>Gender: {auth().gender}</p>}
                    {auth().goal && <p>Goal: {auth().goal}</p>}
                    {expirienceLevel && <p>Training Expirience: {expirienceLevel}</p>}
                    
                    {orders.length>0 ? 
                    <div>
                    <h3>Orders</h3>
                    {orders.map(o=><p key={o._id}>{dateFormat(o.createdAt,"mmm/d/yyyy")}</p>)}
                    </div>   :
                    null
                    } 
                    
                    <button 
                        className="mainButton" 
                        onClick={logout}>
                        Logout
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default UserProfile