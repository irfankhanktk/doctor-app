import Header1x2x from 'components/atoms/headers/header-1x-2x';
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {useFormik} from 'formik';
import {addPriceHotelValidation} from 'validations';
import PrimaryInput from 'components/atoms/inputs';
import Regular from 'typography/regular-text';
import {Checkbox} from 'components/atoms/checkbox';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {PrimaryButton} from 'components/atoms/buttons';
import {colors} from 'config/colors';
import ExtraPriceBottomSheetModal from 'components/molecules/hotel/dropdown-picker/extraPriceType';
import BuyerFeeBottomSheetModal from 'components/molecules/hotel/dropdown-picker/buyerFeeType';
const AddHotelPrice = props => {
  const {navigation} = props;
  // const index = 0;
  const [index, setIndex] = React.useState(0);
  const [buyerFeeIndex, setBuyerFeeIndex] = React.useState(0);
  const [extraPrice, setExteraPrice] = React.useState(false);
  const [buyerFeeType, setBuyerFeeType] = React.useState(false);
  const initialValues = {
    check_in: '',
    check_out: '',
    minimum_advance_reservation: '',
    minimum_day_stay: '',
    price: '',
    enable_extra_price: '0',
    extra_price: [
      {
        name: '',
        price: '',
        type: '',
        per_person: '0',
      },
    ],
    enable_service_fee: '0',
    buyer_fees: [
      {
        name: '',
        desc: '',
        price: '',
        type: '',
        per_person: '0',
      },
    ],
  };

  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: false,
      validationSchema: addPriceHotelValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      navigation?.navigate('AddHotelAttributes');
      // if (isValid && Object.keys(touched).length > 0) {
      //   try {
      //     Alert.alert('onsubmit');

      //   } catch (error) {
      //     console.log(error);
      //   }
      // } else {
      //   setFieldTouched('title', true);
      //   setFieldTouched('content', true);
      //   setFieldTouched('video_link', true);
      //   setFieldTouched('banner_image', true);
      //   setFieldTouched('hotel_rating', true);
      //   setFieldTouched('featured_image', true);
      // }
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const handleAddExtraPrice = () => {
    setFieldValue('extra_price', [
      ...values.extra_price,
      {name: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveExteraPrice = index => {
    const updatedExteraPrice = values.extra_price.filter((_, i) => i !== index);
    setFieldValue('extra_price', updatedExteraPrice);
  };
  const handleAddService = () => {
    setFieldValue('buyer_fees', [
      ...values.buyer_fees,
      {name: '', desc: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveService = index => {
    const updatedService = values.buyer_fees.filter((_, i) => i !== index);
    setFieldValue('buyer_fees', updatedService);
  };

  console.log('values me check===>', values);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('add_price')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          error={
            touched?.check_in && errors?.check_in
              ? `${t(errors?.check_in)}`
              : undefined
          }
          label={t('check_in')}
          placeholder={t('check_in_content')}
          onChangeText={str => setFieldValue('check_in', str)}
          onBlur={() => setFieldTouched('check_in', true)}
          value={values.check_in}
        />
        <PrimaryInput
          error={
            touched?.check_out && errors?.check_out
              ? `${t(errors?.check_out)}`
              : undefined
          }
          label={t('check_out')}
          placeholder={t('check_out_content')}
          onChangeText={str => setFieldValue('check_out', str)}
          onBlur={() => setFieldTouched('check_out', true)}
          value={values.check_out}
        />
        <PrimaryInput
          error={
            touched?.minimum_advance_reservation &&
            errors?.minimum_advance_reservation
              ? `${t(errors?.minimum_advance_reservation)}`
              : undefined
          }
          label={t('min_advance_reservation')}
          placeholder={t('0')}
          onChangeText={str =>
            setFieldValue('minimum_advance_reservation', str)
          }
          onBlur={() => setFieldTouched('minimum_advance_reservation', true)}
          value={values.minimum_advance_reservation}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />

        <PrimaryInput
          error={
            touched?.minimum_day_stay && errors?.minimum_day_stay
              ? `${t(errors?.minimum_day_stay)}`
              : undefined
          }
          label={t('min_day_stay')}
          placeholder={t('Ex: 2')}
          onChangeText={str => setFieldValue('minimum_day_stay', str)}
          onBlur={() => setFieldTouched('minimum_day_stay', true)}
          value={values.minimum_day_stay}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />
        <PrimaryInput
          error={
            touched?.price && errors?.price ? `${t(errors?.price)}` : undefined
          }
          label={t('price')}
          placeholder={t('hotel_price')}
          onChangeText={str => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={values.price}
        />
        <Row style={{justifyContent: 'flex-start'}}>
          <Checkbox
            checked={values.enable_extra_price === '1'}
            onPress={() =>
              setFieldValue(
                'enable_extra_price',
                values.enable_extra_price === '1' ? '0' : '1',
              )
            }
          />
          <Regular label={t('enable_price')} style={{marginLeft: mvs(10)}} />
        </Row>
        {values.enable_extra_price === '1' ? (
          <>
            {values?.extra_price.map((extra_price, index) => (
              <View style={styles.policyContainer} key={index}>
                {values?.extra_price?.length !== 1 && (
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => handleRemoveExteraPrice(index)}>
                    <MaterialCommunityIcons
                      name={'delete'}
                      color={colors.primary}
                      size={25}
                    />
                  </TouchableOpacity>
                )}
                <PrimaryInput
                  label={t('name')}
                  placeholder={t('extra_price_name')}
                  onChangeText={str =>
                    setFieldValue(`extra_price.${index}.name`, str)
                  }
                  onBlur={() => setFieldTouched(`extra_price.[0].name`, true)}
                  value={values.extra_price[index].name}
                  error={
                    touched?.extra_price &&
                    touched?.extra_price[index] &&
                    errors?.extra_price &&
                    errors?.extra_price[index] &&
                    `${t(errors.extra_price[0].name)}` &&
                    `${t(errors?.extra_price[0]?.name)}`
                  }
                />

                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str =>
                    setFieldValue(`extra_price.${index}.price`, str)
                  }
                  onBlur={() => setFieldTouched(`extra_price.[0].price`, true)}
                  value={values.extra_price[index].price}
                  error={
                    touched?.extra_price &&
                    touched?.extra_price[index] &&
                    errors?.extra_price &&
                    errors?.extra_price[0] &&
                    `${t(errors.extra_price[0]?.price)}` &&
                    `${t(errors?.extra_price[0]?.price)}`
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    setExteraPrice(true);
                    setIndex(index);
                  }}>
                  <PrimaryInput
                    label={t('type')}
                    placeholder={t('select')}
                    editable={false}
                    onChangeText={str =>
                      setFieldValue(`extra_price.${index}.type`, str)
                    }
                    onBlur={() => setFieldTouched(`extra_price.[0].type`, true)}
                    value={values.extra_price[index].type}
                    error={
                      touched?.extra_price &&
                      touched?.extra_price[index] &&
                      errors?.extra_price &&
                      errors?.extra_price[0] &&
                      `${t(errors.extra_price[0]?.type)}` &&
                      `${t(errors?.extra_price[0]?.type)}`
                    }
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={values.extra_price[index].per_person === '1'}
                    onPress={() =>
                      setFieldValue(
                        `extra_price.[${index}].per_person`,
                        values.extra_price[index].per_person === '1'
                          ? '0'
                          : '1',
                      )
                    }
                  />
                  <Regular
                    label={t('per_person')}
                    style={{marginLeft: mvs(10)}}
                  />
                </Row>
              </View>
            ))}
            <PrimaryButton
              title={'Add Item'}
              onPress={handleAddExtraPrice}
              containerStyle={styles.addItem}
              textStyle={{fontSize: mvs(12)}}
            />
          </>
        ) : null}
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
          <Checkbox
            checked={values.enable_service_fee === '1'}
            onPress={() =>
              setFieldValue(
                'enable_service_fee',
                values.enable_service_fee === '1' ? '0' : '1',
              )
            }
          />

          <Regular label={t('enable_extra')} style={{marginLeft: mvs(10)}} />
        </Row>
        {values.enable_service_fee === '1' ? (
          <>
            {values?.buyer_fees.map((buyer_fees, index) => (
              <View style={styles.enableServiceContainer} key={index}>
                {values?.buyer_fees?.length !== 1 && (
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={() => handleRemoveService(index)}>
                    <MaterialCommunityIcons
                      name={'delete'}
                      color={colors.primary}
                      size={25}
                    />
                  </TouchableOpacity>
                )}

                <PrimaryInput
                  label={t('name')}
                  placeholder={t('fee_name')}
                  onChangeText={str =>
                    setFieldValue(`buyer_fees.${index}.name`, str)
                  }
                  onBlur={() => setFieldTouched(`buyer_fees.[0].name`, true)}
                  value={values.buyer_fees[index].name}
                  error={
                    touched?.buyer_fees &&
                    touched?.buyer_fees[index] &&
                    errors?.buyer_fees &&
                    errors?.buyer_fees[index] &&
                    `${t(errors.buyer_fees[0].name)}` &&
                    `${t(errors?.buyer_fees[0]?.name)}`
                  }
                />

                <PrimaryInput
                  label={t('fee_description')}
                  placeholder={t('fee_desc')}
                  onChangeText={str =>
                    setFieldValue(`buyer_fees.${index}.desc`, str)
                  }
                  onBlur={() => setFieldTouched(`buyer_fees.[0].desc`, true)}
                  value={values.buyer_fees[index].desc}
                  error={
                    touched?.buyer_fees &&
                    touched?.buyer_fees[index] &&
                    errors?.buyer_fees &&
                    errors?.buyer_fees[0] &&
                    `${t(errors.buyer_fees[0]?.desc)}` &&
                    `${t(errors?.buyer_fees[0]?.desc)}`
                  }
                />
                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str =>
                    setFieldValue(`buyer_fees.${index}.price`, str)
                  }
                  onBlur={() => setFieldTouched(`buyer_fees.[0].price`, true)}
                  value={values.buyer_fees[index].price}
                  error={
                    touched?.buyer_fees &&
                    touched?.buyer_fees[index] &&
                    errors?.buyer_fees &&
                    errors?.buyer_fees[0] &&
                    `${t(errors.buyer_fees[0]?.price)}` &&
                    `${t(errors?.buyer_fees[0]?.price)}`
                  }
                />
                <TouchableOpacity
                  onPress={() => {
                    setBuyerFeeType(true);
                    setBuyerFeeIndex(index);
                  }}>
                  <PrimaryInput
                    label={t('type')}
                    placeholder={t('select')}
                    editable={false}
                    onChangeText={str =>
                      setFieldValue(`buyer_fees.${index}.type`, str)
                    }
                    onBlur={() => setFieldTouched(`buyer_fees.[0].type`, true)}
                    value={values.buyer_fees[index].type}
                    error={
                      touched?.buyer_fees &&
                      touched?.buyer_fees[index] &&
                      errors?.buyer_fees &&
                      errors?.buyer_fees[0] &&
                      `${t(errors.buyer_fees[0]?.type)}` &&
                      `${t(errors?.buyer_fees[0]?.type)}`
                    }
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={values.buyer_fees[index].per_person === '1'}
                    onPress={() =>
                      setFieldValue(
                        `buyer_fees.[${index}].per_person`,
                        values.buyer_fees[index].per_person === '1' ? '0' : '1',
                      )
                    }
                  />
                  <Regular
                    label={t('per_person')}
                    style={{marginLeft: mvs(10)}}
                  />
                </Row>
              </View>
            ))}
            <PrimaryButton
              title={'Add Item'}
              onPress={handleAddService}
              containerStyle={styles.addItem}
              textStyle={{fontSize: mvs(12)}}
            />
          </>
        ) : null}
        <PrimaryButton
          title={'Next'}
          onPress={onSubmit}
          containerStyle={styles.nextButton}
        />
      </KeyboardAvoidScrollview>
      <ExtraPriceBottomSheetModal
        visible={extraPrice}
        onChangeText={str => setFieldValue(`extra_price.[${index}].type`, str)}
        onClose={() => {
          setExteraPrice(false);
          setIndex(0);
        }}
        value={values.extra_price[index].type}
      />
      <BuyerFeeBottomSheetModal
        visible={buyerFeeType}
        onChangeText={str =>
          setFieldValue(`buyer_fees.[${buyerFeeIndex}].type`, str)
        }
        onClose={() => {
          setBuyerFeeType(false);
          setBuyerFeeIndex(0);
        }}
        value={values.buyer_fees[buyerFeeIndex].type}
      />
    </View>
  );
};
export default AddHotelPrice;
