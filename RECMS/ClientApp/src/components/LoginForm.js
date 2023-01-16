import react, { useState, useEffect, useContext } from "react"
import {Link, useNavigate, useLocation } from "react-router-dom"
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup';
//import useAuth from '../hooks/useAuth'
import AuthContext from "../context/AuthProvider"

const LoginForm = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation(); 
    //this is to receive the path where user is coming from before login
    const from = location.state.from.pathname || "/"

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}

            validationSchema={Yup.object({
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .required("Please enter your password")
                    .min(8, "Must be 8 characters or more")
                    .matches(/[a-z]+/, "Password must contain one lowercase character")
                    .matches(/[A-Z]+/, "Password must contain one uppercase character")
                    .matches(/[@$!%*#?&]+/, "Password must contain at least one special character(@$!%*#?&)")
                    .matches(/\d+/, "Password must contain at least one number"),
            })}

            onSubmit={(values, { resetForm }) => {
                //alert(JSON.stringify(values, null, 2));
                console.log(values)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                };
                fetch('Account/login', requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.status);
                            //navigate to Login screen
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (!data.success) {
                            console.log(data.message)
                        }
                        console.log(data.data)
                        setAuth(data.data)
                        navigate(from, {replace: true})
                    })
                    .catch((error) => {
                        console.log(error.message);
                        //if (error.message === 401) {
                        //    console.log("Not Authorized")
                        //} else if (error.message == 404) {
                        //    console.log("Not Found")
                        //}
                    });
                resetForm({ values: '' })
            }}
        >

            {formik => (
                <form className = "mt-5" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="mb-2, mt-3">Email Address {formik.touched.email && formik.errors.email ? <span className="text-danger fs-6">({formik.errors.email})</span> : null}  </label>
                    <input className="form-control"
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />

                    <label htmlFor="password" className="mt-3"> Password {formik.touched.password && formik.errors.password ? <span className="text-danger">({formik.errors.password})</span> : null} </label>
                    <input className="form-control"
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />

                    <button className="btn btn-success mt-3" type="submit">Login</button>
                </form>

            )}

        </Formik>
    )
}

export default LoginForm