import React from "react";

const About = ()=>{
    return(
        <div className="mainWrapper">
            <h1>About My Fitness App</h1>
            <div className="imageWrapper">
                <img style={{"width":"90%"}} alt="aboutUs" src="/aboutUs.jpg"/>
            </div>
            <p>
            Welcome to My Fitness, your one-stop destination for all your fitness needs! Our application is designed to help you achieve your health and fitness goals, by providing you with a wide range of workouts and exercises that cater to all fitness levels.
            </p>
            <p>
            At My Fitness, we understand that staying fit and healthy is not just about physical exercise, but also about developing a healthy mindset and lifestyle. That's why we have created a comprehensive program that encompasses all aspects of fitness, including strength training, cardio, flexibility, and nutrition.
            </p>
            <p></p>
            Our team of certified trainers and nutritionists have years of experience in the industry, and are dedicated to helping you reach your fitness goals. With our user-friendly interface, you can easily navigate through the app and choose from a variety of workouts, tailored to your individual needs.

            Whether you're a beginner looking to get started on your fitness journey, or an experienced fitness enthusiast looking for new challenges, My Fitness has something for everyone. So why wait? Sign up today and start your journey towards a healthier, happier you!
        </div>
    )
}

export default About;