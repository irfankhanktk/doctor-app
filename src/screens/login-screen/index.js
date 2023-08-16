import messaging from '@react-native-firebase/messaging';
import {PrimaryButton} from 'components/atoms/buttons';
import OtpModal from 'components/molecules/doctor/modals/otp-modal';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import React from 'react';
import {Alert, Linking, TouchableOpacity, View} from 'react-native';

import {SplashIcon} from 'assets/doctor/icons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview/index';
import {onLogin} from 'services/api/auth-api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import {signinFormValidation} from 'validations';
import styles from './styles';
const LoginScreen = props => {
  const dispatch = useAppDispatch();
  const {t} = i18n;
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const initialValues = {
    email: '',
    password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signinFormValidation,
      onSubmit: () => {},
    });
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
      return true;
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
      return true;
    } else {
      console.log('User has notification permissions disabled');
      return false;
    }
  }
  const onSubmit = async () => {
    try {
      const flag = await checkApplicationPermission();
      // await messaging().registerDeviceForRemoteMessages();
      if (flag) {
        const fcmToken = await messaging().getToken();
        dispatch(onLogin({...values, token: fcmToken}, setLoading, props));
      } else {
        Alert.alert(
          'Error',
          'Enable push notifications from app setting first',
        );
        Linking.openSettings();
      }
    } catch (error) {
      console.log('error=>', error);
      Alert.alert('Error', 'Enable push notifications from app setting first');
    }
  };
  return (
    <View style={styles.container}>
      {/* <Header1x2x title={t('login')} /> */}
      <View style={styles.container}>
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.contentContainerStyle}>
          <SplashIcon style={{alignSelf: 'center'}} />
          <Bold label={t('login')} style={styles.txt} />
          <PrimaryInput
            keyboardType={'email-address'}
            error={
              touched?.email && errors?.email
                ? `${t(errors?.email)}`
                : undefined
            }
            label={t('email')}
            placeholder={t('email')}
            onChangeText={str => setFieldValue('email', str)}
            onBlur={() => setFieldTouched('email', true)}
            value={values.email}
          />
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
            containerStyle={{marginBottom: 0}}
            errorStyle={{marginBottom: 0}}
          />
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginBottom: mvs(15)}}
            onPress={() => navigate('ForgotPassword')}>
            <Medium
              label={t('forgot_password')}
              style={{textDecorationLine: 'underline'}}
            />
          </TouchableOpacity>
          <PrimaryButton
            disabled={
              Object.keys(errors).length > 0 ||
              Object.keys(touched).length === 0
            }
            loading={loading}
            onPress={onSubmit}
            title={t('login')}
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
            onClose={() => setOtpModalVisible(false)}
            visible={otpModalVisible}
            setValue={setValue}
            value={value}
          />
        </KeyboardAvoidScrollview>
        {/* <View style={styles.button}>
        </View> */}
      </View>
    </View>
  );
};
export default LoginScreen;
