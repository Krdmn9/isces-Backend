import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import "./Login.css"
//import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [formIsValid, setFormIsValid] = useState(false)
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext)

  const submitHandler =  (event) => {
    event.preventDefault()
    
    if (enteredEmail.includes('rector')) {
      const userRole = 'rector'
      authCtx.setUserData(userRole)
      navigate('/rectorsidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('dean')) {
      const userRole = 'dean'
      authCtx.setUserData(userRole)
      navigate('/deansidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('departmentsecretary')) {
      const userRole = 'dean'
      authCtx.setUserData(userRole)
      navigate('/secretarysidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      })
    }
    else if (enteredEmail.includes('std')) {
      const userRole = 'student'
      authCtx.setUserData(userRole)
      navigate('/sidebar')
      authCtx.onLogin({
        email: enteredEmail,
        password: enteredPassword,
      }) 
    }
    else{
      return
    }

  }

   /* const submitHandler = async (event) => {
    const signInInfo = { email: enteredEmail, password: enteredPassword }
    event.preventDefault()
    try {
      const res = await axios.post(
        'http://127.0.0.1:3001/api/v1/users/login',
        JSON.stringify(signInInfo)
      )
      if (res.data.status === 'success') {
        localStorage.setItem('uid', res.data.uid)
        localStorage.setItem(
          'userInfo',
          JSON.stringify({ email: signInInfo.email })
        )
        const userRole = res.data.role

        authCtx.setUserData(userRole)
        authCtx.onLogin({
          email: enteredEmail,
          password: enteredPassword,
        })
      } else {
        console.log('Wrong password or email')
      }
      // assump log in is successful
    } catch (err) {
      console.log(err)
    }
  }*/

  const emailChangeHandler  = (event) => { 
    setEnteredEmail(event.target.value)
    setFormIsValid(
      event.target.value.includes('@') 
    )
  }
  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  } 

  return (
    <div className="container">
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          className="input"
          placeholder="e-mail"
          type="email"
          id="email"
          value={enteredEmail}
          onChange={emailChangeHandler}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="input"
          placeholder="password"
          type="password"
          id="password"
          value={enteredPassword}
          onChange={passwordChangeHandler}
        />
        <button
          className="button"
          type="submit"
          disabled={!formIsValid}
        >
          Login
        </button>
      </form>
    </div>
  );
  
  }

export default Login;