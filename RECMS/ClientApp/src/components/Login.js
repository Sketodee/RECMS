import react, { useState, useContext } from 'react'
import LoginForm from './LoginForm';
import login from "../assets/images/login.svg"
import AuthContext from "../context/AuthProvider"



const Login = () => {


    const [success, setSuccess] = useState(false)
    const { auth } = useContext(AuthContext);

    return (
        <div className="row mt-5">
            <div className="col-12 col-lg-6 mt-5">
                <h2> Login {auth } </h2>
                <LoginForm />
            </div>

            <div className="col-12 col-lg-6">
                <img src={login}></img>
            </div>

        </div>
    )
};

export default Login