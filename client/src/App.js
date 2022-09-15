import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import About from "./components/About";
import MainPage from "./components/MainPage";
import NewQuiz from "./components/NewQuiz";
import TakeQuiz from "./components/TakeQuiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import './assets/styles/main.css';


const App = () => {
    return(
        <div className="container">
             <BrowserRouter>
                <Header/>
                <div className="space-content">
                <Routes>
                    <Route path='/' element={ <Home />} />
                    <Route path='/login' element={<AuthForm comp="login"/>} />
                    <Route path='/signup' element={<AuthForm comp="signup"/>} />
                    <Route path='/about' element={<About />} />
                    <Route path='/:username' element={ <MainPage />} />
                    <Route path='/new' element={<NewQuiz />} />
                    <Route path='/user-take/:id' element={<TakeQuiz />} />
                </Routes>
                </div>
                <Footer />
            </BrowserRouter> 
        </div>
    );
}

export default App;