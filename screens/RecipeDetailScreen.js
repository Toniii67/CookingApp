// import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { StatusBar } from 'expo-status-bar'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { TouchableOpacity } from 'react-native';
// import { ChevronLeftIcon, } from 'react-native-heroicons/outline';
// import { HeartIcon, Square3Stack3DIcon, UserIcon, ClockIcon } from 'react-native-heroicons/solid';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Button from '../components/Button';
// import CookingConfirmationModal from '../components/CookingConfirmationModal'

// const RecipeDetailScreen = (props) => {
//     let item = props.route.params
//     const [isFavourite, setIsFavourite] = useState(false)
//     const navigation = useNavigation()
//     const [meal, setMeal] = useState(null);
//     const [isModalVisible, setIsModalVisible] = useState(false);

//     useEffect(() => {
//         getMealData(item.idMeal)
//     }, [])

//     const getMealData = async (id) => {
//         try {
//             const response = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
//             // console.log('got meal data: ', response.data)
//             if (response && response.data) {
//                 setMeal(response.data.meals[0])
//             }
//         } catch (err) {
//             console.log('error: ', err.message)
//         }
//     }

//     const ingredientsIndexes = (meal) => {
//         if (!meal) return []
//         let indexes = []
//         for (let i = 1; i <= 20; i++) {
//             if (meal['strIngredient' + i]) {
//                 indexes.push(i);
//             }
//         }

//         return indexes;
//     }
//     const s = Dimensions.get('window').height
//     const num = item.strMeal.length + 7;
//     return (
//         <View style={{ height: s }}>


//             <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1, backgroundColor: 'white' }}>
//                 <StatusBar style={'light'} />
//                 <View style={{ flexDirection: 'row', justifyContent: "center" }}>
//                     <Image
//                         source={{ uri: item.strMealThumb }}
//                         // harus cek di hp apakah perlu borderradius atau tidak, wp = 98 / 100
//                         style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
//                     />
//                 </View>

//                 <View style={{ width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 25 }}>
//                     <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 3, borderRadius: 50, marginLeft: 20, backgroundColor: "white" }}>
//                         <View style={{ marginRight: 2 }}>
//                             <ChevronLeftIcon size={hp(3.5)} strokeWidth={3.5} color='orange' />
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={{ padding: 4, borderRadius: 50, marginRight: 20, backgroundColor: "white" }}>
//                         <HeartIcon size={hp(3.5)} strokeWidth={2.5} color={isFavourite ? "red" : "gray"} />
//                     </TouchableOpacity>
//                 </View>


//                 {
//                     <View style={{ paddingHorizontal: 4, flex: 1, justifyContent: "space-between", paddingTop: 8, paddingVertical: 4 }}>
//                         <View style={{ paddingVertical: 5, paddingLeft: 12, paddingBottom: 25 }}>
//                             <Text style={{ fontSize: hp(3), fontWeight: "bold", flex: 1, color: 'black' }}>
//                                 {meal?.strMeal}
//                             </Text>
//                             <Text style={{ fontSize: hp(2), fontWeight: "600", flex: 1, color: 'gray', paddingTop: 3 }}>
//                                 {meal?.strArea}
//                             </Text>
//                         </View>

//                         <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
//                             <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
//                                 <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                                     <ClockIcon size={hp(4)} strokeWidth={2.5} color='white' />
//                                 </View>
//                                 <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
//                                     <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}>
//                                         {num}
//                                     </Text>
//                                     <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
//                                         Mins
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
//                                 <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                                     <UserIcon size={hp(3.7)} strokeWidth={2.5} color='white' />
//                                 </View>
//                                 <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
//                                     <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}>
//                                         03
//                                     </Text>
//                                     <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
//                                         Servings
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
//                                 <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                                     <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='white' />
//                                 </View>
//                                 <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
//                                     <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}></Text>
//                                     <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
//                                         Easy
//                                     </Text>
//                                 </View>
//                             </View>
//                         </View>

//                         <View style={{ paddingTop: 20, paddingHorizontal: 9 }}>
//                             <Text style={{ fontSize: hp(2.5), fontWeight: "bold", color: 'black' }}>
//                                 Ingredients
//                             </Text>
//                             <View style={{ paddingVertical: 2, marginLeft: 5, paddingTop: 15 }}>
//                                 {
//                                     ingredientsIndexes(meal).map(i => {
//                                         return (
//                                             <View key={i} style={{ flexDirection: 'row', paddingHorizontal: 4, paddingBottom: 6, paddingTop: 6 }}>
//                                                 <View style={{ paddingRight: 7 }}>
//                                                     <View style={{ height: hp(1.5), width: hp(1.5), backgroundColor: 'orange', borderRadius: 50, }} />
//                                                 </View>
//                                                 <View style={{ marginTop: -4 }}>

//                                                     <View style={{ flexDirection: 'row' }}>
//                                                         <Text style={{ fontWeight: '600', fontSize: hp(1.7) }}>{meal['strMeasure' + i]}  </Text>
//                                                         <Text style={{ fontSize: hp(1.7) }}>{meal['strIngredient' + i]}</Text>
//                                                     </View>
//                                                 </View>
//                                             </View>
//                                         )
//                                     })
//                                 }
//                             </View>
//                         </View>

//                         <View style={{ paddingTop: 17, paddingHorizontal: 9 }}>
//                             <Text style={{ fontSize: hp(2.5), fontWeight: "bold", color: 'black', paddingBottom: 12 }}>
//                                 Instructions
//                             </Text>
//                             <Text style={{ fontSize: hp(1.6), color: 'black' }}>
//                                 {
//                                     meal?.strInstructions
//                                 }
//                             </Text>
//                         </View>
//                         <Button
//                             title="Start Cooking"
//                             filled
//                             onPress={() => setIsModalVisible(true)}
//                             style={{
//                                 marginTop: 40,
//                                 width: "90%",
//                                 marginLeft: 18,
//                                 marginBottom: 30,
//                             }}
//                         />


//                         <CookingConfirmationModal
//                             isVisible={isModalVisible}
//                             onClose={() => setIsModalVisible(false)}
//                             onConfirm={() => {
//                                 setIsModalVisible(false);
//                                 navigation.navigate('tutorCook', { meal: meal });
//                             }}
//                             cookingTime={num}
//                             recipeName={meal?.strMeal}
//                         />
//                     </View>
//                 }

//             </ScrollView>
//         </View>
//     )
// }

// export default RecipeDetailScreen

// const styles = StyleSheet.create({})


import { StyleSheet, Text, View, Image, ScrollView, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, UserIcon, ClockIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import CookingConfirmationModal from '../components/CookingConfirmationModal';
import { db } from '../App';
import { doc, getDoc } from 'firebase/firestore';

const RecipeDetailScreen = (props) => {
    let item = props.route.params;
    const [isFavourite, setIsFavourite] = useState(false);
    const navigation = useNavigation();
    const [meal, setMeal] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        getMealData(item.id);
    }, []);

    const getMealData = async (id) => {
        try {
            const mealRef = doc(db, 'meals', id);
            const mealDoc = await getDoc(mealRef);
            
            if (mealDoc.exists()) {
                const mealData = mealDoc.data();
                // Mengkonversi data Firebase ke format yang sesuai dengan UI
                const formattedMeal = {
                    ...mealData,
                    idMeal: mealDoc.id,
                    strMeal: mealData.strMeal,
                    strMealThumb: mealData.strMealThumb,
                    strArea: mealData.strArea,
                    strInstructions: mealData.strInstructions,
                };

                // Menambahkan ingredients dan measures jika ada
                if (mealData.ingredients) {
                    mealData.ingredients.forEach((ing, index) => {
                        formattedMeal[`strIngredient${index + 1}`] = ing.name;
                        formattedMeal[`strMeasure${index + 1}`] = ing.measure;
                    });
                }

                setMeal(formattedMeal);
            } else {
                console.log('No meal found with this ID');
            }
        } catch (err) {
            console.log('Error fetching meal:', err.message);
        }
    };

    const ingredientsIndexes = (meal) => {
        if (!meal?.ingredients) return [];
        return meal.ingredients.map((_, index) => index + 1);
    };

    const formatInstructions = (text) => {
        return text
            .replace(/\\t/g, '\t')  // Konversi \t menjadi tab
            .replace(/\\n/g, '\n')  // Konversi \n menjadi new line
            .replace(/\\r/g, '');   // Hapus \r jika ada
    }

    const s = Dimensions.get('window').height+40;
    const num = item.strMeal.length + 7;

    return (
        <View style={{ height: s, paddingTop: 40 }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{ flexGrow: 1, backgroundColor: 'white' }}>
                <StatusBar style={'light'} />
                <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                    <Image
                        source={{ uri: item.strMealThumb }}
                        style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }}
                    />
                </View>

                {/* Header buttons */}
                <View style={{ width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 25 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 3, borderRadius: 50, marginLeft: 20, backgroundColor: "white" }}>
                        <View style={{ marginRight: 2 }}>
                            <ChevronLeftIcon size={hp(3.5)} strokeWidth={3.5} color='orange' />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={{ padding: 4, borderRadius: 50, marginRight: 20, backgroundColor: "white" }}>
                        <HeartIcon size={hp(3.5)} strokeWidth={2.5} color={isFavourite ? "red" : "gray"} />
                    </TouchableOpacity>
                </View>

                {/* Recipe Details */}
                {meal && (
                    <View style={{ paddingHorizontal: 4, flex: 1, justifyContent: "space-between", paddingTop: 8, paddingVertical: 4 }}>
                        {/* Title and Area */}
                        <View style={{ paddingVertical: 5, paddingLeft: 12, paddingBottom: 25 }}>
                            <Text style={{ fontSize: hp(3), fontWeight: "bold", flex: 1, color: 'black' }}>
                                {meal.strMeal}
                            </Text>
                            <Text style={{ fontSize: hp(2), fontWeight: "600", flex: 1, color: 'gray', paddingTop: 3 }}>
                                {meal.strArea}
                            </Text>
                        </View>

                        {/* Stats */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            {/* Time */}
                            <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
                                <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color='white' />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}>
                                        {num}
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
                                        Mins
                                    </Text>
                                </View>
                            </View>

                            {/* Servings */}
                            <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
                                <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <UserIcon size={hp(3.7)} strokeWidth={2.5} color='white' />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}>
                                        {meal.servings || '03'}
                                    </Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
                                        Servings
                                    </Text>
                                </View>
                            </View>

                            {/* Difficulty */}
                            <View style={{ display: 'flex', borderRadius: 50, backgroundColor: 'orange', padding: 8 }}>
                                <View style={{ height: hp(7.5), width: hp(5.5), backgroundColor: 'orange', borderRadius: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color='white' />
                                </View>
                                <View style={{ display: 'flex', alignItems: 'center', paddingVertical: 2 }}>
                                    <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: 'black' }}></Text>
                                    <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: 'black' }}>
                                        {meal.difficulty || 'Easy'}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Ingredients */}
                        <View style={{ paddingTop: 20, paddingHorizontal: 9 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: "bold", color: 'black' }}>
                                Ingredients
                            </Text>
                            <View style={{ paddingVertical: 2, marginLeft: 5, paddingTop: 15 }}>
                                {meal.ingredients && meal.ingredients.map((ingredient, index) => (
                                    <View key={index} style={{ flexDirection: 'row', paddingHorizontal: 4, paddingBottom: 6, paddingTop: 6 }}>
                                        <View style={{ paddingRight: 7 }}>
                                            <View style={{ height: hp(1.5), width: hp(1.5), backgroundColor: 'orange', borderRadius: 50, }} />
                                        </View>
                                        <View style={{ marginTop: -4 }}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ fontWeight: '600', fontSize: hp(1.7) }}>{ingredient.measure}  </Text>
                                                <Text style={{ fontSize: hp(1.7) }}>{ingredient.name}</Text>
                                            </View>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* Instructions */}
                        <View style={{ paddingTop: 17, paddingHorizontal: 9 }}>
                            <Text style={{ fontSize: hp(2.5), fontWeight: "bold", color: 'black', paddingBottom: 12 }}>
                                Instructions
                            </Text>
                            <Text style={{ fontSize: hp(1.6), color: 'black' }}>
                                {/* {meal.strInstructions} */}
                                {formatInstructions(meal.strInstructions)}
                            </Text>
                        </View>

                        {/* Start Cooking Button */}
                        <Button
                            title="Start Cooking"
                            filled
                            onPress={() => setIsModalVisible(true)}
                            style={{
                                marginTop: 40,
                                width: "90%",
                                marginLeft: 18,
                                marginBottom: 30,
                            }}
                        />

                        {/* Cooking Modal */}
                        <CookingConfirmationModal
                            isVisible={isModalVisible}
                            onClose={() => setIsModalVisible(false)}
                            onConfirm={() => {
                                setIsModalVisible(false);

                                // updateCookingStatus(meal.idMeal, "In Progress");

                                navigation.navigate('tutorCook', { meal: meal });
                            }}
                            cookingTime={num}
                            recipeName={meal.strMeal}
                        />
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default RecipeDetailScreen;