import react, { useState } from 'react'
import SignupForm from './SignupForm';



const Signup = () => {

    const [success, setSuccess] = useState(false)

    return (
        <div>
            <h2> Sign Up </h2>

            <SignupForm />
        </div>
    )
};

export default Signup