import React from "react";
import {BsFacebook} from "react-icons/bs"
import {BsTwitter} from "react-icons/bs"
import {FiInstagram} from "react-icons/fi"
import {AiFillGooglePlusSquare} from "react-icons/ai"
import Logo from "../svg/logo";

const Footer = ()=>{
    return(
        <footer>
            <section>
                <div className="about">
                    <h2>About Company</h2>
                    <p>My Fitness is a comprehensive fitness application designed to help you achieve your health and fitness goals. Our certified trainers and nutritionists provide a wide range of workouts and exercises tailored to your individual needs. Sign up today and start your journey towards a healthier, happier you!</p>
                </div>
                <div className="socialNetworks">
                    <h2>Keep Connected</h2>
                    <ul>
                        <li><BsFacebook/> Follow us on Facebook</li>
                        <li><BsTwitter/> Follow us on Twitter</li>
                        <li><FiInstagram/> Follow us on Instagram</li>
                        <li><AiFillGooglePlusSquare/> Follow us on Google Plus</li> 
                    </ul>
                </div>
                <div className="logo">
                    <Logo/>
                </div>
            </section>
            <section>
            © Copyright FitnessApp. All Right Reserved.<br/>Powered by Luka Borak
            </section>
            
        </footer>
    )
}

export default Footer;