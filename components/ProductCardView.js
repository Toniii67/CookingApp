import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native'; // Tambahkan Text di sini
import React from 'react';
import {Ionicons} from '@expo/vector-icons';

const ProductCardView = () => {
    return (
        <TouchableOpacity onPress={() => { }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../assets/produk2.jpg')}
                            style={styles.image}
                        />
                    </View>

                    <View style={styles.details}>
                        <Text style={styles.title} numberOfLines={1}>Product</Text>
                        <Text style={styles.supplier} numberOfLines={1}>Product</Text>
                        <Text style={styles.price}>$245</Text>
                    </View>
                    <TouchableOpacity style={styles.addBtn}>
                        <Ionicons name="add-circle" size={30} color="#284444" />
                    </TouchableOpacity>
                </View>
            
        </TouchableOpacity>
    );
}

export default ProductCardView;

const styles = StyleSheet.create({
    container: {
        width: 182,
        height: 240,
        // marginEnd: 22,
        marginStart: 22,
        borderRadius: 10,
        backgroundColor: '#e0ecfc',
    },
    imageContainer: {
        flex: 1,
        width: 170,
        marginLeft: 10,
        marginTop: 10,
        paddingRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        aspectRatio: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
    },
    details: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    supplier: {
        fontSize: 10,
        color: '#8290a2',
    },
    price: {
        fontWeight: 'bold',
        fontSize: 14
    },
    addBtn: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    }
});
