import React from "react";
import { Link } from "react-router-dom";
import textFormating from "../../utilies";
import "./exerciseItem.css"
import {GiBiceps} from "react-icons/gi"
import {MdFitnessCenter} from "react-icons/md" 
import {BiCheckCircle} from "react-icons/bi"
import { apiURL } from "../../definitions";

const ExerciseItem = ({exercise})=>{
    return(
        <div className="exerciseItem">
            <Link to={`${exercise._id}`}>
                <h3>{textFormating(exercise.name)}</h3>
            </Link>
            
            <div className="exerciseItemImage">
                <Link to={`${exercise._id}`}>
                    <img src={`${apiURL}/img/exercises/${exercise._id}.png`}/>
                </Link> 
            </div>
            
            <div className="exerciseItemInfo">
                <div className="exerciseType">
                    <span><BiCheckCircle/></span>
                    <span>{exercise.type}</span>
                </div>
                <div className="exerciseType">
                    <span><GiBiceps/></span>
                    <span>{exercise.target_muscle}</span>
                </div>
                <div className="exerciseType">
                    <span><MdFitnessCenter/></span>
                    <span>{exercise.equipment}</span>
                </div>
            </div>
        </div>
    )
}

export default ExerciseItem