import react, { useState } from 'react'
import {Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import useAuth from '../hooks/useAuth'

const MyNav = () => {

    const { auth } = useAuth()

    return (
        <>
            {['sm'].map((expand) => (
                <Navbar key={expand} bg="light" collapseOnSelect expand={expand} className="mb-3">
                    <Container fluid>
                        <Navbar.Brand href="#"> <h2> RECMS </h2> </Navbar.Brand>
                        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                        <Navbar.Offcanvas
                            id={`offcanvasNavbar-expand-${expand}`}
                            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                            placement="end"
                        >
                            <Offcanvas.Header closeButton>
                                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                    Offcanvas
                                </Offcanvas.Title>
                            </Offcanvas.Header>
                            <Offcanvas.Body>
                                <Nav className="justify-content-end flex-grow-1 pe-3">
                                    <Nav.Item> <Nav.Link eventKey="1" as={Link} to="/"> Home</Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="1" as={Link} to="/counter"> Counter </Nav.Link> </Nav.Item>
                                    <Nav.Item> <Nav.Link eventKey="1" as={Link} to="/client"> Client </Nav.Link> </Nav.Item>
                                    {/*<Nav.Link as={Link} to="/"> Home</Nav.Link>*/}
                                    {/*<Nav.Link as={Link} to= "/counter"> Counter </Nav.Link>*/}
                                    <NavDropdown
                                        title="Dropdown"
                                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                                    >
                                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action4">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="#action5">
                                            Something else here
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>

                                {auth?.email ?
                                    <div class="dropdown">
                                        <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2" />
                                            {/*<strong className="text-dark"> mdo </strong>*/}
                                        </a>
                                        <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                            <li><a class="dropdown-item" href="#">New project...</a></li>
                                            <li><a class="dropdown-item" href="#">Settings</a></li>
                                            <li><a class="dropdown-item" href="#">Profile</a></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><a class="dropdown-item" href="#">Sign out</a></li>
                                        </ul>
                                    </div>
                                    : null}
                            </Offcanvas.Body>
                        </Navbar.Offcanvas>
                    </Container>
                </Navbar>
            ))}
        </>
    )
}

export default MyNav