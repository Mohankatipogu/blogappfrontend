import React from 'react'
import { Formik, ErrorMessage, Field, Form } from 'formik'
import * as yup from "yup"
import "./login.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSignupMutation } from '../../services/CrmApi'

function Signup() {
    const aRef = React.useRef();
    const bRef = React.useRef();
    const cRef = React.useRef();

    React.useEffect(() => {
        aRef.current.focus();
    }, []);

    const [SignupFn] = useSignupMutation();
    const navigate = useNavigate();

    const initialValues = {
        username: "",
        password: '',
    };

    const validationSchema = yup.object({
        username: yup.string().required("Please enter your name"),
        password: yup.string().required("Please enter a password")
    });

    const onSubmit = (values) => {
        console.log(values);
        SignupFn(values).then((res) => {
            try {
                if (res.data.message === 'Signup successful') {
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
            }
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    };

    function AenterKey(e) {
        if (e.key === 'Enter') {
            bRef.current.focus();
        }
    }

    function BenterKey(e) {
        if (e.key === "Enter") {
            cRef.current.focus();
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
            <div className="col-lg-4 col-md-6 col-sm-8 col-10">
                <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                    {() => {
                        return (
                            <Form className="shadow p-4 bg-white rounded">
                                <h2 className="text-center mb-4">Sign Up</h2>
                                <div className="mb-3">
                                    <Field
                                        type="text"
                                        name="username"
                                        className="form-control"
                                        placeholder="Enter Your Name"
                                        ref={aRef}
                                        onKeyUp={(ev) => AenterKey(ev)}
                                    />
                                    <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
                                </div>
                                <div className="mb-3">
                                    <Field
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Enter Your Password"
                                        ref={bRef}
                                        onKeyUp={(ev) => BenterKey(ev)}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-success w-100 me-2" ref={cRef}>Sign Up</button>
                                </div>
                                <div className="text-center mt-3">
                                    <Link to="/login" className="btn btn-outline-primary w-100">Login</Link>
                                </div>
                            </Form>
                        );
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default Signup;
