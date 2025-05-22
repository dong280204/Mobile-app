import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchFilter = ({ navigation }) => {
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    const products = [
        { id: '1', name: 'Nike Air Max 270', category: 'Giày thể thao', price: '3.500.000₫', image: require('../../assets/anh0.jpg'), rating: 4, description: 'Thoải mái, thời trang, năng động.' },
        { id: '2', name: 'Adidas Ultraboost', category: 'Giày thời trang', price: '4.000.000₫', image: require('../../assets/anh1.jpg'), rating: 5, description: 'Hiệu suất cao, nhẹ nhàng và linh hoạt.' },
        { id: '3', name: 'Nike Jordan 1', price: '5.200.000₫', image: require('../../assets/anh2.jpg'), rating: 5, description: 'Biểu tượng thời trang đường phố.' },
        { id: '4', name: 'Puma RS-X', price: '2.900.000₫', image: require('../../assets/anh3.jpg'), rating: 3, description: 'Phong cách retro độc đáo.' },
        { id: '5', name: 'Nike Air Force 1', price: '3.800.000₫', image: require('../../assets/anh4.jpg'), rating: 4, description: 'Cổ điển, bền bỉ và dễ phối đồ.' },
        { id: '6', name: 'Adidas NMD', price: '4.300.000₫', image: require('../../assets/anh5.jpg'), rating: 4, description: 'Thiết kế hiện đại và năng động.' },
        { id: '7', name: 'Reebok Classic Leather', price: '2.200.000₫', image: require('../../assets/anh6.jpg'), rating: 3, description: 'Giày cổ điển cho phong cách hàng ngày.' },
        { id: '8', name: 'New Balance 990v5', category: 'Giày thời trang', price: '6.000.000₫', image: require('../../assets/anh7.jpg'), rating: 5, description: 'Chất lượng cao cấp và cực kỳ thoải mái.' },
        { id: '9', name: 'Vans Old Skool', category: 'Giày thể thao', price: '1.500.000₫', image: require('../../assets/anh8.jpg'), rating: 4, description: 'Giày skate huyền thoại.' },
        { id: '10', name: 'Converse Chuck Taylor', category: 'Giày thời trang', price: '1.200.000₫', image: require('../../assets/anh9.jpg'), rating: 4, description: 'Cổ điển, phổ biến với mọi độ tuổi.' },
        { id: '11', name: 'Nike Zoom Fly 3', price: '4.800.000₫', image: require('../../assets/anh10.jpg'), rating: 5, description: 'Tốc độ và hiệu suất dành cho chạy bộ.' },
        { id: '12', name: 'Adidas Yeezy Boost 350', category: 'Giày thể thao', price: '9.000.000₫', image: require('../../assets/anh11.jpg'), rating: 5, description: 'Phong cách độc đáo, hợp thời.' },
        { id: '13', name: 'Under Armour Curry One', price: '5.500.000₫', image: require('../../assets/anh12.jpg'), rating: 4, description: 'Giày bóng rổ hiệu suất cao.' },
        { id: '14', name: 'Nike Blazer Mid', price: '3.000.000₫', image: require('../../assets/anh13.jpg'), rating: 4, description: 'Thiết kế vintage thời trang.' },
        { id: '15', name: 'Adidas Superstar', price: '2.500.000₫', image: require('../../assets/anh14.jpg'), rating: 4, description: 'Giày biểu tượng với đầu vỏ sò.' },
        { id: '16', name: 'Reebok Nano X1', price: '4.200.000₫', image: require('../../assets/anh15.jpg'), rating: 3, description: 'Phù hợp cho tập gym và cử tạ.' },
        { id: '17', name: 'Fila Disruptor II', category: 'Giày thể thao', price: '2.700.000₫', image: require('../../assets/anh16.jpg'), rating: 3, description: 'Phong cách chunky nổi bật.' },
        { id: '18', name: 'Nike React Element 55', price: '3.600.000₫', image: require('../../assets/anh17.jpg'), rating: 4, description: 'Đệm phản hồi tốt và hiện đại.' },
        { id: '19', name: 'Adidas Stan Smith', price: '2.800.000₫', image: require('../../assets/anh18.jpg'), rating: 4, description: 'Tối giản, thanh lịch và tiện dụng.' },
        { id: '20', name: 'Saucony Triumph 18', category: 'Giày thời trang', price: '4.400.000₫', image: require('../../assets/anh19.jpg'), rating: 4, description: 'Giày chạy êm ái và ổn định.' },
    ];

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = products.filter(product =>
            product.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.item}
            onPress={() => {
                // Điều hướng đến màn hình chi tiết sản phẩm
                // Thay vì gửi productId, bạn nên gửi toàn bộ sản phẩm hoặc dữ liệu chi tiết
                navigation.navigate('ProductDetail', { product: item });
            }}
        >
            <Text>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Nút quay về trang chủ */}
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>

            <View style={styles.searchBox}>
                <Ionicons name="search-outline" size={20} color="#666" />
                <TextInput
                    style={styles.input}
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchText}
                    onChangeText={handleSearch}
                    autoFocus
                />
            </View>

            <FlatList
                data={filteredProducts}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                ListEmptyComponent={() => <Text style={styles.emptyText}>Không có sản phẩm phù hợp.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: '#fff' },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        width: 100,
        justifyContent: 'center',
    },
    backButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 6,
    },
    searchBox: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },
    input: {
        flex: 1,
        height: 40,
        marginLeft: 8,
    },
    item: {
        paddingVertical: 12,
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    emptyText: {
        marginTop: 20,
        color: '#888',
        textAlign: 'center',
    },
});

export default SearchFilter;
