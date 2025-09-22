import React from 'react';

import { useAppKitAccount } from '@reown/appkit/react';
import { Toaster } from 'react-hot-toast';

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';

function App() {
  const { isConnected } = useAppKitAccount();

  return (
    <>
      <Toaster />
      {isConnected ? <HomePage /> : <LoginPage />}
    </>
  );
}

export default App;
