import React from 'react';
import './Lectures.css';

const TimeTable = () => {
  return ( 
  <div className='page'>
      <div className='title'>
        <p>TimeTable</p>
      </div>
    <div className='table'>
      <table border={1} width="80%" cellSpacing={0} cellPadding={10} align='center'>
        <thead>
          <tr align='center'>
            <th className="header">Time/day</th>
            <th className="header">Mon</th>
            <th className="header">Tue</th>
            <th className="header">Wed</th>
            <th className="header">Thu</th>
            <th className="header">Fri</th>
            <th className="header">Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr align='center'>
            <td className="time-slot">9:10-10:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">10:10-11:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">11:10-12:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">12:10-1:10</td>
            <td colSpan={6} align='center' className="break">Break</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">1:10-2:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">2:10-3:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
          <tr align='center'>
            <td className="time-slot">3:10-4:10</td>
            <td>COst</td>
            <td>JAVA</td>
            <td>Embedd</td>
            <td>Maths</td>
            <td>Python</td>
            <td>C++</td>
          </tr>
        </tbody>
      </table> 
    </div>
  </div>
  );
}

export default TimeTable;
