import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ExerciseItemWorkout from "../../components/exerciseItemWorkout/exerciseItemWorkout"; 
import { create, getOne } from "../../services";
import dateFormat from "dateformat";
import "./workout.css";
import Reviews from "../../components/reviews/reviews";

const Workout = ()=>{
    const params = useParams();
    const id = params.id
    const navigate = useNavigate();
    const[workout,setWorkout] = useState({})

    const loadWorkout = async()=>{
        try{
            const workoutData = await getOne({
                service:"workouts",
                id
            }) 
            setWorkout(workoutData.data.doc)
        }catch(error){ 
            console.log("error",error)
            navigate("/notFound")
        }
    }
    
    const getEquipments = (exercises=[])=>{
        let equipments = [];
        exercises.forEach(e => e.exercise.equipment!=="none" && equipments.push(e.exercise.equipment))
        return equipments.length===0 ? "none" : equipments.filter((e,i) => equipments.indexOf(e)===i).join(", ")
    }

    const postReview = async ({rating,review,headers})=>{ 
        try{
            await create({
                service:"reviews",
                data:{review,rate:rating},
                url:"workouts",
                id:id,
                headers:headers
            })
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        loadWorkout();
    },[])

    return(
        <div className="mainWrapper">
            <section>
                <div className="workoutTitle">
                    <h1>{workout.name}</h1>
                </div> 
                <div className="workoutHeader">
                    <div className="workoutInfo">
                        <div className="workoutAuthor">
                            <div>Written By: {workout.author && workout.author.name}</div>
                            <div>{dateFormat(workout.createdAt,"mmm d, yyyy")}</div>
                        </div>
                        <div className="workoutRating">
                            <div>Rating: {workout.ratingsAverage ? workout.ratingsAverage.toFixed(1) : 0}</div>
                            <div>Reviews: {workout.ratingsQuantity ? workout.ratingsQuantity : 0}</div>
                        </div>
                    </div>
                    <div className="workoutImage">
                        {workout.id && <img src={`${process.env.REACT_APP_APIURL}/img/workouts/${workout.id}.jpg`}/>}
                    </div>
                    <div className="workoutShortDescription">
                        <p>{workout.shortDescription}</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="summary">
                    <h3 className="title">Workout Summary</h3>
                    <ul>
                        <li>
                            <div>Workout Type</div>
                            <div>{workout.category && workout.category}</div>
                        </li>
                        <li>
                            <div>Level</div>
                            <div>{workout.level && workout.level}</div>
                        </li>
                        <li>
                            <div>Muscle Groups</div>
                            <div>{workout.muscleGroups && workout.muscleGroups.join(", ")}</div>
                        </li>
                        <li>
                            <div>Number of Exercises</div>
                            <div>{workout.exercises && workout.exercises.length}</div>
                        </li>
                        <li>
                            <div>Equipment</div>
                            {workout.exercises && <div>{getEquipments(workout.exercises)}</div>}
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <div className="workoutLongDescription">
                    <h2>Workout Description</h2>
                    <p>{workout.longDescription}</p>
                </div>    
            </section>
            <section>
                <div className="workoutExercises">
                    <h2>Exercises</h2>
                    <div className="workoutExercisesContainer">
                        {workout.exercises && workout.exercises.map((e,i)=><ExerciseItemWorkout key={i} exercise={e} index={i}/>)}
                    </div>
                </div>
            </section>
            <section>
                <Reviews
                    ratingsAverage={workout.ratingsAverage || 0}
                    ratingsQuantity={workout.ratingsQuantity || 0}
                    reviews={workout.reviews || []}
                    postReview={postReview}
                />
            </section>
            
        </div>
    )
}

export default Workout;