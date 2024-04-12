import React, {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {StartPage, TestPage} from '../pages/';
import ResultPage from "../pages/ResultPage";

function App() {
        return (
            <BrowserRouter basename="/teamproject_test">
                <Routes>
                    <Route exact path="/" element={<StartPage/>}/>
                    <Route path="/test" element={<TestPage/>}/>
                    <Route path="/result" element={<ResultPage/>}/>
                </Routes>
            </BrowserRouter>
        );
}

export default App;