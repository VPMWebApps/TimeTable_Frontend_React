import React from 'react'
import './Timetable.css'

const Table = () => {
  return (
    <div className='table'> 
      <table border={1}  width={60} cellSpacing={0} cellPadding={1} align='center'>
        <tr align='center'>
          <th>Time/day</th> 
          <th>Mon</th> 
          <th>Tue</th> 
          <th>Wed</th> 
          <th>Thus</th> 
          <th>Fri</th> 
          <th>Sat</th> 
        </tr>

        <tr align='center'>
          <td> 9:10-10:10</td>
          <td>COst </td>
          <td>JAVA</td>
          <td>Embedd</td>
          <td>maths</td>
          <td>python</td>
          <td>C++</td>
        </tr>
        <tr align='center'>
        <td> 10:10-11:10</td>
          <td>COst </td>
          <td>JAVA</td>
          <td>Embedd</td>
          <td>maths</td>
          <td>python</td>
          <td>C++</td>
        </tr>
        <tr align='center'>
        <td> 11:10-12:10</td>
          <td>COst </td>
          <td>JAVA</td>
          <td>Embedd</td>
          <td>maths</td>
          <td>python</td>
          <td>C++</td>
        </tr>
        <tr align='center' >
        <td> 9:10-10:10</td>
        <td colSpan={6} align='center'> Break</td>
          
        </tr>
        <tr align='center'>
        <td> 9:10-10:10</td>
          <td>COst </td>
          <td>JAVA</td>
          <td>Embedd</td>
          <td>maths</td>
          <td>python</td>
          <td>C++</td>
        </tr>
        <tr align='center'>
        <td> 9:10-10:10</td>
          <td>COst </td>
          <td>JAVA</td>
          <td>Embedd</td>
          <td>maths</td>
          <td>python</td>
          <td>C++</td>
        </tr>
      </table>
    </div>
  )
}

export default Table
