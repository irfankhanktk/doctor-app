import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {CURRENCY} from 'config/constants';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
const HotelCard = ({item, editPress, onPress = () => {}}) => {
  const {t} = i18n;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{uri: `${item?.image_id}`}}
        imageStyle={styles.imgStyle}
        style={styles.bg}>
        <LinearGradient
          style={styles.grd}
          colors={[
            `${colors.primary}30`,
            `${colors.primary}70`,
            `${colors.primary}50`,
          ]}>
          <Row style={styles.row}>
            <View style={{flex: 1}}>
              <Row style={{alignItems: 'center'}}>
                <Medium label={item?.title} color={colors.white} />

                <View style={styles.btn}>
                  <Medium
                    label={`${CURRENCY} ${item?.price} / ${t('night')}`}
                    textStyle={styles.btnTxt}
                  />
                </View>
              </Row>
              <Row style={{justifyContent: 'flex-start'}}>
                <Entypo
                  name="location"
                  color={colors.red}
                  size={mvs(18)}
                  style={{marginRight: mvs(10)}}
                />
                <View style={{flex: 1}}>
                  <Regular
                    numberOfLines={2}
                    fontSize={mvs(12)}
                    label={item?.address}
                    color={colors.white}
                  />
                </View>
              </Row>
            </View>
          </Row>
        </LinearGradient>
      </ImageBackground>
      <Row
        style={{
          position: 'absolute',
          padding: mvs(15),
          alignItems: 'center',
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.20)',
          borderTopLeftRadius: mvs(15),
          borderTopRightRadius: mvs(15),
        }}>
        <Row style={styles.rowRating}>
          <Icon name={'star'} color={colors.white} size={mvs(12)} />
          <Regular
            style={styles.rateTxt}
            label={`${item?.star_rate} (${item?.review_score || 0})`}
            fontSize={mvs(12)}
            color={colors.white}
          />
        </Row>
        <TouchableOpacity style={styles.editBtn} onPress={editPress}>
          <Entypo name="edit" color={colors.black} size={mvs(20)} />
        </TouchableOpacity>
      </Row>
    </TouchableOpacity>
  );
};
export default React.memo(HotelCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(210),
    borderRadius: mvs(15),
    marginBottom: mvs(20),

    ...colors.shadow,
  },
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.white,
    alignitems: 'center',
    justifyContent: 'center',
    height: mvs(30),
    padding: mvs(5),
    borderRadius: mvs(5),
    ...colors.shadow,
  },
  btnTxt: {
    color: colors.primary,
    fontSize: mvs(12),
    lineHeight: mvs(16),
  },
  imgStyle: {borderRadius: mvs(15), resizeMode: 'contain'},
  rowRating: {
    // position: 'absolute',
    // padding: mvs(15),
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.20)',
    // borderTopLeftRadius: mvs(15),
  },
  rateTxt: {marginLeft: mvs(10), lineHeight: mvs(16)},
  grd: {
    height: mvs(90),
    padding: mvs(15),
    borderRadius: mvs(15),
  },
  heartContainer: {
    position: 'absolute',
    right: mvs(20),
    top: mvs(-13),
    justifyContent: 'center',
    alignItems: 'center',
    height: mvs(30),
    width: mvs(30),
    borderRadius: mvs(15),
    backgroundColor: colors.red,
  },
  editBtn: {
    backgroundColor: colors.white,
    borderRadius: mvs(7),
    justifyContent: 'center',
    alignitems: 'center',
    height: mvs(30),
    padding: mvs(5),
  },
});
