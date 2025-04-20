// App.js
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <AppNavigator /> {/* Đã có NavigationContainer trong AppNavigator.js nên không cần bọc ở đây */}
    </CartProvider>
  );
}
