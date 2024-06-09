
import React from 'react'
import '../style/Login.css'

const Login = () => {
  return (
    <>
      <div className='Login'>
        <div className='Container'>
          <form className='form'>

            <div className='input-group'>
              <input type="text" required />
              <label>Email</label>
            </div>

            <div className='input-group'>
              <input type="password" required />
              <label>Password</label>
            </div>

            <div>
              <button className='LoginButton'>Login</button>
            </div>

            <div>
              <a className='ForgotPass' href="">Forgot Password?</a>
            </div>

            <div>
              <p className='Noacc'>Don't have an account?</p>
              <a className='Click' href="#">Click here</a>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login
