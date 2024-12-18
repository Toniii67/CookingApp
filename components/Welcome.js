import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import COLORS from '../constant/color';
import { Feather } from 'react-native-vector-icons';
import { Ionicons } from 'react-native-vector-icons';


const Welcome = () => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={[styles.welcomeTxt, { color: COLORS.black, marginTop: 10 }]}>
                    {" "}
                    Find The Most
                </Text>
                <Text style={[styles.welcomeTxt, { color: "#284444", marginTop: 0}]}>
                    {" "}
                    Luxurious Furniture
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TouchableOpacity>
                    <Feather name="search" size={24} color={COLORS.black} style={styles.searchIcon}/>
                </TouchableOpacity>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value=""
                        onPressIn={() => {}}
                        placeholder="What are you looking for?"
                    />
                </View>
                <View>
                    <TouchableOpacity style={styles.cameraBtn}>
                        <Ionicons name="camera-outline" size={24} color={COLORS.white}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    welcomeTxt: {
        fontWeight: "bold",
        fontSize: 38,
        marginHorizontal: 12
    },
    searchContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#e0ecfc",
        borderRadius: 30,
        marginVertical: 15,
        height: 50,
        marginHorizontal: 15,
    },
    searchIcon: {
        marginHorizontal: 10,
        color: COLORS.black,
        marginTop: 11,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: "#e0ecfc",
        marginRight: 10,
        marginLeft: 10,
        borderRadius: 30,
    },
    searchInput: {
        fontWeight: "regular",
        width: "100%",
        height: "100%",
    },
    cameraBtn: {
        width: 50,
        height: "100%",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#284444",
    }
})
