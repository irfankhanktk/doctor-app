import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Stars = ({
  size = mvs(16),
  fill = colors.yellow,
  stroke = colors.border,
  rate = 5,
  onPress = rate => { },
}) => {
  return (
    <Row style={{ justifyContent: 'flex-start' }}>
      {new Array(rate).fill('').map((item, index) => (
        <AntDesign
          onPress={() => {
            onPress(item);
          }}
          key={index}
          name={'star'}
          size={size}
          color={fill}
          style={{ marginLeft: mvs(10) }}
        />
      ))}
    </Row>
  );
};
export default Stars;
