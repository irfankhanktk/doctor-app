import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {
  Alert,
  I18nManager,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import Entypo from 'react-native-vector-icons/Entypo';

import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';

import {colors} from '../../../config/colors';
import styles from './styles';

import {Loader} from 'components/atoms/loader';
import {useAppSelector} from 'hooks/use-store';
import {goBack, navigate} from 'navigation/navigation-ref';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {PrimaryButton} from 'components/atoms/buttons';
import HotelVideoModal from 'components/molecules/hotel/modals/hotel-video-modal';
import RoomModal from 'components/molecules/hotel/modals/room-detail-modal';
import MyMap from 'components/molecules/map';
import {useDispatch} from 'react-redux';
import {
  changeHotelStatus,
  deleteHotel,
  getHotelDetails,
} from 'services/api/hotel/api-actions';
import {setHotels} from 'store/reducers/hotel-reducer';
import {UTILS} from 'utils';
import HtmlView from './../../../components/atoms/render-html/index';

const HotelDetails = props => {
  const {navigation} = props;
  const dispatch = useDispatch();
  const [roomModal, setRoomModal] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(false);
  const [hotelDetails, setHotelDetails] = React.useState({});
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [visible, setIsVisible] = React.useState(false);

  const {hotels} = useAppSelector(s => s?.hotel);
  const [selectedRoom, setSelectedRoom] = React.useState({});

  const {t} = i18n;

  const {hotel_id, slug} = props?.route?.params || {};

  const [loading, setLoading] = React.useState(true);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [statusChangeLoading, setStatusChangeLoading] = React.useState(false);

  React.useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await getHotelDetails(slug);
      setLoading(false);
      setHotelDetails(res);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const deleteHotelPress = async () => {
    try {
      setDeleteLoading(true);
      await deleteHotel(hotel_id);
      dispatch(setHotels(hotels?.filter(x => x?.id !== hotel_id)));
      goBack();
      Alert.alert('Delete hotel successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setDeleteLoading(false);
    }
  };

  const statusChangePress = async () => {
    try {
      if (hotelDetails?.row?.status === 'publish') {
        setStatusChangeLoading(true);
        await changeHotelStatus(hotel_id, 'make-hide');
        setHotelDetails(pre => ({...pre, row: {...pre.row, status: 'draft'}}));
      } else {
        setStatusChangeLoading(true);
        await changeHotelStatus(hotel_id, 'make-publish');
        setHotelDetails(pre => ({
          ...pre,
          row: {...pre.row, status: 'publish'},
        }));
      }

      Alert.alert('Hotel status change');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setStatusChangeLoading(false);
    }
  };
  const handleImagePress = index => {
    setCurrentIndex(index);
    setIsVisible(true);
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
              onPress={() => navigate('HotelTopTab', {id: hotel_id})}>
              <Entypo name="edit" color={colors.black} size={mvs(18)} />
            </TouchableOpacity>
          </Row>
          <ImageBackground
            source={{uri: `${hotelDetails?.row?.image_id}`}}
            style={styles.hotelsimgbackground}>
            <Row>
              <Row style={styles.bgStyles}>
                <TouchableOpacity
                  onPress={() => setVideoModal(true)}
                  style={{}}>
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
                style={styles.checkRooms}>
                <Medium label={t('check_room')} />
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

              <ScrollView
                contentContainerStyle={{
                  marginVertical: mvs(10),
                }}
                horizontal
                showsHorizontalScrollIndicator={false}>
                {hotelDetails?.row?.gallery?.map((item, index) => (
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
                        source={
                          item?.large ? {uri: item?.large} : IMG.Hotels_Bg
                        }
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
                label={t('Vendor_info')}
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
              />
              <TouchableOpacity style={styles.contentContainerStyleNew}>
                <Row style={{justifyContent: 'flex-start'}}>
                  <FontAwesome
                    name="user-circle"
                    color={colors.lightGray}
                    size={mvs(40)}
                    style={{
                      alignSelf: 'center',
                    }}
                  />
                  <View style={{marginLeft: mvs(14)}}>
                    <Row style={{justifyContent: 'flex-start'}}>
                      <Medium label={hotelDetails?.row?.author?.name} />
                      <Icon
                        name="checkcircle"
                        color={colors.lightGray}
                        size={mvs(16)}
                        style={{
                          alignSelf: 'center',
                          marginLeft: mvs(6),
                        }}
                      />
                    </Row>
                    <Medium
                      label={`${t('Member_Since')}  ${moment(
                        hotelDetails?.row?.author?.created_at,
                      ).format('MMMM,YYYY')}`}
                    />
                  </View>
                </Row>
              </TouchableOpacity>
              <Medium
                label={t('description')}
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
              />
              <HtmlView html={hotelDetails?.row?.content} />

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

              <View>
                {hotelDetails?.row?.policy?.map(ele => (
                  <>
                    <Medium label={`${ele?.title}`} />
                    <Regular label={`${ele?.content}`} />
                  </>
                ))}
              </View>
              {hotelDetails?.row?.attributes?.map((attr, index) => (
                <View key={index}>
                  <Medium
                    style={{marginTop: mvs(12), fontSize: mvs(18)}}
                    label={attr?.parent?.title}
                  />
                  <Row style={{flexWrap: 'wrap'}}>
                    {attr?.child?.map((item, i) => (
                      <View
                        style={{marginHorizontal: mvs(5), marginBottom: mvs(5)}}
                        key={i}>
                        <Row>
                          {/* {item?.image_id ? (
                            <SvgUri source={{uri: `${item?.image_id}`}} />
                          ) : null} */}
                          <Regular
                            style={{marginHorizontal: mvs(2)}}
                            label={item?.title}
                          />
                        </Row>
                      </View>
                    ))}
                  </Row>
                </View>
              ))}
              <Medium
                style={{marginTop: mvs(12), fontSize: mvs(18)}}
                label={t('location')}
              />
              <MyMap
                coord={{
                  latitude: (hotelDetails?.row?.map_lat || 19.229727) * 1,
                  longitude: (hotelDetails?.row?.map_lng || 72.98447) * 1,
                }}
                coordinate={{
                  latitude: (hotelDetails?.row?.map_lat || 19.229727) * 1,
                  longitude: (hotelDetails?.row?.map_lng || 72.98447) * 1,
                }}
                // initialRegion={{
                //   latitude: (hotelDetails?.row?.map_lat || 19.229727) * 1,
                //   longitude: (hotelDetails?.row?.map_lng || 72.98447) * 1,
                // }}
              />
              <Row>
                <PrimaryButton
                  loading={deleteLoading}
                  containerStyle={styles.deleteBtn}
                  title={t('delete_hotel')}
                  onPress={() => deleteHotelPress()}
                />
                <PrimaryButton
                  loading={statusChangeLoading}
                  containerStyle={styles.publishBtn}
                  title={
                    hotelDetails?.row?.status === 'publish'
                      ? t('make_hide')
                      : t('make_publish')
                  }
                  onPress={() => statusChangePress()}
                />
              </Row>
            </ScrollView>
          </View>

          <RoomModal
            visible={roomModal}
            onClose={setRoomModal}
            room={selectedRoom}
          />
          <ImageView
            // images={carDetails?.row?.gallery?.large}
            // images={[
            //   {
            //     uri: url,
            //   },
            // ]}
            images={hotelDetails?.row?.gallery?.map((item, index) => ({
              uri: item.large,
            }))}
            imageIndex={currentIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <HotelVideoModal
            visible={videoModal}
            onClose={setVideoModal}
            url={hotelDetails?.row?.video}
          />
        </>
      )}
    </View>
  );
};
export default HotelDetails;
