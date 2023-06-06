import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

// import RoomFilter from 'screens/hotel-module/room-filter';
import {t} from 'i18next';
const HotelRoom = ({
  onPress = () => {},
  onPressroom = () => {},
  onPressselectedRoom = () => {},
  roomtitle,
  beds,
  adults,
  children,
  size,
  hotel_img,
  selectedRoomNumber,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={hotel_img} style={styles.img} />
      {/* <TouchableOpacity
        onPress={onPressroom}
        style={{position: 'absolute', left: mvs(10), top: mvs(10)}}>
        <Entypo name="video" color={colors.black} size={mvs(16)} />
      </TouchableOpacity> */}

      <View style={styles.rightContainer}>
        <Medium label={roomtitle} fontSize={mvs(12)} />
        <Row>
          <Row style={styles.iconContainer}>
            {/* <Ionicons name={'bed'} size={mvs(15)} /> */}
            <Regular label={'Bed'} fontSize={mvs(12)} />
            <Regular label={beds} fontSize={mvs(12)} />
            {/* <HtmlView html={`<p style="font-size:12px">${beds}</p>`} /> */}
          </Row>
          <Row style={styles.iconContainer}>
            {/* <FontAwesome name={'area-chart'} size={mvs(15)} /> */}
            <Regular label={'Area'} fontSize={mvs(12)} />

            <Regular
              label={size?.replace(/<(?:.|\n)*?>/gm, '')}
              fontSize={mvs(12)}
            />
          </Row>
        </Row>
        <Row>
          <Row style={styles.iconContainer}>
            {/* <MaterialIcons name={'group'} size={mvs(15)} /> */}
            <Regular label={'Adults'} fontSize={mvs(12)} />

            <Regular label={adults} fontSize={mvs(12)} />
          </Row>
          <Row style={styles.iconContainer}>
            {/* <FontAwesome name={'child'} size={mvs(15)} /> */}
            <Regular label={'Child'} fontSize={mvs(12)} />

            <Regular label={children} fontSize={mvs(12)} />
            {/* <HtmlView html={children} /> */}
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

              // marginHorizontal: mvs(20),
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
