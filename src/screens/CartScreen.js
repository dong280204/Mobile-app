// src/screens/CartScreen.js
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function CartScreen({ navigation }) {
    const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);

    // Hàm render cho mỗi item trong giỏ hàng
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Giá: {item.price}</Text>

                {/* Số lượng sản phẩm */}
                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}  // Nếu số lượng <= 1 thì không giảm
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>

                    <Text style={styles.quantityText}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                {/* Nút xóa sản phẩm */}
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Text style={styles.remove}>Xóa</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Hàm tính tổng giá trị giỏ hàng
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + parseInt(item.price.replace('₫', '').replace('.', '')) * item.quantity, 0);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Giỏ hàng</Text>

            {/* Nút quay lại trang chủ */}
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()} // Quay lại trang trước đó
            >
                <Text style={styles.backButtonText}>Quay lại</Text>
            </TouchableOpacity>

            {cartItems.length === 0 ? (
                <Text style={styles.empty}>Giỏ hàng của bạn đang trống.</Text>
            ) : (
                <FlatList
                    data={cartItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem}
                />
            )}

            {cartItems.length > 0 && (
                <Text style={styles.total}>Tổng: {calculateTotal()}₫</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    details: {
        marginLeft: 20,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        color: '#777',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    quantityButton: {
        backgroundColor: '#ccc',
        padding: 8,
        borderRadius: 4,
        marginHorizontal: 8,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 16,
    },
    remove: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'right',
    },
    empty: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        marginTop: 20,
    },
    backButton: {
        backgroundColor: '#C4DFE6',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
});
