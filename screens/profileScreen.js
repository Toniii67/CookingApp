import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import GoogleMapView from '../components/GoogleMapView'

const profileScreen = () => {
    return (
        <SafeAreaView>
            <GoogleMapView />
        </SafeAreaView>
    )
}

export default profileScreen

const styles = StyleSheet.create({})