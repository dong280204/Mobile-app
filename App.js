// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';
import { UserProvider } from './src/context/UserContext';
import { AuthProvider } from './src/context/AuthContext';
export default function App() {
  return (
    <CartProvider>
      <UserProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </UserProvider>
    </CartProvider>
  );
}
