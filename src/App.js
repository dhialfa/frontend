import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './pages/notFoundPage/notFoundPage';
import LoginPage from './pages/loginPage/LoginPage';
import DashboardPage from './pages/dashboard/DashboardPage';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage/> } />
          <Route path='/dashboard' element={ <DashboardPage/> } />
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>  
  );
}

export default App;
