import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SectionList,
  Alert,
} from 'react-native';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {t} from 'i18next';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import PrimaryInput from 'components/atoms/inputs';
import {useFormik} from 'formik';
import Regular from 'typography/regular-text';
import {PrimaryButton} from 'components/atoms/buttons';
import {mvs} from 'config/metrices';
import {colors} from 'config/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {UTILS} from 'utils';
import {Checkbox} from 'components/atoms/checkbox';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {
  getRoomAttributes,
  getRoomForEdit,
  onAddOrUpdateRoom,
  postFileData,
} from 'services/api/hotel/api-actions';
import {useDispatch, useSelector} from 'react-redux';
import {addRoomValidation} from 'validations';
import {Loader} from 'components/atoms/loader';
import {goBack} from 'navigation/navigation-ref';

const AddRoom = props => {
  const {navigation, route} = props;
  const {hotel_id, room_id} = route?.params || {};

  const dispatch = useDispatch();
  const {hotel} = useSelector(s => s);
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addBtnloading, setAddBtnLoading] = useState(false);
  const [addImageloading, setAddImageLoading] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [galleryImageLoading, setGalleryImageLoading] = React.useState(false);
  const [featuredImageLoading, setFeaturedImageLoading] = React.useState(false);
  const initialValues = {
    title: '',
    content: '',
    gallery: [],
    image_id: '',
    price: '',
    number: '1',
    min_day_stays: '',
    beds: '',
    size: '',
    adults: '',
    children: '',
    ical_import_url: '',
  };

  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: false,
      validationSchema: addRoomValidation,
      onSubmit: () => {},
    });
  React.useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        if (room_id) {
          const res = await getRoomForEdit(hotel_id, room_id);

          setAttributes(res?.attributes || []);
          setFieldValue('title', res?.row?.title);
          setFieldValue('ical_import_url', res?.row?.ical_import_url);
          setFieldValue('image_id', res?.row?.image_id);
          setFieldValue('beds', `${res?.row?.beds}`);
          setFieldValue('number', `${res?.row?.number}`);
          setFieldValue('size', `${res?.row?.size}`);
          setFieldValue('adults', `${res?.row?.adults}`);
          setFieldValue('price', `${res?.row?.price}`);
          setFieldValue('min_day_stays', `${res?.row?.min_day_stays}`);
          setFieldValue('children', `${res?.row?.children}`);
          setFieldValue('gallery', res?.row?.gallery || []);
          setSelectedTypes(
            res?.row?.terms.map(x => ({...x, id: x?.term_id})) || [],
          );
        } else {
          const res = await getRoomAttributes(hotel_id);
          setAttributes(res?.attributes || []);
        }
      } catch (error) {
        console.log(error);
        Alert.alert('Error', UTILS.returnError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const onSubmit = async () => {
    try {
      if (isValid && Object.keys(touched).length > 0) {
        try {
          setAddBtnLoading(true);
          const res = await onAddOrUpdateRoom(
            {
              ...values,
              id: room_id || null,
              gallery: values?.gallery?.map(x => x?.data?.id)?.join(),
              image_id: values?.image_id?.data?.id,
              terms: selectedTypes?.map(x => x?.id),
            },
            hotel_id,
          );

          goBack();
          Alert.alert('onsubmit');
        } catch (error) {
          console.log(error);
          Alert.alert('Error', UTILS.returnError(error));
        } finally {
          setAddBtnLoading(false);
        }
      } else {
        setFieldTouched('title', true);
        // setFieldTouched('content', true);
        setFieldTouched('ical_import_url', true);
        setFieldTouched('image_id', true);
        setFieldTouched('beds', true);
        setFieldTouched('number', true);
        setFieldTouched('size', true);
        setFieldTouched('adults', true);
        setFieldTouched('price', true);
        setFieldTouched('gallery[0]', true);
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };

  const onImageRemove = index => {
    let copy = [...values.gallery];
    copy = copy.filter((e, i) => {
      return i != index;
    });
    // setAddImage(copy);
    setFieldValue('gallery', copy);
  };
  // const openGallery = async v => {
  //   try {
  //     setAddImageLoading(true);
  //     const res = await UTILS._returnImageGallery();
  //     const file_resp = await postFileData({file: res, type: 'image'});
  //     console.log('res of file->>>', file_resp?.data);
  //     const uri = res.uri;

  //     if (v === 'gallery' && file_resp?.data) {
  //       setFieldValue(`gallery[${values?.gallery?.length || 0}]`, {
  //         ...file_resp?.data,
  //       });
  //     } else {
  //       setFieldValue('image_id', file_resp?.data);
  //     }
  //   } catch (error) {
  //     console.log('upload image error', error);
  //     Alert.alert('Error', UTILS?.returnError(error));
  //   } finally {
  //     setAddImageLoading(false);
  //   }
  // };

  const openGallery = async v => {
    try {
      const res = await UTILS._returnImageGallery();
      if (v == 'gallery') {
        setGalleryImageLoading(true);

        const file_resp = await postFileData({file: res, type: 'image'});
        // console.log('res of file->>>', file_resp?.data);
        setFieldValue(`gallery[${values?.gallery?.length || 0}]`, {
          ...file_resp?.data,
        });
      } else {
        setFeaturedImageLoading(true);
        const file_resp = await postFileData({file: res, type: 'image'});
        // console.log('res of file->>>', file_resp?.data);
        setFieldValue('image_id', file_resp?.data);
      }
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setFeaturedImageLoading(false);
      setGalleryImageLoading(false);
    }
  };
  const handleCheckboxSelect = item => {
    const selectedIndex = selectedTypes.findIndex(
      selectedItem => selectedItem.id === item.id,
    );

    if (selectedIndex !== -1) {
      // Item is already selected, remove it from the selectedTypes array
      const updatedSelectedTypes = [...selectedTypes];
      updatedSelectedTypes.splice(selectedIndex, 1);
      setSelectedTypes(updatedSelectedTypes);
    } else {
      // Item is not selected, add it to the selectedTypes array
      setSelectedTypes([...selectedTypes, item]);
    }
  };

  const renderItem = ({item}) => {
    const isSelected = selectedTypes.some(
      selectedItem => selectedItem.id === item.id,
    );

    return (
      <Row style={{justifyContent: 'flex-start', padding: mvs(10)}}>
        <Checkbox
          checked={isSelected}
          onPress={() => handleCheckboxSelect(item)}
        />

        <Regular
          style={{marginLeft: mvs(10), fontSize: mvs(16)}}
          label={item?.name}
        />
      </Row>
    );
  };

  return (
    <View style={styles.container1}>
      <Header1x2x title={t(room_id ? 'edit_room' : 'add_room')} back={true} />
      {loading ? (
        <Loader />
      ) : (
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.contentContainerStyle}>
          <PrimaryInput
            label={t('room_name')}
            placeholder={t('room_name')}
            onChangeText={str => setFieldValue('title', str)}
            onBlur={() => setFieldTouched('title', true)}
            value={values.title}
            error={
              touched?.title && errors?.title
                ? `${t(errors?.title)}`
                : undefined
            }
          />
          <Regular
            style={{marginTop: mvs(10)}}
            color={colors.primary}
            label={t('featured_image')}
          />
          <ImageBackground
            // source={{
            //   uri: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            // }}
            style={styles.bannerImageContainer}>
            <PrimaryButton
              loading={featuredImageLoading}
              title={t('upload_image')}
              onPress={() => openGallery('featureImage')}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
            />
            <Image
              source={{uri: values?.image_id?.url}}
              style={{width: '100%', height: '100%'}}
            />
          </ImageBackground>
          {errors?.image_id?.url && touched?.image_id?.url && (
            <Regular
              label={`${t(errors?.image_id?.url)}`}
              style={styles.errorLabel}
            />
          )}
          <Regular
            color={colors.primary}
            label={t('gallery')}
            style={styles.galleryText}
          />
          <View style={styles.galleryContainer}>
            <TouchableOpacity
              loading={galleryImageLoading}
              onPress={() => openGallery('gallery')}>
              <View style={[styles.ImageContainer, {marginHorizontal: mvs(3)}]}>
                {galleryImageLoading ? (
                  <Loader color={colors.black} />
                ) : (
                  <>
                    <Entypo name="camera" size={20} color={'black'} />
                    <Regular
                      style={styles.headerText}
                      label={t('add_images')}
                    />
                  </>
                )}
              </View>
            </TouchableOpacity>
            <FlatList
              horizontal={true}
              data={values?.gallery}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.ImageContainer}>
                    <Image
                      source={{uri: item?.url}}
                      resizeMode="contain"
                      style={styles.image}
                    />
                    <TouchableOpacity
                      onPress={() => onImageRemove(index)}
                      style={styles.removeContainer}>
                      <Regular style={styles.txtRemove} label={'Remove'} />
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
          {errors?.gallery &&
            errors?.gallery[0] &&
            errors?.gallery[0]?.url &&
            touched?.gallery &&
            touched?.gallery[0] &&
            touched?.gallery[0]?.url && (
              <Regular
                style={styles.errorLabel}
                label={t(errors?.gallery[0]?.url)}
              />
            )}
          <PrimaryInput
            labelStyle={{marginTop: mvs(25)}}
            label={t('price')}
            placeholder={t('price')}
            onChangeText={str => setFieldValue('price', str)}
            onBlur={() => setFieldTouched('price', true)}
            value={values.price}
            error={
              touched?.price && errors?.price
                ? `${t(errors?.price)}`
                : undefined
            }
          />

          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              keyboardType="numeric"
              label={t('number')}
              placeholder={t('1')}
              onChangeText={str => setFieldValue('number', str)}
              onBlur={() => setFieldTouched('number', true)}
              value={values.number}
              error={
                touched?.number && errors?.number
                  ? `${t(errors?.number)}`
                  : undefined
              }
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              error={
                touched?.min_day_stays && errors?.min_day_stays
                  ? `${t(errors?.min_day_stays)}`
                  : undefined
              }
              label={t('min_day_stay')}
              placeholder={t('Ex: 2')}
              onChangeText={str => setFieldValue('min_day_stays', str)}
              onBlur={() => setFieldTouched('min_day_stays', true)}
              value={values.min_day_stays}
            />
          </Row>
          <Regular
            label={t('optional')}
            fontSize={12}
            style={{alignSelf: 'flex-end'}}
          />
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              keyboardType="numeric"
              label={t('number_of_beds')}
              placeholder={t('1')}
              onChangeText={str => setFieldValue('beds', str)}
              onBlur={() => setFieldTouched('beds', true)}
              value={values.beds}
              error={
                touched?.beds && errors?.beds ? `${t(errors?.beds)}` : undefined
              }
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('room_size')}
              placeholder={t('size')}
              onChangeText={str => setFieldValue('size', str)}
              onBlur={() => setFieldTouched('size', true)}
              value={values.size}
              error={
                touched?.size && errors?.size ? `${t(errors?.size)}` : undefined
              }
            />
          </Row>
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('max_adults')}
              placeholder={t('1')}
              onChangeText={str => setFieldValue('adults', str)}
              onBlur={() => setFieldTouched('adults', true)}
              value={values.adults}
              error={
                touched?.adults && errors?.adults
                  ? `${t(errors?.adults)}`
                  : undefined
              }
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('max_children')}
              placeholder={t('0')}
              onChangeText={str => setFieldValue('children', str)}
              onBlur={() => setFieldTouched('children', true)}
              value={values.children}
              error={
                touched?.children && errors?.children
                  ? `${t(errors?.children)}`
                  : undefined
              }
            />
          </Row>

          <SectionList
            sections={attributes}
            keyExtractor={(_, index) => index?.toString()}
            renderItem={renderItem}
            renderSectionHeader={({section: {name}}) => (
              <Row style={{justifyContent: 'flex-start'}}>
                {/* <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} /> */}
                <Bold
                  style={{marginLeft: mvs(10), fontSize: mvs(18)}}
                  label={name}
                />
              </Row>
            )}
          />

          <PrimaryInput
            labelStyle={{marginTop: mvs(20)}}
            label={t('import_url')}
            placeholder={t('')}
            onChangeText={str => setFieldValue('ical_import_url', str)}
            onBlur={() => setFieldTouched('ical_import_url', true)}
            value={values.ical_import_url}
            error={
              touched?.ical_import_url && errors?.ical_import_url
                ? `${t(errors?.ical_import_url)}`
                : undefined
            }
          />
          <PrimaryButton
            loading={addBtnloading}
            containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
            onPress={() => onSubmit()}
            title={t(room_id ? 'save' : 'add_room')}
          />
        </KeyboardAvoidScrollview>
      )}
    </View>
  );
};
export default AddRoom;
