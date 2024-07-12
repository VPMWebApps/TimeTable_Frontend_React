import React from 'react'
import Home from './Home/Home'
import Sidebar from '../Sidebar/Sidebar'
import Attendance from './Attendance/Attendance'
import Dashboard from './Dashoard/Dashboard'
import Lectures from './Lectures/Lectures'
import Help from './Help/Help'
 import { BrowserRouter,Routes,Route } from 'react-router-dom'

const Export = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
           <Route  path='/' element={<Home/>} />
           <Route  path='/Dashboard' element={<Dashboard/>} />
           <Route  path='/Lectures' element={<Lectures/>} />
           <Route  path='/Attendance' element={<Attendance/>} />
           <Route  path='/Help' element={<Help/>} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  )
}

export default Export
