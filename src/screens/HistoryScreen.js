import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function HistoryScreen({ navigation }) {
    const { orderHistory } = useContext(CartContext);

    const calculateTotal = (items) => {
        return items.reduce((sum, item) => {
            const numericPrice = parseInt(item.price.replace(/[₫,.]/g, ''));
            return sum + (numericPrice * item.quantity);
        }, 0).toLocaleString() + '₫';
    };

    const renderOrder = ({ item }) => (
        <View style={styles.orderContainer}>
            <Text style={styles.date}>🕒 Ngày: {item.date}</Text>
            {item.items.map((product, index) => (
                <View key={index} style={styles.product}>
                    <Text style={styles.productName}>
                        {product.name} (x{product.quantity}) - {product.price}
                    </Text>
                    <Text style={styles.productDetails}>
                        Size: {product.size || 'N/A'} | Màu: {product.color || 'N/A'}
                    </Text>
                </View>
            ))}
            <Text style={styles.total}>Tổng đơn: {calculateTotal(item.items)}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🧾 Lịch sử mua hàng</Text>

            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>

            {orderHistory.length === 0 ? (
                <Text style={styles.empty}>Bạn chưa có đơn hàng nào.</Text>
            ) : (
                <FlatList
                    data={orderHistory}
                    keyExtractor={(item) => item.id}
                    renderItem={renderOrder}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F5F5F5',
        paddingTop: 70,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    orderContainer: {
        backgroundColor: '#FFFF99',
        padding: 15,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    date: {
        fontWeight: 'bold',
        marginBottom: 8,
    },
    product: {
        marginLeft: 10,
        marginBottom: 6,
    },
    productName: {
        fontWeight: '600',
    },
    productDetails: {
        color: '#555',
        fontStyle: 'italic',
        fontSize: 13,
    },
    total: {
        fontWeight: 'bold',
        marginTop: 10,
        color: '#000',
    },
    empty: {
        textAlign: 'center',
        color: '#888',
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