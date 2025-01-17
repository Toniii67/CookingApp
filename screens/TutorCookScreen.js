import { StyleSheet, Text, View, Dimensions, PanResponder, Animated, TouchableOpacity, Image } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeftIcon, ArrowRightIcon } from 'react-native-heroicons/outline'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import Button from '../components/Button'
// import { TouchableOpacity } from 'react-native'
import { useCookingStatus } from '../components/CookingContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = 50 // Decreased threshold to make swipe more sensitive

const TutorCookScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const { meal } = route.params
    const { updateCookingStatus } = useCookingStatus();

    const totalSteps = useRef(0);
    let [currentStepIndex, setCurrentStepIndex] = useState(0)
    const [cookingSteps, setCookingSteps] = useState([])
    const position = useRef(new Animated.ValueXY()).current

    useEffect(() => {
        if (meal?.strInstructions) {
            const regex = /\d+\.\s*/g;
            const steps = meal.strInstructions
                .split(regex)
                .map(step => {
                    // Bersihkan teks dalam beberapa tahap
                    return step
                        .replace(/\\t/g, '') // Hapus \t
                        .replace(/\\r/g, '') // Hapus \r
                        .replace(/\\n/g, '') // Hapus \n
                        .replace(/\s+/g, ' ') // Gabungkan multiple spaces menjadi single space
                        .trim(); // Hapus whitespace di awal dan akhir
                })
                .filter(step => step.length > 0);
            
            setCookingSteps(steps);
            totalSteps.current = steps.length;
            console.log('Total steps:', steps.length);
            console.log('Steps:', steps);
        }
    }, [meal]);
    
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                position.setOffset({
                    x: position.x._value,
                    y: position.y._value
                })
            },
            onPanResponderMove: (_, gesture) => {
                console.log('Moving:', gesture.dx) // Debug log
                Animated.event(
                    [
                        null,
                        { dx: position.x, dy: position.y }
                    ],
                    { useNativeDriver: false }
                )(_, gesture)
            },
            onPanResponderRelease: (_, gesture) => {
                position.flattenOffset()
                console.log('Released:', gesture.dx) // Debug log

                if (gesture.dx > SWIPE_THRESHOLD) {
                    console.log('Swiping right to previous step') // Debug log
                    swipeComplete(-1) // Move to previous step
                    // setCurrentStepIndex(currentStepIndex - 1)
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    console.log(currentStepIndex)
                    console.log('Swiping left to next step') // Debug log
                    // setCurrentStepIndex(currentStepIndex + 1)
                    swipeComplete(1) // Move to next step


                } else {
                    console.log('Reset position - no valid move') // Debug log
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                        friction: 5
                    }).start()
                }
            }

        })
    ).current
    

    const swipeComplete = (direction) => {
        const newIndex = currentStepIndex + direction;
        console.log('New index:', newIndex, 'Total steps:', totalSteps.current);
        if (newIndex < 0 || newIndex >= totalSteps.current) {
            console.log('Index cannot be less than 0'); // Debug log
            Animated.timing(position, {
                toValue: { x: 0, y: 0 },
                duration: 200,
                useNativeDriver: false
            }).start()
            return;
        }

        // Reset position with animation
        Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 200,
            useNativeDriver: false
        }).start(() => {
            // Update the index only after the animation is complete
            setCurrentStepIndex(newIndex);
            currentStepIndex = newIndex;
        });
    }

    const getCookingStatus = () => {
        if (currentStepIndex === 0 && cookingSteps.length > 0) {
            return "Not Started";
        } else if (currentStepIndex < cookingSteps.length - 1) {
            return "In Progress";
        } else {
            return "Completed";
        }
    };

    useEffect(() => {
        if (meal?.idMeal) {
            updateCookingStatus(meal.idMeal, getCookingStatus());
        }
    }, [currentStepIndex, cookingSteps]);


    const getCardStyle = () => {
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
            outputRange: ['-30deg', '0deg', '30deg']
        })

        return {
            ...position.getLayout(),
            transform: [{ rotate }]
        }
    }

    const handleFinish = () => {
        updateCookingStatus(meal.idMeal, "Completed");
        navigation.navigate('home');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <View style={{ marginTop: 20, }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 3, borderRadius: 50, marginLeft: 20, backgroundColor: "white", zIndex: 9999 }}>
                    <View style={{ marginRight: 2 }}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={3.5} color='orange' />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.headerTitle}>{meal?.strMeal}</Text>
                <Text style={styles.stepCounter}>
                    Step {currentStepIndex + 1} of {cookingSteps.length}
                </Text>
            </View>


            <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                    <View
                        style={[
                            styles.progressFill,
                            { width: `${((currentStepIndex + 1) / cookingSteps.length) * 100}%` }
                        ]}
                    />
                </View>
            </View>

            <View style={{ alignItems: 'center', paddingTop: 40 }}>
                <Image
                    source={require('../assets/tutorcook.png')}
                    style={{
                        width: 170,
                        height: 220,
                        alignItems: 'center',
                    }}
                />
            </View>

            <View style={styles.cardContainer}>
                <Animated.View
                    style={[styles.card, getCardStyle()]}
                    {...panResponder.panHandlers}
                >
                    <Text style={styles.stepText}>
                        {cookingSteps[currentStepIndex]}
                    </Text>
                </Animated.View>
            </View>

            {currentStepIndex === cookingSteps.length-1 && (
            <Button
                title="Finish"
                filled
                onPress={() => {
                    updateCookingStatus(meal.idMeal, "Completed");
                    navigation.navigate('Home');
                }}
                style={{
                    marginTop: 40,
                    width: "90%",
                    marginLeft: 18,
                    marginBottom: 30,
                }}
            />
        )}
            <View style={styles.navigationHints}>
                {currentStepIndex > 0 && currentStepIndex < cookingSteps.length - 1 && (
                    <View style={styles.navHint}>
                        <ArrowLeftIcon size={20} color="gray" />
                        <Text style={styles.navHintText}>Swipe right for previous</Text>
                    </View>
                )}
                {currentStepIndex < cookingSteps.length - 1 && (
                    <View style={styles.navHint}>
                        <Text style={styles.navHintText}>Swipe left for next</Text>
                        <ArrowRightIcon size={20} color="gray" />
                    </View>
                )}
            </View>
        </SafeAreaView>
    )
}

export default TutorCookScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    header: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: hp(2.5),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
    },
    stepCounter: {
        fontSize: hp(1.8),
        color: 'gray',
        marginTop: 5,
    },
    progressBarContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    progressBar: {
        height: 8,
        backgroundColor: '#E0E0E0',
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: 'orange',
        borderRadius: 4,
    },
    cardContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: SCREEN_WIDTH - 40,
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        minHeight: hp(30),
    },
    stepText: {
        fontSize: hp(2.2),
        lineHeight: hp(3),
        color: '#333',
    },
    navigationHints: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    navHint: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    navHintText: {
        color: 'gray',
        marginHorizontal: 5,
        fontSize: hp(1.6),
    },
    debugButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    debugButton: {
        backgroundColor: 'orange',
        padding: 10,
        borderRadius: 8,
    },
    debugButtonText: {
        color: 'white',
        fontWeight: 'bold',
    }
})
