import React from 'react'
import '../style/signUp.css'

const SignUp = () => {
  return (
    <>
    <div className='Login'>
       <div className='Container'>
      <form className='form'>
        <div className='input'>
           <input type="text" placeholder='Name' required />
        </div>
          
        <div className='input'>
         <input type="text" placeholder='Phone' required/>
        </div>

        <div className='input'>
         <input type="number" placeholder='College ID' required />
        </div>

        <div className='input'>
         <input type="text" placeholder='Batch' required/>
        </div>

        <div className='input'>
         <input type="text" placeholder='Email' required />
        </div>
        
        <div className='input'>
         <input type="text" placeholder='Password' required />
        </div>
   
      <div>
        <button className='LoginButton'>Register</button>
      </div>
        
       <div>
        <a className='ForgotPass' href="">Forgot Password?</a>
       </div>


       <div >
       <p className='Noacc'>Don't have an account? </p>
       <a className='Click' href="#"> Click here</a>
       </div>


          </form>
       </div>
    </div>
    </>
  )
}

export default SignUp
