

import Navbar from './component/Navbar';
import AllRoute from './component/AllRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getProfileData } from './redux/auth/action';

function App() {
  
  
  
  return (
    <>
       <Navbar/>
       <AllRoute/>
    </>
    
  );
}

export default App;
