 import {  useAuthUser, useSignOut } from "react-auth-kit";
import { useNavigate } from "react-router";

const UserProfile = ()=>{ 
    const singOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();

    const logout = ()=>{
        singOut();
        navigate("/login")
    }
    const e = auth().trainingExpirience;
    const expirienceLevel = e ? e===1 ? "Beginner" : e===2 ? "Intermediate" : "Advanced" : ""
    

    return(
        <div className="mainWrapper">
            <div className="logginWrapper">
                <h1>{auth().name}</h1>
                <div> 
                    <p>Email: {auth().email}</p>
                    {auth().gender && <p>Gender: {auth().gender}</p>}
                    {auth().goal && <p>Goal: {auth().goal}</p>}
                    {expirienceLevel && <p>Training Expirience: {expirienceLevel}</p>}
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