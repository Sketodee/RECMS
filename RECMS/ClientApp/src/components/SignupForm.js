import react, { useState, useContext } from "react"
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup';
import AuthContext from "../context/AuthProvider"

const SignupForm = () => {

    const { setAuth } = useContext(AuthContext);

    return(

        <Formik
            initialValues={{
                email: '',
                accountDetails: '',
                password: '',
                confirmPassword: ''
            }}

            validationSchema={Yup.object({
                accountDetails: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Required'),
                email: Yup.string().email('Invalid email address').required('Required'),
                password: Yup.string()
                    .required("Please enter your password")
                    .min(8, "Must be 8 characters or more")
                    .matches(/[a-z]+/, "Password must contain one lowercase character")
                    .matches(/[A-Z]+/, "Password must contain one uppercase character")
                    .matches(/[@$!%*#?&]+/, "Password must contain at least one special character(@$!%*#?&)")
                    .matches(/\d+/, "Password must contain at least one number"),
                confirmPassword: Yup.string()
                    .required("Please confirm your password")
                    .oneOf([Yup.ref('password'), null], "Passwords don't match.")
            })}

            onSubmit={(values, { resetForm }) => {
                //alert(JSON.stringify(values, null, 2));
                console.log(values)
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(values)
                };
                fetch('Account/signup', requestOptions)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.status);
                        }
                        return response.json();
                    })
                    .then(data => console.log(data))
                    .catch((error) => {
                        console.log(error.message);
                        //if (error.message === 401) {
                        //    console.log("Not Authorized")
                        //} else if (error.message == 404) {
                        //    console.log("Not Found")
                        //}
                    });
                resetForm({ values: '' })
                setAuth(values)
            }}
        >

            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="mb-2, mt-3">Email Address {formik.touched.email && formik.errors.email ? <span className="text-danger fs-6">({formik.errors.email})</span> : null }  </label>
                    <input className="form-control"
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />

                    <label htmlFor="accountDetails" className="mt-3">Account details {formik.touched.accountDetails && formik.errors.accountDetails ? <span className="text-danger">({formik.errors.accountDetails})</span> : null } </label>
                    <input className="form-control"
                        id="accountDetails"
                        type="text"
                        {...formik.getFieldProps('accountDetails')}
                    />

                    <label htmlFor="password" className="mt-3"> Password {formik.touched.password && formik.errors.password ? <span className="text-danger">({formik.errors.password})</span> : null } </label>
                    <input className="form-control"
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />

                    <label htmlFor="confirmPassword" className="mt-3"> Confirm Password {formik.touched.confirmPassword && formik.errors.confirmPassword ? <span className="text-danger">({formik.errors.confirmPassword})</span> : null }</label>
                    <input className="form-control"
                        id="confirmPassword"
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />

                    <button className="btn btn-primary mt-3" type="submit">Submit</button>
                </form>

            )}

        </Formik>
    )
}

export default SignupForm