import { colors } from 'config/colors'
import { t } from 'i18next'
import React from 'react'
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import Medium from 'typography/medium-text'
type props = {
    style?: StyleProp<ViewStyle>
    label?: string
    color?: ColorValue
    children?: JSX.Element | JSX.Element[]
}
export const EmptyList = (props: props) => {
    const { children, style, label = t('no_result_found'), color = colors.primary } = props;
    return (
        <View
            style={[styles.contentContainerStyle, style]}>
            {children}
            <Medium label={label} color={color} />
        </View>
    )
}
const styles = StyleSheet.create({
    contentContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})