import {Navigate} from 'react-router-dom';

function Auth({children}: any) {
  return localStorage.getItem('token') ? children : <Navigate to='/login' />;
}

export default Auth;
