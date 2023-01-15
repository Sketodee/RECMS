import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap'; //this is responsible for aligning the components to the center 
import { NavMenu } from './components/NavMenu';
import { Home } from './components/Home';
import { Counter } from './components/Counter';
import Something from "./components/Something"
import Login from "./components/Login"
import './custom.css';
import { FetchData } from './components/FetchData';
import Signup from './components/Signup';
import Layout from './components/Layout';
import RequireAuth from "./context/RequireAuth"

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*public routes*/}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                {/*protected routes */}
                <Route element={<RequireAuth />}> 
                    <Route path="/" element={<Home />} />
                    <Route path="/something" element={<Something />} />
    //              <Route path="/fetch-data" element={<FetchData />} />
    //              <Route path="/counter" element={<Counter />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App


//
//                      

//<Layout>
//    <Routes>
//        {AppRoutes.map((route, index) => {
//            const { element, ...rest } = route;
//            return <Route key={index} {...rest} element={element} />;
//        })}
//    </Routes>
//</Layout> 