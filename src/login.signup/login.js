import React, { useState } from 'react';
import './login.css';
import { BsPersonCircle } from "react-icons/bs";
import { BiShowAlt } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Login() {

  const [type,setType]=useState("password");
  const [data,setData]=useState({email:"",password:""});
  const usenav=useNavigate();

 const toggele=()=>{
  var validpassword=type;
  if(validpassword==="password"){
    setType("text");
  }
  else{
    setType("password");
  }
 }

 const handler=(e)=>{

  const {name,value}=e.target;
  setData((prevState)=>(
    {...prevState,[name]:value}
  ))
  console.log(data.email)

 };

 axios.defaults.withCredentials=true;
 const submithandler = (e) => {
  e.preventDefault();
  const details = { email: data.email, password: data.password };

  axios.post("http://localhost:8000/user", details)
      .then((res) => {
          if (res.data.Status === "success" && res.data.role==="user") {


            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
              console.log(res.data);
              localStorage.setItem("user", res.data.userdetails);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("role", res.data.role);


              usenav('/userhome');
              window.location.reload();
          }

          else if (res.data.Status === "success" && res.data.role==="admin") {


            const Toast = Swal.mixin({
              toast: true,
              position: "center",
              showConfirmButton: false,
              timer: 1000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
              }
            });
            Toast.fire({
              icon: "success",
              title: "Signed in successfully"
            });
              console.log(res.data);
              localStorage.setItem("user", res.data.userdetails);
              localStorage.setItem("id", res.data.id);
              localStorage.setItem("role", res.data.role);


              usenav('/home');
              window.location.reload();
          }
          
          else {
              // alert("Login failed: " + res.data.message);
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login failed: "+res.data.message,
                footer: '<a href="#">Forget Password?</a>'
              });
          }
      })
      .catch((error) => {
          console.error("Error occurred during login:", error);
          // alert("Login failed.Invalid email or password.");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Login failed.Invalid email or password. ",
            footer: '<a href="resetpassword">Forget Password?</a>'
          });
      });
};


 


  return (
    <section>
    <div>
      <div id="userlogin_div">
        <div id="usericon_div"><BsPersonCircle id="person_icon"/></div>
      <p id="user_login_span">User Login</p>
      </div>
      <div id="user_login_div">
       <form method='post' onSubmit={submithandler}>
        <input type='email' name='email' className='login_input' placeholder='Email Address' onChange={handler} required/><br/>
        <input type={type} name='password' className='login_input' placeholder='Password' onChange={handler} required/><span onClick={toggele}><BiShowAlt id="show_hide_login"/></span><br/>
        <input type='checkbox' id="Remember_me_chechbox"/><span id="remember_text">Remember Me</span>  <Link to="resetpassword" id="reset_password">Reset Password?</Link><br/>
        <input type='submit' id="login_btn"/>
       </form>

      </div>
      <div id="link_to_register">
        <p id="d_and_r"> <span id="dont_have_an_account">Don't Have an Account?</span>
     <Link to="/signup"><button id="link_to_signup_btn"><BsPersonCircle id="register_person_icon"/>&nbsp;Register</button></Link></p>
      </div>
    </div>
    </section>
  )
}
