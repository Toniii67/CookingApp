// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const settingsScreen = () => {
//     return (
//         <View>
//             <Text>settingsScreen</Text>
//         </View>
//     )
// }

// export default settingsScreen

// const styles = StyleSheet.create({})




import { StyleSheet, Text, View, Alert } from 'react-native'
import React from 'react'
import { getAuth, signOut } from "firebase/auth";
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constant/color';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = () => {
    const auth = getAuth();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('userSession');
            await signOut(auth);
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            Alert.alert('Error', 'An error occurred while logging out. Please try again.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Account Settings</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Notifications</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Privacy</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>Help & Support</Text>
                </View>
                <View style={styles.menuItem}>
                    <Text style={styles.menuText}>About App</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <Button
                    title="Logout"
                    onPress={handleLogout}
                    style={styles.logoutButton}
                    filled
                    titleStyle={styles.logoutText}
                />
            </View>
        </SafeAreaView>
    )
}

export default SettingsScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCFCFC',
    },
    header: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.black
    },
    content: {
        flex: 1,
        padding: 20
    },
    menuItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5'
    },
    menuText: {
        fontSize: 16,
        color: COLORS.black
    },
    footer: {
        padding: 20
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        marginBottom: 20
    },
    logoutText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
})