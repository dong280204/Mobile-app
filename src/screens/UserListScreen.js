import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { Ionicons } from '@expo/vector-icons';

export default function UserListScreen({ navigation }) {
    const { users, deleteUser } = useUser();

    const handleDelete = (email) => {
        Alert.alert(
            'Xác nhận',
            `Bạn có chắc muốn xóa tài khoản ${email} không?`,
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', style: 'destructive', onPress: () => deleteUser(email) }
            ]
        );
    };

    const renderUserCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.rowBetween}>
                <Ionicons name="person-circle" size={48} color="#3f51b5" />
                <TouchableOpacity onPress={() => handleDelete(item.email)}>
                    <Ionicons name="trash" size={24} color="#e53935" />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>Cao Ngọc Đồng</Text>
            <Text style={styles.email}>{item.email}</Text>
            <View style={styles.infoBlock}>
                <Text style={styles.label}>Mật khẩu:</Text>
                <Text style={styles.value}>{item.password.replace(/./g, '*')}</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.label}>SĐT:</Text>
                <Text style={styles.value}>0909 123 456</Text>
            </View>
            <View style={styles.infoBlock}>
                <Text style={styles.label}>Địa chỉ:</Text>
                <Text style={styles.value}>235 Hoàng Quốc Việt, Cầu giấy, Hà Nội</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thông Tin Tài Khoản</Text>
            <FlatList
                data={users}
                renderItem={renderUserCard}
                keyExtractor={(item, index) => index.toString()}
                ListEmptyComponent={<Text style={styles.emptyText}>Chưa có tài khoản nào đăng ký.</Text>}
                contentContainerStyle={{ flexGrow: 1, justifyContent: users.length === 0 ? 'center' : 'flex-start' }}
            />
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back" size={20} color="#fff" />
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f6fd',
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#1a237e',
        marginBottom: 20,
        alignSelf: 'center',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: '#3f51b5',
        marginBottom: 4,
    },
    email: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    infoBlock: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    label: {
        fontWeight: '600',
        color: '#1a237e',
        width: 90,
    },
    value: {
        color: '#333',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3f51b5',
        paddingVertical: 12,
        borderRadius: 12,
        marginBottom: 25,
    },
    backButtonText: {
        color: '#fff',
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        color: '#777',
        fontSize: 16,
    },
});
