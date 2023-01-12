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

export default class App extends Component {
  static displayName = App.name;

  render() {
      return (
          <>
              <NavMenu />
              <Container>
                  <Routes>
                      <Route path="/" element={<Signup />} />
                      <Route path="/something" element={<Something />} />
                      <Route path="/fetch-data" element={<FetchData />} />
                      <Route path="/counter" element={<Counter />} />
                  </Routes>
              </Container> 
          </>
    );
  }
}


//<Layout>
//    <Routes>
//        {AppRoutes.map((route, index) => {
//            const { element, ...rest } = route;
//            return <Route key={index} {...rest} element={element} />;
//        })}
//    </Routes>
//</Layout> 