import { View, StyleSheet, Alert, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Supermarket } from './Supermarket';

const INITIAL_REGION = {
    latitude: -6.966667,
    longitude: 110.416664,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
};



export default function GoogleMapView() {
    const [locationPermission, setLocationPermission] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocationPermission(true);
            }
        })();
    }, []);

    

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                initialRegion={INITIAL_REGION}
                showsCompass={true}
                showsUserLocation={locationPermission}
                showsBuildings={true}
                zoomControlEnabled={true}
            >
                {Supermarket.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: marker.latitude,
                            longitude: marker.longitude
                        }}
                        title={marker.name}
                        description={marker.address}
                    >
                        
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 65
    },
    infoPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    address: {
        fontSize: 14,
        color: '#666',
    },
    calloutContainer: {
        width: 200,
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    calloutAddress: {
        fontSize: 14,
        color: '#666',
    }
});