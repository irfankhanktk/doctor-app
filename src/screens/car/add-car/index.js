import {PrimaryButton} from 'components/atoms/buttons';
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
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getCarAttributes,
  getCarForEdit,
  onAddOrUpdateCar,
  postFileData,
} from 'services/api/car/api-actions';
import {setCarForEdit} from 'store/reducers/car-reducer';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import {addCarValidation} from 'validations';
import styles from './styles';
const AddCar = props => {
  const {navigation, route} = props;
  // console.log('check id =====>', route?.params?.id);
  const {car} = useSelector(s => s);
  const {edit_car} = car;
  const [loading, setLoading] = React.useState(true);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const [imageLoading, setImageLoading] = React.useState(false);
  const [galleryImageLoading, setGalleryImageLoading] = React.useState(false);
  const [featuredImageLoading, setFeaturedImageLoading] = React.useState(false);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (route?.params?.id) {
      dispatch(getCarForEdit(route?.params?.id, setLoading));
    } else {
      setLoading(false);
    }
  }, [route?.params?.id]);

  React.useEffect(() => {
    dispatch(getCarAttributes());
  }, []);
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
      navigate('Location');
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setBtnLoading(false);
    }
  };
  const handleAddfaqs = () => {
    onHandleChange('faqs', [...edit_car?.row?.faqs, {title: '', content: ''}]);
  };
  const handleRemovefaqs = index => {
    const updatedPolicies = edit_car?.row?.faqs?.filter((_, i) => i !== index);
    onHandleChange('faqs', updatedPolicies);
  };

  const onImageRemove = index => {
    let copy = [...edit_car?.row?.gallery];
    copy = copy.filter((e, i) => {
      return i != index;
    });
    onHandleChange(gallery, copy);
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
        onHandleChange('gallery', [...edit_car?.row?.gallery, file_resp?.data]);
      } else if (v == 'bannerImage') {
        setImageLoading(true);
        setFeaturedImageLoading(false);
        setGalleryImageLoading(false);
        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        onHandleChange('banner_image_id', file_resp?.data);
      } else {
        setFeaturedImageLoading(true);
        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        onHandleChange('image_id', file_resp?.data);
      }
    } catch (error) {
      console.log('upload image error', error);
      Alert.alert('Error', UTILS?.returnError(error));
    } finally {
      setImageLoading(false);
      setFeaturedImageLoading(false);
      setGalleryImageLoading(false);
    }
  };
  return (
    <View style={styles.container1}>
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
                navigate('Location')('EditCarAvailability', {
                  car_id: route?.params?.id,
                })
              }
              title={t('edit_car_availability')}
            />
          ) : (
            <></>
          )}
          <PrimaryInput
            label={t('title')}
            placeholder={t('title')}
            onChangeText={str => onHandleChange('title', str)}
            value={edit_car?.row?.title}
          />
          <PrimaryInput
            label={t('content')}
            placeholder={t('content')}
            onChangeText={str => onHandleChange('content', str)}
            value={edit_car?.row?.content}
          />
          <PrimaryInput
            label={t('youtube_video')}
            placeholder={t('youtube_video')}
            onChangeText={str => onHandleChange('video', str)}
            value={edit_car?.row?.video}
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
            {edit_car?.row?.banner_image_id?.url ? (
              <Image
                source={{uri: edit_car?.row?.banner_image_id?.url}}
                style={{width: '100%', height: '100%'}}
              />
            ) : null}
          </ImageBackground>

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
              data={edit_car?.row?.gallery || []}
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
          <Bold
            label={t('extra_info')}
            color={colors.primary}
            style={{marginTop: mvs(20)}}
          />
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('passenger')}
              placeholder={t('car_passenger')}
              onChangeText={str => onHandleChange('passenger', str)}
              value={`${edit_car?.row?.passenger}`}
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('gear')}
              placeholder={t('car_gear')}
              onChangeText={str => onHandleChange('gear', str)}
              value={`${edit_car?.row?.gear}`}
            />
          </Row>
          <Row>
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('baggage')}
              placeholder={t('car_baggage')}
              onChangeText={str => onHandleChange('baggage', str)}
              value={`${edit_car?.row?.baggage}`}
            />
            <PrimaryInput
              mainContainer={{width: '48%'}}
              label={t('door')}
              placeholder={t('car_door')}
              onChangeText={str => onHandleChange('door', str)}
              value={`${edit_car?.row?.door}`}
            />
          </Row>
          <Row style={{backgroundColor: colors.lightGray}}>
            <Bold label={t('faqs')} color={colors.primary} fontSize={mvs(18)} />
            <TouchableOpacity onPress={handleAddfaqs}>
              <Entypo name={'plus'} color={colors.primary} size={25} />
            </TouchableOpacity>
          </Row>

          {edit_car?.row?.faqs?.map((faq, index) => (
            <View style={styles.policyContainer} key={index}>
              {edit_car?.row?.faqs?.length !== 1 && (
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
                onChangeText={str => {
                  const copy = [...edit_car?.row?.faqs];
                  faq.title = str;
                  copy[index] = faq;
                  onHandleChange('faqs', copy);
                }}
                value={faq?.title}
              />

              <PrimaryInput
                label={t('content')}
                placeholder={t('content')}
                onChangeText={str => {
                  const copy = [...edit_car?.row?.faqs];
                  faq.content = str;
                  copy[index] = faq;
                  onHandleChange('faqs', copy);
                }}
                value={faq?.content}
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
            {edit_car?.row?.image_id?.url ? (
              <Image
                source={{uri: edit_car?.row?.image_id?.url}}
                style={{width: '100%', height: '100%'}}
              />
            ) : null}
          </ImageBackground>
          <PrimaryButton
            loading={btnLoading}
            containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
            onPress={() => onSubmit()}
            title={t('save_changes')}
          />
        </KeyboardAvoidScrollview>
      )}
    </View>
  );
};
export default AddCar;
