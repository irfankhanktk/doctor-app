import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RenewLogo } from 'assets/doctor/icons';
import { PrimaryButton } from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import OtpModalRenewPassword from 'components/molecules/doctor/modals/otp-modal-signup-renewpassword.js';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import React from 'react';
import { View } from 'react-native';
import { onForgot } from 'services/api/doctor/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import { forgotemailFormValidation } from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
import { logo } from 'assets/doctor/images';
import { Image } from 'react-native';
import { mvs } from 'config/metrices';
type props = NativeStackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPassword = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const initialValues = {

    email: '',

  };
  const [loading, setLoading] = React.useState(false);
  // const [otpModal, setOtpModal] = React.useState(false);
  const [otpModalVisible, setOtpModalVisible] = React.useState(false);
  const [value, setValue] = React.useState('');
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: forgotemailFormValidation,
      onSubmit: () => { },
    });
  console.log('errors=>', errors);

  const onSubmit = async () => {
    try {
      if (isValid && Object.keys(touched).length > 0) {
        try {

          setLoading(true);
          const res = await onForgot(values);
          setOtpModalVisible(true);
        } catch (error) {
          console.log('error=>', error);

        }
      } else {
        setFieldTouched('email', true);

      }
    } catch (error) {
      console.log('error=>', error);

    } finally {
      setLoading(false)
    }
  };
  return (
    <View style={styles.container}>

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <Image
          source={logo}
          style={{ alignSelf: 'center', height: mvs(120), width: mvs(120) }}
        />
        <Bold label={`${t('forgot_password')}`} style={styles.txt} />
        <PrimaryInput
          keyboardType={'email-address'}
          error={touched?.email && errors?.email ? t(errors?.email) : ''}
          label={t('email')}
          placeholder={t('email')}
          onChangeText={str => setFieldValue('email', str)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email}
        />
        <PrimaryButton
          loading={loading}
          // disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
          title={t('send_email')}
          // onPress={() => dispatch(onSignup(values, setLoading, props))}
          onPress={onSubmit}
          containerStyle={styles.button}
        />
      </KeyboardAvoidScrollview>
      <OtpModalRenewPassword
        email={values?.email}
        value={value}
        setValue={setValue}
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        {...props}
        isSignup={false}
      />
    </View>
  );
};
export default ForgotPassword;
