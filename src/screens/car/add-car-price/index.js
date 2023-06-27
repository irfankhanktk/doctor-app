import {PrimaryButton} from 'components/atoms/buttons';
import {Checkbox} from 'components/atoms/checkbox';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Row} from 'components/atoms/row';
import BuyerFeeBottomSheetModal from 'components/molecules/car/dropdown-picker/buyerFeeType';
import ExtraPriceBottomSheetModal from 'components/molecules/car/dropdown-picker/extraPriceType';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import {t} from 'i18next';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Regular from 'typography/regular-text';

import styles from './styles';
import {addPriceCarValidation} from 'validations';

const AddCarPrice = props => {
  const {navigation, route} = props;

  // const index = 0;
  const [index, setIndex] = React.useState(0);
  const [buyerFeeIndex, setBuyerFeeIndex] = React.useState(0);
  const [extraPrice, setExteraPrice] = React.useState(false);
  const [buyerFeeType, setBuyerFeeType] = React.useState(false);
  const {car} = useSelector(s => s);
  const {edit_car} = car;
  const initialValues = {
    ...route?.params,

    default_state: `${edit_car?.row?.default_state || '0'}`,
    number: `${edit_car?.row?.number || ''}`,
    min_day_before_booking: `${edit_car?.row?.min_day_before_booking || ''}`,
    min_day_stays: `${edit_car?.row?.min_day_stays || ''}`,
    price: `${edit_car?.row?.price || ''}`,
    sale_price: `${edit_car?.row?.sale_price || ''}`,
    enable_extra_price: `${edit_car?.row?.enable_extra_price || '0'}`,
    extra_price: edit_car?.row?.extra_price || [
      {
        name: '',
        price: '',
        type: '',
        per_person: '0',
      },
    ],
    enable_service_fee: `${edit_car?.row?.enable_service_fee || '0'}`,
    service_fee: edit_car?.row?.service_fee || [
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
      validationSchema: addPriceCarValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      if (isValid && Object.keys(touched).length > 0) {
        try {
          navigation?.navigate('AddCarAttributes', {...values});
        } catch (error) {
          console.log(error);
        }
      } else {
        setFieldTouched('number', true);
        setFieldTouched('price', true);
        setFieldTouched('sale_price', true);
        setFieldTouched('banner_image', true);
        setFieldTouched('car_rating', true);
        setFieldTouched('featured_image', true);
        setFieldTouched('enable_extra_price', true);
        setFieldTouched('enable_service_fee', true);
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const handleAddExtraPrice = () => {
    setFieldValue('extra_price', [
      ...values?.extra_price,
      {name: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveExteraPrice = index => {
    const updatedExteraPrice = values?.extra_price.filter(
      (_, i) => i !== index,
    );
    setFieldValue('extra_price', updatedExteraPrice);
  };
  const handleAddService = () => {
    setFieldValue('service_fee', [
      ...values?.service_fee,
      {name: '', desc: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveService = index => {
    const updatedService = values?.service_fee.filter((_, i) => i !== index);
    setFieldValue('service_fee', updatedService);
  };

  console.log('values me check===>', values);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('add_price')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        {/* <PrimaryInput
          error={
            touched?.check_in_time && errors?.check_in_time
              ? `${t(errors?.check_in_time)}`
              : undefined
          }
          label={t('checkin')}
          placeholder={t('check_in_content')}
          onChangeText={str => setFieldValue('check_in_time', str)}
          onBlur={() => setFieldTouched('check_in_time', true)}
          value={values?.check_in_time}
        />
        <PrimaryInput
          error={
            touched?.check_out_time && errors?.check_out_time
              ? `${t(errors?.check_out_time)}`
              : undefined
          }
          label={t('check_out')}
          placeholder={t('check_out_content')}
          onChangeText={str => setFieldValue('check_out_time', str)}
          onBlur={() => setFieldTouched('check_out_time', true)}
          value={values?.check_out_time}
        /> */}
        <PrimaryInput
          error={
            touched?.min_day_before_booking && errors?.min_day_before_booking
              ? `${t(errors?.min_day_before_booking)}`
              : undefined
          }
          label={t('min_advance_reservation')}
          placeholder={t('0')}
          onChangeText={str => setFieldValue('min_day_before_booking', str)}
          onBlur={() => setFieldTouched('min_day_before_booking', true)}
          value={values?.min_day_before_booking}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />

        <PrimaryInput
          error={
            touched?.min_day_stays && errors?.min_day_stays
              ? `${t(errors?.min_day_stays)}`
              : undefined
          }
          label={t('min_day_stay')}
          placeholder={t('Ex: 2')}
          onChangeText={str => setFieldValue('min_day_stays', str)}
          onBlur={() => setFieldTouched('min_day_stays', true)}
          value={values?.min_day_stays}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />
        <PrimaryInput
          error={
            touched?.number && errors?.number
              ? `${t(errors?.number)}`
              : undefined
          }
          label={t('car_number')}
          placeholder={t('number')}
          onChangeText={str => setFieldValue('number', str)}
          onBlur={() => setFieldTouched('number', true)}
          value={values?.number}
        />
        <PrimaryInput
          error={
            touched?.price && errors?.price ? `${t(errors?.price)}` : undefined
          }
          label={t('price')}
          placeholder={t('car_price')}
          onChangeText={str => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={values?.price}
        />
        <PrimaryInput
          error={
            touched?.sale_price && errors?.sale_price
              ? `${t(errors?.sale_price)}`
              : undefined
          }
          label={t('sale_price')}
          placeholder={t('car_sale_price')}
          onChangeText={str => setFieldValue('sale_price', str)}
          onBlur={() => setFieldTouched('sale_price', true)}
          value={values?.sale_price}
        />
        <Row style={{justifyContent: 'flex-start'}}>
          <Checkbox
            checked={values?.enable_extra_price === '1'}
            onPress={() =>
              setFieldValue(
                'enable_extra_price',
                values?.enable_extra_price === '1' ? '0' : '1',
              )
            }
          />
          <Regular
            label={t('enable_price')}
            style={{marginLeft: mvs(10), color: colors.black}}
          />
        </Row>
        {values?.enable_extra_price === '1' ? (
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
                  value={values?.extra_price[index].name}
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
                  value={values?.extra_price[index].price}
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
                    value={values?.extra_price[index].type}
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
                    checked={values?.extra_price[index].per_person === '1'}
                    onPress={() =>
                      setFieldValue(
                        `extra_price.[${index}].per_person`,
                        values?.extra_price[index].per_person === '1'
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
              title={t('add_item')}
              onPress={handleAddExtraPrice}
              containerStyle={styles.addItem}
              textStyle={{fontSize: mvs(12)}}
            />
          </>
        ) : null}
        <Row style={{justifyContent: 'flex-start', marginTop: mvs(10)}}>
          <Checkbox
            checked={values?.enable_service_fee === '1'}
            onPress={() =>
              setFieldValue(
                'enable_service_fee',
                values?.enable_service_fee === '1' ? '0' : '1',
              )
            }
          />

          <Regular
            label={t('enable_extra')}
            style={{marginLeft: mvs(10), color: colors.black}}
          />
        </Row>
        {values?.enable_service_fee === '1' ? (
          <>
            {values?.service_fee?.map((service_fee, index) => (
              <View style={styles.enableServiceContainer} key={index}>
                {values?.service_fee?.length !== 1 && (
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
                    setFieldValue(`service_fee.${index}.name`, str)
                  }
                  onBlur={() => setFieldTouched(`service_fee.[0].name`, true)}
                  value={values?.service_fee[index]?.name}
                  error={
                    touched?.service_fee &&
                    touched?.service_fee[index] &&
                    errors?.service_fee &&
                    errors?.service_fee[index] &&
                    `${t(errors.service_fee[0].name)}` &&
                    `${t(errors?.service_fee[0]?.name)}`
                  }
                />

                <PrimaryInput
                  label={t('fee_description')}
                  placeholder={t('fee_desc')}
                  onChangeText={str =>
                    setFieldValue(`service_fee.${index}.desc`, str)
                  }
                  onBlur={() => setFieldTouched(`service_fee.[0].desc`, true)}
                  value={values?.service_fee[index].desc}
                  error={
                    touched?.service_fee &&
                    touched?.service_fee[index] &&
                    errors?.service_fee &&
                    errors?.service_fee[0] &&
                    `${t(errors.service_fee[0]?.desc)}` &&
                    `${t(errors?.service_fee[0]?.desc)}`
                  }
                />
                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str =>
                    setFieldValue(`service_fee.${index}.price`, str)
                  }
                  onBlur={() => setFieldTouched(`service_fee.[0].price`, true)}
                  value={values?.service_fee[index].price}
                  error={
                    touched?.service_fee &&
                    touched?.service_fee[index] &&
                    errors?.service_fee &&
                    errors?.service_fee[0] &&
                    `${t(errors.service_fee[0]?.price)}` &&
                    `${t(errors?.service_fee[0]?.price)}`
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
                      setFieldValue(`service_fee.${index}.type`, str)
                    }
                    onBlur={() => setFieldTouched(`service_fee.[0].type`, true)}
                    value={values?.service_fee[index].type}
                    error={
                      touched?.service_fee &&
                      touched?.service_fee[index] &&
                      errors?.service_fee &&
                      errors?.service_fee[0] &&
                      `${t(errors.service_fee[0]?.type)}` &&
                      `${t(errors?.service_fee[0]?.type)}`
                    }
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={values?.service_fee[index].per_person === '1'}
                    onPress={() =>
                      setFieldValue(
                        `service_fee.[${index}].per_person`,
                        values?.service_fee[index].per_person === '1'
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
              title={t('add_item')}
              onPress={handleAddService}
              containerStyle={styles.addItem}
              textStyle={{fontSize: mvs(12)}}
            />
          </>
        ) : null}
        <PrimaryButton
          title={t('next')}
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
        value={values?.extra_price[index].type}
      />
      <BuyerFeeBottomSheetModal
        visible={buyerFeeType}
        onChangeText={str =>
          setFieldValue(`service_fee.[${buyerFeeIndex}].type`, str)
        }
        onClose={() => {
          setBuyerFeeType(false);
          setBuyerFeeIndex(0);
        }}
        value={values?.service_fee[buyerFeeIndex].type}
      />
    </View>
  );
};
export default AddCarPrice;
