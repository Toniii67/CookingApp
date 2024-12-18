import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import COLORS from '../constant/color';
import { Image } from 'react-native';
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context'

const welcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: 'center', paddingTop: 40 }}>
          <Image
            source={require('../assets/cook1.jpg')}
            style={{
              width: 400,
              height: 450,
              alignItems: 'center',
            }}
          />
        </View>

        {/* content */}

        <View style={{
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 28,
            fontWeight: 600,
            color: COLORS.black,

          }}>Let's Get Started!</Text>
        </View>
          <View style={{
            marginVertical: 22,
          }}>
            <View style={{
              alignItems: 'center',
            }}>
              <Text style={{
                fontSize: 16,
                color: COLORS.black,
                marginTop: 4,
                alignItems: 'center'
              }}>Ready to cook? Join us and explore a variety</Text>
              <Text style={{
                fontSize: 16,
                color: COLORS.black,
                marginTop: 4,
                alignItems: 'center'
              }}>of recipes that will delight your taste buds!</Text>
            </View>

            <Button
              title="Join Now"
              filled
              onPress={() => navigation.navigate('register')}
              style={{
                marginTop: 80,
                width: "100%"
              }}
            />

            <Pressable
              onPress={() => navigation.navigate('login')}
            >
              <View style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "center"
              }}>
                <Text style={{
                  fontSize: 16,
                  color: COLORS.black
                }}>Already have an account?<Text style={{ color: "#0D3995" }}> Login here</Text></Text>
              </View>
            </Pressable>
          </View>
        
      </View>
    </SafeAreaView>
  )
}

export default welcomeScreen

const styles = StyleSheet.create({})
