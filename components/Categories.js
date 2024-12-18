import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React from 'react'
import { categoryData } from '../constant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated'

const Categories = ({categories, activeCategory, handleChangeCategory}) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                // style={{marginHorizontal: 4}}
                contentContainerStyle={{paddingVertical: 15}}
            >
                {
                    categories.map((cat, index) => {
                        let isActive = cat.strCategory == activeCategory;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleChangeCategory(cat.strCategory)}
                                style={{flex: 1, alignItems: "center", marginVertical: 1}}
                            >
                                <View style={{borderRadius: 50, marginEnd: 15, padding: 6, backgroundColor: isActive ? "orange" : "rgba(0, 0, 0, 0.1)"}}>
                                    <Image 
                                        source={{uri: cat.strCategoryThumb}}
                                        style={{width: hp(6), height: hp(6), borderRadius: 50}}
                                    />
                                </View>
                                <Text style={{color:"gray", fontSize: hp(1.6), marginEnd: 17}}>
                                    {cat.strCategory}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </Animated.View>
    )
}

export default Categories

const styles = StyleSheet.create({})