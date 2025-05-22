import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);

    useEffect(() => {
        const loadOrderHistory = async () => {
            try {
                const savedHistory = await AsyncStorage.getItem('orderHistory');
                if (savedHistory !== null) {
                    setOrderHistory(JSON.parse(savedHistory));
                }
            } catch (e) {
                console.error('Failed to load order history', e);
            }
        };
        loadOrderHistory();
    }, []);

    useEffect(() => {
        const saveOrderHistory = async () => {
            try {
                await AsyncStorage.setItem('orderHistory', JSON.stringify(orderHistory));
            } catch (e) {
                console.error('Failed to save order history', e);
            }
        };
        saveOrderHistory();
    }, [orderHistory]);

    const addToCart = (product) => {
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            setCartItems(cartItems.map(item =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            ));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const addOrderToHistory = (items) => {
        const newOrder = {
            id: Date.now().toString(),
            date: new Date().toLocaleString(),
            items,
        };
        setOrderHistory(prev => [...prev, newOrder]);
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity <= 0) return;
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                setCartItems,
                addToCart,
                clearCart,
                updateQuantity,
                orderHistory,
                addOrderToHistory
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
