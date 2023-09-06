import React from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import AddInfo from './components/AddInfo';

// Router singleton created


// RouterProvider added

function App() {
  return (
    <Routes>
      <Route path="/" element={<div className='text-center flex flex-col gap-2'><AddInfo /><AddInfo /><AddInfo /><AddInfo /></div>} />
    </Routes>
  );
}





export default App;
