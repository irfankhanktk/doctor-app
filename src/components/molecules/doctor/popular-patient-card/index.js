import * as IMG from 'assets/doctor/images';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import Medium from 'typography/medium-text';

const PopularPatientCard = ({
  name = 'Dr. Shruti Kedia',
  subTitle = 'Dermatalogist, Cosmetologist',
  experience = '',
  rating = '',
  image,
  fee = 0,
  style,
  Imagestyle,
  onPress,
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.imgContainer]}>
        <Image
          source={image ? {uri: image} : IMG.login_bg}
          style={[styles.img, Imagestyle]}
        />
      </View>
      <View style={styles.profile}>
        <Medium label={name} fontSize={mvs(20)} />
        {/* <RatingStar rate={'3'} width={mvs(100)} onPress={onPress} /> */}
        {/* <Medium label={subTitle} fontSize={mvs(14)} color={colors.primary} /> */}
      </View>
    </View>
  );
};
export default React.memo(PopularPatientCard);
const styles = StyleSheet.create({
  container: {
    marginRight: mvs(10),
    // width: width - mvs(120)
  },
  imgContainer: {
    height: mvs(180),
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: mvs(5),
    overflow: 'hidden',
    alignItems: 'center',
  },
  img: {
    height: mvs(170),
    width: mvs(140),
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10),
    // resizeMode: 'contain',
  },
  profile: {
    marginTop: mvs(15),
    flex: 1,
    justifyContent: 'center',
  },
  title: {justifyContent: 'center', textAlign: 'center'},
});
