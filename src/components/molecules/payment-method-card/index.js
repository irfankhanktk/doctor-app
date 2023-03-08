import * as IMG from 'assets/images';
import { Row } from 'components/atoms/row';
import { navigate } from 'navigation/navigation-ref';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Medium from '../../../typography/medium-text';

const PaymentMethodCard = ({
  style,
  onPress
}) => {
  return (
    <View style={[styles.container, style]}>
      <Row>

        <Medium
          label={'Payment Method'}
          color={colors.black}
          fontSize={mvs(18)}
          style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderColor: colors.border }}
        />
        <TouchableOpacity onPress={() => navigate('AddCard')}>
          <Medium
            label={'Add New'}
            color={colors.primary}
            fontSize={mvs(18)}
          />
        </TouchableOpacity>
      </Row>
      <View style={[styles.paymentContainer]}>
        <Medium
          label={'Debt & Credit Card'}
          color={colors.black}
          fontSize={mvs(18)}
          style={{ marginBottom: mvs(10), }}
        />
        <ScrollView horizontal>
          {
            [0, 1, 2].map(() => (
              <Image source={IMG.appointment_bg}
                style={{
                  height: mvs(50),
                  width: mvs(70),
                  marginHorizontal: mvs(5),
                  borderRadius: mvs(5),
                }} />
            ))
          }
        </ScrollView>
      </View>
      {/* <View style={styles.imgContainer}>
        <Image source={image ? { uri: image } : IMG.login_bg} style={styles.img} />
      </View>
      <View style={styles.profile}>
        <Medium label={name} fontSize={mvs(20)} />
        <Regular label={subTitle} fontSize={mvs(13)} color={colors.primary} />
        <Regular label={experience} fontSize={mvs(13)} color={colors.lightGray} />
        <AntDesign size={mvs(20)} name='heart' color={colors.red} style={styles.heart} />
      </View> */}
    </View>
  );
};
export default React.memo(PaymentMethodCard);
const styles = StyleSheet.create({
  container: {
    marginTop: mvs(30),
    backgroundColor: colors.white,
    ...colors.shadow,
    borderRadius: mvs(10),
    padding: mvs(15),

  },
  paymentContainer: {
    marginTop: mvs(15),
  },
  img: {
    height: mvs(100),
    width: mvs(100),
    borderTopRightRadius: mvs(10),
    borderTopLeftRadius: mvs(10)
  },
  profile: {
    marginHorizontal: mvs(10),
    flex: 1,
    // justifyContent: 'center'
  },
  title: { justifyContent: 'center', textAlign: 'center' },
  heart: {
    position: 'absolute',
    alignSelf: 'flex-end',
  }
});
