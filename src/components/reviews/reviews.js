import React from "react";
import ReviewForm from "../reviewForm/ReviewForm";
import ReviewItem from "../reviewItem/reviewItem";

const Reviews = ({
    ratingsAverage,
    ratingsQuantity,
    reviews,
    postReview})=>{
    return(
        <div className="reviews">
            <h2>Reviews ({ratingsQuantity ? ratingsQuantity : 0})</h2> 
            <ReviewForm 
                ratingsAverage={
                    ratingsAverage ? ratingsAverage : 0
                } 
                postReview={postReview}
            />
            <div className="reviewsContainer">
                {reviews && reviews.map((r,i)=><ReviewItem key={i} review={r}/>)}
            </div> 
        </div> 
    )
}

export default Reviews;