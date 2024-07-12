import '../Main/Main.css'
import React from 'react'
import TimeTable from '../Main/Grid/TimeTable'


const Main = () => {
  return (
    <div className='container'>
      <div className='head'>
        <h1 className="title">Time Table</h1>
                        
        <div className='select'>

         <select>
          <option value="">Department</option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
         </select>

        </div>
      </div>
      <div>

      <TimeTable/>
      </div>
    </div>
  )
}

export default Main


