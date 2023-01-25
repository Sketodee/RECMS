import react, { useState } from 'react'
import { Offcanvas, OffcanvasHeader, OffcanvasBody, Button }  from 'reactstrap'
import useAuth from '../hooks/useAuth'

const Dashboard = () => {

    const { auth } = useAuth()
    const [open, setOpen] = useState(true)

    const Clicked = () => {
        setOpen(!open)
    }

    const noRefCheck = () => { }
    return (
        <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: "30%" }}>
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"> RECMS </a>

            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item"> <a className= "nav-link active"> Home </a></li>
                <li className="nav-item"> <a className= "nav-link text-white"> Home </a></li>
                <li className="nav-item"> <a className= "nav-link text-white"> Home </a></li>
                <li className="nav-item"> <a className= "nav-link text-white"> Home </a></li>
                <li className="nav-item"> <a className= "nav-link text-white"> Home </a></li>
            </ul>

            <div class="dropdown">
                <a href="#" class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://github.com/mdo.png" alt="" width="32" height="32" class="rounded-circle me-2"/>
                        <strong>mdo</strong>
                </a>
                <ul class="dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a class="dropdown-item" href="#">New project...</a></li>
                    <li><a class="dropdown-item" href="#">Settings</a></li>
                    <li><a class="dropdown-item" href="#">Profile</a></li>
                    <li><hr class="dropdown-divider"/></li>
                    <li><a class="dropdown-item" href="#">Sign out</a></li>
                </ul>
            </div>
        </div>
     )
}

export default Dashboard