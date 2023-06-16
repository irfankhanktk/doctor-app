import { PrimaryButton } from 'components/atoms/buttons';
import { Row } from 'components/atoms/row';
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
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
const HotelCard = ({
  item,
  style,
  onPress = () => { },
  onPressRecover = () => { },
}) => {
  const { t } = i18n;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <ImageBackground
        source={{ uri: `${item?.image_id}` }}
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
            <View style={{ flex: 1 }}>
              <Medium label={item?.title} color={colors.white} />
              <Row style={{ justifyContent: 'flex-start' }}>
                {/* <SpecialistLocation /> */}
                <Entypo
                  name="location"
                  color={colors.red}
                  size={mvs(18)}
                  style={{ marginRight: mvs(10) }}
                />
                <View style={{ flex: 1 }}>
                  <Regular
                    numberOfLines={2}
                    fontSize={mvs(12)}
                    label={item?.address}
                    color={colors.white}
                  />
                </View>
              </Row>
            </View>
            <PrimaryButton
              onPress={onPressRecover}
              containerStyle={styles.btn}
              textStyle={styles.btnTxt}
              title={`${item?.price} / ${t('night')}`}
            />
          </Row>
        </LinearGradient>
      </ImageBackground>
      <Row style={styles.rowRating}>
        <Icon name={'star'} color={colors.white} size={mvs(12)} />
        <Regular
          style={styles.rateTxt}
          label={`${item?.star_rate} (2.3k)`}
          fontSize={mvs(12)}
          color={colors.white}
        />
      </Row>
      <TouchableOpacity onPress={onPressRecover} style={styles.heartContainer}>
        <Icon name={'undo'} color={colors.white} size={mvs(19)} />
      </TouchableOpacity>
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
  // row: {backgroundColor: 'red'},
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
    top: mvs(15),
  },
  btnTxt: {
    color: colors.primary,
    fontSize: mvs(12),
    lineHeight: mvs(16),
  },
  imgStyle: { borderRadius: mvs(15) },
  rowRating: {
    position: 'absolute',
    padding: mvs(15),
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderTopLeftRadius: mvs(15),
    // borderBottomLeftRadius: mvs(15),
  },
  rateTxt: { marginLeft: mvs(10), lineHeight: mvs(16) },
  grd: {
    height: mvs(80),
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
