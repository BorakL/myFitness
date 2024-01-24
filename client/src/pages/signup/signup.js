import React, { useContext, useEffect, useRef, useState } from "react";
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import InputButton from "../../components/button/button";
import InputField from "../../components/inputField/inputField";
import InputSelect from "../../components/inputSelect/inputSelect";
import Loading from "../../components/loading/loading";
import { genderOptions, goalOptions, trainingExpirienceOptions } from "../../definitions";
import { users } from "../../services";

const INITIAL_STATE={
    email:"",
    name:"",
    gender:"",
    goal:"",
    trainingExpirience:"",
    password:"",
    passwordConfirm:""
}

const Signup = ()=>{

    const[values,setValues]=useState(INITIAL_STATE)
    const[errors,setErrors]=useState({})
    const[loading,setLoading]=useState(false)
    const signIn =useSignIn();
    const navigate = useNavigate()
    const nameRef = useRef(); 

    useEffect(()=>{
        nameRef.current.focus()
    },[])

    const validate = (values)=>{
        let errors = {}
        if(!values.email){
            errors.email="Email required"
        }
        if(!values.name){
            errors.name="Email required"
        }
        if(!values.password){
            errors.password = "Passowrd required"
        }else if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters!"
        }
        if(!values.passwordConfirm){
            errors.passwordConfirm="PasswordConfirm required"
        }else if(values.password!==values.passwordConfirm){
            errors.passwordConfirm="The password confirmation doesn not match"
        }
        return errors
    } 
    
    const handleChange = (event)=>{
        setValues(previousState => ({
            ...previousState,
            [event.target.name]:event.target.value
        }))
    }

    const handleSubmit = async (e)=>{  
        e.preventDefault(); 
        const validationErrors = validate(values)
        if(Object.keys(validationErrors).length){
            setErrors(validationErrors)
        }else{ 
            try{
                setLoading(true)
                const response = await users({
                    service:"signup",
                    data:values
                })
                setLoading(false)
                setErrors({})
                setValues(INITIAL_STATE)
                const token = response?.data?.token;
                const roles = response?.data?.user.role;
                const user = response?.data?.user;
                if(signIn({
                    token,
                    expiresIn:3600,
                    tokenType:"Bearer",
                    authState:{...user,roles}
                })){
                    navigate("/userProfile")
                } 
            }catch(err){
                setLoading(false)
                if(!err?.response){
                    setErrors({serverError:'No Server Response'})      
                }else if(err?.response?.data?.message){
                    setErrors({serverError: err.response.data.message})
                }else{
                    setErrors({serverError:'Registration Failed'})
                } 
            }
        }
    }

    return(
        <div className="mainWrapper">
            <form onSubmit={handleSubmit}>
                <div className="formWrapper">
                    <h1>Sign Up</h1>
                    {errors && errors.serverError && 
                    <div className="errMsg">
                        <span>{errors.serverError}</span>
                    </div>
                    }
                    <InputField
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={values.name}
                        handleChange={handleChange}
                        required={true}
                        inputRef={nameRef}
                    />
                    <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={values.email}
                        handleChange={handleChange}
                        required={true}
                        errorMsg={errors.email}
                    />
                    <InputSelect
                        name="gender"
                        placeholder="Gender"
                        handleChange={handleChange}
                        options={genderOptions}
                    />
                    <InputSelect
                        name="goal"
                        placeholder="Goal"
                        handleChange={handleChange}
                        options={goalOptions}
                    />
                    <InputSelect
                        name="trainingExpirience"
                        placeholder="Training Expirience"
                        handleChange={handleChange}
                        options={trainingExpirienceOptions}
                    />
                    <InputField
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={values.password}
                        handleChange={handleChange}
                        required={true}
                        errorMsg={errors.password}
                    />
                    <InputField
                        type="password"
                        name="passwordConfirm"
                        placeholder="Password Confirm"
                        value={values.passwordConfirm}
                        handleChange={handleChange}
                        required={true}
                        errorMsg={errors.passwordConfirm}
                    />
                    <InputButton
                        type="submit"
                        value="Sign Up"
                        className="mainButton" 
                    />
                    <div>
                        Already registered? 
                        <span className="link">
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </div>
            </form>
            {loading && <Loading/>}
        </div>
    )
}

export default Signup;