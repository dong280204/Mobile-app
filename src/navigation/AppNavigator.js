import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PaymentScreen from '../screens/PaymentScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SearchFilter from '../screens/SearchFilter';
import UserListScreen from '../screens/UserListScreen';
import NotificationScreen from '../screens/NotificationScreen';
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Cart" component={CartScreen} />
                <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
                <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
                <Stack.Screen name="SearchFilter" component={SearchFilter} />
                <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Danh sách tài khoản' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
