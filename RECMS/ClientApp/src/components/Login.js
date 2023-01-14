import React, { useState } from "react";
import axios from 'axios'



const Login = () => {

    const [inputValue, setInputValue] = useState({})
    const [errorCheck, setErrorCheck] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [success, setSuccess] = useState(false)

    //useEffect(() => {
    //    axios.get("Testing/gettest").then((response) => {
    //        var data = response.data;
    //        setItems(data);
    //    });
    //}, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputValue({ ...inputValue, [name]: value })
        if (success) {
            console.log(inputValue)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setErrorCheck(validateInput(inputValue))
    }

    const validateInput = (values) => {
        let error = {}
        if (!values.accountDetails) {
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
        } else if (values.password != values.confirmPassword) {
            error.confirmPassword = "passwords doesn't match"
        }
        else {
            setSuccess(true); 
        }
        return error 
    }

    return (
        <>
            {success ? 
                <p> You are logged In </p>

                : 

                <div className="row">
                    <div className="col-12 col-lg-6">
                        <h2> Login </h2>
                        <form onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="text" placeholder='enter email' className="form-control" id='email' value={inputValue.email} name="email"
                                    onChange={handleChange}
                                />
                                <p style={{ color: "red" }}> {errorCheck.email} </p>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="accountDetails" className="form-label">Account Details: </label>
                                <input
                                    type="text" placeholder='enter account details' className="form-control" id='accountDetails' value={inputValue.accountDetails} name="accountDetails"
                                    onChange={handleChange}
                                />
                                <p style={{ color: "red" }}> {errorCheck.accountDetails} </p>
                            </div> 

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password" placeholder='password' className="form-control" id='password' value={inputValue.password} name="password"
                                    onChange={handleChange}
                                />
                                <p style={{ color: "red" }}> {errorCheck.password} </p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="confirmPassword" className="form-label">Password</label>
                                <input
                                    type="password" placeholder='confirm password' className="form-control" id='confirmPassword' value={inputValue.confirmPassword} name="confirmPassword"
                                    onChange={handleChange} 
                                />
                                <p style={{ color: "red" }}> {errorCheck.confirmPassword} </p>
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