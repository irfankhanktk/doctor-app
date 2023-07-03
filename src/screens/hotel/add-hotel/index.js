import {PrimaryButton} from 'components/atoms/buttons';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {useFormik} from 'formik';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
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
  getHotelAttributes,
  getHotelForEdit,
  postFileData,
} from 'services/api/hotel/api-actions';
import {setHotelForEdit} from 'store/reducers/hotel-reducer';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {addHotelValidation} from 'validations';
import styles from './styles';
const AddHotel = props => {
  const {navigation, route} = props;
  const {hotel} = useSelector(s => s);
  const {edit_hotel} = hotel;
  // console.log('edit_hotel::::', edit_hotel);
  const [loading, setLoading] = React.useState(true);
  const [imageLoading, setImageLoading] = React.useState(false);
  const initialValues = {
    title: '',
    content: '',
    video: '',
    banner_image_id: '',
    gallery: [],
    star_rate: '',
    image_id: '',
    policy: [
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
      validationSchema: addHotelValidation,
      onSubmit: () => {},
    });
  React.useEffect(() => {
    if (route?.params?.id) {
      dispatch(getHotelForEdit(route?.params?.id, setLoading));
    } else {
      setLoading(false);
    }
  }, [route?.params?.id]);
  React.useEffect(() => {
    if (edit_hotel && route?.params?.id) {
      // console.log('edit_hotel?.row?.popp->>', edit_hotel?.row?.policy);
      setFieldValue('title', edit_hotel?.row?.title);
      setFieldValue('content', edit_hotel?.row?.content);
      setFieldValue('policy', [...edit_hotel?.row?.policy]);
      setFieldValue('video', edit_hotel?.row?.video);
      setFieldValue('star_rate', `${edit_hotel?.row?.star_rate}`);
      setFieldValue('banner_image_id', edit_hotel?.row?.banner_image_id);
      setFieldValue('image_id', edit_hotel?.row?.image_id);
      setFieldValue('gallery', edit_hotel?.row?.gallery);
    }
  }, [edit_hotel]);
  React.useEffect(() => {
    dispatch(getHotelAttributes());
  }, []);
  React.useEffect(() => {
    dispatch(setHotelForEdit(null));
  }, []);
  const onSubmit = async () => {
    try {
      console.log('valuess->>', values);
      console.log('errors->>', errors);
      if (isValid && Object.keys(touched).length > 0) {
        try {
          navigation?.navigate('AddHotelLocation', {values});
        } catch (error) {
          console.log(error);
        }
      } else {
        setFieldTouched('title', true);
        setFieldTouched('content', true);
        setFieldTouched('video', true);
        setFieldTouched('star_rate', true);
        setFieldTouched('banner_image_id.url', true);
        setFieldTouched('image_id.url', true);
        setFieldTouched('gallery[0].url', true);
        setFieldTouched(`policy[0].content`, true);
        setFieldTouched(`policy[0].title`, true);
      }
    } catch (error) {
      console.log('error=>', error);
    }
  };
  const handleAddPolicy = () => {
    setFieldValue('policy', [...values?.policy, {title: '', content: ''}]);
  };
  const handleRemovePolicy = index => {
    const updatedPolicies = values?.policy?.filter((_, i) => i !== index);
    setFieldValue('policy', updatedPolicies);
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
      setImageLoading(true);
      const file_resp = await postFileData({file: res, type: 'image'});
      console.log('res of file->>>', file_resp?.data);
      const uri = res.uri;

      if (v === 'gallery' && file_resp?.data) {
        setFieldValue(`gallery[${values?.gallery?.length || 0}]`, {
          ...file_resp?.data,
        });
      } else if (v == 'bannerImage') {
        setFieldValue('banner_image_id', file_resp?.data);
      } else {
        setFieldValue('image_id', file_resp?.data);
      }
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  return (
    <View style={styles.container1}>
      <Header1x2x
        title={t(route?.params?.id ? 'edit_hotel' : 'add_hotel')}
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
                navigate('EditRoomAvailability', {hotel_id: route?.params?.id})
              }
              title={t('edit_room_availability')}
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
            <TouchableOpacity onPress={() => openGallery('gallery')}>
              <View style={[styles.ImageContainer, {marginHorizontal: mvs(3)}]}>
                <Entypo name="camera" size={20} color={'black'} />
                {/* <Text style={styles.headerText}>Add image{'\n'}(0 up to 8)</Text> */}

                <Regular style={styles.headerText} label={t('add_images')} />
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
            label={t('hotle_policy')}
            color={colors.primary}
            style={{marginTop: mvs(20)}}
          />
          <PrimaryInput
            error={
              touched?.star_rate && errors?.star_rate
                ? `${t(errors?.star_rate)}`
                : undefined
            }
            label={t('hotel_rating_standard')}
            placeholder={t('hotel_rating_standard')}
            onChangeText={str => setFieldValue('star_rate', str)}
            onBlur={() => setFieldTouched('star_rate', true)}
            value={values.star_rate}
          />
          <Row style={{backgroundColor: colors.lightGray}}>
            <Bold
              label={t('policy')}
              color={colors.primary}
              fontSize={mvs(18)}
            />
            <TouchableOpacity onPress={handleAddPolicy}>
              <Entypo name={'plus'} color={colors.primary} size={25} />
            </TouchableOpacity>
          </Row>

          {values?.policy.map((policy, index) => (
            <View style={styles.policyContainer} key={index}>
              {values?.policy?.length !== 1 && (
                <TouchableOpacity
                  style={{alignSelf: 'flex-end'}}
                  onPress={() => handleRemovePolicy(index)}>
                  <MaterialCommunityIcons
                    name={'delete'}
                    color={colors.primary}
                    size={25}
                  />
                </TouchableOpacity>
              )}
              <PrimaryInput
                label={t('title')}
                placeholder={t('policy_title')}
                onChangeText={str =>
                  setFieldValue(`policy.[${index}].title`, str)
                }
                onBlur={() => setFieldTouched(`policy.[${index}].title`, true)}
                value={values.policy[index].title}
                error={
                  touched?.policy &&
                  touched?.policy[index] &&
                  errors?.policy &&
                  errors?.policy[index] &&
                  `${t(errors.policy[0]?.title)}` &&
                  `${t(errors?.policy[0]?.title)}`
                }
              />

              <PrimaryInput
                label={t('content')}
                placeholder={t('content')}
                onChangeText={str =>
                  setFieldValue(`policy.${index}.content`, str)
                }
                onBlur={() => setFieldTouched(`policy.${index}.content`, true)}
                value={values?.policy[index].content}
                error={
                  touched?.policy &&
                  touched?.policy[index] &&
                  errors?.policy &&
                  errors?.policy[0] &&
                  `${t(errors.policy[0]?.content)}` &&
                  `${t(errors?.policy[0]?.content)}`
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
              loading={imageLoading}
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
export default AddHotel;
