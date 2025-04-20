import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = [
    { id: '1', name: 'Nike Air Max 270', price: '3.500.000₫', image: require('../../assets/anh0.jpg') },
    { id: '2', name: 'Adidas Ultraboost', price: '4.000.000₫', image: require('../../assets/anh1.jpg') },
    { id: '3', name: 'Nike Jordan 1', price: '5.200.000₫', image: require('../../assets/anh2.jpg') },
    { id: '4', name: 'Puma RS-X', price: '2.900.000₫', image: require('../../assets/anh3.jpg') },
    { id: '5', name: 'Nike Air Force 1', price: '3.800.000₫', image: require('../../assets/anh4.jpg') },
    { id: '6', name: 'Adidas NMD', price: '4.300.000₫', image: require('../../assets/anh5.jpg') },
    { id: '7', name: 'Reebok Classic Leather', price: '2.200.000₫', image: require('../../assets/anh6.jpg') },
    { id: '8', name: 'New Balance 990v5', price: '6.000.000₫', image: require('../../assets/anh7.jpg') },
    { id: '9', name: 'Vans Old Skool', price: '1.500.000₫', image: require('../../assets/anh8.jpg') },
    { id: '10', name: 'Converse Chuck Taylor', price: '1.200.000₫', image: require('../../assets/anh9.jpg') },
    { id: '11', name: 'Nike Zoom Fly 3', price: '4.800.000₫', image: require('../../assets/anh10.jpg') },
    { id: '12', name: 'Adidas Yeezy Boost 350', price: '9.000.000₫', image: require('../../assets/anh11.jpg') },
    { id: '13', name: 'Under Armour Curry One', price: '5.500.000₫', image: require('../../assets/anh12.jpg') },
    { id: '14', name: 'Nike Blazer Mid', price: '3.000.000₫', image: require('../../assets/anh13.jpg') },
    { id: '15', name: 'Adidas Superstar', price: '2.500.000₫', image: require('../../assets/anh14.jpg') },
    { id: '16', name: 'Reebok Nano X1', price: '4.200.000₫', image: require('../../assets/anh15.jpg') },
    { id: '17', name: 'Fila Disruptor II', price: '2.700.000₫', image: require('../../assets/anh16.jpg') },
    { id: '18', name: 'Nike React Element 55', price: '3.600.000₫', image: require('../../assets/anh17.jpg') },
    { id: '19', name: 'Adidas Stan Smith', price: '2.800.000₫', image: require('../../assets/anh18.jpg') },
    { id: '20', name: 'Saucony Triumph 18', price: '4.400.000₫', image: require('../../assets/anh19.jpg') },
];

export default function HomeScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const { addToCart, cartItems } = useContext(CartContext);

    const filteredProducts = products.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleLogout = async () => {
        await AsyncStorage.removeItem('isLoggedIn');
        navigation.replace('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sản phẩm nổi bật</Text>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChangeText={setSearchText}
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.productCard}
                        onPress={() => navigation.navigate('ProductDetail', { product: item })}
                    >
                        <Image source={item.image} style={styles.productImage} />
                        <Text style={styles.productName}>{item.name}</Text>
                        <Text style={styles.productPrice}>Giá: {item.price}</Text>
                        <TouchableOpacity
                            style={styles.addToCartButton}
                            onPress={() => addToCart(item)}
                        >
                            <Icon name="shopping-cart" size={24} color="#fff" />
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
            />

            {/* Thêm biểu tượng giỏ hàng trong header */}
            <TouchableOpacity
                style={styles.cartButton}
                onPress={() => navigation.navigate('Cart')}
            >
                <Icon name="shopping-cart" size={30} color="#fff" />
                {cartItems.length > 0 && (
                    <View style={styles.cartBadge}>
                        <Text style={styles.cartBadgeText}>{cartItems.length}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#90AFC5',
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    searchContainer: {
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        width: '85%',
        fontSize: 16,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    productCard: {
        backgroundColor: '#C4DFE6',
        borderRadius: 12,
        padding: 12,
        width: '48%',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 6,
    },
    productPrice: {
        fontSize: 14,
        color: '#555',
        marginTop: 4,
    },
    addToCartButton: {
        backgroundColor: '#ff6347',
        padding: 8,
        borderRadius: 50,
        marginTop: 10,
    },
    logoutButton: {
        position: 'absolute',
        top: 40,
        right: 16,
        backgroundColor: '#999999',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    logoutText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cartButton: {
        position: 'absolute',
        top: 90,
        right: 16,
        backgroundColor: '#ff6347',
        padding: 10,
        borderRadius: 50,
    },
    cartBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    cartBadgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});
