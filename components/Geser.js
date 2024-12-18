import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
// import { SliderBox } from 'react-native-image-slider-box';
import COLORS from '../constant/color';

const Geser = () => {
    // const slides = [
    //     require('../assets/produk1.jpg'),
    //     require('../assets/produk2.jpg'),
    //     require('../assets/produk3.jpg'),
    // ]

    return (
        <View style={styles.carouselContainer}>
            <Image 
                source={require('../assets/produk1.jpg')}
                style={{borderRadius: 15, width: "92%", marginTop: 15, height: 200}}
            />
            {/* <SliderBox images={slides} 
                dotColor={COLORS.black}
                inactiveDotColor={COLORS.white}
                ImageComponentStyle={{borderRadius: 15, width: "95%", marginTop: 15}}
                autoplay  /> */}
        </View>
    )
}

export default Geser

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 1,
        alignItems: 'center',
    }
})
