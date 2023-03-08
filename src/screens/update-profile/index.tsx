import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { DatePicker } from 'components/atoms/date-picker';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { useFormik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { onUpdateProfile } from 'services/api/api-actions';
import i18n from 'translation';
import { updateProfileFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import PrimaryInput, { PrimaryPhoneInput } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'UpdateProfile'>;

const UpdateProfile = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const { userInfo } = useAppSelector(s => s?.user)
  const dispatch = useAppDispatch();
  const initialValues = userInfo ?? {};
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: updateProfileFormValidation,
      onSubmit: () => { },
    });
  console.log('errors=>', errors);
  React.useEffect(() => {
    setFieldTouched('first_name', true);
    setFieldTouched('email', true);
    setFieldTouched('phone', true);
  }, [])
  return (
    <View style={styles.container}>
      <Header1x2x isSearch={false} title={t('update_profile')} />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          error={errors?.first_name && touched?.first_name ? `${t(errors?.first_name?.toString())}` : ''}
          label={t('first_name')}
          placeholder={t('first_name')}
          onChangeText={(str) => setFieldValue('first_name', str)}
          onBlur={() => setFieldTouched('first_name', true)}
          value={values.first_name} />
        <PrimaryInput
          error={errors?.last_name && touched?.last_name ? `${t(errors?.last_name?.toString())}` : ''}
          label={t('last_name')}
          placeholder={t('last_name')}
          onChangeText={(str) => setFieldValue('last_name', str)}
          value={values.last_name} />
        <PrimaryPhoneInput
          error={errors?.last_name && touched?.last_name ? `${errors?.phone}` : ''}
          label={t('phone')}
          placeholder={t('phone')}
          onChangeText={(str) => setFieldValue('phone', str)}
          onBlur={() => setFieldTouched('phone', true)}
          value={values.phone} />
        <DatePicker onChangeText={(str: string) => setFieldValue('birthday', str)}>
          <PrimaryInput
            editable={false}
            error={errors?.birthday && touched?.birthday ? `${errors?.birthday}` : ''}
            label={t('birthday')}
            placeholder={t('birthday')}
            onChangeText={(str) => setFieldValue('birthday', str)}
            value={values.birthday} />
        </DatePicker>
        <PrimaryInput
          error={errors?.bio && touched?.bio ? `${errors?.bio}` : ''}
          label={t('bio')}
          placeholder={t('bio')}
          onChangeText={(str) => setFieldValue('bio', str)}
          value={values.bio || ''} />
        <PrimaryInput
          error={errors?.city && touched?.city ? `${errors?.city}` : ''}
          label={t('city')}
          placeholder={t('city')}
          onChangeText={(str) => setFieldValue('city', str)}
          value={values.city || ''} />
        <PrimaryInput
          error={errors?.state && touched?.state ? `${errors?.state}` : ''}
          label={t('state')}
          placeholder={t('state')}
          onChangeText={(str) => setFieldValue('state', str)}
          value={values.state || ''} />
        <PrimaryInput
          error={errors?.country && touched?.country ? `${errors?.country}` : ''}
          label={t('country')}
          placeholder={t('country')}
          onChangeText={(str) => setFieldValue('country', str)}
          value={values.country || ''} />
        <PrimaryInput
          error={errors?.zip_code && touched?.zip_code ? `${errors?.zip_code}` : ''}
          label={t('zip_code')}
          placeholder={t('zip_code')}
          onChangeText={(str) => setFieldValue('zip_code', str)}
          value={`${values.zip_code}` || ''} />
        <PrimaryButton
          loading={loading}
          disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
          title={t('save')}
          onPress={() => dispatch(onUpdateProfile(values, setLoading, props))}
          containerStyle={styles.button} />
      </KeyboardAvoidScrollview>
    </View>

  );
};
export default UpdateProfile;
