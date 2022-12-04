import { useEffect, useState } from 'react';
import { AuthContainer } from './components/AuthContainer';
import { AuthContext } from './context/AuthContext';
import { AuthModalContext } from './context/AuthModalContext';
import { API } from './helpers/API';
import { User } from './interfaces/intefaces';
import { Router } from './router/Router';

export default () => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
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
        <Router />
      </AuthModalContext.Provider>
    </AuthContext.Provider>
  );
}