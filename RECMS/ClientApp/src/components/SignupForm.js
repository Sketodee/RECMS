import react, {useContext } from "react"
import axios from 'axios'
import { Formik } from 'formik'
import * as Yup from 'yup';
import AuthContext from "../context/AuthProvider"

const SignupForm = () => {

    const { setAuth } = useContext(AuthContext);

    return(

        <Formik
            initialValues={{
                surname: '', 
                firstName: '', 
                email: '',
                phoneNumber: '', 
                accountDetails: '',
                accountName: '',
                bankProvider: '',
                referrerId: '',
                password: '',
                confirmPassword: ''
            }}

            validationSchema={Yup.object({
                surname: Yup.string().required('Required'),

                firstName: Yup.string().required('Required'),

                email: Yup.string().email('Invalid email address').required('Required'),

                phoneNumber: Yup.string().matches(
                    /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
                    "Not valid").required('Required'),

                accountDetails: Yup.string().matches(
                    /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
                    "Not valid").required('Required'),

                accountName: Yup.string().required('Required'),

                bankProvider: Yup.string().required('Required'),

                referrerId: Yup.string().required('Required'),

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
                            //navigate to Login screen
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log(data)
                        if (!data.success) {
                            console.log(data.message)
                        }
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
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="surname" className="mt-3"> Surname {formik.touched.surname && formik.errors.surname ? <span className="text-danger">({formik.errors.surname})</span> : null} </label>
                    <input className="form-control"
                        id="surname"
                        type="text"
                        {...formik.getFieldProps('surname')}
                    />

                    <label htmlFor="firstName" className="mt-3"> First Name {formik.touched.firstName && formik.errors.firstName ? <span className="text-danger">({formik.errors.firstName})</span> : null} </label>
                    <input className="form-control"
                        id="firstName"
                        type="text"
                        {...formik.getFieldProps('firstName')}
                    />

                    <label htmlFor="email" className="mb-2, mt-3">Email Address {formik.touched.email && formik.errors.email ? <span className="text-danger fs-6">({formik.errors.email})</span> : null }  </label>
                    <input className="form-control"
                        id="email"
                        type="email"
                        {...formik.getFieldProps('email')}
                    />

                    <label htmlFor="phoneNumber" className="mt-3"> Phone {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span className="text-danger">({formik.errors.phoneNumber})</span> : null} </label>
                    <input className="form-control"
                        id="phoneNumber"
                        type="text"
                        {...formik.getFieldProps('phoneNumber')}
                    />

                    <label htmlFor="accountDetails" className="mt-3">Account Details {formik.touched.accountDetails && formik.errors.accountDetails ? <span className="text-danger">({formik.errors.accountDetails})</span> : null } </label>
                    <input className="form-control"
                        id="accountDetails"
                        type="text"
                        {...formik.getFieldProps('accountDetails')}
                    />

                    <label htmlFor="accountName" className="mt-3">Account Name {formik.touched.accountName && formik.errors.accountName ? <span className="text-danger">({formik.errors.accountName})</span> : null} </label>
                    <input className="form-control"
                        id="accountName"
                        type="text"
                        {...formik.getFieldProps('accountName')}
                    />

                    <label htmlFor="bankProvider" className="mt-3"> Bank Provider {formik.touched.bankProvider && formik.errors.bankProvider ? <span className="text-danger">({formik.errors.bankProvider})</span> : null} </label>
                    <input className="form-control"
                        id="bankProvider"
                        type="text"
                        {...formik.getFieldProps('bankProvider')}
                    />

                    <label htmlFor="referrerId" className="mt-3"> Referrer ID {formik.touched.referrerId && formik.errors.referrerId ? <span className="text-danger">({formik.errors.referrerId})</span> : null} </label>
                    <input className="form-control"
                        id="referrerId"
                        type="text"
                        {...formik.getFieldProps('referrerId')}
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