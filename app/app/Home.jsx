// Importaciones necesarias
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import session from '../logic/session';
import checkUser from '../logic/checkUser';

export default function Home() {

    const [userName, setUserName] = useState('')
    const [message, setMessage] = useState('')


    useEffect(() => {
        const fetchUserName = async () => {
            try {
                const name = await checkUser(session.sessionUserId);
                setUserName(name);
            } catch (error) {
                setMessage(error.message);
            }
        };

        fetchUserName();
    }, []);

    return (
        <View style={styles.container}>
            {userName ? (
                <Text style={styles.welcomeText}>Welcome Home, {userName}</Text>
            ) : (
                <Text style={styles.welcomeText}>Loading...</Text>
            )}
            {message && <Text style={styles.errorText}>{message}</Text>}
        </View>
    );
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        marginTop: 10,
    },
});

