import React, { useEffect, useState } from "react";
import WorkoutItem from "../../components/workoutItem/workoutItem";
import { getAll, getOne } from "../../services";
import "./home.css";

const Home = ()=>{
    const[topWorkouts,setTopWorkouts]=useState([]);

    const loadTopWorkouts = async ()=>{
        try{
            const topWorkoutsData = await getAll({
                service:"workouts/topWorkouts"
            })
            setTopWorkouts(topWorkoutsData.data.data) 
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        loadTopWorkouts()
    },[])

    return(
        <div className="homePage">
            <div className="frontHero" style={{backgroundImage:"url('/cover.jpg')"}}>
                <div className="overlay">
                    <h1>LBFitness</h1>
                    <p>We offer a free workouts created by fitness experts, suitable for any goal or experience level.</p>
                    <p>Our comprehensive videos and instructions show you how to perform exercises using correct technique for the best results.</p>
                </div>
            </div>
            <div className="mainWrapper">
                <section>
                    <div className="topFew">
                        <h2>The most popular workouts</h2>
                        <div className="topFewContainer">
                            {
                                topWorkouts.mostPopular && topWorkouts.mostPopular.map((w,i)=><WorkoutItem 
                                                                    key={w._id}
                                                                    id={w._id}
                                                                    muscleGroups={w.muscleGroups}
                                                                    shortDescription={w.shortDescription}
                                                                    ratingsAverage={w.ratingsAverage}
                                                                    ratingsQuantity={w.ratingsQuantity}
                                                                />)
                            }
                        </div> 
                    </div>
                </section>
                <section>
                    <div className="banner">
                        <a href="https://www.myprotein.rs/"><img src={"/banner.jpg"}/></a>
                    </div>
                </section>
                <section>
                    <div className="topFew">
                        <h2>The newest workouts</h2>
                        <div className="topFewContainer">
                            {
                                topWorkouts.newest && topWorkouts.newest.map((w,i)=><WorkoutItem 
                                                                    id={w._id}
                                                                    key={w._id}
                                                                    muscleGroups={w.muscleGroups}
                                                                    shortDescription={w.shortDescription}
                                                                    ratingsAverage={w.ratingsAverage}
                                                                    ratingsQuantity={w.ratingsQuantity}
                                                                />)
                            }
                        </div> 
                    </div>
                </section>  
                 
            </div>
        </div>
    )
}

export default Home;