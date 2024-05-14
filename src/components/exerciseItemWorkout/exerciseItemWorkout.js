import { Link } from 'react-router-dom';
import textFormating from '../../utilies';
import './exerciseItemWorkout.css';

const ExerciseItemWorkout = ({exercise,index})=>{
    return(
        <div className="exerciseItemWorkout">
            <h4><Link to={`/exercises/${exercise.exercise._id}`}>{`${index + 1}. ${textFormating(exercise.exercise.name)}`}</Link></h4>
            <div className="wrapper">
                <div className="image">
                    <Link to={`/exercises/${exercise.exercise._id}`}>
                        <img src={`${process.env.REACT_APP_APIURL}/img/exercises/${exercise.exercise._id}.png`}/>
                    </Link>                
                </div>
                <div className="setsReps">
                    <div>Sets: {exercise.sets}</div>
                    <div>Reps: {exercise.reps}</div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseItemWorkout;