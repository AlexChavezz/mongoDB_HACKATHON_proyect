import { useEffect, useState } from 'react';
import { Alert } from './components/Alert';
import { AuthContainer } from './components/AuthContainer';
import { AuthContext } from './context/AuthContext';
import { AuthModalContext } from './context/AuthModalContext';
import { ErrorContext } from './context/ErrorContext';
import { API } from './helpers/API';
import { useAlert } from './hooks/useAlert';
import { User } from './interfaces/intefaces';
import { Router } from './router/Router';

export default () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(()=>{
    // -> If token exists into localStorage, then try login user
    let token = window.localStorage.getItem('token');
    if(token)
    {
      window.fetch(`${API}/users/verify-identity-by-token`, {
        method:'GET',
        headers: {
          'x-token': JSON.parse(token)
        }
      })
      .then(res => res.json())
      .then((data) => {
        if(!data.token)
        {
          window.localStorage.removeItem('token');
          setUser(null);
          return;
        }
        setUser(data)
        // window.localStorage.removeItem('token');
        window.localStorage.setItem('token', JSON.stringify(data.token));
      })
      .catch(console.log)
    
    }
  },[])
  
  return (
    <ErrorContext.Provider value={{
      error,
      setError
    }}>
      <AuthContext.Provider value={{
        user, 
        setUser
      }}>
        <AuthModalContext.Provider value={{
          showAuthModal,
          setShowAuthModal
        }}>
          {
            showAuthModal && <AuthContainer />
          }
          {
            error && <Alert />
          }
          <Router />
        </AuthModalContext.Provider>
      </AuthContext.Provider>
    </ErrorContext.Provider>
  );
}