import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs, width} from 'config/metrices';
import React from 'react';
import {FlatList, Image, Platform, StyleSheet, View} from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

const RoomModal = ({
  style,
  room,
  visible = false,
  onClose = () => {},
  onChange,
}) => {
  const {t} = i18n;
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <Medium label={room?.title} />
        <FlatList
          contentContainerStyle={{}}
          horizontal
          data={[{}, {}]}
          pagingEnabled
          renderItem={({item}) => (
            <View style={{}}>
              <Image
                // source={IMGS.Img_Slider2}
                source={{uri: `${room?.image_id}`}}
                style={{width: width - mvs(20), height: mvs(200)}}
              />
            </View>
          )}
          keyExtractor={(item, index) => index + ''}
        />
        {/* <Medium label={'Room Amenities'} /> */}
        <Medium label={'Content'} />
        <Medium label={room?.content} fontSize={mvs(12)} numberOfLines={10} />
        <Row>
          <Row style={styles.row}>
            {/* <Ionicons name={'time-outline'} size={mvs(15)} /> */}
            <Regular label={'Beds'} style={styles.label} color={colors.black} />
            <Regular
              label={room?.beds}
              style={styles.label}
              color={colors.black}
            />
          </Row>
          <Row style={styles.row}>
            {/* <Ionicons name={'wifi'} size={mvs(15)} /> */}
            <Regular label={'Area'} style={styles.label} color={colors.black} />
            <Regular
              label={room?.size}
              style={styles.label}
              color={colors.black}
            />
          </Row>
        </Row>
        <Row>
          <Row style={styles.row}>
            {/* <MaterialIcons name={'dry-cleaning'} size={mvs(15)} /> */}
            <Regular
              label={'Adults'}
              style={styles.label}
              color={colors.black}
            />
            <Regular
              label={room?.adults}
              style={styles.label}
              color={colors.black}
            />
          </Row>
          <Row style={styles.row}>
            {/* <SimpleLineIcons name={'cup'} size={mvs(15)} /> */}
            <Regular
              label={'Children'}
              style={styles.label}
              color={colors.black}
            />
            <Regular
              label={room?.children}
              style={styles.label}
              color={colors.black}
            />
          </Row>
        </Row>
      </View>
    </ModalWrapper>
  );
};
export default RoomModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    // flex: 1,
    // justifyContent: 'flex-end',
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
  container: {
    backgroundColor: colors.white,
    padding: mvs(15),
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
