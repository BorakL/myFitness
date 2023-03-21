import React, {   useContext, useEffect, useRef, useState } from "react"; 
import { useSignIn } from "react-auth-kit";
import { Link, useNavigate } from "react-router-dom";
import InputButton from "../../components/button/button";
import InputField from "../../components/inputField/inputField";
import Loading from "../../components/loading/loading";
import { users } from "../../services";

const INITIAL_STATE = {
    email:"",
    password:""
}

const Login = ()=>{
    const[errors,setErrors]=useState({})
    const[values,setValues]=useState(INITIAL_STATE);
    const[loading,setLoading]=useState(false);
    const navigate = useNavigate();
    const signIn = useSignIn()
    const emailRef = useRef()

    useEffect(()=>{
        emailRef.current.focus()
    },[])
  
    const validate = (values)=>{
        let errors = {}
        if(!values.email){
            errors.email="Email required"
        }
        if(!values.password){
            errors.password = "Passowrd required"
        }else if(values.password.length < 6){
            errors.password = "Password must be at least 6 characters!"
        }
        return errors
    } 

    function handleChange(event){
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
                    service:"login",
                    data:{
                        email:values.email,
                        password:values.password
                    }
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
                    navigate("/")
                } 
            }catch(err){
                setLoading(false)
                if(!err?.response){
                    setErrors({serverError:'No Server Response'})      
                }else if(err.response?.status===400){
                    setErrors({serverError:'Missing Username or Password'})
                }else if(err.response?.status===401){
                    setErrors({serverError:'Unauthorized'})
                }else{
                    setErrors({serverError:'Login Failed'})
                } 
            }
        }
    }

    return(
        <div className="mainWrapper"> 
            <form onSubmit={handleSubmit}>
                <div className="logginWrapper">
                    <h1>Login</h1>
                    {errors && errors.serverError &&
                    <div>
                        <span>{errors.serverError}</span>
                    </div>
                    }
                    <InputField
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={values.email}
                        handleChange={handleChange}
                        required={true}
                        errorMsg={errors.email}
                        inputRef={emailRef}
                    />
                    
                    <InputField
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={values.password}
                        handleChange={handleChange}
                        required={true}
                        errorMsg={errors.password}
                    /> 
                    <InputButton
                        type="submit"
                        value="Login"
                        className="mainButton" 
                    />

                    <div> 
                        Not a member? 
                        <span className="link"> 
                            <Link to="/signup">Signup</Link>
                        </span>
                    </div>
                </div> 
            </form> 
            {loading && <Loading/>}
        </div> 
    )
}

export default Login;
