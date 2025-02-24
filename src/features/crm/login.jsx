import React from 'react'
import { Formik,ErrorMessage,Field,Form } from 'formik'
import *as yup from "yup"
import "./login.css"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLoginMutation } from '../../services/CrmApi'
function Login() {

     const aRef=React.useRef();
     const bRef=React.useRef();
     const cRef=React.useRef();

     React.useEffect(()=>{
         aRef.current.focus();
     },[])

   const[LoginFn]=useLoginMutation()
   var navigate=useNavigate()
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
        LoginFn(values).then((res)=>{
          window.localStorage.setItem("token",res.data.message,)
              if(res.data.message==='Login successful'){
                navigate("/")
                window.localStorage.setItem("myname",res.data.user.username)
                console.log(res.data)
              }
              else{
                navigate("/login")
              }
        }).catch((err)=>{
          console.log(err)
        })
    })
    
    function Aenterkey(e){
        if(e.key==='Enter'){
          bRef.current.focus()
        }
    }
     
    function Benterkey(e){
       if(e.key==='Enter'){
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
                          <div className='m-4 w-50 justify-content-center align-items-center mx-auto shadow p-3 login'>
                          <div className='text-center fs-3 p-2'>
                             <h1>Login</h1>
                          </div>
                          <div className='m-3'>
                          <Field type='text' name="username" className="form-control" placeholder="Enter Your Name" ref={aRef} onKeyUp={((ev)=>{Aenterkey(ev)})}></Field>
                          <ErrorMessage name="username" className='errormessage text-danger'></ErrorMessage>
                          </div>
                          <div className='m-3'>
                          <Field type='password' name="password" className="form-control" placeholder="Enter Your experience" ref={bRef} onKeyUp={((ev)=>{Benterkey(ev)})}></Field>
                          <ErrorMessage name="password" className='errormessage'></ErrorMessage>
                          </div>
                          <div className='d-flex  mx-auto justify-content-center align-items-center '>
                              <button type='submit' className='btn btn-success m-3' ref={cRef}>Login</button>
                              <Link to="/signup">
                               <button type='submit' className='btn btn-success m-3'>SignUp</button>
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

export default Login
