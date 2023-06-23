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
import {navigate} from 'navigation/navigation-ref';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {toggleWishlistCar} from 'services/api/auth-api-actions';
import {getCarDetails} from 'services/api/car/api-actions';
import {UTILS} from 'utils';
import ImageView from 'react-native-image-viewing';
const CarDetailsScreen = props => {
  const [text, setText] = React.useState('');
  const [cartModal, setCardModal] = React.useState(false);
  const [roomModal, setRoomModal] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(false);
  const [carDetails, setCarDetails] = React.useState({});
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
  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [wishlistColor, setWishlistColor] = React.useState('');
  const [visible, setIsVisible] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  console.log('userinfo-===>', userInfo);
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
  const [wishlistLoading, setWishlistLoading] = React.useState(false);
  const [submitReviewLoading, setSubmitReviewLoading] = React.useState(false);

  React.useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await getCarDetails(slug);

      setLoading(false);

      setCarDetails(res);
      setWishlistColor(res?.row?.has_wish_list ? true : false);
      // console.log('res of car detaiols', res);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImagePress = index => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  const toggleWishlist = async () => {
    try {
      setWishlistLoading(true);
      const res = await toggleWishlistCar({
        object_id: carDetails?.row?.id,
        object_model: 'car',
        // user_id: userInfo?.id,
      });
      setWishlistColor(res?.status),
        console.log('res--wishlist-->>>', res?.status);
      console.log('res--wishlist-->>>', res);
    } catch (error) {
      // setLoading(false);
      console.log('error =>>>', error);
    } finally {
      setWishlistLoading(false);
    }
  };

  const SubmitReviewCar = async () => {
    try {
      setSubmitReviewLoading(true);
      // const res = await addCarReview({
      //   review_service_id: carDetails?.row?.id,

      //   review_service_type: 'car',
      //   ...submitReview,
      // });
      // getDetails();
      console.log('res--rsubmitreview-->>>', res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
      // setLoading(false);
      console.log('error =>>>', error);
    } finally {
      setSubmitReviewLoading(false);
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
              {/* <HotelsHeader
              style={{height: mvs(200)}}
              isSearch={false}
              title={t('car_details')}
              back={true}
            /> */}
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
                    onPress={toggleWishlist}
                    disabled={wishlistLoading}
                    style={{
                      // marginHorizontal: mvs(20),
                      alignSelf: 'flex-start',
                    }}>
                    <Ionicons
                      name={'heart'}
                      size={mvs(30)}
                      color={wishlistColor == true ? colors.red : colors.black}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setVideoModal(true)}
                    style={{
                      // paddingHorizontal: mvs(15),
                      marginHorizontal: mvs(20),
                      // backgroundColor: colors.black,
                      // opacity: 0.6,
                      // alignSelf: 'flex-end',
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
                {/* <Medium
                label={t('rooms')}
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
              />
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {carDetails?.rooms?.map(ele => (
                  <HotelRoom
                    hotel_img={{uri: `${ele?.image_id}`}}
                    roomtitle={ele?.title}
                    beds={ele?.beds}
                    size={ele?.size}
                    adults={ele?.adults}
                    children={ele?.children}
                    onPressroom={() => setVideoModal(true)}
                    onPress={() => {
                      navigate('RoomBooking', {
                        room: ele,
                      });
                    }}
                  />
                ))}
              </ScrollView> */}
                {/* <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('rules')}
              />
              <Row>
                <Regular label={t('check_in')} />
                <Regular label={carDetails?.row?.check_in_time} />
              </Row>
              <Row>
                <Regular label={t('check_out')} />
                <Regular label={carDetails?.row?.check_out_time} />
              </Row> */}
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
