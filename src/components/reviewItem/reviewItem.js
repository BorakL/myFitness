import React from "react";
import {Rating} from 'react-simple-star-rating';
import dateFormat, { masks } from "dateformat";
import "./reviewItem.css";

const ReviewItem = ({review})=>{ 

    return(
        <div className="reviewItem">
            <div className="ratingStars">
                <Rating 
                    initialValue={review.rate}
                    size={20}
                    transition
                    readonly
                />
            </div>
            <div className="reviewName">
                <b>{review && review.user.name}</b>
            </div>
            <div className="reviewDate">
                {dateFormat(review.createdAt,"mmm d, yyyy HH:MM")}
            </div>
            <div className="review">
                {review.review}
            </div>
        </div>
    )
}

export default ReviewItem