import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAll, getOne } from "../../services";
import textFormating from "../../utilies";
import {v4 as uuidv4} from "uuid"
import "./exercise.css"
import { apiURL } from "../../definitions";

const Exercise = ()=>{
    const[exercise,setExercise] = useState({});
    const param = useParams();
    const id = param.id 

    const loadExercise = async (id)=>{
        try{
            const exercise = await getOne({
                service:"exercises",
                id:id
            }) 
            setExercise(exercise.data.doc)
        }catch(err){
            console.log("error",err)
        }
    }

    useEffect(()=>{
        loadExercise(id);
    },[])

    
    const getTips = ()=>{
        let tips = exercise && exercise.tips ? exercise.tips.split("/n") : [];
        return tips.map(t=> <li key={uuidv4()}>{`${t}`}</li>)
    }

    return(
        <div className="mainWrapper"> 
            <section>
                <div className="exerciseHeader">
                    <h1>{textFormating(exercise && exercise.name)}</h1>
                </div>
            </section>
            <section>
                <div className="exerciseMainContainer">
                    <div className="exerciseImg">
                        <img src={`${apiURL}/img/exercises/${id}.png`}/>
                    </div> 
                    <div className="exerciseTip">
                        <ul>
                            {getTips()}
                        </ul>
                    </div>
                </div>
            </section>
            <section>
                <div className="summary">
                    <h3 className="title">Exercise Summary</h3>
                    <ul>
                        <li>
                            <div>Target Muscle</div>
                            <div>{exercise.target_muscle}</div>
                        </li>
                        <li>
                            <div>Type</div>
                            <div>{exercise.type}</div>
                        </li>
                        <li>
                            <div>Equipment</div>
                            <div>{exercise.equipment}</div>
                        </li>
                    </ul> 
                </div>     
            </section>
            <section>
                <div className="exerciseVideo">
                    <iframe width="100%" height="500px" src={`https://www.youtube.com/embed/${exercise.youtube_id}`}></iframe>
                </div>    
            </section>
        </div>
        
    )
}

export default Exercise;