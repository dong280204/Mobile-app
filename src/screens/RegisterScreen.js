import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useContext(AuthContext);

    const validateAndRegister = async () => {
        setLoading(true);

        try {
            // Validate input
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!email || !password) {
                throw new Error('Vui lòng nhập đầy đủ thông tin');
            }

            if (!emailRegex.test(email)) {
                throw new Error('Email không hợp lệ');
            }

            if (password.length < 6) {
                throw new Error('Mật khẩu phải có ít nhất 6 ký tự');
            }

            // Thực hiện đăng ký
            const success = await register(email, password);

            if (success) {
                Alert.alert('Thành công', 'Đăng ký và tự động đăng nhập thành công!', [
                    { text: 'OK', onPress: () => navigation.replace('Home') }
                ]);
            } else {
                throw new Error('Email đã được đăng ký');
            }
        } catch (error) {
            Alert.alert('Lỗi', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tạo tài khoản mới</Text>

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
                style={styles.button}
                onPress={validateAndRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Đăng ký</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={styles.link}
            >
                <Text style={styles.linkText}>
                    Đã có tài khoản? <Text style={styles.highlight}>Đăng nhập ngay</Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        height: 50,
        borderRadius: 8,
        backgroundColor: '#007bff',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    link: {
        marginTop: 20,
        alignSelf: 'center',
    },
    linkText: {
        color: '#666',
        fontSize: 14,
    },
    highlight: {
        color: '#007bff',
        fontWeight: '500',
    },
});