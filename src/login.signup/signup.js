import React, { useState } from 'react';
import './signup.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Signup() {
 
  const [data,setData]=useState({username:"",email:"",password:"",role:"user"});
  const [passwordvalidation,setPasswordvalidation]=useState("");
  const [type,setType]=useState("password");
  const [button,setButton]=useState("show");
  const usenav=useNavigate();




  const handler=(event)=>{
    const {name,value}=event.target;

    setData(prevState=>({...prevState,[name]:value}));

    if (data.password.length >= 8 && data.password.match(/[A-Z]/) && data.password.match(/[a-z]/) && data.password.match(/[0-9]/)) {
      setPasswordvalidation("");
    } else {
      setPasswordvalidation("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one digit.");
    }
    
  };

  const passwordtoggele=(e)=>{
    e.preventDefault()

    var password=type;

    if(password==="password"){
      setType("text");
      setButton("Hide")
    }
    else{
      setType("password");
      setButton("Show")
    }

  }

  const submithandler=(e)=>{
    e.preventDefault();
    if(data.password.match(/[A-Z]/) && data.password.match(/[a-z]/) && data.password.match(/[0-9]/)){
      const details={username:data.username,email:data.email,password:data.password,role:data.role}
      axios.post("http://localhost:8000/signup",details).then((res)=>{
        if(res.data==="User Already Exists With This Email...."){
         
          Swal.fire({
            title: "User Exist",
            text: res.data,
            icon: "question"
          });
        }
        else{
          
          Swal.fire({
            position: "center",
            icon: "success",
            title: res.data,
            showConfirmButton: false,
            timer: 1500
          });
          usenav('/')
        }
        
      })
    }
    else{

      Swal.fire("Password is too weak. It must be at least 8 characters long & Special characters.");
    }
    
  }




  return (
    <section>
    <div>
      <div id="div_for_alreadyaccount">
        <span id="signup_arrow">&#8592;</span><span id="register_span">User registration</span>
        <span id="alreadyaccount_span">Already have an account? <Link to="/"><button id="link_to_login"><i class="fa-solid fa-user"></i> Login</button></Link></span>
      </div>
      <div id="signup_div">
         <form method='post' onSubmit={submithandler}>
          <label className='signup_label'>Username</label> <input type='text' className='signu_input' name="username" placeholder='Enter Username' onChange={handler} required/><br/>
          <label className='signup_label'>Email</label>&emsp;&nbsp;&nbsp;&nbsp; <input type='email' className='signu_input' name='email' placeholder='Enter Email' onChange={handler} required/><br/>
          <label className='signup_label'>Password</label> <input type={type} className='signu_input' name='password' placeholder='Enter Password' onChange={handler} required/>
         <button className='hide_show_btn' onClick={passwordtoggele}>{button}</button><br/>
         <div className='password_validation'><span>{passwordvalidation}</span></div><br/>
      
          
          <input type='submit' id="signup_btn"/>

         </form>
         
      </div>
    </div>
    </section>
  )
}
