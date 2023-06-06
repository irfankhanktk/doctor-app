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

const AddHotel = props => {
  const {navigation} = props;
  const [addImage, setAddImage] = useState([]);
  const initialValues = {
    title: '',
    content: '',
    video_link: '',
    banner_image: '',
    gallery: [],
    hotel_rating: '',
    featured_image: '',
    policy: [
      {
        title: '',
        content: '',
      },
    ],
  };

  const {values, errors, touched, setFieldValue, setFieldTouched, isValid} =
    useFormik({
      initialValues: initialValues,
      validateOnBlur: true,
      validateOnChange: false,
      validationSchema: addHotelValidation,
      onSubmit: () => {},
    });
  const onSubmit = async () => {
    try {
      navigation?.navigate('AddHotelLocation');
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
      //   setFieldTouched('gallery[0]', true);
      //   setFieldTouched(`policy.[0].content`, true);
      //   setFieldTouched(`policy.[0].title`, true);
      // }
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
  const onImageRemove = index => {
    let copy = [...addImage];
    copy = copy.filter((e, i) => {
      return i != index;
    });
    setAddImage(copy);
  };
  const openGallery = async v => {
    try {
      const res = await UTILS._returnImageGallery();
      const uri = res.uri;
      if (v == 'gallery') {
        setFieldValue('gallery', [...values?.gallery, uri]);
      } else if (v == 'bannerImage') {
        setFieldValue('banner_image', uri);
      } else {
        setFieldValue('featured_image', uri);
      }
    } catch (error) {
      console.log('upload image error', error);
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
            touched?.video_link && errors?.video_link
              ? `${t(errors?.video_link)}`
              : undefined
          }
          label={t('youtube_video')}
          placeholder={t('youtube_video_link')}
          onChangeText={str => setFieldValue('video_link', str)}
          onBlur={() => setFieldTouched('video_link', true)}
          value={values.video_link}
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
          <Image
            source={{uri: values.banner_image}}
            style={{width: '100%', height: '100%'}}
          />
        </ImageBackground>
        {errors.banner_image && touched.banner_image && (
          <Regular label={t(errors?.banner_image)} style={styles.errorLabel} />
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
              <Text style={styles.headerText}>Add images</Text>
            </View>
          </TouchableOpacity>
          <FlatList
            horizontal={true}
            data={addImage}
            renderItem={({item, index}) => {
              return (
                <View style={styles.ImageContainer}>
                  <Image
                    source={{uri: item || null}}
                    resizeMode="contain"
                    style={styles.image}
                  />
                  <TouchableOpacity
                    onPress={() => onImageRemove(index)}
                    style={styles.removeContainer}>
                    <Text style={styles.txtRemove}>Remove</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>
        {errors?.gallery && touched?.gallery && (
          <Text style={styles.errorLabel}>{t(errors?.gallery)}</Text>
        )}
        <Bold
          label={t('hotle_policy')}
          color={colors.primary}
          style={{marginTop: mvs(20)}}
        />
        <PrimaryInput
          error={
            touched?.hotel_rating && errors?.hotel_rating
              ? `${t(errors?.hotel_rating)}`
              : undefined
          }
          label={t('hotel_rating_standard')}
          placeholder={t('hotel_rating_standard')}
          onChangeText={str => setFieldValue('hotel_rating', str)}
          onBlur={() => setFieldTouched('hotel_rating', true)}
          value={values.hotel_rating}
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
              placeholder="Policy Title"
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
          <Image
            source={{uri: values?.featured_image}}
            style={{width: '100%', height: '100%'}}
          />
        </ImageBackground>
        {errors?.featured_image && touched?.featured_image && (
          <Regular
            label={`${t(errors?.featured_image)}`}
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
