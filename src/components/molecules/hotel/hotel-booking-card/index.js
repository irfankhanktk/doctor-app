import {Hotels_Bg} from 'assets/car/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {InputWithIcon} from 'components/atoms/inputs';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {BOOKING_STATUSES, DATE_FORMAT} from 'config/constants';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
const AppointmentCard = ({
  item,
  style,
  onChangeStatus,
  onPress = () => {},
  onInvoice = () => {},
  onPaid = () => {},
}) => {
  const {t} = i18n;
  const items = BOOKING_STATUSES;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Row
        style={{
          alignItems: 'center',
        }}>
        <Medium
          label={`${t('booking_id')}${':'} ${item?.id}`}
          fontSize={mvs(20)}
          color={colors.primary}
        />
        <InputWithIcon
          containerStyle={styles.statusContainer}
          value={`${item?.status}`}
          items={items}
          onChangeText={onChangeStatus}
          id={
            BOOKING_STATUSES?.find(
              x => x?.title?.toLowerCase() == item?.status?.toLowerCase(),
            )?.id
          }
        />
      </Row>
      <Row style={{justifyContent: 'flex-start'}}>
        <Image
          source={
            item?.service?.image ? {uri: item?.service?.image} : Hotels_Bg
          }
          style={styles.img}
        />
        <View style={{flex: 1}}>
          <Regular label={`${item?.first_name} ${item?.last_name}`} />
          <Regular numberOfLines={1} label={item?.email} />
        </View>
      </Row>
      <Row style={{marginTop: mvs(10)}}>
        <PrimaryButton
          onPress={onInvoice}
          title={t('invoice')}
          containerStyle={{
            width: '48%',
            height: mvs(40),
            borderRadius: mvs(5),
          }}
        />
        <PrimaryButton
          onPress={onPaid}
          title={t('set_paid')}
          containerStyle={{
            width: '48%',
            height: mvs(40),
            borderRadius: mvs(5),
          }}
        />
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
        <Medium label={t('order_date')} fontSize={mvs(14)} />
        <Medium
          label={moment(item?.created_at).format(DATE_FORMAT.mmm_dd_yyyy)}
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
          <Medium label={t('total')} fontSize={mvs(14)} />
          <Medium
            label={`SR ${item?.total}`}
            style={styles.label}
            color={colors.red}
          />
        </Row>
        <Row
          style={{
            // paddingHorizontal: mvs(10),
            alignItems: 'center',
          }}>
          <Medium label={t('paid')} fontSize={mvs(14)} />
          <Medium
            label={`SR ${item?.paid || '0'} `}
            style={styles.label}
            color={colors.red}
          />
        </Row>
        <Row
          style={{
            // paddingHorizontal: mvs(10),
            alignItems: 'center',
          }}>
          <Medium label={t('remain')} fontSize={mvs(14)} />
          <Medium
            label={`SR ${item?.total - item?.paid} `}
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
  statusContainer: {
    borderWidth: 1,
    alignItems: 'center',
    // marginLeft: mvs(15),
    borderColor: colors.primary,
    borderRadius: mvs(5),
    width: mvs(150),
    marginBottom: mvs(0),
    height: mvs(30),
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
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(36),
    marginRight: mvs(10),
    resizeMode: 'cover',
    // backgroundColor: 'red',
  },
  name: {fontSize: mvs(16), lineHeight: mvs(24), flex: 1},
  status: {fontSize: mvs(13), color: colors.primary},
  address: {fontSize: mvs(16), lineHeight: mvs(20), marginTop: mvs(10)},
});
