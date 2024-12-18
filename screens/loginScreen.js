import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from "expo-checkbox";
import Button from '../components/Button';
import { Image } from 'react-native';
import COLORS from '../constant/color';

const loginScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    setErrorMessage('');
    navigation.navigate('home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Image
            source={require('../assets/cook3.png')}
            style={{
              width: 250,
              height: 250
            }}
          />
        </View>

        <View>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 12,
            color: COLORS.black
          }}>Login</Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '400',
            marginVertical: 8,
          }}>Email address</Text>

          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22,
          }}>
            <TextInput
              placeholder='Enter your email address'
              placeholderTextColor={COLORS.black}
              keyboardType='email-address'
              style={{ width: '100%' }}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={{ marginBottom: 10 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}>Password</Text>

          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 22,
          }}>
            <TextInput
              placeholder='Enter your password'
              placeholderTextColor={COLORS.black}
              secureTextEntry={!isPasswordShown}
              style={{ width: '100%' }}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordShown(!isPasswordShown)}
              style={{
                position: 'absolute',
                right: 12,
              }}>
              {
                isPasswordShown ? (
                  <Ionicons name='eye-off' size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name='eye' size={24} color={COLORS.black} />
                )
              }
            </TouchableOpacity>
          </View>
        </View>


        <View style={{ paddingBottom: 20, alignItems: "flex-end" }}>
          <Text style={{ color: "#0D3995" }}>Forgot Password?</Text>
        </View>

        <View style={{ minHeight: 20, }}>
          {errorMessage ? (
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          ) : null}
        </View>


        <Button
          title="Continue"
          filled
          onPress={handleLogin}
          style={{
            marginTop: 18,
          }}
        />

        <Pressable
          onPress={() => navigation.navigate('register')}
        >
          <View style={{ paddingTop: 15, alignItems: "center" }}>
            <Text>Didn't have an account? <Text style={{ color: "#0D3995" }}>Sign Up here</Text></Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default loginScreen;