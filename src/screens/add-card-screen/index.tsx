import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { auth_bg, credit_bg } from 'assets/images';
import { DatePicker } from 'components/atoms/date-picker';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { colors } from 'config/colors';
import { height, mvs, width } from 'config/metrices';
import { useFormik } from 'formik';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import { onSignup } from 'services/api/api-actions';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import { signupFormValidation } from 'validations';
import { PrimaryButton } from '../../components/atoms/buttons';
import PrimaryInput, { PrimaryPhoneInput } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch } from '../../hooks/use-store';
import RootStackParamList from '../../types/navigation-types/root-stack';
import Medium from '../../typography/medium-text';
import styles from './styles';
type props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const AddCard = (props: props) => {
  const { navigation } = props;
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const initialValues = {
    name: '',
    cvc: '',
    card_number: '',
    expiry: '',
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

  return (
    <View style={styles.container}>
      <ImageBackground source={credit_bg} style={{
        height: height,
        width: width,
      }}>
        <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
          <Bold label={`${t('Add a Credit or debit card')}`} style={{ fontSize: mvs(20), alignSelf: 'center', marginBottom: mvs(25), color: colors.primary }} />
          <PrimaryInput
            error={touched?.card_number && errors?.card_number ? t(errors?.card_number) : ''}
            label={t('card_number')}
            placeholder={t('card_number')}
            onChangeText={(str) => setFieldValue('card_number', str)}
            onBlur={() => setFieldTouched('card_number', true)}
            value={values.card_number} />
          <PrimaryInput
            error={touched?.expiry && errors?.expiry ? t(errors?.expiry) : ''}
            label={t('expiry')}
            placeholder={t('MM/YYYY')}
            onChangeText={(str) => setFieldValue('expiry', str)}
            onBlur={() => setFieldTouched('expiry', true)}
            value={values.expiry} />
          <PrimaryInput
            error={touched?.cvc && errors?.cvc ? t(errors?.cvc) : ''}
            label={t('cvc')}
            placeholder={t('cvc')}
            onChangeText={(str) => setFieldValue('cvc', str)}
            onBlur={() => setFieldTouched('cvc', true)}
            value={values.cvc} />
          <PrimaryInput
            error={touched?.name && errors?.name ? t(errors?.name) : ''}
            label={t('name')}
            placeholder={t('name')}
            onChangeText={(str) => setFieldValue('name', str)}
            onBlur={() => setFieldTouched('name', true)}
            value={values.name} />
          <PrimaryButton
            loading={loading}
            disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
            title={t('done')}
            onPress={() => dispatch(onSignup(values, setLoading, props))}
            containerStyle={styles.button} />
        </KeyboardAvoidScrollview>
      </ImageBackground>
    </View>

  );
};
export default AddCard;
