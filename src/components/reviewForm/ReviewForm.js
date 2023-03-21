import React, {  useState } from "react";
import {  useIsAuthenticated } from "react-auth-kit";
import { useNavigate } from "react-router";
import {Rating} from 'react-simple-star-rating';
import {useAuthHeader} from 'react-auth-kit'
import "./reviewForm.css"

const ReviewForm = ({ postReview, login=true})=>{ 
    const[review,setReview]=useState("")
    const[rating,setRating] = useState(0)
    const[errorMessage,setErrorMessage] = useState("") 
    const isAuthenticated = useIsAuthenticated();
    const headers = useAuthHeader(); 
    
    // const{auth} = useAuth(AuthContext)
    const navigate = useNavigate()

    const handleRating = (rate)=> {
        setRating(rate)
    }

    const onSubmit = (e)=>{ 
        e.preventDefault(); 
        if(!isAuthenticated()){
            navigate("/login")
        }else{
            if(!review){
                setErrorMessage("Write a review.")
            }else if(!rating){
                setErrorMessage("Please rate this workout.")
            }else{
                setErrorMessage("");
                setReview("");
                setRating(0); 
                postReview({
                        review, 
                        rating,
                        headers:headers()
                    })
            }
        } 
    }

    return( 
        <form onSubmit={(e)=>onSubmit(e)}>
            <div className="formMessage">
                {errorMessage}
            </div>
            <div className="ratingsForm">
                <Rating
                    onClick={handleRating}  
                    initialValue={rating}
                    size={30}
                    transition
                    readonly={isAuthenticated() ? false : true}
                />
            </div>
            <div className="reviewForm">
                <textarea 
                    type="text" 
                    id="review" 
                    name="review" 
                    disabled={!isAuthenticated()} 
                    value={review}
                    onChange={(e)=>setReview(e.target.value)}> 
                </textarea> 
                <input 
                    type="submit" 
                    value={isAuthenticated() ? "Submit" : "Login"}  
                    disabled={!isAuthenticated() || review ? false : true}
                />            
            </div>
        </form>
    )
}

export default ReviewForm;