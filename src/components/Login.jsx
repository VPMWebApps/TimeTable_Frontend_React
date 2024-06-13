
import React from 'react'
import '../style/Login.css'
import TextField from '@mui/material/TextField';


const Login = () => {
  return (
    <>
      <div className='Login'>
        <div className='Container'>
          <form className='form'>

            {/* <div className='input-group'>
              <input type="text" required />
              <label>Email</label>
            </div> */} 

            {/* <div className='input-group'>
              <input type="password" required />
              <label>Password</label>
            </div> */}
             
             <div className='Textfield'>
                 <TextField id="standard-basic"  label="Email" variant="filled"  sx={{bgcolor:'white',width:'100%',margin:'10px',outline:'none',border:'none',textDecoration:'none', borderRadius:'5px'}} required/>
             </div>

             <div className='Textfield'>
                   <TextField id="standard-basic"  type='password' label="Password" variant="filled"  sx={{bgcolor:'white',width:'100%',margin:'10px', borderRadius:'5px'}} required/>
             </div>

            <div>
              <button className='LoginButton'>Login</button>
            </div>

            <div className='Forgot'>
              <a className='ForgotPass' href="">Forgot Password?</a>
            </div>

            <div className='account'>
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
