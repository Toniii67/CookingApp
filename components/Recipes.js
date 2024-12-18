import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated'
import { mealData } from '../constant/index';
import { useNavigation } from '@react-navigation/native';
import { useCookingStatus } from '../components/CookingContext';

const Recipes = ({ categories, meals, activeCategory }) => {
    const navigation = useNavigation()

    return (
        <View style={{ marginHorizontal: 4 }}>
            <Text style={{ fontSize: hp(3), fontWeight: "600", color: "black", marginBottom: 10 }}>Recipes</Text>
            <View>
                {
                    categories.length == 0 || meals.length == 0 ? null : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item) => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} category={activeCategory} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }
            </View>
        </View>
    )
}

export default Recipes

const styles = StyleSheet.create({})

const RecipeCard = ({ item, index, navigation, category }) => {
    let isEven = index % 2 == 0
    const { cookingStatuses } = useCookingStatus();
    const cookingStatus = cookingStatuses[item.idMeal] || "Not Started";
    const statusColors = {
        "Not Started": "gray",
        "In Progress": "#FFA500",
        "Completed": "#4CAF50"
    };
    const num = item.strMeal.length + 7;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable
                style={{ width: '100%', flex: 1, justifyContent: "center", marginBottom: 22, paddingVertical: 1, paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                onPress={() => navigation.navigate('recipeDetail', { ...item })}
            >
                <Image
                    source={{ uri: item.strMealThumb }}
                    style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), backgroundColor: 'black', borderRadius: 35 }}
                />

                <Text style={{ fontSize: hp(1.5), fontWeight: 600, marginLeft: 2, color: "black",paddingTop: 3 }}>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
                <Text style={{ fontSize: hp(1.5), fontWeight: "600", marginLeft: 2, color: "gray" }}>
                    {category}
                </Text>
                <Text style={{ fontSize: hp(1.5), fontWeight: "600", marginLeft: 2, color: "gray" }}>
                    {num} Mins
                </Text>
                <Text style={{ fontSize: hp(1.5), fontWeight: "600", marginLeft: 2, color: statusColors[cookingStatus] }}>
                    {cookingStatus}
                </Text>
            </Pressable>
        </Animated.View>
    )
}