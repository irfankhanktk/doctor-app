import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const RoomSelectionModal = ({
  style,
  visible = false,
  onClose = () => {},
  selectedRoom,
  onChange,
  onPressRoom = () => {},
}) => {
  const {t} = i18n;
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <Medium
          label={selectedRoom?.title}
          style={{alignSelf: 'center'}}
          fontSize={mvs(18)}
        />
        {new Array((selectedRoom?.number || 0) + 1)
          ?.fill('')
          ?.map((x, index) => (
            <TouchableOpacity
              style={{
                borderTopWidth: StyleSheet.hairlineWidth,
                paddingVertical: mvs(3),
              }}
              onPress={() => onPressRoom(index)}>
              <Regular
                label={` ${index} Room ($${selectedRoom?.price * index})`}
              />
            </TouchableOpacity>
          ))}
      </View>
    </ModalWrapper>
  );
};
export default RoomSelectionModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 0,
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
  title: {
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: mvs(20),
    color: colors.primary,
  },
  des: {marginVertical: mvs(5)},
  rowRating: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: mvs(20),
  },
  rateTxt: {
    marginLeft: mvs(10),
    lineHeight: mvs(20),
    color: colors.black,
    fontSize: mvs(16),
  },
  container: {
    // height: mvs(402),

    backgroundColor: colors.white,
    padding: mvs(15),
    borderTopRightRadius: mvs(20),
    borderTopLeftRadius: mvs(20),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: mvs(Platform.OS === 'ios' ? 40 : 20),
  },
  row: {alignItems: 'center'},
  dollar: {marginHorizontal: mvs(20), fontSize: mvs(28)},
  button: {height: mvs(63), width: '45%'},
  cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
