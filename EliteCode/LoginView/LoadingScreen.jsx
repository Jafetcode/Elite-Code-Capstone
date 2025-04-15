import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function LoadingScreen() {
    const navigation = useNavigation();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: 'FirstScreen' }],
            });
        }, 2000);  // 2 second splash screen

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/FinalLogo2.png')}
                style={{ width: 300, height: 150, marginBottom: 20 }}
            />
            <ActivityIndicator size="large" color="white" />
            <View style={styles.footerContainer}>
                <Text style={styles.footerLine1}>Stay curious. Stay coding.</Text>
                <Text style={styles.footerLine2}>EliteCode © 2025 — Red Panda Studios</Text>
            </View>
        </View>
    );
}

export default LoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2C496B',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerContainer: {
        position: 'absolute',
        bottom: 20,
        alignItems: 'center',
    },
    footerLine1: {
        color: '#A9B7C6',
        fontSize: 12,
        marginBottom: 2,
    },
    footerLine2: {
        color: '#A9B7C6',
        fontSize: 12,
        opacity: 0.7,
    },
});
