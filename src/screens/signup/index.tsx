import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useFormik } from 'formik';
import React from 'react';
import { Alert, Linking, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
import { onSignup } from 'services/api/api-actions';
import i18n from 'translation';
import { UTILS } from '../../utils';
import { signupFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import PrimaryInput, { InputWithIcon, PrimaryPhoneInput } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
import messaging from '@react-native-firebase/messaging';
Geocoder.init("AIzaSyCbFQqjZgQOWRMuQ_RpXU0kGAUIfJhDw98");

type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const Signup = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const { doctor, user } = useAppSelector(s => s);
  const { location } = user;
  const { spec_categories } = doctor;
  console.log('location=>>>', location);

  const dispatch = useAppDispatch();
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    confirm_password: '',
    password: '',
    token: '',
    doc_cat_id: '',
    city: '',
    state: '',
    country: '',
    zip_code: '',
    map_lat: '',
    map_lng: '',
    price: '',
    experience: 0,
    min_day_before_booking: 0,
    min_day_stays: 0,
    enable_service_fee: 0,
    // bio: null,
  };
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: signupFormValidation,
      onSubmit: () => { },
    });

  console.log('errors=>', errors);
  console.log('values=>', values);
  React.useEffect(() => {
    Geocoder.from(location?.latitude || '', location?.longitude || '')
      .then(async json => {
        var addressComponent = UTILS._returnAddress(json);
        // console.log('addressComponent=>', addressComponent);
        setFieldValue('map_lat', location?.latitude)
        setFieldValue('map_lng', location?.longitude)
        setFieldValue('city', addressComponent?.city)
        setFieldValue('state', addressComponent?.province)
        setFieldValue('country', addressComponent?.country)
      })
      .catch(error => {
        console.warn(error);
      });
  }, [])
  const onSubmit = async () => {
    try {
      if (!location) {

        Alert.alert('Location', 'It seems you have not authorized location', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Setting', onPress: () => Linking.openSettings() },
        ])
        return
      }
      messaging().getToken().then(fcmToken => {
        console.log('fcmToken=>', fcmToken);
        dispatch(onSignup({ ...values, token: fcmToken }, setLoading, props))
      }).catch((error) => console.log(error))
    } catch (error) {
      console.log('error=>', error);
    }
  }

  return (
    <View style={styles.container}>
      <Header1x2x title={t('signup')} />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          error={touched?.name && errors?.name ? t(errors?.name) : ''}
          label={t('name')}
          placeholder={t('name')}
          onChangeText={(str) => setFieldValue('name', str)}
          onBlur={() => setFieldTouched('name', true)}
          value={values.name} />
        <PrimaryInput
          keyboardType={'email-address'}
          error={touched?.email && errors?.email ? t(errors?.email) : ''}
          label={t('email')}
          placeholder={t('email')}
          onChangeText={(str) => setFieldValue('email', str)}
          onBlur={() => setFieldTouched('email', true)}
          value={values.email} />
        <PrimaryPhoneInput
          error={errors?.phone && touched?.phone ? `${t(errors?.phone)}` : ''}
          label={t('phone')}
          placeholder={t('phone_no')}
          onChangeText={(str) => { setFieldValue('phone', str); setFieldTouched('phone', true) }}
          onBlur={() => setFieldTouched('phone', true)}
          value={values.phone} />
        <PrimaryInput
          isPassword
          error={
            touched?.password && errors?.password
              ? t(errors?.password)
              : undefined
          }
          placeholder={'********'}
          label={t('password')}
          onChangeText={(str) => setFieldValue('password', str)}
          onBlur={() => setFieldTouched('password', true)}
          value={values.password} />
        <PrimaryInput
          isPassword
          error={
            touched?.confirm_password && errors?.confirm_password
              ? t(errors?.confirm_password)
              : undefined
          }
          placeholder={'********'}
          label={t('confirm_pass')}
          onChangeText={(str) => setFieldValue('confirm_password', str)}
          onBlur={() => setFieldTouched('confirm_password', true)}
          value={values.confirm_password} />
        <InputWithIcon
          label={'choose_category'}
          error={errors?.doc_cat_id && touched?.doc_cat_id ? errors?.doc_cat_id : ''}
          items={spec_categories}
          onChangeText={(str) => {
            setFieldValue('doc_cat_id', str);
          }}
          onBlur={() => setFieldTouched('doc_cat_id', true)}
          id={values?.doc_cat_id}
          value={spec_categories?.find(x => x?.id === values?.doc_cat_id)?.title} />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.zip_code && errors?.zip_code ? t(errors?.zip_code) : ''}
          label={t('zip_code')}
          placeholder={t('zip_code')}
          onChangeText={(str) => setFieldValue('zip_code', str)}
          onBlur={() => setFieldTouched('zip_code', true)}
          value={`${values.zip_code}`} />
        <PrimaryInput
          error={touched?.city && errors?.city ? t(errors?.city) : ''}
          label={t('city')}
          placeholder={t('city')}
          onChangeText={(str) => setFieldValue('city', str)}
          onBlur={() => setFieldTouched('city', true)}
          value={`${values.city}`} />
        <PrimaryInput
          error={touched?.state && errors?.state ? t(errors?.state) : ''}
          label={t('state')}
          placeholder={t('state')}
          onChangeText={(str) => setFieldValue('state', str)}
          onBlur={() => setFieldTouched('state', true)}
          value={`${values.state}`} />
        <PrimaryInput
          error={touched?.country && errors?.country ? t(errors?.country) : ''}
          label={t('country')}
          placeholder={t('country')}
          onChangeText={(str) => setFieldValue('country', str)}
          onBlur={() => setFieldTouched('country', true)}
          value={`${values.country}`} />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.price && errors?.price ? t(errors?.price) : ''}
          label={t('price')}
          placeholder={t('price')}
          onChangeText={(str) => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={`${values.price}`} />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.experience && errors?.experience ? t(errors?.experience) : ''}
          label={t('experience')}
          placeholder={t('experience')}
          onChangeText={(str) => setFieldValue('experience', str)}
          onBlur={() => setFieldTouched('experience', true)}
          value={`${values.experience}`} />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.min_day_before_booking && errors?.min_day_before_booking ? t(errors?.min_day_before_booking) : ''}
          label={t('min_day_before_booking')}
          placeholder={t('min_day_before_booking')}
          onChangeText={(str) => setFieldValue('min_day_before_booking', str)}
          onBlur={() => setFieldTouched('min_day_before_booking', true)}
          value={`${values.min_day_before_booking}`} />
        <PrimaryInput
          keyboardType={'numeric'}
          error={touched?.min_day_stays && errors?.min_day_stays ? t(errors?.min_day_stays) : ''}
          label={t('min_day_stays')}
          placeholder={t('min_day_stays')}
          onChangeText={(str) => setFieldValue('min_day_stays', str)}
          onBlur={() => setFieldTouched('min_day_stays', true)}
          value={`${values.min_day_stays}`} />
        <Medium style={styles.accountText} onPress={props?.navigation?.goBack}
          label={`${t('already_acc')}`} />
        <PrimaryButton
          loading={loading}
          disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
          title={t('signup')}
          onPress={onSubmit}
          containerStyle={styles.button} />
      </KeyboardAvoidScrollview>
      {/* </ImageBackground> */}
    </View>

  );
};
export default Signup;
