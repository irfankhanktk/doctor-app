import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { width } from 'config/metrices';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

export default function App({
    rangeValue = [0, 900], setRangeValue = (range: any[]) => { },
}) {
    // const [rangeValue, setRangeValue] = useState([0, 900]);
    const leftLabelPosition = useRef(new Animated.Value(10)).current;
    const rightLabelPosition = useRef(new Animated.Value((width - 120) + 10)).current;

    const handleRangeChange = (values: any) => {

        setRangeValue(values);
        Animated.parallel([
            Animated.timing(leftLabelPosition, {
                toValue: (values[0] / 900) * (width - 120) + 10,
                useNativeDriver: false,
            }),
            Animated.timing(rightLabelPosition, {
                toValue: (values[1] / 900) * (width - 120) + 10,
                useNativeDriver: false,
            })
        ]).start();
    };

    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Animated.View style={[styles.label, { left: leftLabelPosition }]}>
                    <Text>{rangeValue[0]}$</Text>
                </Animated.View>

                <Animated.View style={[styles.label, { left: rightLabelPosition }]}>
                    <Text>{rangeValue[1]}$</Text>
                </Animated.View>
                <MultiSlider
                    values={rangeValue}
                    sliderLength={width - 120}
                    min={0}
                    max={900}
                    step={1}
                    onValuesChange={handleRangeChange}
                    markerStyle={styles.marker}
                    selectedStyle={styles.selected}
                    trackStyle={styles.track}
                    touchDimensions={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        slipDisplacement: 50
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sliderContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        position: 'absolute',
        top: -3,
    },
    marker: {
        backgroundColor: '#000000',
        borderWidth: 1,
        borderColor: '#000000',
        height: 20,
        width: 20,
        borderRadius: 10,
    },
    selected: {
        backgroundColor: '#000000',
    },
    track: {
        backgroundColor: '#CCCCCC',
        height: 5,
    },
});
