import React, { useContext } from "react";
import loginImage from '../../../src/assets/images/login/login.svg'
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaGoogle } from "react-icons/fa";

const Login = () => {

    const navigate=useNavigate();
    const loc=useLocation()
   // console.log(loc)
    const from= loc.state?.from?.pathname || '/';
   // console.log(from)

    

    const {SignInByMail,GoogleLogin}=useContext(AuthContext)

    const handleLogin=(event)=>{
        event.preventDefault();
        const form=event.target;
        const email=form.email.value;
        const password=form.password.value;

       console.log(email, password)

       SignInByMail(email,password)
       .then(result=>{
         const loggedUser=result.user;
         console.log("Logged User: ",loggedUser)
       })
       .catch(error=>{
        console.log(error.message)
       })
    }

    const handleLoginGoogle=()=>{
       GoogleLogin()
       .then(result=>{
        const loggedUser=result.user;
        console.log("Google")
        console.log(loggedUser)
        const loginUser={
          email: loggedUser.email
        }
        console.log(loginUser)

        fetch('http://localhost:5000/jwt',{
          method: 'POST',
          headers: {
            'content-type':'application/json' 
          },
          body: JSON.stringify(loginUser)
          
        })
        .then(res=>res.json())
        .then(data=>{
          console.log('JWT Response: ',data)
          ///warning : Local storage is not best place
          localStorage.setItem('car-access-token',data.token)
        })
       navigate(from, {replace: true} )
       })
       .catch(error=>{
        console.log(error.message)
       })
     }
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row gap-32 bg-red-500">
        <div className="flex items-center justify-center bg-green-500 w-1/2">
          <img src={loginImage} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
          <h1 className="text-3xl font-bold text-center">Login now!</h1>

           <form onSubmit={handleLogin}>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input
                    type="email"
                    placeholder="email"
                    className="input input-bordered"
                    name="email"
                />
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                />
                <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                    </a>
                </label>
                </div>
                <div className="form-control mt-6">
                <input type="submit" className="btn btn-primary" value="Login" />
                </div>
           </form>
           <div className="flex items-center justify-center flex-col gap-5">
            <p className="font-bold">Or Sign up With</p>
            <button onClick={handleLoginGoogle} className="btn text-yellow-300"> <FaGoogle/> </button>
           </div>
           <p className="text-center my-4">New to Car-Doctors? <Link to='/signup' className="font-bold text-orange-500">Sign Up</Link> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
