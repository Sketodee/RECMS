import React, { Component } from 'react';
import { Outlet } from 'react-router-dom'
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import MyNav from './MyNav'

const Layout = () => {
    return (
        <>
            <NavMenu />
            <Container>
                <Outlet />
            </Container>
        </>
        
    )
}

export default Layout