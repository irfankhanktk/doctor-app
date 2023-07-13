import {PrimaryButton} from 'components/atoms/buttons';
import {Checkbox} from 'components/atoms/checkbox';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Row} from 'components/atoms/row';
import BuyerFeeBottomSheetModal from 'components/molecules/car/dropdown-picker/buyerFeeType';
import ExtraPriceBottomSheetModal from 'components/molecules/car/dropdown-picker/extraPriceType';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import Regular from 'typography/regular-text';

import {useAppDispatch} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import {onAddOrUpdateCar} from 'services/api/car/api-actions';
import {setCarForEdit} from 'store/reducers/car-reducer';
import styles from './styles';

const AddCarPrice = props => {
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState(0);
  const [buyerFeeIndex, setBuyerFeeIndex] = React.useState(0);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [extraPrice, setExteraPrice] = React.useState(false);
  const [buyerFeeType, setBuyerFeeType] = React.useState(false);
  const {car} = useSelector(s => s);
  const {edit_car} = car;
  const onHandleChange = (key, value) => {
    dispatch(
      setCarForEdit({
        ...edit_car,
        row: {
          ...edit_car.row,
          [key]: value,
        },
      }),
    );
  };
  const onSubmit = async () => {
    try {
      setBtnLoading(true);
      const res = await onAddOrUpdateCar({...edit_car});
      dispatch(
        setCarForEdit({
          ...edit_car,
          row: {
            ...edit_car.row,
            id: res?.id,
          },
        }),
      );
      Alert.alert(t('save_changes_successfully'));
      navigate('Attr');
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setBtnLoading(false);
    }
  };
  const handleAddExtraPrice = () => {
    onHandleChange('extra_price', [
      ...edit_car?.row?.extra_price,
      {name: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveExteraPrice = index => {
    const updatedExteraPrice = edit_car?.row?.extra_price.filter(
      (_, i) => i !== index,
    );
    onHandleChange('extra_price', updatedExteraPrice);
  };
  const handleAddService = () => {
    onHandleChange('service_fee', [
      ...edit_car?.row?.service_fee,
      {name: '', desc: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveService = index => {
    const updatedService = edit_car?.row?.service_fee?.filter(
      (_, i) => i !== index,
    );
    onHandleChange('service_fee', updatedService);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          label={t('min_advance_reservation')}
          placeholder={t('0')}
          onChangeText={str => onHandleChange('min_day_before_booking', str)}
          value={`${edit_car?.row?.min_day_before_booking}`}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />

        <PrimaryInput
          label={t('min_day_stay')}
          placeholder={t('Ex: 2')}
          onChangeText={str => onHandleChange('min_day_stays', str)}
          value={`${edit_car?.row?.min_day_stays}`}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />
        <PrimaryInput
          label={t('car_number')}
          placeholder={t('number')}
          onChangeText={str => onHandleChange('number', str)}
          value={`${edit_car?.row?.number}`}
        />
        <PrimaryInput
          label={t('price')}
          placeholder={t('car_price')}
          onChangeText={str => onHandleChange('price', str)}
          value={`${edit_car?.row?.price}`}
        />
        <PrimaryInput
          label={t('sale_price')}
          placeholder={t('car_sale_price')}
          onChangeText={str => onHandleChange('sale_price', str)}
          value={`${edit_car?.row?.sale_price}`}
        />
        <Row style={{justifyContent: 'flex-start'}}>
          <Checkbox
            checked={edit_car?.row?.enable_extra_price === '1'}
            onPress={() =>
              onHandleChange(
                'enable_extra_price',
                edit_car?.row?.enable_extra_price === '1' ? '0' : '1',
              )
            }
          />
          <Regular
            label={t('enable_price')}
            style={{marginLeft: mvs(10), color: colors.black}}
          />
        </Row>
        {edit_car?.row?.enable_extra_price === '1' ? (
          <>
            {edit_car?.row?.extra_price?.map((extra_price, index) => (
              <View style={styles.policyContainer} key={index}>
                {edit_car?.row?.extra_price?.length !== 1 && (
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
                  onChangeText={str => {
                    const copy = [...edit_car?.row?.extra_price];
                    extra_price.name = str;
                    copy[index] = extra_price;
                    onHandleChange(`extra_price`, copy);
                  }}
                  value={extra_price?.name}
                />

                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str => {
                    const copy = [...edit_car?.row?.extra_price];
                    extra_price.price = str;
                    copy[index] = extra_price;
                    onHandleChange(`extra_price`, copy);
                  }}
                  value={`${extra_price?.price}`}
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
                    onChangeText={str => {
                      const copy = [...edit_car?.row?.extra_price];
                      extra_price.type = str;
                      copy[index] = extra_price;
                      onHandleChange(`extra_price`, copy);
                    }}
                    value={extra_price?.type}
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={extra_price?.per_person === '1'}
                    onPress={() => {
                      const copy = [...edit_car?.row?.extra_price];
                      extra_price.per_person =
                        extra_price?.per_person === '1' ? '0' : '1';
                      copy[index] = extra_price;
                      onHandleChange(`extra_price`, copy);
                    }}
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
            checked={edit_car?.row?.enable_service_fee === '1'}
            onPress={() =>
              onHandleChange(
                'enable_service_fee',
                edit_car?.row?.enable_service_fee === '1' ? '0' : '1',
              )
            }
          />

          <Regular
            label={t('enable_extra')}
            style={{marginLeft: mvs(10), color: colors.black}}
          />
        </Row>
        {edit_car?.row?.enable_service_fee === '1' ? (
          <>
            {edit_car?.row?.service_fee?.map((service_fee, index) => (
              <View style={styles.enableServiceContainer} key={index}>
                {edit_car?.row?.service_fee?.length !== 1 && (
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
                  onChangeText={str => {
                    const copy = [...edit_car?.row?.service_fee];
                    service_fee.name = str;
                    copy[index] = service_fee;
                    onHandleChange(`service_fee`, copy);
                  }}
                  value={edit_car?.row?.name}
                />

                <PrimaryInput
                  label={t('fee_description')}
                  placeholder={t('fee_desc')}
                  onChangeText={str => {
                    const copy = [...edit_car?.row?.service_fee];
                    service_fee.desc = str;
                    copy[index] = service_fee;
                    onHandleChange(`service_fee`, copy);
                  }}
                  value={edit_car?.row?.desc}
                />
                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str => {
                    const copy = [...edit_car?.row?.service_fee];
                    service_fee.price = str;
                    copy[index] = service_fee;
                    onHandleChange(`service_fee`, copy);
                  }}
                  value={`${edit_car?.row?.price}`}
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
                    onChangeText={str => {
                      const copy = [...edit_car?.row?.service_fee];
                      service_fee.type = str;
                      copy[index] = service_fee;
                      onHandleChange(`service_fee`, copy);
                    }}
                    value={service_fee.type}
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={service_fee?.per_person === '1'}
                    onPress={() => {
                      const copy = [...edit_car?.row?.service_fee];
                      service_fee.type =
                        service_fee?.per_person === '1' ? '0' : '1';
                      copy[index] = service_fee;
                      onHandleChange(`service_fee`, copy);
                    }}
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
          loading={btnLoading}
          title={t('save_changes')}
          onPress={onSubmit}
          containerStyle={styles.nextButton}
        />
      </KeyboardAvoidScrollview>
      <ExtraPriceBottomSheetModal
        visible={extraPrice}
        onChangeText={str => {
          const copy = [...edit_car?.row?.extra_price];
          copy[index].type = str;
          onHandleChange(`extra_price`, copy);
        }}
        onClose={() => {
          setExteraPrice(false);
          setIndex(0);
        }}
        value={edit_car?.row?.extra_price[index]?.type}
      />
      <BuyerFeeBottomSheetModal
        visible={buyerFeeType}
        onChangeText={str => {
          const copy = [...edit_car?.row?.service_fee];
          copy[buyerFeeIndex].type = str;
          onHandleChange(`service_fee`, copy);
        }}
        onClose={() => {
          setBuyerFeeType(false);
          setBuyerFeeIndex(0);
        }}
        value={edit_car?.row?.service_fee[buyerFeeIndex]?.type}
      />
    </View>
  );
};
export default AddCarPrice;
