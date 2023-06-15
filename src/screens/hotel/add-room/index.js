import React, {useState} from 'react';
import {
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  SectionList,
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
  onAddOrUpdateRoom,
} from 'services/api/hotel/api-actions';
import {useDispatch, useSelector} from 'react-redux';

const AddRoom = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const {hotel} = useSelector(s => s);

  console.log('hotel data check=====>', hotel);
  const [selectedTypes, setSelectedTypes] = useState([]);
  React.useEffect(() => {
    dispatch(getRoomAttributes());
  }, []);
  const attributes = [
    {
      title: 'PROPERTY TYPE',
      data: [
        {id: 1, name: 'Homestays'},
        {id: 2, name: 'Hotels'},
        {id: 3, name: 'Apartments'},
      ],
    },
  ];
  const initialValues = {
    title: '',
    content: '',
    video_link: '',
    gallery: [],
    image_id: '',
    price: '',
    number: 1,
    min_day_stays: '',
    beds: '',
    size: '',
    adults: '',
    children: '',
    ican_import_url: '',
  };

  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: false,
      // validationSchema: addHotelValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      const res = await onAddOrUpdateRoom({
        values,
        id: edit_hotel?.row?.id || null,
        gallery: gallery?.map(x => x?.data?.id)?.join(),
        image_id: image_id?.data?.id,
        terms: selectedTypes?.map(x => x?.id),
      });
      console.log('res=>>>add hotel room >>', res);
      // navigation?.navigate('AddHotelLocation');
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
      //   setFieldTouched('image_id', true);
      //   setFieldTouched('gallery[0]', true);
      //   setFieldTouched(`policy.[0].content`, true);
      //   setFieldTouched(`policy.[0].title`, true);
      // }
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
  const openGallery = async v => {
    try {
      const res = await UTILS._returnImageGallery();
      console.log('gallery uri check===>', res);
      const uri = res.uri;

      if (v == 'gallery') {
        setFieldValue('gallery', [...values?.gallery, uri]);
      } else {
        setFieldValue('image_id', uri);
      }
    } catch (error) {
      console.log('upload image error', error);
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
      <Header1x2x title={t('add_room')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          label={t('room_name')}
          placeholder={t('room_name')}
          onChangeText={str => setFieldValue('title', str)}
          onBlur={() => setFieldTouched('title', true)}
          value={values.title}
          error={
            touched?.title && errors?.title ? `${t(errors?.title)}` : undefined
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
            title={'Upload Image'}
            onPress={() => openGallery('featureImage')}
            containerStyle={styles.buttonContainerStyle}
            textStyle={styles.buttonTextStyle}
          />
          <Image
            source={{uri: values?.image_id}}
            style={{width: '100%', height: '100%'}}
          />
        </ImageBackground>
        {errors?.image_id && touched?.image_id && (
          <Regular label={`${t(errors?.image_id)}`} style={styles.errorLabel} />
        )}
        <Regular
          color={colors.primary}
          label={t('Gallery')}
          style={styles.galleryText}
        />
        <View style={styles.galleryContainer}>
          <TouchableOpacity onPress={() => openGallery('gallery')}>
            <View style={[styles.ImageContainer, {marginHorizontal: mvs(3)}]}>
              <Entypo name="camera" size={20} color={'black'} />
              {/* <Text style={styles.headerText}>Add image{'\n'}(0 up to 8)</Text> */}
              <Regular style={styles.headerText} label={'Add images'} />
            </View>
          </TouchableOpacity>
          <FlatList
            horizontal={true}
            data={values?.gallery}
            renderItem={({item, index}) => {
              return (
                <View style={styles.ImageContainer}>
                  <Image
                    source={{uri: item}}
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
        {errors?.gallery && touched?.gallery && (
          <Regular style={styles.errorLabel} label={t(errors?.gallery)} />
        )}
        <PrimaryInput
          labelStyle={{marginTop: mvs(25)}}
          label={t('price')}
          placeholder={t('price')}
          onChangeText={str => setFieldValue('price', str)}
          onBlur={() => setFieldTouched('price', true)}
          value={values.price}
          error={
            touched?.price && errors?.price ? `${t(errors?.price)}` : undefined
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
          label={'(Optional)'}
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
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Row style={{justifyContent: 'flex-start'}}>
              <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} />
              <Bold
                style={{marginLeft: mvs(10), fontSize: mvs(18)}}
                label={title}
              />
            </Row>
          )}
        />
        <PrimaryInput
          labelStyle={{marginTop: mvs(20)}}
          label={t('Import Url')}
          placeholder={t('')}
          onChangeText={str => setFieldValue('ican_import_url', str)}
          onBlur={() => setFieldTouched('ican_import_url', true)}
          value={values.ican_import_url}
          error={
            touched?.ican_import_url && errors?.ican_import_url
              ? `${t(errors?.ican_import_url)}`
              : undefined
          }
        />
        <PrimaryButton
          containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
          onPress={() => onSubmit()}
          title="Add Room"
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AddRoom;
