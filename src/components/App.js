import styled from 'styled-components';
import { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import UserContext from '../contexts/UserContext';

import LogIn from './LogIn';

export default function App() {
  const [user, setUser] = useState();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Container>
          <Routes>
            <Route path='/' element={<LogIn />} />
          </Routes>
        </Container>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;