import react, { useState } from 'react'
import SignupForm from './SignupForm';
import signup from "../assets/images/signup.svg"



const Signup = () => {

    const [success, setSuccess] = useState(false)

    return (
        <div className="row mt-5">
            <div className = "col-12 col-lg-6">
                <h2> Sign Up </h2>
                <SignupForm />
            </div>

            <div className = "col-12 col-lg-6">
                <img src={signup}></img>
            </div>
          
        </div>
    )
};

export default Signup