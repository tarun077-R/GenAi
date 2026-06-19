import React from 'react'
import "../auth.form.scss"
import {Link } from 'react-router'
const Login = () => {

  const handlesubmit =(e)=>{
    e.preventDefault()
  }
  return (
   <main>
    <div className="form-container">
      <h1>Login</h1>
      <form onSubmit={handlesubmit}>
        <div className='input-group'>
          <label htmlFor='email'>Email</label>
        <input type="text" id='email' name="email" placeholder='Enter email Address'/>
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Password</label>
        <input type="password" id='password' name="password" placeholder='Enter Password'/>
        </div>
        <button className='button primary-button'>Login</button>
         <p>Don't have an account ?<Link to={"/register"}>Register</Link></p>
      </form>

    </div>
   </main>
  )
}

export default Login