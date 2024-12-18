import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constant/color';
import { TextInput } from 'react-native-gesture-handler';
import Categories from '../components/Categories';
import { Fontisto, Ionicons } from '@expo/vector-icons';
import axios from 'axios'
import Recipes from '../components/Recipes';

const homeScreen = () => {
    const [activeCategory, setActiveCategory] = useState("Beef")
    const [categories, setCategories] = useState([]);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        getCategories();
        getRecipes();
    }, []);

    const handleChangeCategory = category => {
        getRecipes(category)
        setActiveCategory(category)
        setMeals([])
    }

    const getCategories = async () => {
        try {
            const response = await axios.get('https://themealdb.com/api/json/v1/1/categories.php');
            // console.log('got categories: ', response.data)
            if (response && response.data) {
                setCategories(response.data.categories)
            }
        } catch (err) {
            console.log('error: ', err.message)
        }
    }

    const getRecipes = async (category = "Beef") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            // console.log('got recipe: ', response.data)
            if (response && response.data) {
                setMeals(response.data.meals)
            }
        } catch (err) {
            console.log('error: ', err.message)
        }
    }
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
        >
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ marginHorizontal: 22, marginTop: 25, paddingBottom: 25 }}>
                    <StatusBar style='dark' />

                    <View style={{ marginHorizontal: 4, flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                        <Image source={require('../assets/avatar.png')} style={{ height: hp(4.5), width: hp(4.5) }} />
                        <BellIcon size={hp(3.5)} color="gray" />
                    </View>

                    <View style={{ marginVertical: 4, marginBottom: 18 }}>
                        <Text style={{ fontSize: hp(1.7), color: COLORS.grey }}>Hello, Franco!</Text>
                        <View>
                            <Text style={{ fontSize: hp(3.8), fontWeight: "600" }}>Make your own food,</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: hp(3.8), fontWeight: "600" }}>stay at <Text style={{ color: "orange" }}>home</Text></Text>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", alignItems: "center", borderRadius: 50, backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: 6, marginBottom: 4 }}>
                        <TextInput
                            placeholder='Search any recipe'
                            placeholderTextColor={"gray"}
                            style={{ fontSize: hp(1.7), flex: 1, marginBottom: 1, marginLeft: 10, letterSpacing: 1 }}
                        />
                        <View style={{ backgroundColor: "white", borderRadius: 50, padding: 10 }}>
                            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
                        </View>
                    </View>

                    {/* category */}

                    <View>
                        {categories.length > 0 && <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
                    </View>

                    {/* recipe */}
                    <View>
                        <Recipes meals={meals} categories={categories} activeCategory={activeCategory} />
                    </View>

                </View>
            </View>
        </ScrollView>
    )
}

export default homeScreen

const styles = StyleSheet.create({})