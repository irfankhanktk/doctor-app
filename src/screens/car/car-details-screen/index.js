import * as IMG from 'assets/car/images';
import {PrimaryButton} from 'components/atoms/buttons';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import React from 'react';

import MyMap from 'components/molecules/map';
import RatingStar from 'components/molecules/rating-star';
import {DATE_FORMAT} from 'config/constants';
import moment from 'moment';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import HtmlView from '../../../components/atoms/render-html/index';
import {colors} from '../../../config/colors';
import styles from './styles';

import CollapsibleView from 'components/atoms/collapsible-view';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import CarVideoModal from 'components/molecules/car/modals/car-video-modal';
import RelatedCarCard from 'components/molecules/car/related-car-card';
import {useAppSelector} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {
  changeCarStatus,
  deleteCar,
  getCarDetails,
} from 'services/api/car/api-actions';
import {setCars} from 'store/reducers/car-reducer';
import {UTILS} from 'utils';
const CarDetailsScreen = props => {
  const [videoModal, setVideoModal] = React.useState(false);
  const [carDetails, setCarDetails] = React.useState({});
  console.log('check car details===>', carDetails?.row?.status);
  const [submitReview, setSubmitReview] = React.useState({
    review_title: 'car',
    review_content: '',
    review_stats: {
      Equipment: 0,
      Comfortable: 0,
      'Climate Control': 0,
      Facility: 0,
      Aftercare: 0,
    },
  });
  const {userInfo} = useAppSelector(s => s?.user);
  const [visible, setIsVisible] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [statusChangeLoading, setStatusChangeLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  const dispatch = useDispatch();
  const {cars} = useAppSelector(s => s?.car);

  const {t} = i18n;
  const [filter, setFilter] = React.useState({
    checkin: moment().format(DATE_FORMAT.yyyy_mm_dd),
    checkout: moment().format(DATE_FORMAT.yyyy_mm_dd),
    children: '0',
    rooms: '1',
    adults: '0',
  });
  const {slug, id} = props?.route?.params || {};
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await getCarDetails(slug);
      setLoading(false);
      setCarDetails(res);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImagePress = index => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  const deleteCarPress = async () => {
    try {
      setDeleteLoading(true);
      await deleteCar(id);
      dispatch(setCars({...cars, data: cars?.data?.filter(x => x?.id !== id)}));
      goBack();
      Alert.alert('Delete Car successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setDeleteLoading(false);
    }
  };
  const statusChangePress = async () => {
    try {
      if (carDetails?.row?.status === 'publish') {
        setStatusChangeLoading(true);
        await changeCarStatus(id, 'make-hide');
        setCarDetails(pre => ({...pre, row: {...pre.row, status: 'draft'}}));
      } else {
        setStatusChangeLoading(true);
        await changeCarStatus(id, 'make-publish');
        setCarDetails(pre => ({
          ...pre,
          row: {...pre.row, status: 'publish'},
        }));
      }

      Alert.alert('Car status change');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setStatusChangeLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header1x2x isSearch={false} title={t('car_details')} back={true} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <ImageBackground
              // source={IMG.Hotels_Bg}
              // source={carDetails?.row?.image_id}
              source={
                carDetails?.row?.image_id
                  ? {uri: carDetails?.row?.image_id}
                  : IMG.Car_bg
              }
              style={styles.hotelsimgbackground}>
              <Row style={{paddingHorizontal: mvs(10)}}>
                <Row
                  style={{
                    // backgroundColor: 'red',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // marginHorizontal: mvs(10),
                    paddingVertical: mvs(5),
                  }}>
                  <TouchableOpacity
                    onPress={() => setVideoModal(true)}
                    style={{
                      marginHorizontal: mvs(20),
                    }}>
                    <Entypo name="video" color={colors.black} size={mvs(30)} />
                  </TouchableOpacity>
                </Row>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigate('AddCar', {id: id})}>
                  <Entypo name="edit" color={colors.black} size={mvs(30)} />
                </TouchableOpacity>
              </Row>
            </ImageBackground>

            <View style={styles.cardContainer}>
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: mvs(20),
                  flexGrow: 1,
                }}>
                <Medium style={styles.text} label={carDetails?.row?.title} />
                <Row style={{justifyContent: 'flex-start'}}>
                  {/* <SpecialistLocation /> */}
                  <Entypo
                    name="location"
                    color={colors.black}
                    size={mvs(18)}
                    style={{marginRight: mvs(10)}}
                  />
                  <Medium
                    label={carDetails?.row?.address}
                    style={{marginHorizontal: mvs(10)}}
                  />
                </Row>
                <ScrollView
                  contentContainerStyle={{
                    marginVertical: mvs(10),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {carDetails?.row?.gallery?.map((item, index) => (
                    <Row
                      style={{
                        backgroundColor: colors.secondary,
                        marginRight: mvs(10),
                        borderRadius: mvs(15),
                        padding: mvs(10),
                      }}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleImagePress(index)}>
                        <Image
                          source={item?.large ? {uri: item?.large} : IMG.Car_bg}
                          style={{
                            height: mvs(80),
                            width: mvs(80),
                            resizeMode: 'cover',
                            borderRadius: mvs(10),
                          }}
                        />
                      </TouchableOpacity>
                    </Row>
                  ))}
                </ScrollView>
                <Medium
                  label={t('description')}
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                />
                <HtmlView html={carDetails?.row?.content} />

                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('FAQS')}
                />

                <View>
                  {carDetails?.row?.faqs?.map(ele => (
                    <>
                      {/* <Medium
                      label={ele?.title}
                      color={colors.black}
                      numberOfLines={2}
                    />
                    <Regular label={ele?.content} /> */}
                      <CollapsibleView
                        collaspsableColor={colors.black}
                        maxH={60}
                        label={ele?.title}
                        numberOfLines={2}>
                        <Regular label={ele?.content} />
                      </CollapsibleView>
                    </>
                  ))}
                </View>
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('car_features')}
                />
                <Row style={{paddingVertical: mvs(8)}}>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="airbag"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Airbag'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="radio"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'FM Radio'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="car-door"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Power Windows'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                </Row>
                <Row style={{paddingVertical: mvs(8)}}>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="motion-sensor"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={' Sensor'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <Ionicons
                      name="speedometer"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Speed KM'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="steering"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Steering Wheel'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                </Row>
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('location')}
                />
                <MyMap
                  coord={{
                    latitude: (carDetails?.row?.map_lat || 19.229727) * 1,
                    longitude: (carDetails?.row?.map_lng || 72.98447) * 1,
                  }}
                  coordinate={{
                    latitude: (carDetails?.row?.map_lat || 19.229727) * 1,
                    longitude: (carDetails?.row?.map_lng || 72.98447) * 1,
                  }}
                />
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('review')}
                />
                <Row>
                  <Row
                    style={{
                      backgroundColor: colors.primary,
                      alignSelf: 'flex-start',
                      paddingVertical: mvs(5),
                      paddingHorizontal: mvs(10),
                      borderRadius: mvs(5),
                      alignItems: 'center',
                    }}>
                    <Bold
                      style={{
                        color: colors.white,
                        fontSize: mvs(15),
                        lineHeight: mvs(20),
                      }}
                      label={carDetails?.row?.review_score}
                    />
                    <Icon name={'star'} size={mvs(15)} color={colors.yellow} />
                  </Row>
                </Row>
                <ScrollView
                  contentContainerStyle={{marginVertical: mvs(10)}}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {carDetails?.review_list?.data?.map((item, index) => (
                    <Row
                      style={{
                        backgroundColor: colors.secondary,
                        marginRight: mvs(10),
                        padding: mvs(10),
                      }}>
                      <Image
                        source={IMG.Doctors}
                        style={{
                          height: mvs(30),
                          width: mvs(30),
                          borderRadius: mvs(15),
                        }}
                      />
                      <View style={{marginLeft: mvs(10), width: mvs(100)}}>
                        <Medium label={item?.author?.name} />
                        <Regular fontSize={mvs(12)} label={item?.content} />
                        <RatingStar rate={item?.rate_number} />
                      </View>
                    </Row>
                  ))}
                </ScrollView>

                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('you_might_also_like')}
                />
                <View
                  style={{
                    marginBottom: mvs(Platform.OS == 'android' ? 20 : 40),
                  }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: mvs(20)}}>
                    {carDetails?.car_related?.map(ele => (
                      // <RelatedHotel
                      //   title={ele?.title}
                      //   price={ele?.price}
                      //   rate={ele?.star_rate}
                      //   source={
                      //     ele?.image_id ? {uri: ele?.image_id} : IMG.Hotels_Bg
                      //   }
                      // />
                      <RelatedCarCard
                        item={ele}
                        onPress={() =>
                          props?.navigation?.push('CarDetails', {
                            slug: ele?.slug,
                          })
                        }
                        // onPressCart={() => setCardModal(true)}
                      />
                    ))}
                  </ScrollView>
                </View>
                <Row>
                  <PrimaryButton
                    loading={deleteLoading}
                    containerStyle={styles.deleteBtn}
                    title={t('delete_car')}
                    onPress={() => deleteCarPress()}
                  />
                  <PrimaryButton
                    loading={statusChangeLoading}
                    containerStyle={styles.publishBtn}
                    title={
                      carDetails?.row?.status === 'publish'
                        ? t('make_hide')
                        : t('make_publish')
                    }
                    onPress={() => statusChangePress()}
                  />
                </Row>
              </ScrollView>
            </View>

            <ImageView
              images={carDetails?.row?.gallery?.map((item, index) => ({
                uri: `${item.large}`,
              }))}
              imageIndex={currentIndex}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
            <CarVideoModal
              visible={videoModal}
              onClose={setVideoModal}
              url={carDetails?.row?.video}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};
export default CarDetailsScreen;
