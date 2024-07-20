import React, { useMemo, useState } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { ModuleRegistry } from '@ag-grid-community/core';
import './Lectures.css';

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const getTimetableData = () => {
  return [
    { time: '9:00 - 10:00', Monday: 'Math', Tuesday: 'Physics', Wednesday: 'Chemistry', Thursday: 'Biology', Friday: 'History' },
    { time: '10:00 - 11:00', Monday: 'English', Tuesday: 'Math', Wednesday: 'Physics', Thursday: 'Chemistry', Friday: 'Biology' },
    { time: '11:00 - 12:00', Monday: 'History', Tuesday: 'English', Wednesday: 'Math', Thursday: 'Physics', Friday: 'Chemistry' },
    { time: '12:00 - 1:00', Monday: 'Biology', Tuesday: 'History', Wednesday: 'English', Thursday: 'Math', Friday: 'Physics' },
    { time: '1:00 - 2:00', Monday: 'Lunch', Tuesday: 'Lunch', Wednesday: 'Lunch', Thursday: 'Lunch', Friday: 'Lunch' },
    { time: '2:00 - 3:00', Monday: 'Chemistry', Tuesday: 'Biology', Wednesday: 'History', Thursday: 'English', Friday: 'Math' }
  ];
};

const Lectures = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '500px', width: '100%' }), []);
  const [rowData] = useState(getTimetableData());
  const [columnDefs] = useState([
    { headerName: 'Time/Day', field: 'time', cellClass: 'time-cell' },
    { headerName: 'Monday', field: 'Monday' },
    { headerName: 'Tuesday', field: 'Tuesday' },
    { headerName: 'Wednesday', field: 'Wednesday' },
    { headerName: 'Thursday', field: 'Thursday' },
    { headerName: 'Friday', field: 'Friday' },
  ]);

  const defaultColDef = useMemo(() => ({ flex: 1, resizable: true }), []);

  const getRowHeight = (params) => {
    return 73; // Set the height of each row to 25px (default height + 5px)
  };

  return (
    <>
      <div className='title'>
        <p>TimeTable</p>
      </div>
      <div style={containerStyle}>
        <style>
          {`
            .ag-theme-alpine .ag-cell {
              border-right: 1px solid #e0e0e0; /* Adjust the color and width as needed */
            }
            .ag-theme-alpine .ag-row {
              border-bottom: 1px solid #e0e0e0; /* Adjust the color and width as needed */
            }
            .time-cell {
              background-color: #f7f7f7; /* Light grey background for time cells */
              font-weight: bold;
            }
          `}
        </style>
        <div style={gridStyle} className="ag-theme-alpine">
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            getRowHeight={getRowHeight}
          />
        </div>
      </div>
    </>
  );
};

export default Lectures;
