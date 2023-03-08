import Header1x2x from 'components/atoms/headers/header-1x-2x';
import React from 'react';
import { View } from 'react-native';
import styles from './styles';

const DetailsScreen = (props) => {
  return (
    <View style={styles.container}>
      <Header1x2x title={props?.route?.params?.title} />
      <View style={styles.container}>
      </View>
    </View>
  );
};
export default DetailsScreen;
