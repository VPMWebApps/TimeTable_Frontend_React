import React, { useContext, useState } from 'react';
import { userDataContext } from '../../Context/UserContext';
import StudentAttendancePage from '../../Components/Home/StudentAttendance';

const Home = () => {

  const [loading, setLoading] = useState(false);
  const { user } = useContext(userDataContext)  

  return (
    <div className=''>
      <StudentAttendancePage currentUser={user} />
    </div>
  )
}

export default Home;