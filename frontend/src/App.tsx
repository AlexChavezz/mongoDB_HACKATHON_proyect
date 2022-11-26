import { useState } from 'react';
import { AuthContainer } from './components/AuthContainer';
import { AuthContext } from './context/AuthContext';
import { AuthModalContext } from './context/AuthModalContext';
import { User } from './interfaces/intefaces';
import { Router } from './router/Router';


const initialState: User = 
{
  _id:'',
  userName:''
}


export default () => {
  const [user, setUser] = useState<User | null>(initialState);
  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
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