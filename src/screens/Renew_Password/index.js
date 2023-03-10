import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {PrimaryPhoneInput} from 'components/atoms/inputs';
import {mvs} from 'config/metrices';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import {KeyboardAvoidScrollview} from '../../components/atoms/keyboard-avoid-scrollview/index';
import styles from './styles';
import PrimaryInput from '../../components/atoms/inputs';
import {useFormik} from 'formik';
import {
  forgotemailFormValidation,
  renewpasswordFormValidation,
  signinFormValidation,
  signupFormValidation,
} from 'validations';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import {onChangePassword, onLogin} from 'services/api/api-actions';
import {OtpInput} from 'components/molecules/otp-input';
import OtpModal from 'components/molecules/modals/otp-modal';
import i18n from 'translation';
import messaging from '@react-native-firebase/messaging';
import {onForgot} from 'services/api/api-actions';
const RenewPasswordScreen = props => {
  const dispatch = useAppDispatch();

  const {email} = props?.route?.params;

  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    // email: '',
    password: '',
    confirm_password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: renewpasswordFormValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      const res = await onChangePassword({...values, email});
      Alert.alert('Password is Changed Successfully');
      navigate('Login');
      console.log('res===>>>>> onchangepassword', res);
      // setOtpModalVisible(true);
    } catch (error) {
      console.log('error=>', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x title={t('renew_password')} />
      <View style={styles.container}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.contentContainerStyle}>
          <Medium fontSize={mvs(20)} label={t('renew_password')} />
          {/* <Regular
            fontSize={mvs(15)}
            label={t('no_account')}
            style={{marginTop: mvs(12), marginBottom: mvs(30)}}
          /> */}

          <PrimaryInput
            isPassword
            error={
              touched?.password && errors?.password
                ? `${t(errors?.password)}`
                : undefined
            }
            placeholder={t('password_place')}
            label={t('password')}
            onChangeText={str => setFieldValue('password', str)}
            onBlur={() => setFieldTouched('password', true)}
            value={values.password}
          />
          <PrimaryInput
            isPassword
            error={
              touched?.confirm_password && errors?.confirm_password
                ? `${t(errors?.confirm_password)}`
                : undefined
            }
            placeholder={t('password_place')}
            label={t('confirm_password')}
            onChangeText={str => setFieldValue('confirm_password', str)}
            onBlur={() => setFieldTouched('confirm_password', true)}
            value={values.confirm_password}
          />
          <PrimaryButton
            // disabled={
            //   Object.keys(errors).length > 0 ||
            //   Object.keys(touched).length === 0
            // }
            loading={loading}
            onPress={onSubmit}
            title={t('set_password')}
          />

          {/* <TouchableOpacity
            style={{alignSelf: 'center', marginTop: mvs(20)}}
            onPress={() => navigate('Signup')}>
            <Medium
              label={t('dont_have_account')}
              style={{textDecorationLine: 'underline'}}
            />
          </TouchableOpacity> */}
          <OtpModal
            email={values?.email}
            onClose={() => setOtpModalVisible(false)}
            visible={otpModalVisible}
            setValue={setValue}
            value={value}
          />
          {/* <PrimaryPhoneInput value={phone} onChangeText={setPhone} getCallingCode={(code) => { }} /> */}
        </KeyboardAvoidScrollview>
        {/* <View style={styles.button}>
        </View> */}
      </View>
    </View>
  );
};
export default RenewPasswordScreen;
