import { useState } from 'react';
import { AuthContainer } from './components/AuthContainer';
import { AuthModalContext } from './context/AuthModalContext';
import { Router } from './router/Router';

export default () => {

  const [showAuthModal, setShowAuthModal] = useState<boolean>(false);
  return (
    <AuthModalContext.Provider value={{
      showAuthModal,
      setShowAuthModal
    }}>
      {
        showAuthModal && <AuthContainer />
      }
      <Router />
    </AuthModalContext.Provider>
  );
}