import React, { Component } from 'react';
import { Outlet } from 'react-router-dom'
import { Container } from 'reactstrap';
import MyNav from "./MyNav"

const Layout = () => {
    return (
        <>
        <Container>
            <MyNav />
            <Outlet />
        </Container>
        </>
        
    )
}

export default Layout