import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import COLORS from '../constant/color'

const Button = (props) => {
    const filledBgColor = props.color || COLORS.orange;
    const outlinedColor = COLORS.orange;
    const bgColor = props.filled ? filledBgColor : outlinedColor;
    const textColor = props.filled ? COLORS.white : COLORS.primary;

    return (
        <TouchableOpacity
            style={{
                ...styles.button,
                ...{backgroundColor: bgColor},
                ...props.style
            }}
            onPress={props.onPress}
        >
            <Text style={{fontSize: 18, ... { color: textColor }}}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingBottom: 16,
        paddingVertical: 10,
        borderColor: COLORS.orange,
        borderWidth: 2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default Button