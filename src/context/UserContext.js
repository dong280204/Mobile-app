import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const storedUsers = await AsyncStorage.getItem('@users');
                if (storedUsers) {
                    setUsers(JSON.parse(storedUsers));
                }
            } catch (e) {
                console.error('Lỗi load users:', e);
            }
        };

        loadUsers();
    }, []);

    const registerUser = async (email, password) => {
        const newUsers = [...users, { email, password }];
        try {
            await AsyncStorage.setItem('@users', JSON.stringify(newUsers));
            setUsers(newUsers);
        } catch (e) {
            console.error('Lỗi lưu users:', e);
        }
    };

    const deleteUser = async (email) => {
        const filtered = users.filter(user => user.email !== email);
        try {
            await AsyncStorage.setItem('@users', JSON.stringify(filtered));
            setUsers(filtered);
        } catch (e) {
            console.error('Lỗi xóa user:', e);
        }
    };

    return (
        <UserContext.Provider value={{ users, registerUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
