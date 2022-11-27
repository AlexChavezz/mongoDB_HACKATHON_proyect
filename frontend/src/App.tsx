import { useEffect, useState } from 'react';
import { AuthContainer } from './components/AuthContainer';
import { AuthContext } from './context/AuthContext';
import { AuthModalContext } from './context/AuthModalContext';
import { API } from './helpers/API';
import { User } from './interfaces/intefaces';
import { Router } from './router/Router';


const initialState: User = 
{
  _id:'',
  userName:'',
  token:''
}


export default () => {
  const [user, setUser] = useState<User | null>(initialState);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  
  useEffect(()=>{
    // -> If token exists into localStorage, then try to login user
    const token = window.localStorage.getItem('token');
    if(token)
    {
      window.fetch(`${API}/users/verify-identity-by-token`, {
        method:'GET',
        headers: {
          'x-token': JSON.stringify(token)
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
        window.localStorage.setItem('token', token);
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