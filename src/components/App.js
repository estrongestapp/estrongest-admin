import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import LogIn from './LogIn';

export default function App() {
  /*const [information, setInformation] = useState(JSON.parse(localStorage.getItem('info')));

  function changeInformation(newInformation) {
    setInformation(newInformation);
    localStorage.setItem('info', JSON.stringify(newInformation));
    localStorage.setItem('legacyInfo', JSON.stringify(newInformation));
  }*/

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />} />
      </Routes>
    </BrowserRouter>
  );
}