import React, { useState } from "react";
import { Formik, ErrorMessage, Field, Form } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithGoogle } from "./firebaseconfig";
import { useLoginMutation } from "../../services/CrmApi";
import "./login.css";
import { FcGoogle } from "react-icons/fc"; 
function Login() {
  const aRef = React.useRef();
  const bRef = React.useRef();
  const cRef = React.useRef();
  const [errorMessage, setErrorMessage] = useState("");
  const [LoginFn] = useLoginMutation();
  const navigate = useNavigate();

  React.useEffect(() => {
    aRef.current.focus();
  }, []);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = yup.object({
    username: yup.string().required("Please enter your name"),
    password: yup.string().required("Please enter a password"),
  });

  const onSubmit = (values) => {
    setErrorMessage(""); // Reset error message on new submission
    LoginFn(values)
      .then((res) => {
        if (res.data.message === "Login successful") {
          localStorage.setItem("token", res.data.message);
          localStorage.setItem("myname", res.data.user.username);
          navigate("/");
        } else {
          setErrorMessage("User not found or incorrect credentials");
          navigate("/login")
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage("User not found or incorrect credentials");
      });
  };

  // Google Sign-In
  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      localStorage.setItem("token", user.uid);
      localStorage.setItem("myname", user.displayName);
      navigate("/");
    }
    else{
      navigate('/login')
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-lg-4 col-md-6 col-sm-8 col-10">
        <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          {() => (
            <Form className="shadow p-4 bg-white rounded">
              <h2 className="text-center mb-4">Login</h2>

              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {errorMessage}
                  <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              )}

              {/* Username Field */}
              <div className="mb-3">
                <Field
                  type="text"
                  name="username"
                  className="form-control"
                  placeholder="Enter Your Name"
                  ref={aRef}
                />
                <ErrorMessage name="username" component="div" className="text-danger small mt-1" />
              </div>

              {/* Password Field */}
              <div className="mb-3">
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter Your Password"
                  ref={bRef}
                />
                <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
              </div>

              {/* Login Button */}
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-success w-100 me-2" ref={cRef}>
                  Login
                </button>
              </div>

              {/* Google Login Button */}
              <div className="text-center mt-3">
                <button type="button" className="btn btn-outline-danger w-100" onClick={handleGoogleLogin}>
                  <FcGoogle className="me-2" size={20} /> Sign in with Google
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-3">
                <Link to="/signup" className="btn btn-outline-primary w-100">
                  Sign Up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
