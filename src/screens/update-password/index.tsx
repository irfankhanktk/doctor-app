import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PrimaryButton } from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import { useFormik } from 'formik';
import { useAppDispatch } from 'hooks/use-store';
import { t } from 'i18next';
import React from 'react';
import { View } from 'react-native';
import { onUpdatePassword } from 'services/api/auth-api-actions';
import { updatePasswordValidation } from 'validations';
import RootStackParamList from '../../types/navigation-types/root-stack';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const UpdatePassword = (props: props) => {
  const { navigation } = props;
  const dispatch = useAppDispatch();
  const initialValues = {
    new_password: '',
    old_password: '',
  };
  const [loading, setLoading] = React.useState(false);
  const { values, errors, touched, setFieldValue, setFieldTouched, isValid } =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: true,
      validationSchema: updatePasswordValidation,
      onSubmit: () => { },
    });
  return (
    <View style={styles.container}>
      <Header1x2x back={true} isSearch={false} title={t('update_password')} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          isPassword
          error={
            touched?.old_password && errors?.old_password
              ? `${t(errors?.old_password)}`
              : undefined
          }
          placeholder={'********'}
          label={t('old_password')}
          onChangeText={str => setFieldValue('old_password', str)}
          onBlur={() => setFieldTouched('old_password', true)}
          value={values.old_password}
        />
        <PrimaryInput
          isPassword
          error={
            touched?.new_password && errors?.new_password
              ?`${t(errors?.new_password)}`
              : undefined
          }
          placeholder={'********'}
          label={t('confirm_password')}
          onChangeText={str => setFieldValue('new_password', str)}
          onBlur={() => setFieldTouched('new_password', true)}
          value={values.new_password}
        />
        <PrimaryButton
          loading={loading}
          disabled={
            Object.keys(errors)?.length > 0 ||
            Object.keys(touched)?.length === 0
          }
          title={t('update')}
          onPress={() => dispatch(onUpdatePassword(values, setLoading, props))}
          containerStyle={styles.button}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default UpdatePassword;
