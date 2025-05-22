// src/screens/PaymentScreen.js
import React, { useContext, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

export default function PaymentScreen({ navigation }) {
    const { cartItems, addOrderToHistory, clearCart } = useContext(CartContext);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');

    const calculateTotal = () => {
        return cartItems.reduce((total, item) =>
            total + parseInt(item.price.replace('₫', '').replace(/\./g, '')) * item.quantity, 0);
    };

    const formatCurrency = (number) => {
        return number.toLocaleString('vi-VN');
    };

    const handlePayment = () => {
        if (!name || !phone || !email || !address || !creditCard || !expiryDate || !cvv) {
            Alert.alert('Lỗi', 'Vui lòng nhập đủ thông tin thanh toán.');
            return;
        }

        // Ghi nhận đơn hàng
        addOrderToHistory(cartItems);
        clearCart();

        Alert.alert('Thành công', 'Thanh toán thành công! Cảm ơn bạn đã mua hàng.');
        navigation.navigate('HistoryScreen');
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.name} x {item.quantity}</Text>
            <Text style={styles.cartItemText}>{item.price}</Text>
        </View>
    );

    return (
        <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            ListHeaderComponent={
                <>
                    <Text style={styles.title}>Thông tin thanh toán</Text>

                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>

                    <TextInput style={styles.input} placeholder="Họ tên người nhận" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Số điện thoại" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
                    <TextInput style={styles.input} placeholder="Địa chỉ giao hàng" value={address} onChangeText={setAddress} />
                    <TextInput style={styles.input} placeholder="Số thẻ tín dụng" value={creditCard} onChangeText={setCreditCard} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="Ngày hết hạn (MM/YY)" value={expiryDate} onChangeText={setExpiryDate} keyboardType="numeric" />
                    <TextInput style={styles.input} placeholder="CVV" value={cvv} onChangeText={setCvv} keyboardType="numeric" />

                    <Text style={styles.subTitle}>Chi tiết giỏ hàng</Text>
                </>
            }
            ListFooterComponent={
                <>
                    <Text style={styles.total}>Tổng cộng: {formatCurrency(calculateTotal())}₫</Text>
                    <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                        <Text style={styles.payButtonText}>Xác nhận thanh toán</Text>
                    </TouchableOpacity>
                </>
            }
            contentContainerStyle={styles.container}
        />
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', paddingTop: 60 },
    subTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cartItemText: { fontSize: 16 },
    total: { fontSize: 18, fontWeight: 'bold', marginTop: 20, textAlign: 'right' },
    payButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 30,
    },
    payButtonText: { fontSize: 18, color: '#fff', textAlign: 'center' },
    backButton: {
        backgroundColor: '#C4DFE6',
        padding: 10,
        borderRadius: 8,
        marginBottom: 60,
    },
    backButtonText: { fontSize: 16, color: '#333', textAlign: 'center' },
});
