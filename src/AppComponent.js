import './App.css'; 
import React, { useEffect, useRef } from 'react';   
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/home/home';
import ExploreExercise from './pages/exploreExercise/exploreExercise';
import NotFound from './pages/notFound/notFound';
import ExploreTrainingPlan from './pages/exploreTrainingPlan/exploreTrainingPlan';
import ExploreWorkout from './pages/exploreWorkout/exploreWorkout';
import Workout from './pages/workout/workout';
import Exercise from './pages/exercise/exercise';
import TrainingPlan from './pages/trainingPlan/trainingPlan';
import "./stylesheets.css" 
import Footer from './components/footer/footer';
import Header from './components/header/header'; 
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import UserProfile from './pages/userProfile/userProfile';
import { RequireAuth } from 'react-auth-kit';
import About from './pages/about/about';

function AppComponent() {
  const { pathname } = useLocation();

  const scrollParentRef = useRef()

  useEffect(() => {
    scrollParentRef.current.scrollTop=0;
  }, [pathname])

  return (
    <div className="app" ref={scrollParentRef}>  
        <Header/>
        <main> 
              <Routes>
                <Route exact path="/" element={<Home/>} />
                <Route exact path="/exercises/:id" element={<Exercise/>} />
                <Route exact path="/exercises" element={<ExploreExercise scrollParentRef={scrollParentRef}/>} />
                <Route exact path="/workouts/:id" element={<Workout/>} />
                <Route exact path="/workouts" element={<ExploreWorkout scrollParentRef={scrollParentRef}/>} />
                <Route exact path="/trainingPlans/:id" element={<TrainingPlan/>} />
                <Route exact path="/trainingPlans" element={<ExploreTrainingPlan/>} />
                <Route exact path="/about" element={<About/>}/>
                <Route exact path="/login" element={<Login/>} />
                <Route exact path="/signup" element={<Signup/>} />
                <Route exact path="/userProfile" element={
                  <RequireAuth loginPath='/login'>
                    <UserProfile/>
                  </RequireAuth>
                }/>
                <Route exact path="/*" element={<NotFound/>} />
              </Routes> 
          
        </main> 
        <Footer/>  
      </div> 
  );
}

export default AppComponent;
