import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import COLORS from '../constant/color'
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import CheckBox from "expo-checkbox";
import Button from '../components/Button';
import { Image } from 'react-native';

const registerScreen = ({ navigation }) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fungsi validasi email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Fungsi validasi nomor telepon
  const validatePhone = (phone) => {
    const re = /^[0-9]+$/;
    return re.test(String(phone)) && phone.length >= 10;
  };

  // Fungsi validasi form register
  const handleRegister = () => {
    if (!validateEmail(email)) {
      setErrorMessage('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (!validatePhone(phone)) {
      setErrorMessage('Invalid Phone', 'Please enter a valid phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Invalid Password', 'Password must be at least 6 characters.');
      return;
    }
    setErrorMessage('');
    // Jika validasi berhasil, navigasi ke home screen
    navigation.navigate('home');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>

        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Image
            source={require('../assets/cook2.png')}
            style={{
              width: 200,
              height: 200
            }}
          />
        </View>

        <View>
          <Text style={{
            fontSize: 22,
            fontWeight: 'bold',
            marginBottom: 12,
            color: COLORS.black
          }}>Register</Text>
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

        <View style={{ marginBottom: 12 }}>
          <Text style={{
            fontSize: 16,
            fontWeight: 400,
            marginVertical: 8,
          }}>Mobile Number</Text>

          <View style={{
            width: '100%',
            height: 48,
            borderColor: COLORS.black,
            borderWidth: 1,
            borderRadius: 8,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 12,
          }}>
            <TextInput
              placeholder='+62'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{
                width: '12%',
                borderRightWidth: 1,
                borderLeftColor: COLORS.grey,
                height: '100%',
              }}
            />

            <TextInput
              placeholder='Enter your phone number'
              placeholderTextColor={COLORS.black}
              keyboardType='numeric'
              style={{ width: '80%' }}
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
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
              placeholder='Enter your email password'
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
                isPasswordShown == true ? (
                  <Ionicons name='eye-off' size={24} color={COLORS.black} />
                ) : (
                  <Ionicons name='eye' size={24} color={COLORS.black} />
                )
              }
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Text>By signing up, you’ve agree to our <Text style={{ color: "#0D3995" }}>terms and conditions and Privacy Policy.</Text></Text>
        </View>

        <View style={{ minHeight: 20, }}>
          {errorMessage ? (
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          ) : null}
        </View>

        <Button
          title="Continue"
          filled
          onPress={handleRegister}
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
        />
        <Pressable
          onPress={() => navigation.navigate('login')}
        >
          <View style={{ paddingTop: 5, alignItems: "center" }}>
            <Text>Already have an account? <Text style={{ color: "#0D3995" }}>Login here</Text></Text>
          </View>
        </Pressable>

      </View>
    </SafeAreaView>
  )
}

export default registerScreen

const styles = StyleSheet.create({})