import {mvs} from 'config/metrices';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import Modal from 'react-native-modal';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ExtraPriceBottomSheetModal = props => {
  const {
    style,
    value,
    visible = false,
    onClose = () => {},
    onChangeText,

    items = [
      {label: 'One-time', value: 'One-time'},
      {label: 'Per day', value: 'Per day'},
    ],
  } = props;

  return (
    <Modal
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle]}>
      <View
        style={{
          borderTopLeftRadius: mvs(10),
          borderTopRightRadius: mvs(10),
          paddingTop: mvs(15),
          backgroundColor: 'white',
        }}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {items?.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => onChangeText(item?.value)}
                key={index}
                style={styles.button}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{color: 'black'}}>{item?.label}</Text>
                  <FontAwesome
                    color={'black'}
                    name={item?.value !== value ? 'circle-o' : 'circle'}
                    size={25}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};
export default ExtraPriceBottomSheetModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    justifyContent: 'flex-end',
    margin: 0,
    backgroundColor: '#00000050',
  },
  container: {
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 6,

    alignSelf: 'center',
  },
  button: {
    paddingHorizontal: 30,
    marginBottom: 20,
  },
});
