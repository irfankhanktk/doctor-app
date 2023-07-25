import {ModalWrapper} from 'components/atoms/modal-wrapper';
import PlayVideo from 'components/atoms/play-video';

import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import i18n from 'translation';

const HotelVideoModal = ({
  style,
  visible = false,
  onClose = () => {},
  onChange,
  url,
}) => {
  const {t} = i18n;
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>{<PlayVideo url={url} />}</View>
    </ModalWrapper>
  );
};
export default HotelVideoModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    // flex: 1,
    // justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
  bar: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  container: {
    backgroundColor: colors.white,
    padding: mvs(15),
    // height: 500,
    // width: width,
    borderRadius: mvs(20),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: mvs(Platform.OS === 'ios' ? 40 : 20),
  },
  row: {width: '45%', justifyContent: 'flex-start'},
  label: {
    fontSize: mvs(12),
    marginHorizontal: mvs(10),
  },
});
