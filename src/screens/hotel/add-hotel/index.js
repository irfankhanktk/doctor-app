import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {t} from 'i18next';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import PrimaryInput from 'components/atoms/inputs';
import {useFormik} from 'formik';
import {addHotelValidation} from 'validations';
import Regular from 'typography/regular-text';
import {colors} from 'config/colors';
import {PrimaryButton} from 'components/atoms/buttons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {mvs} from 'config/metrices';
import Bold from 'typography/bold-text';
import {Row} from 'components/atoms/row';
import {UTILS} from 'utils';
import {getHotelAttributes, postFileData} from 'services/api/hotel/api-actions';
import {useDispatch} from 'react-redux';

const AddHotel = props => {
  const {navigation} = props;
  const [addImage, setAddImage] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const initialValues = {
    title: '',
    content: '',
    video: '',
    banner_image_id: '',
    gallery: [{url: ''}],
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
    dispatch(getHotelAttributes());
  }, []);
  const onSubmit = async () => {
    try {
      // navigation?.navigate('AddHotelLocation', {values});
      // return;
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
    setFieldValue('policy', [...values.policy, {title: '', content: ''}]);
  };
  const handleRemovePolicy = index => {
    const updatedPolicies = values.policy.filter((_, i) => i !== index);
    setFieldValue('policy', updatedPolicies);
  };
  // const onImageRemove = index => {
  //   let copy = [...addImage];
  //   copy = copy.filter((e, i) => {
  //     return i != index;
  //   });
  //   setAddImage(copy);
  // };
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
      const file_resp = await postFileData({file: res, type: 'image'});
      console.log('res of file->>>', file_resp?.data);
      const uri = res.uri;
      if (v == 'gallery') {
        setFieldTouched('gallery[0].url', true);
        setFieldValue('gallery', [...values?.gallery, file_resp?.data]);
        // setAddImage([...addImage, uri]);
      } else if (v == 'bannerImage') {
        setFieldTouched('banner_image_id.url', true);
        setFieldValue('banner_image_id', file_resp?.data);
      } else {
        setFieldValue('image_id', file_resp?.data);
        setFieldTouched('image_id.url', true);
      }
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    }
  };
  return (
    <View style={styles.container1}>
      <Header1x2x title={t('add_hotel')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryInput
          error={
            touched?.title && errors?.title ? `${t(errors?.title)}` : undefined
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
            touched?.video && errors?.video ? `${t(errors?.video)}` : undefined
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
            title={'Upload Image'}
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
                      <Text style={styles.txtRemove}>Remove</Text>
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
          <Bold label={t('policy')} color={colors.primary} fontSize={mvs(18)} />
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
              onChangeText={str => setFieldValue(`policy.[0].title`, str)}
              onBlur={() => setFieldTouched(`policy.[0].title`, true)}
              value={values.policy[index].title}
              error={
                touched?.policy &&
                touched?.policy[index] &&
                errors?.policy &&
                errors?.policy[index] &&
                `${t(errors.policy[0].title)}` &&
                `${t(errors?.policy[0]?.title)}`
              }
            />

            <PrimaryInput
              label={t('content')}
              placeholder={t('content')}
              onChangeText={str =>
                setFieldValue(`policy.${index}.content`, str)
              }
              onBlur={() => setFieldTouched(`policy.[0].content`, true)}
              value={values.policy[index].content}
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
            title={'Upload Image'}
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
          title="Next"
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};
export default AddHotel;
