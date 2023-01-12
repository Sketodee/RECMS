import React, { useState } from "react";

const Login = () => {

    const [inputValue, setInputValue] = useState({})
    const [errorCheck, setErrorCheck] = useState({})
    const [successful, setSuccessful] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
        console.log(inputValue);
    }

    const handleSubmit = (e) => {
        console.log("submitting")
        e.preventDefault()
        setErrorCheck(validateInput(inputValue))
        setLoggedIn(true)
    }

    const validateInput = (values) => {
        let error = {}
        if (!values.username) {
            error.username = "Username is required"
        }
        if (!values.email) {
            error.email = "Email is required"
        } else if (!values.email.includes("@")) {
            error.email = "invalid email"
        }
        if (!values.password) {
            error.password = "password is required"
        } else if (values.password.length < 6 || values.password.length > 20) {
            error.password = "password should be between 6 and 20 characters"
        } else {
            setSuccessful(true)
        }
        return error
    }


    return (
        <>
            {loggedIn ? 
                <p> You are logged In </p>

                : 

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <h2> Login </h2>
                        {successful && <p style={{ backgroundColor: "green", color: "white", textAlign: "center", padding: "10px, 0px" }}> Submitted ! </p>}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username: </label>
                                <input
                                    type="text" placeholder='enter username' className="form-control" id='username' value={inputValue.username} name="username"
                                    onChange={handleChange} required
                                />
                                <p style={{ color: "red" }}> {errorCheck.username} </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text" placeholder='enter email' className="form-control" id='email' value={inputValue.email} name="email"
                                    onChange={handleChange} required
                                />
                                <p style={{ color: "red" }}> {errorCheck.email} </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password" placeholder='password' className="form-control" id='password' value={inputValue.password} name="password"
                                    onChange={handleChange} required
                                />
                                <p style={{ color: "red" }}> {errorCheck.password} </p>
                            </div>

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>

                    <div className="col-lg-6">
                        <h4 className="text-center"> testing flex </h4>
                    </div>
                </div>
}
        </>
        )
}

export default Login 