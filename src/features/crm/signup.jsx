import React from 'react'
import { Formik,ErrorMessage,Field,Form } from 'formik'
import *as yup from "yup"
import "./login.css"
import {  useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSignupMutation } from '../../services/CrmApi'
function Signup() {
  const aRef=React.useRef();
  const bRef=React.useRef();
  const cRef=React.useRef();
  React.useEffect(()=>{
    aRef.current.focus();
  },[])   
  
  var [SignupFn]=useSignupMutation();
   var navigete=useNavigate()
    var intialValues={
        username:"",
        password:'',
    };
    const validationSchema=yup.object({
         username:yup.string().required("please Enter Your Name"),
         password:yup.string().required("please Enter a Password")
    });
    const onSubmit=((values)=>{
        console.log(values)
        SignupFn(values).then((res)=>{
             try{
              if(res.data.message==='Signup successful'){
                    navigete("/login")
              }
             }
             catch(err){
              console.log(err)
             }
          console.log(res)})
        .catch((err)=>{console.log(err)})
    })
    function AenterKey(e){
      if(e.key==='Enter'){
          bRef.current.focus()
      }
    }
    function Benterkey(e){
         if(e.key==="Enter"){
          cRef.current.focus();
         }
    }
  return (
    <div className='login'>
       <Formik onSubmit={onSubmit} validationSchema={validationSchema} initialValues={intialValues}>
              {
                ()=>{
                    return(
                        <Form>
                          <div className='m-4 w-50 justify-content-center align-items-center mx-auto shadow p-3'>
                          <div className='p-2 text-center'>
                          <h1 className='fs-3'>SignUp</h1>
                          </div>
                          <div className='m-3'>
                          <Field type='text' name="username" className="form-control" placeholder="Enter Your Name" ref={aRef} onKeyUp={((ev)=>{AenterKey(ev)})}></Field>
                          <ErrorMessage name="username"></ErrorMessage>
                          </div>
                          <div className='m-3'>
                          <Field type='password' name="password" className="form-control" placeholder="Enter Your password" ref={bRef} onKeyUp={((ev)=>{Benterkey(ev)})}></Field>
                          <ErrorMessage name="password" ></ErrorMessage>
                          </div>
                          <div className='d-flex  mx-auto align-items-center justify-content-center'>
                              <button type='submit' className='btn btn-success' ref={cRef}>Signup</button>
                              <Link to="/login">
                                   <h5 className='m-3'>Login</h5>
                              </Link>
                          </div>
                        </div>
                      </Form>
                    )
                    
                }
              }
       </Formik>
    </div>
  )
}

export default Signup
