import react from "react"
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup';


const SignupForm = () => {
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
                    .required("please enter your password")
                    .min(8, "Must be 8 characters or more")
                    .matches(/[a-z]+/, "must contain one lowercase character")
                    .matches(/[A-Z]+/, "must contain one uppercase character")
                    .matches(/[@$!%*#?&]+/, "must contain at least one special character(@$!%*#?&)")
                    .matches(/\d+/, "must contain at least one number"),
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
                    .then(response => response.json())
                    .then(response => console.log(response));
                    //.then(data => console.log(data));
                resetForm({values: ''})
            }}
        >

            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" className="mb-2, mt-3">Email Address</label>
                    <input className="form-control"
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />
                    {formik.touched.email && formik.errors.email ? <div className="text-danger">{formik.errors.email}</div> : null}

                    <label htmlFor="accountDetails" className="mt-3">Account details </label>
                    <input className="form-control"
                        id="accountDetails"
                        type="text"
                        {...formik.getFieldProps('accountDetails')}
                    />
                    {formik.touched.accountDetails && formik.errors.accountDetails ? <div className="text-danger">{formik.errors.accountDetails}</div> : null}

                    <label htmlFor="password" className="mt-3"> Password </label>
                    <input className="form-control"
                        id="password"
                        type="password"
                        {...formik.getFieldProps('password')}
                    />
                    {formik.touched.password && formik.errors.password ? <div className="text-danger">{formik.errors.password}</div> : null}

                    <label htmlFor="confirmPassword" className="mt-3"> Password </label>
                    <input className="form-control"
                        id="confirmPassword"
                        type="password"
                        {...formik.getFieldProps('confirmPassword')}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className="text-danger">{formik.errors.confirmPassword}</div> : null}

                    <button className="btn btn-primary mt-3" type="submit">Submit</button>
                </form>

            )}

        </Formik>
    )
}

export default SignupForm