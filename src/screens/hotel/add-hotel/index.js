import {PrimaryButton} from 'components/atoms/buttons';
import PrimaryInput from 'components/atoms/inputs';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import {goBack, navigate} from 'navigation/navigation-ref';
import React from 'react';
import {
  Alert,
  FlatList,
  I18nManager,
  Image,
  ImageBackground,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHotelAttributes,
  getHotelForEdit,
  onAddOrUpdateHotel,
  postFileData,
} from 'services/api/hotel/api-actions';
import {setHotelForEdit} from 'store/reducers/hotel-reducer';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import styles from './styles';
const AddHotel = props => {
  const {navigation, route} = props;
  const {hotel} = useSelector(s => s);
  const {edit_hotel} = hotel;
  console.log('edit_hotel::::', edit_hotel);
  const [loading, setLoading] = React.useState(true);
  const [btnLoading, setBtnLoading] = React.useState(false);
  const [imageLoading, setImageLoading] = React.useState(false);
  const [galleryImageLoading, setGalleryImageLoading] = React.useState(false);
  const [featuredImageLoading, setFeaturedImageLoading] = React.useState(false);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (route?.params?.id) {
      dispatch(getHotelForEdit(route?.params?.id, setLoading));
    } else {
      setLoading(false);
    }
  }, [route?.params?.id]);

  React.useEffect(() => {
    dispatch(getHotelAttributes());
  }, []);

  const onHandleChange = (key, value) => {
    dispatch(
      setHotelForEdit({
        ...edit_hotel,
        row: {
          ...edit_hotel?.row,
          [key]: value,
        },
      }),
    );
  };
  const onSubmit = async () => {
    try {
      setBtnLoading(true);
      await onAddOrUpdateHotel({...edit_hotel});
      Alert.alert(t('save_changes_successfully'));
      navigate('Location');
    } catch (error) {
      console.log('error===> ', UTILS.returnError(error));
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setBtnLoading(false);
    }
  };
  const handleAddPolicy = () => {
    dispatch(
      setHotelForEdit({
        ...edit_hotel,
        row: {
          ...edit_hotel.row,
          policy: [...edit_hotel.row?.policy, {title: '', content: ''}],
        },
      }),
    );
  };
  const handleRemovePolicy = index => {
    const updatedPolicies = edit_hotel?.row?.policy?.filter(
      (_, i) => i !== index,
    );
    dispatch(
      setHotelForEdit({
        ...edit_hotel,
        row: {
          ...edit_hotel.row,
          policy: updatedPolicies,
        },
      }),
    );
  };

  const onImageRemove = index => {
    let copy = [...edit_hotel?.row?.gallery];
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

        const file_resp = await postFileData({file: res, type: 'image'});
        console.log('res of file->>>', file_resp?.data);
        onHandleChange('gallery', [
          ...edit_hotel?.row?.gallery,
          file_resp?.data,
        ]);
      } else if (v == 'bannerImage') {
        setImageLoading(true);

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
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <AntDesign
          size={20}
          name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
          color={'black'}
        />
      </TouchableOpacity>

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
            label={t('title')}
            placeholder={t('title')}
            onChangeText={str => onHandleChange('title', str)}
            value={edit_hotel?.row.title}
          />
          <PrimaryInput
            label={t('content')}
            placeholder={t('content')}
            onChangeText={str => onHandleChange('content', str)}
            value={edit_hotel?.row?.content}
          />
          <PrimaryInput
            label={t('youtube_video')}
            placeholder={t('youtube_video')}
            onChangeText={str => onHandleChange('video', str)}
            value={edit_hotel?.row?.video}
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
            {edit_hotel?.row?.banner_image_id?.url ? (
              <Image
                source={{uri: edit_hotel?.row?.banner_image_id?.url}}
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
              data={edit_hotel?.row?.gallery || []}
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
            label={t('hotle_policy')}
            color={colors.primary}
            style={{marginTop: mvs(20)}}
          />
          <PrimaryInput
            label={t('hotel_rating_standard')}
            placeholder={t('hotel_rating_standard')}
            onChangeText={str => onHandleChange('star_rate', str)}
            value={edit_hotel.star_rate}
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

          {edit_hotel?.row?.policy.map((policy, index) => (
            <View style={styles.policyContainer} key={index}>
              {edit_hotel?.row?.policy?.length !== 1 && (
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
                onChangeText={str => {
                  const item = {...policy};
                  const copy = [...edit_hotel?.row?.policy];
                  item.title = str;
                  copy[index] = item;

                  onHandleChange('policy', copy);
                }}
                value={policy.title}
              />

              <PrimaryInput
                label={t('content')}
                placeholder={t('content')}
                onChangeText={str => {
                  const item = {...policy};
                  const copy = [...edit_hotel?.row?.policy];
                  item.content = str;
                  copy[index] = item;

                  onHandleChange('policy', copy);
                }}
                value={policy?.content}
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
            {edit_hotel?.row?.image_id?.url ? (
              <Image
                source={{uri: edit_hotel?.row?.image_id?.url}}
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
export default AddHotel;
