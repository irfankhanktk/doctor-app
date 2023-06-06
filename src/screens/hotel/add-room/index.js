import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {t} from 'i18next';

const AddRoom = props => {
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('add_room')} back={true} />
    </View>
  );
};
export default AddRoom;
