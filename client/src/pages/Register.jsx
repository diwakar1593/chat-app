import React, { useState, useEffect } from 'react'
import { Link, useNavigate, } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { registerRoute } from '../utils/APIRoutes';

function Register() {
  const navigate = useNavigate();
  const toastOptions =  {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if(localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [ navigate ]);

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) =>{
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if ( username.length < 5 ) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    }else if ( password.length < 8 ) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if ( email === "" ) {
      toast.error(
        "Email is required.", 
        toastOptions
        );
      return false;
    } else if ( confirmPassword !== password ) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
      }
      
      return true;
  };

  const handleSubmit = async (event)=>{
    event.preventDefault();
    if(handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if(data.status === false){
      toast.error(data.msg, toastOptions);
    }
    if(data.status === true){
      localStorage.setItem('chat-app-user',JSON.stringify(data.user)
      );
      navigate("/");
      }
    }
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(event)=>handleSubmit(event)}>
          <div className='brand'>
            <img src={Logo} alt='Logo' />
            <h1>Heartland</h1>
          </div>
          <input 
            type='text' 
            placeholder='Username' 
            name='username' 
            onChange={(e) => handleChange(e)} 
          /> 
          <input 
            type='email' 
            placeholder='Email' 
            name='email' 
            onChange={(e) => handleChange(e)} 
          /> 
          <input 
            type='password' 
            placeholder='Password' 
            name='password' 
            onChange={(e) => handleChange(e)} 
          /> 
          <input 
            type='password' 
            placeholder='Confirm Password' 
            name='confirmPassword' 
            onChange={(e) => handleChange(e)} 
          /> 
          <button type='submit'>Create User</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #1b0044;
  
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1{
      color: #ffffff;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #5727a3;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    color: #000000;
    padding: 1rem;
    border: 0.1rem solid #9153f4;
    border-radius: 0.4rem;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #d6c5f0;
      outline: none;
    }
  }
  button {
    background-color: #9153f4;
    color: #1b0044;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius : 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #d6c5f0;
    }
  }
  span{
    color: white;
    text-transform: uppercase;
    a {
      color: #1b0044;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Register