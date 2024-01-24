import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './notFoundPage/notFoundPage';
import LoginPage from './loginPage/LoginPage';
import DashboardPage from './dashboard/DashboardPage';
import Invoice from './dashboard/components/Invoice';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path='/' element={ <LoginPage/> } />
          <Route path='/dashboard' element={ <DashboardPage/> } />
          <Route path='/dashboard/invoice' element={ <Invoice/> } />
          <Route path='/' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>  
  );
}

export default App;
