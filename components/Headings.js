import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';

const Headings = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>New Rivals</Text>
                <TouchableOpacity>
                    <Ionicons name='grid' size={24} color='#284444' />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Headings

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontWeight: "semibold",
        fontSize: 20,
    }
})