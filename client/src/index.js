import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppComponent from './AppComponent';
import reportWebVitals from './reportWebVitals'; 
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from 'react-auth-kit';
import {CartProvider} from './context/cartContext'

const App = ()=>{
    return (
        <AuthProvider
            authType={"cookie"}
            authName={"_auth"}
            cookieDomain={window.location.hostname}
            cookieSecure={false}
        >
            <CartProvider>
                <Router>
                    <AppComponent/>
                </Router>
            </CartProvider>
        </AuthProvider>
        
    )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( <App/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
