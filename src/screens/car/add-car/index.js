import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {HalfOutLineInput} from 'components/atoms/outline-iput';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import {t} from 'i18next';
import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCarAttributes,
  getCarForEdit,
  postFileData,
} from 'services/api/car/api-actions';
import {setCarForEdit} from 'store/reducers/car-reducer';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {addCarValidation} from 'validations';
import styles from './styles';
import {navigate} from 'navigation/navigation-ref';
const AddCar = props => {
  const {navigation, route} = props;
  // console.log('check id =====>', route?.params?.id);
  const {car} = useSelector(s => s);
  const {edit_car} = car;
  const [loading, setLoading] = React.useState(true);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [galleryImageLoading, setGalleryImageLoading] = React.useState(false);
  const [featuredImageLoading, setFeaturedImageLoading] = React.useState(false);
  const initialValues = {
    title: '',
    content: '',
    video: '',
    passenger: '1',
    gear: 'Auto',
    baggage: '4',
    door: '4',
    banner_image_id: '',
    gallery: [],
    image_id: '',
    faqs: [
      {
        title: '',
        content: '',
      },
    ],
  };
  const dispatch = useDispatch();
  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: false,
      validationSchema: addCarValidation,
      onSubmit: () => {},
    });
  React.useEffect(() => {
    if (route?.params?.id) {
      dispatch(getCarForEdit(route?.params?.id, setLoading));
    } else {
      setLoading(false);
    }
  }, [route?.params?.id]);
  React.useEffect(() => {
    if (edit_car && route?.params?.id) {
      // console.log('edit_car?.row?.popp->>', edit_car?.row?.faqs);
      setFieldValue('title', edit_car?.row?.title);
      setFieldValue('content', edit_car?.row?.content);
      setFieldValue('faqs', [...edit_car?.row?.faqs]);
      setFieldValue('video', edit_car?.row?.video);
      setFieldValue('banner_image_id', edit_car?.row?.banner_image_id);
      setFieldValue('image_id', edit_car?.row?.image_id);
      setFieldValue('gallery', edit_car?.row?.gallery);
    }
  }, [edit_car]);
  React.useEffect(() => {
    dispatch(getCarAttributes());
  }, []);
  React.useEffect(() => {
    dispatch(setCarForEdit(null));
  }, []);
  const onSubmit = async () => {
    try {
      // console.log('valuess->>', values);
      // console.log('errors->>', errors);
      if (isValid && Object.keys(touched).length > 0) {
        try {
          navigation?.navigate('AddCarLocation', {values});
        } catch (error) {
          console.log(error);
        }
      } else {
        setFieldTouched('title', true);
        setFieldTouched('content', true);
        setFieldTouched('video', true);
        // setFieldTouched('banner_image_id.url', true);
        // setFieldTouched('image_id.url', true);
        // setFieldTouched('gallery[0].url', true);
        // setFieldTouched(`faqs[0].content`, true);
        // setFieldTouched(`faqs[0].title`, true);
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const handleAddfaqs = () => {
    setFieldValue('faqs', [...values?.faqs, {title: '', content: ''}]);
  };
  const handleRemovefaqs = index => {
    const updatedPolicies = values?.faqs?.filter((_, i) => i !== index);
    setFieldValue('faqs', updatedPolicies);
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
      if (v == 'gallery') {
        setGalleryImageLoading(true);
        setImageLoading(false);
        setFeaturedImageLoading(false);
        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        setFieldValue(`gallery[${values?.gallery?.length || 0}]`, {
          ...file_resp?.data,
        });
      } else if (v == 'bannerImage') {
        setImageLoading(true);
        setFeaturedImageLoading(false);
        setGalleryImageLoading(false);
        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        setFieldValue('banner_image_id', file_resp?.data);
      } else {
        setFeaturedImageLoading(true);
        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        setFieldValue('image_id', file_resp?.data);
      }

      // const uri = res.uri;

      // if (v === 'gallery' && file_resp?.data) {
      //   setFieldValue(`gallery[${values?.gallery?.length || 0}]`, {
      //     ...file_resp?.data,
      //   });
      // } else if (v == 'bannerImage') {
      //   setFieldValue('banner_image_id', file_resp?.data);
      // } else {
      //   setFieldValue('image_id', file_resp?.data);
      // }
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setImageLoading(false);
      setFeaturedImageLoading(false);
      setGalleryImageLoading(false);
    }
  };
  // console.log('values me check====>', values);
  return (
    <View style={styles.container1}>
      <Header1x2x
        title={t(route?.params?.id ? 'edit_car' : 'add_car')}
        back={true}
      />

      {loading ? (
        <Loader />
      ) : (
        <KeyboardAvoidScrollview
          contentContainerStyle={styles.contentContainerStyle}>
          {route?.params?.id ? (
            <PrimaryButton
              containerStyle={{
                width: 170,
                height: mvs(40),
                borderRadius: mvs(5),
                alignSelf: 'flex-end',
              }}
              onPress={() =>
                navigate('EditCarAvailability', {car_id: route?.params?.id})
              }
              title={t('edit_car_availability')}
            />
          ) : (
            <></>
          )}
          <PrimaryInput
            error={
              touched?.title && errors?.title
                ? `${t(errors?.title)}`
                : undefined
            }
            label={t('title')}
            placeholder={t('title')}
            onChangeText={str => setFieldValue('title', str)}
            onBlur={() => setFieldTouched('title', true)}
            value={values.title}
          />
          <PrimaryInput
            error={
              touched?.content && errors?.content
                ? `${t(errors?.content)}`
                : undefined
            }
            label={t('content')}
            placeholder={t('content')}
            onChangeText={str => setFieldValue('content', str)}
            onBlur={() => setFieldTouched('content', true)}
            value={values.content}
          />
          <PrimaryInput
            error={
              touched?.video && errors?.video
                ? `${t(errors?.video)}`
                : undefined
            }
            label={t('youtube_video')}
            placeholder={t('youtube_video')}
            onChangeText={str => setFieldValue('video', str)}
            onBlur={() => setFieldTouched('video', true)}
            value={values.video}
          />
          <Regular color={colors.primary} label={t('banner_image')} />
          <ImageBackground
            // source={{
            //   uri: 'https://t3.ftcdn.net/jpg/01/18/01/98/360_F_118019822_6CKXP6rXmVhDOzbXZlLqEM2ya4HhYzSV.jpg',
            // }}
            style={styles.bannerImageContainer}>
            <PrimaryButton
              title={t('upload_image')}
              loading={imageLoading}
              onPress={() => openGallery('bannerImage')}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
            />
            {values.banner_image_id?.url ? (
              <Image
                source={{uri: values.banner_image_id?.url}}
                style={{width: '100%', height: '100%'}}
              />
            ) : null}
          </ImageBackground>
          {errors.banner_image_id?.url && touched.banner_image_id?.url && (
            <Regular
              label={t(errors?.banner_image_id?.url)}
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
                if (!item?.url) return null;
                return (
                  <>
                    <View style={styles.ImageContainer}>
                      <Image
                        source={{uri: item?.url || null}}
                        resizeMode="contain"
                        style={styles.image}
                      />

                      <TouchableOpacity
                        onPress={() => onImageRemove(index)}
                        style={styles.removeContainer}>
                        <Regular style={styles.txtRemove} label={t('remove')} />
                      </TouchableOpacity>
                    </View>
                  </>
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
          <Bold
            label={t('extra_info')}
            color={colors.primary}
            style={{marginTop: mvs(20)}}
          />
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              error={
                touched?.passenger && errors?.passenger
                  ? `${t(errors?.passenger)}`
                  : undefined
              }
              label={t('passenger')}
              // containerStyle={{width: '30%'}}
              placeholder={t('car_passenger')}
              onChangeText={str => setFieldValue('passenger', str)}
              onBlur={() => setFieldTouched('passenger', true)}
              value={values.passenger}
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              error={
                touched?.gear && errors?.gear ? `${t(errors?.gear)}` : undefined
              }
              label={t('gear')}
              placeholder={t('car_gear')}
              onChangeText={str => setFieldValue('gear', str)}
              onBlur={() => setFieldTouched('gear', true)}
              value={values.gear}
            />
          </Row>
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              error={
                touched?.baggage && errors?.baggage
                  ? `${t(errors?.baggage)}`
                  : undefined
              }
              label={t('baggage')}
              // containerStyle={{width: '30%'}}
              placeholder={t('car_baggage')}
              onChangeText={str => setFieldValue('baggage', str)}
              onBlur={() => setFieldTouched('baggage', true)}
              value={values.baggage}
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              error={
                touched?.door && errors?.door ? `${t(errors?.door)}` : undefined
              }
              label={t('door')}
              placeholder={t('car_door')}
              onChangeText={str => setFieldValue('door', str)}
              onBlur={() => setFieldTouched('door', true)}
              value={values.door}
            />
          </Row>
          <Row style={{backgroundColor: colors.lightGray}}>
            <Bold label={t('faqs')} color={colors.primary} fontSize={mvs(18)} />
            <TouchableOpacity onPress={handleAddfaqs}>
              <Entypo name={'plus'} color={colors.primary} size={25} />
            </TouchableOpacity>
          </Row>

          {values?.faqs?.map((faqs, index) => (
            <View style={styles.policyContainer} key={index}>
              {values?.faqs?.length !== 1 && (
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => handleRemovefaqs(index)}>
                  <MaterialCommunityIcons
                    name={'delete'}
                    color={colors.primary}
                    size={25}
                  />
                </TouchableOpacity>
              )}
              <PrimaryInput
                label={t('title')}
                placeholder={t('faqs_title')}
                onChangeText={str =>
                  setFieldValue(`faqs.[${index}].title`, str)
                }
                onBlur={() => setFieldTouched(`faqs.[${index}].title`, true)}
                value={values.faqs[index].title}
                error={
                  touched?.faqs &&
                  touched?.faqs[index] &&
                  errors?.faqs &&
                  errors?.faqs[index] &&
                  `${t(errors.faqs[0]?.title)}` &&
                  `${t(errors?.faqs[0]?.title)}`
                }
              />

              <PrimaryInput
                label={t('content')}
                placeholder={t('content')}
                onChangeText={str =>
                  setFieldValue(`faqs.${index}.content`, str)
                }
                onBlur={() => setFieldTouched(`faqs.${index}.content`, true)}
                value={values?.faqs[index].content}
                error={
                  touched?.faqs &&
                  touched?.faqs[index] &&
                  errors?.faqs &&
                  errors?.faqs[0] &&
                  `${t(errors.faqs[0]?.content)}` &&
                  `${t(errors?.faqs[0]?.content)}`
                }
              />
            </View>
          ))}
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
              title={t('upload_image')}
              loading={featuredImageLoading}
              onPress={() => openGallery('featureImage')}
              containerStyle={styles.buttonContainerStyle}
              textStyle={styles.buttonTextStyle}
            />
            {values?.image_id?.url ? (
              <Image
                source={{uri: values?.image_id?.url}}
                style={{width: '100%', height: '100%'}}
              />
            ) : null}
          </ImageBackground>
          {errors?.image_id?.url && touched?.image_id?.url && (
            <Regular
              label={`${t(errors?.image_id?.url)}`}
              style={styles.errorLabel}
            />
          )}

          <PrimaryButton
            containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
            onPress={() => onSubmit()}
            title={t('next')}
          />
        </KeyboardAvoidScrollview>
      )}
    </View>
  );
};
export default AddCar;
