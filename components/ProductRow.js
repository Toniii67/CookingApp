import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import ProductCardView from './ProductCardView';

const ProductRow = () => {
    const products = [1,2,3,4,5,6];
    return (
        <View style={{marginTop: 20}}>
            <FlatList 
                data={products}
                renderItem={({item}) => (<ProductCardView />)}
                // horizontal
                contentContainerStyle={{columnGap: 20}}
            />
        </View>
    )
}

export default ProductRow

const styles = StyleSheet.create({})