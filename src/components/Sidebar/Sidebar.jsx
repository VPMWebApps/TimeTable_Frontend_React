  import { icon } from '@fortawesome/fontawesome-svg-core'
  import React, { Children, useState } from 'react'

  import { 
    DashboardCustomize as DashboardCustomizeIcon, 
    ImportContacts as ImportContactsIcon, 
    HowToReg as HowToRegIcon, 
    Help as HelpIcon, 
    Menu as MenuIcon ,
    Home as HomeIcon
  } from '@mui/icons-material'
  import { NavLink } from 'react-router-dom';
  import assets from '../../assets/assets'
  import '../Sidebar/Sidebar.css'


  const MenuItem =[
      {
          path: '/',
          name:'Home',
          icon:<HomeIcon />
      },
      {
        path: '/Dashboard',
        name:'Dashboard',
        icon:<DashboardCustomizeIcon />
    },
    {
      path: '/Lectures',
      name:'Lectures',
      icon:<ImportContactsIcon />
  },
  {
    path: '/Attendance',
    name:'Attendance',
    icon:<HowToRegIcon />
  },
  {
    path: '/Help',
    name:'Help',
    icon:<HelpIcon/>
  },
  ]

  const Sidebar = ({children}) => {
    const [open,setopen] =useState(false);

  const handleMenu = () =>{
    setopen(prev => !prev);
  }
    
    return (
    
        <div className="container">
          <div  className={`sidebar ${open? " expand" : " collapse  "   }`}>
            <div className="top_section">
              <div className="menu_icon"   >
                  <img src={assets.menu_icon} onClick={handleMenu} alt="" />
              </div>
               <div className='user'>
                    <img src={assets.user_icon} alt="user_img" />
                    <h1 className=''>User</h1>
              </div>


            </div>
            {
              MenuItem.map((item,index)=>(
              <NavLink to={item.path}  key={index} className="path" activeclassname="active" > 
                  <div className="icon">{item.icon}</div>
                {open?  <div className="link_text">{item.name} </div>:null}
              </NavLink>                  
              ))
            }
            <div className={`logout ${open? "logout-extend" : "logout-collapse"}`}>
              <img src={assets.logout} alt="" />
              {open?<p>Logout</p>:null}

            </div>
          </div>
          <div className={`main ${open? 'sidebar-extended ': 'sidebar-collapsed'} `}> {children} </div>
        </div>
    
    )
  }

  export default Sidebar
