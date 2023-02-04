import { Formik } from 'formik'
import * as Yup from 'yup';
import useAuth from '../hooks/useAuth'

const AddClientForm = ({ handleClose }) => {
    const { auth } = useAuth()
    return (
        <Formik
            initialValues={{
                name: '',
                phoneNumber: '',
                address: ''
            }}

            validationSchema={Yup.object({
                name: Yup.string().required('Required'),

                phoneNumber: Yup.string().matches(
                    /(?=.*?\d)^\$?(([1-9]\d{0,2}(,\d{3})*)|\d+)?(\.\d{1,2})?$/,
                    "Not valid").required('Required'),

                address: Yup.string().required('Required'),
            })}

            onSubmit={(values, { resetForm }) => {
                //alert(JSON.stringify(values, null, 2));
                console.log(values)
                
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `bearer ${auth.token}`
                    },
                    body: JSON.stringify(values)
                };
                fetch('Client/registerclient', requestOptions)
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
                handleClose()
                resetForm({ values: '' })
            }}
        >

            {formik => (
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor="name" className="mt-3"> Name {formik.touched.name && formik.errors.name ? <span className="text-danger">({formik.errors.name})</span> : null} </label>
                    <input className="form-control"
                        id="name"
                        type="text"
                        {...formik.getFieldProps('name')}
                    />

                    <label htmlFor="phoneNumber" className="mt-3"> Phone {formik.touched.phoneNumber && formik.errors.phoneNumber ? <span className="text-danger">({formik.errors.phoneNumber})</span> : null} </label>
                    <input className="form-control"
                        id="phoneNumber"
                        type="text"
                        {...formik.getFieldProps('phoneNumber')}
                    />

                    <label htmlFor="address" className="mt-3">Address {formik.touched.address && formik.errors.address ? <span className="text-danger">({formik.errors.address})</span> : null} </label>
                    <input className="form-control"
                        id="address"
                        type="text"
                        {...formik.getFieldProps('address')}
                    />

                    <button className="btn btn-primary mt-3" type="submit">Add Client</button>
                </form>

            )}

        </Formik>
    )
}

export default AddClientForm