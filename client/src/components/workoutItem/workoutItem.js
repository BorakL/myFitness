import React from "react"
import { Link } from "react-router-dom";
import { apiURL } from "../../definitions";
import "./workoutItem.css"

const WorkoutItem = ({id,muscleGroups,shortDescription,ratingsAverage,ratingsQuantity})=>{
    const ratingsAvg = ratingsAverage ? Math.round(ratingsAverage)===ratingsAverage ? ratingsAverage : ratingsAverage.toFixed(2) : 0
    
    return(
        <div className="workoutItem">
            <div className="image">
                <Link to={`/workouts/${id}`}>
                    <img src={`${apiURL}/img/workouts/${id}.jpg`}/>
                </Link>            
            </div>
            <div className="name"> 
                <h3><Link to={`/workouts/${id}`}>{`${muscleGroups.join(" and ")} ${id.slice(-2)}`}</Link></h3>
            </div>
            <div className="description">
                {shortDescription}
            </div>
            <div className="ratings">
                <div className="ratingsAverage">Rating: {ratingsAvg}</div>
                <div className="ratingsQuantity"> Reviews: {ratingsQuantity ? ratingsQuantity : 0}</div>
            </div>
        </div>
    )
}

export default WorkoutItem;