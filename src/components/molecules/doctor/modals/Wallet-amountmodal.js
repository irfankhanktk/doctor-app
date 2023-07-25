import {colors} from 'config/colors';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {onAddAmount} from 'services/api/auth-api-actions';
import i18n from 'translation';
import PrimaryInput from 'components/atoms/inputs';
import {mvs} from 'config/metrices';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {CrossModal} from 'assets/doctor/icons';
import {PrimaryButton} from 'components/atoms/buttons';
import {UTILS} from 'utils';
const WalletAmount = ({
  style,
  email,
  visible = false,
  value,
  setValue,
  userInfo,
  isSubmited,
  onClose = item => {},
}) => {
  const {t} = i18n;
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async () => {
    try {
      if (!userInfo?.transaction_id) {
        onClose();
        navigate('PaymentGatewayScreen', {amount: value});

        return;
      }
      setLoading(true);
      await onAddAmount({
        payable_type: userInfo?.role?.name,
        user_id: userInfo?.id,
        transaction_id: userInfo?.transaction_id,
      });
      isSubmited();
      onClose();
      setLoading(false);
    } catch (error) {
      console.log('error=>', error);
      Alert.alert('Error', UTILS.returnError(error));
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

        <View style={styles.otp}>
          <PrimaryInput
            keyboardType={'number-pad'}
            editable={!userInfo?.transaction_id}
            value={`${value?.amount}`}
            label={t('add_amount')}
            placeholder={t('add_amount')}
            onChangeText={setValue}
            // onBlur={() => setFieldTouched('email', true)}
            value={value}
          />
          <PrimaryButton
            loading={loading}
            onPress={() => onSubmit()}
            title={t(!userInfo?.transaction_id ? 'add_amount' : 'submit')}
            containerStyle={{marginTop: mvs(20)}}
          />
        </View>
      </View>
    </ModalWrapper>
  );
};
export default WalletAmount;
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
    borderRadius: mvs(20),
  },
  otp: {paddingHorizontal: mvs(20), marginTop: mvs(20)},
  header: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  msg: {
    textAlign: 'center',
    alignSelf: 'center',
    width: mvs(250),
    fontSize: mvs(20),
  },
  button: {
    paddingHorizontal: mvs(30),
    marginBottom: mvs(20),
  },
  cross: {padding: mvs(20), alignSelf: 'flex-end', position: 'absolute'},
});
