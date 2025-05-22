import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load data khi khởi động app
    useEffect(() => {
        const loadData = async () => {
            try {
                const [usersData, userData] = await Promise.all([
                    AsyncStorage.getItem('@users'),
                    AsyncStorage.getItem('@user')
                ]);

                if (usersData) setUsers(JSON.parse(usersData));
                if (userData) setUser(JSON.parse(userData));
            } catch (e) {
                console.error('Lỗi load data:', e);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    // Đăng ký + tự động login
    const register = async (email, password) => {
        try {
            email = email.trim().toLowerCase();
            password = password.trim();

            // Kiểm tra trùng email
            if (users.some(u => u.email === email)) {
                return false;
            }

            const newUser = { email, password };
            const updatedUsers = [...users, newUser];

            // Cập nhật state trước
            setUsers(updatedUsers);
            setUser(newUser);

            // Lưu vào storage
            await Promise.all([
                AsyncStorage.setItem('@users', JSON.stringify(updatedUsers)),
                AsyncStorage.setItem('@user', JSON.stringify(newUser))
            ]);

            return true;
        } catch (e) {
            console.error('Lỗi đăng ký:', e);
            return false;
        }
    };

    // Đăng nhập
    const login = async (email, password) => {
        try {
            email = email.trim().toLowerCase();
            password = password.trim();

            const foundUser = users.find(u =>
                u.email === email &&
                u.password === password
            );

            if (!foundUser) return false;

            setUser(foundUser);
            await AsyncStorage.setItem('@user', JSON.stringify(foundUser));
            return true;
        } catch (e) {
            console.error('Lỗi đăng nhập:', e);
            return false;
        }
    };

    // Đăng xuất
    const logout = async () => {
        try {
            setUser(null);
            await AsyncStorage.removeItem('@user');
        } catch (e) {
            console.error('Lỗi đăng xuất:', e);
        }
    };

    if (loading) {
        return null; // Hoặc hiển thị loading indicator
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                users,
                register,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};