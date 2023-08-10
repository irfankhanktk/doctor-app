import React, { useState, useEffect } from 'react';
import { View, Animated, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Medium from 'typography/medium-text';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { colors } from 'config/colors';
import { Row } from '../row';
import { mvs } from 'config/metrices';

const CollapsibleView = ({
  children,
  label,
  numberOfLines,
  maxH = 140,
  collaspsableColor,
  style,
}: any) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Create an animated value for the height
  const height = useState(new Animated.Value(0))[0];

  // Define the minimum and maximum height for the component
  const minHeight = 0;
  const maxHeight = mvs(maxH);

  // Define the animation function
  const animateHeight = (toValue: any) => {
    Animated.timing(height, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    animateHeight(isExpanded ? maxHeight : minHeight);
  }, [isExpanded]);

  // Toggle the height of the component
  const toggleHeight = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View
      style={{
        padding: mvs(10),
        marginBottom: mvs(10),
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: mvs(10),
        minHeight: mvs(50),
        ...style,
      }}>
      <TouchableOpacity onPress={toggleHeight}>
        <Row style={{ alignItems: 'center' }}>
          <Medium
            label={label}
            numberOfLines={numberOfLines}
            color={collaspsableColor}
          />
          <AntDesign size={mvs(15)} name={isExpanded ? 'up' : 'down'} color={colors.primary} />
        </Row>
      </TouchableOpacity>
      <Animated.View style={{ height }}>
        {children}
      </Animated.View>
    </View>
  );
};

export default CollapsibleView;
