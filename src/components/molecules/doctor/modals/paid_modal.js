import {CrossModal} from 'assets/doctor/icons';
import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {paidBookingAmount} from 'services/api/hotel/api-actions';
import i18n from 'translation';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
const PaidAmountModal = ({
  style,
  email,
  visible = false,
  bookingItem,
  setBookingItem,
  userInfo,
  isSubmited,
  onClose = item => {},
}) => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);

  const [remain, setRemain] = React.useState(bookingItem?.pay_now);
  React.useEffect(() => {
    setRemain(bookingItem?.pay_now);
  }, [bookingItem?.pay_now]);

  const data = {
    remain: remain,
    id: bookingItem?.id,
  };
  const onSubmit = async () => {
    try {
      setLoading(true);
      await paidBookingAmount(data);
      onClose();
    } catch (error) {
      console.log('error=>', error);
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalWrapper
      onBackdropPress={() => onClose()}
      onBackButtonPress={() => onClose()}
      visible={visible}
      style={[styles.contentContainerStyle, style]}>
      <View style={styles.container}>
        <View style={styles.header} />
        <TouchableOpacity onPress={() => onClose()} style={styles.cross}>
          <CrossModal height={mvs(30)} width={mvs(30)} />
        </TouchableOpacity>
        <View style={{paddingHorizontal: mvs(20)}}>
          <Regular
            label={`${t('booking_id')}${': #'} ${bookingItem?.id}`}
            fontSize={mvs(18)}
            color={colors.black}
          />
          <Row style={{marginTop: mvs(25)}}>
            <Regular color={colors.black} label={`${t('total')} ${':'} `} />
            <Regular
              color={colors.black}
              label={`${bookingItem?.total} ${'SR'}`}
            />
          </Row>
          <Row>
            <Regular color={colors.black} label={`${t('paid')} ${':'} `} />
            <Regular
              color={colors.black}
              label={`${bookingItem?.paid} ${'SR'}`}
            />
          </Row>
          <Row style={{alignItems: 'center'}}>
            <Regular color={colors.black} label={`${t('remain')} ${':'} `} />
            <PrimaryInput
              editable={bookingItem?.paid != bookingItem?.total}
              keyboardType="numeric"
              containerStyle={styles.remainInputContainer}
              style={{height: mvs(30)}}
              placeholder="00 SR"
              onChangeText={str =>
                setRemain(str <= bookingItem?.total * 1 ? str : remain)
              }
              value={remain}
            />
          </Row>

          <PrimaryButton
            disabled={bookingItem?.paid == bookingItem?.total}
            onPress={() => onSubmit()}
            loading={loading}
            title={t('save')}
            containerStyle={styles.buttonContiner}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};
export default PaidAmountModal;
const styles = StyleSheet.create({
  contentContainerStyle: {
    width: '100%',
    backgroundColor: colors.transparent,
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: mvs(20),
  },
  container: {
    // height: mvs(300),
    backgroundColor: colors.white,
    paddingVertical: mvs(15),
    borderRadius: mvs(10),
  },
  buttonContiner: {
    height: mvs(40),
    borderRadius: mvs(5),
  },
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  remainInputContainer: {
    borderWidth: mvs(1),
    width: mvs(140),
    height: mvs(40),
  },
  cross: {
    padding: mvs(20),
    alignSelf: 'flex-end',
    position: 'absolute',
  },
});
