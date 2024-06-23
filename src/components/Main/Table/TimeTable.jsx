import React from 'react'
import './Timetable.css';


const TimeTable = () => {
    return (
      <>
      <div className="table">
        <table cellSpacing={0} cellPadding={1} align='center'>
            <thead>
              <tr>
                <th>Time\Day</th>
                <th>Mon</th>
                <th>Tue</th>
                <th>Wed</th>
                <th>Thu</th>
                <th>Fri</th>
                <th>Sat</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>7:00 - 8:00</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>8:00 - 9:00</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>9:00 - 9:10</th>
                <td colSpan={6}>Break</td>
              </tr>
              <tr>
                <th>9:10 - 10:10</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>10:10 - 11:10</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>11:10 - 11:15</th>
                <td colSpan={6}>Break</td>
              </tr>
              <tr>
                <th>11:15 - 12:15</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>12:15 - 12:40</th>
                <td colSpan={6}>Break</td>
              </tr>
              <tr>
                <th>12:40 - 1:40</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>1:40 - 2:40</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>2:40 - 2:50</th>
                <td colSpan={6}>Break</td>
              </tr>
              <tr>
                <th>2:50 - 3:50</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <th>3:50 - 4:50</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>              
            </tbody>
          </table>
        </div>
       </>
      );
}

export default TimeTable