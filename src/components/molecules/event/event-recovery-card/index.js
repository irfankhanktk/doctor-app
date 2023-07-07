import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/AntDesign';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
const EventRecoveryCard = ({
  item,
  style,
  onPress = () => {},
  onPressRecover = () => {},
  onPressDelete = () => {},
}) => {
  const {t} = i18n;

  return (
    <View style={styles.container}>
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
          <View style={{flex: 1}}>
            <Medium label={item?.title} color={colors.white} />
            <Row>
              <PrimaryButton
                containerStyle={styles.recoveryBtn}
                title={t('recovery')}
                onPress={onPressRecover}
              />
              <PrimaryButton
                containerStyle={styles.recoveryBtn}
                title={t('delete')}
                onPress={onPressDelete}
              />
            </Row>
          </View>
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
    </View>
  );
};
export default React.memo(EventRecoveryCard);
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
  imgStyle: {borderRadius: mvs(15)},
  rowRating: {
    position: 'absolute',
    padding: mvs(15),
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.20)',
    borderTopLeftRadius: mvs(15),
    // borderBottomLeftRadius: mvs(15),
  },
  rateTxt: {marginLeft: mvs(10), lineHeight: mvs(16)},
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
  recoveryBtn: {
    width: '48%',
    height: mvs(30),
    borderRadius: mvs(5),
  },
});
