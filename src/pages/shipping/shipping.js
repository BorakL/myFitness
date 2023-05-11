import React, { useContext, useEffect, useMemo, useState } from "react";
import InputField from "../../components/inputField/inputField";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import InputSelect from "../../components/inputSelect/inputSelect";
import { countries, paymentMethods } from "../../definitions";
import InputButton from "../../components/button/button";
import CartContext from "../../context/cartContext";
import { create } from "../../services";
import { useAuthHeader, useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router";

const Shipping = ()=>{
    const headers = useAuthHeader(); 
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    
    useEffect(()=>{
        if(!isAuthenticated()){
            navigate("/login")
        }
    },[])

    const INITIAL_STATE = {
        paymentMethod: "",
        deliveryAddress: "",
        city: "",
        country: "",
        postalCode: "",
        phoneNumber: ""
    }

    const[values,setValues] = useState(INITIAL_STATE)
    const[errors,setErrors] = useState({}) 
    const cartContext = useContext(CartContext)
    const items = Object.values(cartContext.cart || []) 

    const validate = ()=>{
        const errors = {};
        if(!values.deliveryAddress){
            errors.deliveryAddress="Required field"
        }
        if(!values.city){
            errors.city="Required field"
        }
        if(!values.postalCode){
            errors.postalCode="Required field"
        }
        if(!values.phoneNumber){
            errors.phoneNumber="Required field"
        }
        if(!values.paymentMethod){
            errors.paymentMethod="Required field"
        }
        if(values.postalCode.length!==5){
            errors.postalCode="Inccorect value"
        }
        return errors;
    }

    const handleChange = (event)=>{
        setValues(previousState => ({
            ...previousState,
            [event.target.name]:event.target.value
        }))
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        const errors = validate(values)
        if(Object.keys(errors).length){
            setErrors(errors)
        }else{
            setErrors({}) 
            const order = [];
            items.map(i => order.push({item:i.item._id, amount:i.quantity}) )
            createOrder({order,shipmentData:values})
            setValues(INITIAL_STATE) 
            navigate("/userProfile")
        }
    }

    const createOrder = async ({order,shipmentData})=>{
        try{
            await create({
                service:"orders",
                data:{order,shipmentData},
                url:"shipping",
                headers: headers()
            })
        }catch(error){
            console.log("error",error)
        }
    }

    const setPhoneNumber = (number)=>{
        setValues(prev => ({...prev, phoneNumber:number}))
    }


    return(
        <div className="mainWrapper"> 
            <form onSubmit={submitHandler}>
                <div className="formWrapper">
                    <h1>Checkout</h1>
                    <InputField
                        type="text"
                        value={values.deliveryAddress}
                        name="deliveryAddress"
                        placeholder="Delivery Address"
                        required={true}
                        handleChange={handleChange}
                    />
                    <InputField
                        type="text"
                        value={values.city}
                        name="city"
                        placeholder="City"
                        required={true}
                        handleChange={handleChange}
                    />
                    <InputSelect
                        name="country"
                        options={countries}
                        handleChange={handleChange}
                        placeholder="Country"
                        required={true}
                    />
                    <InputField
                        type="text"
                        value={values.postalCode}
                        name="postalCode"
                        placeholder="Postal Code"
                        required={true}
                        handleChange={handleChange}
                        maxLength={5}
                        errorMsg={errors.postalCode}
                    />
                    <div className="inputField">
                        <PhoneInput
                            placeholder="Phone Number"
                            value={values.phoneNumber}
                            onChange={setPhoneNumber}
                        />
                        <span className="errorMsg">
                            {errors.phoneNumber}
                        </span>
                    </div>
                    <div>
                        <h3>Your order:</h3>
                        <ul>
                            {items.map(i=>
                                <li key={i.item._id}>{i.item.name} {i.item.weight.weight}{i.item.weight.measure} x {i.quantity}</li>    
                            )}
                        </ul>
                        <h2>Total: {cartContext.totalForPayment || 0}€</h2>

                    </div>
                    <InputSelect
                        name="paymentMethod"
                        handleChange={handleChange}
                        placeholder="Payment Method"
                        options={paymentMethods}
                        errorMsg={errors.paymentMethod}
                    />
                    <InputButton
                        type="submit"
                        value="Place Order"
                        className="mainButton" 
                    />
                </div>
            </form> 
        </div>
    )
}

export default Shipping;