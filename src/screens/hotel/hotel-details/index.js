import {Row} from 'components/atoms/row';

import {DATE_FORMAT} from 'config/constants';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  I18nManager,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

import {colors} from '../../../config/colors';
import styles from './styles';

import {Loader} from 'components/atoms/loader';
import {useAppSelector} from 'hooks/use-store';
import {navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/AntDesign';

import {PrimaryButton} from 'components/atoms/buttons';
import HotelVideoModal from 'components/molecules/hotel/modals/hotel-video-modal';
import RoomModal from 'components/molecules/hotel/modals/room-detail-modal';
import MyMap from 'components/molecules/map';
import {deleteHotel, getHotelDetails} from 'services/api/hotel/api-actions';
import HtmlView from './../../../components/atoms/render-html/index';
const HotelDetails = props => {
  const {navigation} = props;
  const [text, setText] = React.useState('');

  const [roomModal, setRoomModal] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(false);
  const [hotelDetails, setHotelDetails] = React.useState({});
  const [submitReview, setSubmitReview] = React.useState({
    rate_number: '4',
    review_content: '',
  });
  const {userInfo} = useAppSelector(s => s?.user);
  const [selectedRoom, setSelectedRoom] = React.useState({});
  console.log('userinfo-===>', userInfo);
  const {t} = i18n;
  const [filter, setFilter] = React.useState({
    checkin: moment().format(DATE_FORMAT.yyyy_mm_dd),
    checkout: moment().format(DATE_FORMAT.yyyy_mm_dd),
    children: '0',
    rooms: '1',
    adults: '0',
  });
  const {hotel_id, slug} = props?.route?.params || {};

  const [loading, setLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(false);

  React.useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await getHotelDetails(slug);
      setLoading(false);
      setHotelDetails(res);
      console.log('res of hotel detaiols', res);
    } catch (error) {
      setLoading(false);
    }
  };
  const deleteHotelPress = async () => {
    try {
      setDeleteLoading(true);
      await deleteHotel(hotel_id);
      Alert.alert('Delete hotel successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Row style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.goBackBtn}
              onPress={() => navigation?.goBack()}>
              <Icon
                name={I18nManager.isRTL ? 'right' : 'left'}
                size={mvs(20)}
                color={colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigate('AddHotel', {id: hotel_id})}>
              <Entypo name="edit" color={colors.black} size={mvs(18)} />
            </TouchableOpacity>
          </Row>
          <ImageBackground
            source={{uri: hotelDetails?.row?.image_id}}
            style={styles.hotelsimgbackground}>
            <Row>
              <Row
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginHorizontal: mvs(10),
                  paddingVertical: mvs(5),
                }}>
                <TouchableOpacity
                  onPress={() => setVideoModal(true)}
                  style={{
                    marginHorizontal: mvs(20),
                  }}>
                  <Entypo name="video" color={colors.white} size={mvs(30)} />
                </TouchableOpacity>
              </Row>

              <TouchableOpacity
                onPress={() =>
                  navigate('RoomScreen', {
                    hotel_id: hotel_id,
                    hotelDetails,
                  })
                }
                style={{
                  backgroundColor: 'blue',
                  marginHorizontal: mvs(10),
                  paddingHorizontal: mvs(15),
                  paddingVertical: mvs(5),
                  opacity: 0.8,
                  alignSelf: 'center',
                  borderRadius: mvs(10),
                }}>
                <Medium label={t('check_room')} color={colors.white} />
              </TouchableOpacity>
            </Row>
          </ImageBackground>

          <View style={styles.cardContainer}>
            <View style={styles.line} />
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: mvs(20),
                flexGrow: 1,
              }}>
              <Medium style={styles.text} label={hotelDetails?.row?.title} />
              <Row style={{justifyContent: 'flex-start'}}>
                {/* <SpecialistLocation /> */}
                <Entypo
                  name="location"
                  color={colors.black}
                  size={mvs(18)}
                  style={{marginRight: mvs(10)}}
                />
                <Medium
                  label={hotelDetails?.row?.address}
                  style={{marginHorizontal: mvs(10)}}
                />
              </Row>
              <Medium
                label={t('description')}
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
              />
              <HtmlView html={hotelDetails?.row?.content} />
              {/* <Medium
                label={t('rooms')}
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
              />
              <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                {hotelDetails?.rooms?.map(ele => (
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
              <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('rules')}
              />
              <Row>
                <Regular label={t('check_in')} />
                <Regular label={hotelDetails?.row?.check_in_time} />
              </Row>
              <Row>
                <Regular label={t('check_out')} />
                <Regular label={hotelDetails?.row?.check_out_time} />
              </Row>
              <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('hotel_policies')}
              />
              {console.log(
                'hotelDetails?.row?.policy=>>>',
                hotelDetails?.row?.policy,
              )}
              <View>
                {hotelDetails?.row?.policy?.map(ele => (
                  <>
                    <Medium label={`${ele?.title}`} />
                    <Regular label={`${ele?.content}`} />
                  </>
                ))}
              </View>
              <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('services')}
              />
              <Row>
                {['Wifi', 'Bathroom', 'Wakeup call'].map((item, index) => (
                  <View>
                    <Regular label={item} />
                  </View>
                ))}
              </Row>
              <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('location')}
              />
              <MyMap
                coord={{
                  latitude: (hotelDetails?.row?.map_lat || 19.229727) * 1,
                  longitude: (hotelDetails?.row?.map_lng || 72.98447) * 1,
                }}
              />
              <PrimaryButton
                loading={deleteLoading}
                containerStyle={{marginTop: mvs(20), marginBottom: mvs(20)}}
                title="Delete Hotel"
                onPress={() => deleteHotelPress()}
              />
              {/* <Medium
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
                    label={hotelDetails?.row?.review_score}
                  />
                  <Icon name={'star'} size={mvs(15)} color={colors.yellow} />
                </Row>
              </Row> 
            <ScrollView
                contentContainerStyle={{marginVertical: mvs(10)}}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {hotelDetails?.reviews?.map((item, index) => (
                  <Row
                    key={index}
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
                      <Medium label={item?.user?.name} />
                      <Regular fontSize={mvs(12)} label={item?.content} />
                      <RatingStar rate={item?.rate_number} />
                    </View>
                  </Row>
                ))}
              </ScrollView> */}
            </ScrollView>
          </View>

          <RoomModal
            visible={roomModal}
            onClose={setRoomModal}
            room={selectedRoom}
          />
          <HotelVideoModal
            visible={videoModal}
            onClose={setVideoModal}
            url={hotelDetails?.video}
          />
        </>
      )}
    </View>
  );
};
export default HotelDetails;
