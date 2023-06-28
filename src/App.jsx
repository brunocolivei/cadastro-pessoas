import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Usuarios from './pages/usuarios/usuarios';
import Login from './pages/login/login';
import Cadastro from './pages/cadastro/cadastro';
import { useEffect, useState } from 'react';
import Menu from './components/menu/menu';
import AppContextModule from './config/AppContext/appContext';

function App() {
  const [session, setSession] = useState(() => {
    const sessionState = localStorage.getItem('session');
    return sessionState ? JSON.parse(sessionState) : false;
  });
  
  useEffect(() => {
    localStorage.setItem('session', JSON.stringify(session));
  },[session])
  
  return (
    <AppContextModule.AppProvider>
    <BrowserRouter>
      {session && <Menu setSession={setSession}/>}
      <Routes>

        <Route path="/" element={<Login setSession={setSession} />} />
        <Route path="/login" element={<Login setSession={setSession} />} />
        <Route path="/cadastro" element={session ? <Cadastro/> : <Navigate to="/login" />} />
        <Route path="/usuarios" element={session ? <Usuarios/> : <Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
    </AppContextModule.AppProvider>
  );
}

export default App;
