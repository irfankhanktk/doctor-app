import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

import {t} from 'i18next';
import {Loader} from 'components/atoms/loader';
const HotelRoom = ({
  onPress = () => {},
  onPressroom = () => {},
  onPressselectedRoom = () => {},
  onPressStatusChange = () => {},
  onPressEditRoom = () => {},
  onPressDeleteRoom = () => {},
  roomtitle,
  loading,
  beds,
  adults,
  status,
  children,
  size,
  hotel_img,
  selectedRoomNumber,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Image source={hotel_img} style={styles.img} />
        <TouchableOpacity
          disabled={loading}
          style={styles.publishBtn}
          onPress={onPressStatusChange}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Regular
              fontSize={13}
              color={colors.white}
              label={status === 'publish' ? 'Make Hide' : 'Make Publish'}
            />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.rightContainer}>
        <Medium label={roomtitle} fontSize={mvs(12)} />
        <Row>
          <Row style={styles.iconContainer}>
            <Regular label={'Bed'} fontSize={mvs(12)} />
            <Regular label={beds} fontSize={mvs(12)} />
          </Row>
          <Row style={styles.iconContainer}>
            <Regular label={'Area'} fontSize={mvs(12)} />

            <Regular label={size} fontSize={mvs(12)} />
          </Row>
        </Row>
        <Row>
          <Row style={styles.iconContainer}>
            <Regular label={'Adults'} fontSize={mvs(12)} />

            <Regular label={adults} fontSize={mvs(12)} />
          </Row>
          <Row style={styles.iconContainer}>
            <Regular label={'Child'} fontSize={mvs(12)} />

            <Regular label={children} fontSize={mvs(12)} />
          </Row>
        </Row>

        <Row style={{flex: 1, alignItems: 'flex-end'}}>
          <Ionicons name={'time-outline'} size={mvs(15)} />
          <Ionicons name={'wifi'} size={mvs(15)} />
          <MaterialIcons name={'dry-cleaning'} size={mvs(15)} />
          <SimpleLineIcons name={'cup'} size={mvs(15)} />
        </Row>
        <Row>
          <TouchableOpacity
            onPress={onPressroom}
            style={{
              paddingHorizontal: mvs(5),
              marginTop: mvs(6),
              paddingVertical: mvs(2),
              borderRadius: mvs(2),
              backgroundColor: colors.primary,
              opacity: 0.6,
              alignSelf: 'center',
            }}>
            <Row
              style={{
                alignItems: 'center',
              }}>
              <Medium
                label={t('watch_video')}
                color={colors.white}
                fontSize={mvs(12)}
              />
              <Entypo
                name="video"
                color={colors.white}
                size={mvs(20)}
                style={{marginLeft: mvs(10)}}
              />
            </Row>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressselectedRoom}
            style={{
              paddingHorizontal: mvs(10),
              marginTop: mvs(6),
              paddingVertical: mvs(2),
              borderRadius: mvs(2),
              backgroundColor: colors.primary,
              alignSelf: 'center',
            }}>
            <Row
              style={{
                alignItems: 'center',
              }}>
              <Medium
                label={`${selectedRoomNumber || 0} Rooms`}
                color={colors.white}
                fontSize={mvs(12)}
              />
              <Ionicons
                name="ios-chevron-down-circle"
                color={colors.white}
                size={mvs(14)}
                style={{marginLeft: mvs(10)}}
              />
            </Row>
          </TouchableOpacity>
        </Row>
        <Row>
          <TouchableOpacity
            style={styles.editRoomBtn}
            onPress={onPressEditRoom}>
            <Regular style={{right: 10}} color={colors.white} label={'Edit'} />
            <Entypo color={colors.white} name={'edit'} size={mvs(20)} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '49%',
              flexDirection: 'row',
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: mvs(5),
            }}
            onPress={onPressDeleteRoom}>
            <Regular color={colors.white} label={'Delete'} />
            <Entypo color={colors.white} name={'edit'} size={mvs(20)} />
          </TouchableOpacity>
        </Row>
      </View>
    </TouchableOpacity>
  );
};
export default HotelRoom;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: mvs(10),
    // width: mvs(250),
    marginBottom: mvs(16),

    backgroundColor: colors.secondary,
    ...colors.shadow,
  },
  editRoomBtn: {
    width: '49%',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(5),
  },
  publishBtn: {
    width: '100%',
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(5),
  },
  img: {
    height: mvs(120),
    width: mvs(100),
    borderRadius: mvs(10),
  },
  iconContainer: {
    alignItems: 'center',
    width: '45%',
  },
  rightContainer: {
    padding: mvs(10),
    flex: 1,
  },
});
