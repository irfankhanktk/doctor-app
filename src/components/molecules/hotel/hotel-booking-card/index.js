import {Hotels_Bg} from 'assets/car/images';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import i18n from 'translation';
import Medium from 'typography/medium-text';
const AppointmentCard = ({item, style, onPress = () => {}}) => {
  const {t} = i18n;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Row
        style={{
          paddingHorizontal: mvs(10),
          // marginTop: mvs(10),
          alignItems: 'center',
        }}>
        <Medium label={t('Status')} fontSize={mvs(20)} color={colors.primary} />
        <Medium
          label={`${item?.status}`}
          fontSize={mvs(20)}
          color={colors.primary}
        />
      </Row>
      <Row style={{justifyContent: 'flex-start'}}>
        <Image
          source={
            item?.service?.image ? {uri: item?.service?.image} : Hotels_Bg
          }
          style={styles.img}
        />
        <View style={styles.leftContainer}>
          <Row>
            <Medium label={item?.service?.title} style={styles.name} />

            {/* <Medium label={item?.status} style={styles.status} /> */}
          </Row>
          <Row style={{justifyContent: 'flex-start', alignItems: 'center'}}>
            <Entypo
              name="location"
              color={colors.primary}
              size={mvs(16)}
              style={{marginTop: mvs(6)}}
            />
            <Medium
              label={item?.service?.address}
              style={{...styles.address, marginLeft: mvs(6)}}
            />
          </Row>
          {/* <Medium label={'sjdjksdghjksah'} style={styles.address} /> */}
        </View>
      </Row>
      <Row style={styles.timeRow}>
        <View style={styles.alignItems}>
          <Row style={styles.alignItems}>
            <Medium label={t(`check_in`)} style={styles.label} />
            <Feather name={'log-in'} size={15} color={colors.green} />
          </Row>
          <Medium
            label={`${moment(item?.start_date).format('ll')}`}
            style={styles.slotTime}
            color={colors.primary}
          />
        </View>
        <View style={styles.alignItems}>
          <Row style={styles.alignItems}>
            <Medium label={t(`check_out`)} style={styles.label} />
            <Feather name={'log-out'} size={15} color={colors.red} />
          </Row>
          <Medium
            label={moment(item?.end_date).format('ll')}
            style={styles.slotTime}
            color={colors.primary}
          />
        </View>
      </Row>

      <Row
        style={{
          paddingHorizontal: mvs(10),
          alignItems: 'center',
        }}>
        <Medium label={t('Duration')} fontSize={mvs(14)} />
        <Medium
          label={
            `${item?.duration_nights} ${t('Nights')}` || `1 ${t('Nights')}`
          }
          style={styles.label}
          color={colors.primary}
        />
      </Row>

      <View
        style={{
          paddingHorizontal: mvs(10),
          paddingVertical: mvs(10),

          borderRadius: mvs(6),
          backgroundColor: colors.white,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Row
          style={{
            // paddingHorizontal: mvs(10),
            alignItems: 'center',
          }}>
          <Medium label={'Total'} fontSize={mvs(14)} />
          <Medium
            label={`$${item?.total}`}
            style={styles.label}
            color={colors.red}
          />
        </Row>
        <Row
          style={{
            // paddingHorizontal: mvs(10),
            alignItems: 'center',
          }}>
          <Medium label={t('Paid')} fontSize={mvs(14)} />
          <Medium
            label={`$${item?.paid || '0'} `}
            style={styles.label}
            color={colors.red}
          />
        </Row>
        <Row
          style={{
            // paddingHorizontal: mvs(10),
            alignItems: 'center',
          }}>
          <Medium label={t('Remain')} fontSize={mvs(14)} />
          <Medium
            label={`$${item?.total - item?.paid} `}
            style={styles.label}
            color={colors.red}
          />
        </Row>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(AppointmentCard);
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(10),
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    marginBottom: mvs(15),
    justifyContent: 'center',
    ...colors.shadow,
  },
  label: {
    fontSize: mvs(12),
  },
  leftContainer: {flex: 1, paddingVertical: mvs(10)},
  btnText: {color: colors.primary},
  btn: {
    width: '48%',
    height: mvs(38),
    backgroundColor: colors.white,
    borderWidth: 0.7,
    borderRadius: mvs(10),
    borderColor: colors.primary,
  },
  btnDetails: {width: '48%', height: mvs(38), borderRadius: mvs(10)},
  alignItems: {alignItems: 'center'},
  timeRow: {
    marginTop: mvs(10),
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
  },
  slotTime: {lineHeight: mvs(20), marginLeft: mvs(10)},
  imgContainer: {
    backgroundColor: colors.secondary,
    height: mvs(27),
    width: mvs(27),
    borderRadius: mvs(5),
    overflow: 'hidden',
  },
  img: {
    height: mvs(72),
    width: mvs(72),
    borderRadius: mvs(36),
    marginRight: mvs(10),
    resizeMode: 'cover',
    // backgroundColor: 'red',
  },
  name: {fontSize: mvs(16), lineHeight: mvs(24), flex: 1},
  status: {fontSize: mvs(13), color: colors.primary},
  address: {fontSize: mvs(16), lineHeight: mvs(20), marginTop: mvs(10)},
});
