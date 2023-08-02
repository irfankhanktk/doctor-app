import {PrimaryButton} from 'components/atoms/buttons';
import {Checkbox} from 'components/atoms/checkbox';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Row} from 'components/atoms/row';
import BuyerFeeBottomSheetModal from 'components/molecules/hotel/dropdown-picker/buyerFeeType';
import ExtraPriceBottomSheetModal from 'components/molecules/hotel/dropdown-picker/extraPriceType';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useAppDispatch} from 'hooks/use-store';
import {t} from 'i18next';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {onAddOrUpdateHotel} from 'services/api/hotel/api-actions';
import {setHotelForEdit} from 'store/reducers/hotel-reducer';
import Regular from 'typography/regular-text';
import styles from './styles';
import {goBack, navigate} from 'navigation/navigation-ref';
import {Alert} from 'react-native';
import {I18nManager} from 'react-native';
import {IMGElementContentLoading} from 'react-native-render-html';
const AddHotelPrice = props => {
  const {navigation, route} = props;
  const dispatch = useAppDispatch();
  const [index, setIndex] = React.useState(0);
  const [buyerFeeIndex, setBuyerFeeIndex] = React.useState(0);
  const [extraPrice, setExteraPrice] = React.useState(false);
  const [buyerFeeType, setBuyerFeeType] = React.useState(false);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const {hotel} = useSelector(s => s);
  const {edit_hotel} = hotel;

  const onHandleChange = (key, value) => {
    dispatch(
      setHotelForEdit({
        ...edit_hotel,
        row: {
          ...edit_hotel.row,
          [key]: value,
        },
      }),
    );
  };
  const onSubmit = async () => {
    try {
      setBtnLoading(true);
      const res = await onAddOrUpdateHotel({...edit_hotel});
      dispatch(
        setHotelForEdit({
          ...edit_hotel,
          row: {
            ...edit_hotel.row,
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
    const temp = edit_hotel?.row?.extra_price || [];
    onHandleChange('extra_price', [
      ...temp,
      {name: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveExteraPrice = index => {
    const updatedExteraPrice = edit_hotel?.row?.extra_price?.filter(
      (_, i) => i !== index,
    );
    onHandleChange('extra_price', updatedExteraPrice);
  };
  const handleAddService = () => {
    const temp = edit_hotel?.row?.service_fee || [];
    onHandleChange('service_fee', [
      ...temp,
      {name: '', desc: '', price: '', type: '', per_person: '0'},
    ]);
  };
  const handleRemoveService = index => {
    const updatedService = edit_hotel?.row?.service_fee.filter(
      (_, i) => i !== index,
    );
    onHandleChange('service_fee', updatedService);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <AntDesign
          size={20}
          name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
          color={'black'}
        />
      </TouchableOpacity>

      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          label={t('checkin')}
          placeholder={t('check_in_content')}
          onChangeText={str => onHandleChange('check_in_time', str)}
          value={edit_hotel?.row?.check_in_time}
        />
        <PrimaryInput
          label={t('check_out')}
          placeholder={t('check_out_content')}
          onChangeText={str => onHandleChange('check_out_time', str)}
          value={edit_hotel?.row?.check_out_time}
        />
        <PrimaryInput
          label={t('min_advance_reservation')}
          placeholder={t('0')}
          onChangeText={str => onHandleChange('min_day_before_booking', str)}
          value={`${edit_hotel?.row?.min_day_before_booking}`}
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
          value={`${edit_hotel?.row?.min_day_stays}`}
        />
        <Regular
          label={'(Optional)'}
          fontSize={12}
          style={{alignSelf: 'flex-end'}}
        />

        <PrimaryInput
          label={t('price')}
          placeholder={t('hotel_price')}
          onChangeText={str => onHandleChange('price', str)}
          value={edit_hotel?.row?.price}
        />

        <Row style={{justifyContent: 'flex-start'}}>
          <Checkbox
            checked={edit_hotel?.row?.enable_extra_price == '1'}
            onPress={() => {
              onHandleChange(
                'enable_extra_price',
                edit_hotel?.row?.enable_extra_price == '1' ? '0' : '1',
              );
            }}
          />
          <Regular label={t('enable_price')} style={{marginLeft: mvs(10)}} />
        </Row>

        {edit_hotel?.row?.enable_extra_price == '1' ? (
          <>
            {edit_hotel?.row?.extra_price.map((extra_price, index) => (
              <View style={styles.policyContainer} key={index}>
                {edit_hotel?.row?.extra_price?.length !== 1 && (
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
                    const copy = [...edit_hotel?.row?.extra_price];
                    const item = {...extra_price};
                    item.name = str;
                    copy[index] = item;
                    console.log(
                      'copy:edit_hotel?.row?.extra_price::',
                      edit_hotel?.row?.extra_price,
                    );
                    onHandleChange(`extra_price`, copy);
                  }}
                  value={extra_price?.name}
                />

                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str => {
                    const copy = [...edit_hotel?.row?.extra_price];
                    const item = {...extra_price};
                    item.price = str;
                    copy[index] = item;
                    onHandleChange(`extra_price`, copy);
                  }}
                  value={extra_price?.price}
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
                      const copy = [...edit_hotel?.row?.extra_price];
                      const item = {...extra_price};
                      item.type = str;
                      copy[index] = item;
                      onHandleChange(`extra_price`, copy);
                    }}
                    value={extra_price?.type}
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={extra_price?.per_person == '1'}
                    onPress={() => {
                      const copy = [...edit_hotel?.row?.extra_price];
                      const item = {...extra_price};
                      item.per_person = item?.per_person == '1' ? '0' : '1';
                      copy[index] = item;
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
            checked={edit_hotel?.row?.enable_service_fee == '1'}
            onPress={() => {
              onHandleChange(
                'enable_service_fee',
                edit_hotel?.row?.enable_service_fee == '1' ? '0' : '1',
              );
            }}
          />
          <Regular label={t('enable_extra')} style={{marginLeft: mvs(10)}} />
        </Row>

        {edit_hotel?.row?.enable_service_fee == '1' ? (
          <>
            {edit_hotel?.row?.service_fee?.map((service_fee, index) => (
              <View style={styles.enableServiceContainer} key={index}>
                {edit_hotel?.row?.service_fee?.length !== 1 && (
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
                    const copy = [...edit_hotel?.row?.service_fee];
                    const item = {...service_fee};
                    item.name = str;
                    copy[index] = item;
                    onHandleChange(`service_fee`, copy);
                  }}
                  value={service_fee?.name}
                />

                <PrimaryInput
                  label={t('fee_description')}
                  placeholder={t('fee_desc')}
                  onChangeText={str => {
                    const copy = [...edit_hotel?.row?.service_fee];
                    const item = {...service_fee};
                    item.desc = str;
                    copy[index] = item;
                    onHandleChange(`service_fee`, copy);
                  }}
                  value={service_fee?.desc}
                />
                <PrimaryInput
                  label={t('price')}
                  placeholder={t('0')}
                  onChangeText={str => {
                    const copy = [...edit_hotel?.row?.service_fee];
                    const item = {...service_fee};
                    item.price = str;
                    copy[index] = item;

                    onHandleChange(`service_fee`, copy);
                  }}
                  value={service_fee?.price}
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
                      const copy = [...edit_hotel?.row?.service_fee];
                      const item = {...service_fee};
                      item.type = str;
                      copy[index] = item;
                      onHandleChange(`service_fee`, copy);
                    }}
                    value={service_fee.type}
                  />
                </TouchableOpacity>
                <Row style={{justifyContent: 'flex-start'}}>
                  <Checkbox
                    checked={service_fee?.per_person == '1'}
                    onPress={() => {
                      const copy = [...edit_hotel?.row?.service_fee];
                      const item = {...service_fee};
                      item.per_person = item?.per_person == '1' ? '0' : '1';
                      copy[index] = item;
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
          const copy = [...edit_hotel?.row?.extra_price];
          const item = {...copy[index]};
          item.type = str;
          copy[index] = item;
          onHandleChange(`extra_price`, copy);
        }}
        onClose={() => {
          setExteraPrice(false);
          setIndex(0);
        }}
        value={edit_hotel?.row?.extra_price[index]?.type}
      />
      <BuyerFeeBottomSheetModal
        visible={buyerFeeType}
        onChangeText={str => {
          const copy = [...edit_hotel?.row?.service_fee];
          const item = {...copy[buyerFeeIndex]};
          item.type = str;
          copy[buyerFeeIndex] = item;
          onHandleChange(`service_fee`, copy);
        }}
        onClose={() => {
          setBuyerFeeType(false);
          setBuyerFeeIndex(0);
        }}
        value={
          edit_hotel?.row?.service_fee &&
          edit_hotel?.row?.service_fee[buyerFeeIndex]?.type
        }
      />
    </View>
  );
};
export default AddHotelPrice;
