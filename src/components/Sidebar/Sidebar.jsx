import React from 'react'
import '../Sidebar/Sidebar.css'
import assets from '../../assets/assets'

const Sidebar = () => {
return (

  <div className='main-container'>
    
            <div className='top'>  

                <div className='user'>
                   <img src={assets.user_icon} alt="" />
                    <h3>User</h3>
                </div>
               
                <div className='dashboard'>
                    Dashboard
                </div>

                <div className='lecture'>
                    Lectures
                </div>

                <div className='examtt'>
                    Attendance  
                </div>

            </div>

            <div className='bottom'>
                <div className='bottom-all'>   
                    <img src={assets.setting_icon} alt="" />
                      Settings
                    
                </div>

                <div className='bottom-all'>
                    <img src={assets.question_icon} alt="" />
                    Help
                </div>

                <div className='bottom-all'>
                <img src={assets.logout} alt="" />
                    Logout
                </div>
            </div>
     
  </div>
)
}

export default Sidebar
