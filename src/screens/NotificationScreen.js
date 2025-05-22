// src/screens/NotificationScreen.js
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function NotificationScreen({ navigation }) {
    const { orderHistory } = useContext(CartContext);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const newNotifications = orderHistory.map(order => ({
            id: order.id.toString(),
            message: `🛝️ Bạn đã đặt ${order.items.length} sản phẩm vào lúc ${order.date}`,
        })).reverse(); // Đảo ngược thứ tự để đơn hàng mới nhất ở trên cùng
        setNotifications(newNotifications);
    }, [orderHistory]);

    const renderItem = ({ item }) => (
        <View style={styles.notificationBox}>
            <Text style={styles.notificationText}>{item.message}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông báo</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            {notifications.length === 0 ? (
                <Text style={styles.empty}>Không có thông báo nào.</Text>
            ) : (
                <FlatList
                    data={notifications}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 70,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#3f51b5',
        fontWeight: '600',
    },
    notificationBox: {
        backgroundColor: '#FFF3CD',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        borderLeftWidth: 5,
        borderLeftColor: '#FFC107',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationText: {
        fontSize: 16,
        color: '#333',
    },
    empty: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#FF9900',
        borderRadius: 6,
        alignItems: 'center',
    },
    backButtonText: {
        color: '#333',
        fontSize: 16,
    },
});
