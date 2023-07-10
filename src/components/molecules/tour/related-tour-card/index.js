import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
const RelatedTourCard = ({
  item,
  style,
  onPress = () => {},
  onPressCart = () => {},
}) => {
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
          <Row>
            <Medium
              label={item?.title}
              color={colors.white}
              fontSize={mvs(14)}
            />

            <View
              style={{
                marginLeft: mvs(10),
                backgroundColor: colors.white,
                borderRadius: mvs(6),
                alignItems: 'center',
                padding: mvs(2),
              }}>
              <Medium
                label={`${item?.price} / ${t('day')}`}
                color={colors.primary}
                fontSize={mvs(12)}
              />
            </View>
          </Row>
          <Row style={{paddingVertical: mvs(10)}}>
            <View
              style={{
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: mvs(40),
              }}>
              <SimpleLineIcons
                name="people"
                color={colors.white}
                size={mvs(18)}
              />
              <Regular
                fontSize={mvs(12)}
                label={item?.passenger}
                color={colors.white}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: mvs(40),
              }}>
              <FontAwesome name="gears" color={colors.white} size={mvs(18)} />
              <Regular
                fontSize={mvs(12)}
                label={item?.gear}
                color={colors.white}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: mvs(40),
              }}>
              <MaterialCommunityIcons
                name="bag-checked"
                color={colors.white}
                size={mvs(18)}
              />
              <Regular
                fontSize={mvs(12)}
                label={item?.baggage}
                color={colors.white}
              />
            </View>
            <View
              style={{
                // borderWidth: 1,
                justifyContent: 'center',
                alignItems: 'center',
                width: mvs(40),
              }}>
              <MaterialCommunityIcons
                name="car-door"
                color={colors.white}
                size={mvs(18)}
              />
              <Regular
                fontSize={mvs(12)}
                label={item?.door}
                color={colors.white}
              />
            </View>
          </Row>
        </LinearGradient>
      </ImageBackground>
      {/* <Row style={styles.rowRating}>
        <Icon name={'star'} color={colors.white} size={mvs(12)} />
        <Regular
          style={styles.rateTxt}
          label={`${item?.star_rate} (${item?.review_score})`}
          fontSize={mvs(12)}
          color={colors.white}
        />
      </Row> */}
      {item?.is_featured ? (
        <Row style={styles.rowRating1}>
          <Regular
            style={styles.rateTxt}
            label={t('Featured')}
            fontSize={mvs(12)}
            color={colors.white}
          />
        </Row>
      ) : null}

      {item?.has_wish_list ? (
        <View style={styles.heartContainer}>
          <Icon name={'hearto'} color={colors.white} size={mvs(19)} />
        </View>
      ) : null}
      {/* {item?.is_featured ? (
        <View style={styles.heartContainer}>
          <Icon name={'hearto'} color={colors.white} size={mvs(19)} />
        </View>
      ) : null} */}
      {/* {item?.is_featured ? (
        <View style={styles.heartContainer}>
          <Icon name={'hearto'} color={colors.white} size={mvs(19)} />
        </View>
      ) : null} */}
    </TouchableOpacity>
  );
};
export default React.memo(RelatedTourCard);
const styles = StyleSheet.create({
  container: {
    height: mvs(180),
    borderRadius: mvs(15),
    marginBottom: mvs(20),
    marginRight: mvs(20),

    ...colors.shadow,
  },
  row: {alignItems: 'flex-end'},
  bg: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  btn: {
    backgroundColor: colors.white,
    height: mvs(28),
    width: mvs(96),
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  btnTxt: {color: colors.primary, fontSize: mvs(12), lineHeight: mvs(16)},
  imgStyle: {borderRadius: mvs(15)},
  rowRating: {
    position: 'absolute',
    padding: mvs(15),
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderTopLeftRadius: mvs(15),
    // borderBottomLeftRadius: mvs(15),
  },
  rowRating1: {
    position: 'absolute',
    top: mvs(20),
    left: mvs(0),
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(5),
    alignItems: 'center',
    // backgroundColor: 'rgba(0,0,0,0.20)',
    backgroundColor: 'red',
    // borderTopLeftRadius: mvs(15),
    // borderBottomLeftRadius: mvs(15),
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
});
