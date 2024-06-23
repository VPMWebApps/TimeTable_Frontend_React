import '../Main/Main.css'
import React from 'react'
// import Table from './Grid/Table'
import Table from './Table/TimeTable'


const Main = () => {
  return (
    <div className='container'>

      <div className='head'>
        <h1 className="title">Time Table</h1>
       
      </div>
      <div>

      <Table/>
      </div>
    </div>
  )
}

export default Main


