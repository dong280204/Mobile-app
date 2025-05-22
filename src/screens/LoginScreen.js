import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        setLoading(true);

        try {
            // Basic validation
            if (!email.trim() || !password.trim()) {
                throw new Error('Vui lòng nhập đầy đủ thông tin');
            }

            // Email format validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email.trim())) {
                throw new Error('Định dạng email không hợp lệ');
            }

            // Password length check
            if (password.length < 6) {
                throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
            }

            // Attempt login
            const success = await login(email.trim().toLowerCase(), password.trim());

            if (success) {
                // Successful login handling
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }], // Thay bằng tên màn hình chính
                });
            } else {
                throw new Error('Thông tin đăng nhập không chính xác');
            }
        } catch (error) {
            Alert.alert('Lỗi đăng nhập', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Chào mừng trở lại!</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholderTextColor="#999"
            />

            <TextInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                placeholderTextColor="#999"
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.disabledButton]}
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Đăng nhập</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.linkContainer}
            >
                <Text style={styles.linkText}>
                    Chưa có tài khoản? <Text style={styles.highlight}>Tạo tài khoản mới</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#66CCFF',
    },
    header: {
        fontSize: 28,
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        borderRadius: 8,
        backgroundColor: '#3498db',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#bdc3c7',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    linkContainer: {
        marginTop: 25,
        alignSelf: 'center',
    },
    linkText: {
        color: '#7f8c8d',
        fontSize: 14,
    },
    highlight: {
        color: '#3300FF',
        fontWeight: '500',
    },
});