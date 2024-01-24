import Login from './Components/Login';
import Logo from '../utils/Logo'
import Footer from './Components/Footer'
import './stylesheets/LoginPage.css'
const LoginPage = () => {
  
    return (
      <div>
        <Logo pixel = '200px' />
        <Login/>
        <Footer/>
      </div>
    );
  };
  
  export default LoginPage;
  