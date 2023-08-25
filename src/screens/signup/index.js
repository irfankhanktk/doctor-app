import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Formik} from 'formik';
import React from 'react';
import {View} from 'react-native';

import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput, {InputWithIcon} from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {getRoles, onSignup} from 'services/api/auth-api-actions';
import i18n from 'translation';
import {signupFormValidation} from 'validations';
import styles from './styles';

const Signup = props => {
  const {t} = i18n;
  const {user} = useAppSelector(s => s);

  const dispatch = useAppDispatch();
  const initialValues = {
    first_name: '',
    last_name: '',
    business_name: '',
    email: '',
    password: '',
    confirm_password: '',
    term: true,
    phone: '',
    role: 4,
  };
  const [loading, setLoading] = React.useState(false);
  const [roles, setRoles] = React.useState([]);

  const handleFormSubmit = async values => {
    dispatch(onSignup(values, setLoading));
  };
  const getUserRoles = async () => {
    try {
      const res = await getRoles();
      console.log('res:::', res);
      setRoles(res?.roles || []);
    } catch (error) {}
  };
  React.useEffect(() => {
    getUserRoles();
  }, []);
  return (
    <View style={styles.container}>
      <Header1x2x back title={t('signup')} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <Formik
          initialValues={initialValues}
          validationSchema={signupFormValidation}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            touched,
            values,
            errors,
          }) => (
            <View>
              <PrimaryInput
                error={touched?.first_name ? t(errors.first_name) : ''}
                label={t('first_name')}
                placeholder={t('first_name')}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
              />
              <PrimaryInput
                error={touched?.last_name ? t(errors.last_name) : ''}
                label={t('last_name')}
                placeholder={t('last_name')}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
              />
              <PrimaryInput
                error={touched?.business_name ? t(errors.business_name) : ''}
                label={t('business_name')}
                placeholder={t('business_name')}
                onChangeText={handleChange('business_name')}
                onBlur={handleBlur('business_name')}
                value={values.business_name}
              />
              <PrimaryInput
                keyboardType={'email-address'}
                error={touched?.email ? t(`${errors?.email || ''}`) : ''}
                label={t('email')}
                placeholder={t('email')}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />

              <PrimaryInput
                error={touched?.phone ? t(errors.phone) : ''}
                label={t('phone')}
                placeholder={t('phone')}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
              />
              <InputWithIcon
                label={t('role')}
                value={roles?.find(x => x?.id == values?.role)?.name || ''}
                id={values?.role}
                onChangeText={handleChange('role')}
                items={roles?.map(x => ({...x, title: x?.name}))}
              />
              <PrimaryInput
                isPassword
                error={touched?.password ? t(errors?.password) : ''}
                placeholder={'********'}
                label={t('password')}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <PrimaryInput
                isPassword
                error={
                  touched?.confirm_password
                    ? t(`${errors?.confirm_password || ''}`)
                    : ''
                }
                placeholder={'********'}
                label={t('confirm_pass')}
                onChangeText={handleChange('confirm_password')}
                value={values.confirm_password}
              />

              <PrimaryButton
                loading={loading}
                onPress={handleSubmit}
                title={t('signup')}
              />
            </View>
          )}
        </Formik>
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default Signup;
