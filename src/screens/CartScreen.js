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
                <Text style={styles.info}>Size: {item.size} | Màu: {item.color}</Text>
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
                <Text style={styles.backButtonText}>Back</Text>
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
                <View style={styles.totalContainer}>
                    <Text style={styles.total}>Tổng: {calculateTotal()}₫</Text>

                    {/* Nút thanh toán */}
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('PaymentScreen')}  // Điều hướng đến màn hình thanh toán
                    >
                        <Text style={styles.checkoutButtonText}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
        justifyContent: 'flex-start',
        backgroundColor: '#DDDDDD',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',

    },
    item: {
        flexDirection: 'row',
        marginBottom: 20,
        padding: 10,
        backgroundColor: '#CCCCCC',
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
        backgroundColor: '#BBBBBB',
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
        backgroundColor: '#CCCC66',
        padding: 10,
        borderRadius: 8,
        marginBottom: 20,
    },
    backButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    totalContainer: {
        marginTop: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    checkoutButtonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
    },
    info: {
        fontSize: 14,
        color: '#555',
        marginVertical: 4,
    },

});
