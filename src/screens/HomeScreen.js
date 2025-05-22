import React from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const { width } = Dimensions.get('window');

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

const shortcuts = [
    { name: 'Lịch sử mua hàng', icon: 'receipt-outline', screen: 'HistoryScreen' },
    { name: 'Yêu thích', icon: 'heart-outline', screen: 'Favorites' },
    { name: 'Tìm kiếm & Lọc', icon: 'search-outline', screen: 'SearchFilter' },
    { name: 'Thông báo', icon: 'notifications-outline', screen: 'NotificationScreen' },
    { name: 'Giỏ hàng', icon: 'cart-outline', screen: 'Cart' },
    { name: 'Tài khoản', icon: 'person-outline', screen: 'UserList' },
];

export default function HomeScreen({ navigation }) {
    const handleLogout = () => {
        // Chuyển về màn hình Login và không cho quay lại Home
        navigation.replace('Login');
    };

    const renderShortcut = ({ name, icon, screen }) => (
        <TouchableOpacity
            key={name}
            style={styles.shortcut}
            activeOpacity={0.7}
            onPress={() => navigation.navigate(screen)}
        >
            <View style={styles.shortcutIconWrapper}>
                <Ionicons name={icon} size={28} color="#fff" />
            </View>
            <Text style={styles.shortcutText} numberOfLines={1}>
                {name}
            </Text>
        </TouchableOpacity>
    );

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating - fullStars >= 0.5;
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars.push(<Ionicons key={i} name="star" size={14} color="#FF6600" style={{ marginRight: 2 }} />);
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars.push(<Ionicons key={i} name="star-half" size={14} color="#FF6600" style={{ marginRight: 2 }} />);
            } else {
                stars.push(<Ionicons key={i} name="star-outline" size={14} color="#FF6600" style={{ marginRight: 2 }} />);
            }
        }
        return <View style={{ flexDirection: 'row', alignItems: 'center' }}>{stars}</View>;
    };

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('ProductDetail', { product: item })}
        >
            <Image source={item.image} style={styles.productImage} resizeMode="contain" />
            <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>

            {/* Thêm phần đánh giá chi tiết ở đây */}
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                {renderStars(item.rating)}
                <Text style={{ marginLeft: 6, fontSize: 13, color: '#444', fontWeight: '600' }}>
                    {item.rating.toFixed(1)}
                </Text>
                <Text style={{ marginLeft: 8, fontSize: 12, color: '#888' }}>
                    ({item.reviewsCount || 120} đánh giá)
                </Text>

            </View>

            <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
    );


    return (
        <View style={{ flex: 1, backgroundColor: '#CCFFFF' }}>
            {/* Nút Đăng xuất ở góc trên phải */}
            <TouchableOpacity
                style={styles.logoutButtonAbsolute}
                onPress={handleLogout}
                activeOpacity={0.7}
            >
                <Ionicons name="log-out-outline" size={28} color="#ff5722" />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <Text style={styles.sectionTitle}>TRANG CHỦ</Text>
                <View style={styles.shortcutsContainer}>
                    {shortcuts.map(renderShortcut)}
                </View>

                <Text style={styles.sectionTitle}>Sản phẩm nổi bật</Text>
                <FlatList
                    data={products}
                    keyExtractor={(item) => item.id}
                    renderItem={renderProduct}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.productsList}
                />

                {/* Footer thông tin người dùng */}
                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>Thông tin liên hệ</Text>
                    <View style={styles.infoRow}>
                        <Ionicons name="mail-outline" size={20} color="#ff5722" style={styles.infoIcon} />
                        <Text style={styles.infoText}>caongocdong@gmail.com</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="call-outline" size={20} color="#ff5722" style={styles.infoIcon} />
                        <Text style={styles.infoText}>+84 123 456 789</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Ionicons name="location-outline" size={20} color="#ff5722" style={styles.infoIcon} />
                        <Text style={styles.infoText}>235 Đường Hoàng Quốc Việt, Cầu giấy,Hà Nội</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const shortcutSize = (width - 48) / 3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CCFFFF',
        paddingHorizontal: 16,
        paddingTop: 52,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
        color: '#FF9900',
    },
    shortcutsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 28,
    },
    shortcut: {
        width: shortcutSize,
        alignItems: 'center',
        marginBottom: 20,
    },
    shortcutIconWrapper: {
        backgroundColor: '#ff5722',
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#ff5722',
        shadowOpacity: 0.6,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 6 },
        elevation: 8,
    },
    shortcutText: {
        marginTop: 8,
        fontSize: 13,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        maxWidth: shortcutSize,
    },

    productsList: {
        paddingVertical: 4,
    },
    productCard: {
        width: 160,
        backgroundColor: '#DDDDDD',
        borderRadius: 8,
        marginRight: 16,
        padding: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 6,
    },
    productImage: {
        width: '100%',
        height: 140,
        borderRadius: 8,
    },
    productName: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
    },
    productPrice: {
        marginTop: 6,
        fontSize: 16,
        fontWeight: '700',
        color: '#ff5722',
    },

    footer: {
        marginTop: 36,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 16,
        paddingHorizontal: 8,
    },
    footerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#ff5722',
        marginBottom: 12,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoIcon: {
        marginRight: 10,
    },
    infoText: {
        fontSize: 15,
        color: '#555',
        flexShrink: 1,
    },
    logoutButtonAbsolute: {
        position: 'absolute',
        top: 40, // cách trên màn hình 40
        right: 16, // cách phải màn hình 16
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: '#ffe6e1',
        zIndex: 10,
        elevation: 10,
        shadowColor: '#ff5722',
        shadowOpacity: 0.3,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },

    logoutText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '600',
        color: '#ff5722',
    },

});