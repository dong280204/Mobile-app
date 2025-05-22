import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        if (!size || !color) {
            Alert.alert('Thông báo', 'Vui lòng chọn kích thước và màu sắc');
        } else {
            addToCart({
                ...product,
                size: size,
                color: color,
                quantity: 1,
            });

            Alert.alert('Thông báo', 'Sản phẩm đã được thêm vào giỏ hàng');
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Quay lại trang trước đó (trang chủ)
        // Hoặc bạn có thể dùng navigation.navigate('Home') để quay lại trang chủ nếu không phải trang trước
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={product.image}
                    style={styles.productImage}
                />
            </View>
            <View style={styles.detailsContainer}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>

                {/* Mô tả sản phẩm */}
                <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionTitle}>Mô tả sản phẩm</Text>
                    <Text style={styles.productDescription}>{product.description}</Text>
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Chọn kích thước</Text>
                    <View style={styles.sizeOptions}>
                        {['39', '40', '41', '42', '43'].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.sizeOption,
                                    size === item && styles.selectedSizeOption,
                                ]}
                                onPress={() => setSize(item)}
                            >
                                <Text style={styles.sizeOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.selectionContainer}>
                    <Text style={styles.selectionTitle}>Chọn màu sắc</Text>
                    <View style={styles.colorOptions}>
                        {['Đen', 'Trắng', 'Xanh', 'Đỏ'].map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.colorOption,
                                    color === item && styles.selectedColorOption,
                                ]}
                                onPress={() => setColor(item)}
                            >
                                <Text style={styles.colorOptionText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                    <Icon name="shopping-cart" size={24} color="#fff" />
                    <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>

                {/* Nút quay lại trang chủ */}
                <TouchableOpacity style={styles.goBackButton} onPress={handleGoBack}>
                    <Icon name="arrow-left" size={24} color="#fff" />
                    <Text style={styles.goBackText}>Quay lại trang chủ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDDDDD',
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    productImage: {
        width: 300,
        height: 300,
        borderRadius: 12,
    },
    detailsContainer: {
        padding: 20,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        color: '#e74c3c',
        marginBottom: 20,
    },
    descriptionContainer: {
        marginBottom: 20,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 16,
        color: '#555',
        lineHeight: 22,
    },
    selectionContainer: {
        marginBottom: 20,
    },
    selectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sizeOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sizeOption: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '18%',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedSizeOption: {
        backgroundColor: '#3498db',
        borderColor: '#3498db',
    },
    sizeOptionText: {
        color: '#333',
        fontSize: 16,
    },
    colorOptions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    colorOption: {
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        width: '22%',
        alignItems: 'center',
        marginBottom: 10,
    },
    selectedColorOption: {
        backgroundColor: '#e74c3c',
        borderColor: '#e74c3c',
    },
    colorOptionText: {
        color: '#333',
        fontSize: 16,
    },
    addToCartButton: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
    goBackButton: {
        flexDirection: 'row',
        backgroundColor: '#95a5a6',
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    goBackText: {
        color: '#fff',
        fontSize: 18,
        marginLeft: 10,
    },
});
