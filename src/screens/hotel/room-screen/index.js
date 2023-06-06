import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import React from 'react';

import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import {Loader} from 'components/atoms/loader';
import {colors} from 'config/colors';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import styles from './styles';

import Header1x2x from 'components/atoms/headers/header-1x-2x';
import HotelVideoModal from 'components/molecules/hotel/modals/hotel-video-modal';
import {useAppDispatch, useAppSelector} from 'hooks/use-store';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {addToCart, getRooms} from 'services/api/hotel-api-actions';
// import {setRooms} from 'store/reducers/hotel-reducer';

import {Checkbox} from 'components/atoms/checkbox';
import HotelRoom from 'components/molecules/hotel/hotel-room';
import RoomSelectionModal from 'components/molecules/hotel/modals/room-selection-modal';
const RoomScreen = props => {
  const {user, hotel} = useAppSelector(s => s);
  const {userInfo} = user;
  const dispatch = useAppDispatch();
  const initialValues = userInfo ?? {};
  const [loading, setLoading] = React.useState(false);
  const [selectedMethod, setSelectedMethod] = React.useState('cash');
  const [videoModal, setVideoModal] = React.useState(false);
  const [roomSelectedmodal, setRoomSelectedModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState({});

  const {hotelId} = props?.route?.params;
  const {hotelDetails} = props?.route?.params;
  const [extraPrices, setExtraPrices] = React.useState(
    hotelDetails?.booking_data?.extra_price || [],
  );
  const rooms = [{id: 1}, {id: 2}];
  console.log({hotelId});
  const [filterModal, setFilterModal] = React.useState(false);
  // const searchRooms = () => {
  //   dispatch(getRooms(hotelId, setLoading));
  // };
  // React.useEffect(() => {
  //   searchRooms();
  // }, []);

  // const onBookNow = async () => {
  //   try {
  //     setLoading(true);
  //     const data = {
  //       service_id: hotelId,
  //       service_type: 'hotel',
  //       start_date: room_filter?.start_date,
  //       end_date: room_filter?.end_date,
  //       extra_price: extraPrices
  //         ?.filter(r => r?.selected)
  //         ?.map(({selected, ...rest}) => rest),
  //       adults: room_filter?.adults,
  //       children: room_filter?.children,
  //       rooms: rooms
  //         ?.filter(r => r?.selectedRoomNumber)
  //         ?.map(x => ({
  //           id: x?.id,
  //           number_selected: x?.selectedRoomNumber,
  //         })),
  //       user_id: userInfo?.id,
  //     };
  //     // const res = await addToCart(data);
  //     Alert.alert('Room is added to cart', res?.message);
  //     props?.navigation?.navigate('CheckoutScreen');
  //     console.log('res===>', res);
  //   } catch (error) {
  //     Alert.alert('Error', UTILS.returnError(error));
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <View style={styles.container1}>
      <Header1x2x title={t('Available_Rooms')} back={true} />
      <View style={{flex: 1}}>
        <Row
          style={{
            alignItems: 'center',
            marginHorizontal: mvs(20),
            marginTop: mvs(15),
          }}>
          <Medium label={t('all_rooms')} fontSize={mvs(20)} />
          <TouchableOpacity
            // onPress={() => props?.navigation?.navigate('Hotels')}
            onPress={() => setFilterModal(true)}>
            <Row>
              <Regular label={'Filter Rooms'} />
              <Ionicons
                size={mvs(20)}
                name={'filter'}
                color={colors.primary}
                style={{marginLeft: mvs(5)}}
              />
            </Row>
            {/* <Medium label={'Filter'} fontSize={mvs(20)} style={{ marginHorizontal: mvs(20), marginTop: mvs(15), }} /> */}
          </TouchableOpacity>
        </Row>
        {loading ? (
          <Loader />
        ) : (
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: mvs(20),
              paddingBottom: mvs(20),
              flexGrow: 1,
            }}
            style={{paddingVertical: mvs(20), flexGrow: 1}}>
            {rooms?.map(ele => (
              <HotelRoom
                selectedRoomNumber={ele?.selectedRoomNumber}
                hotel_img={{uri: `${ele?.image}`}}
                roomtitle={ele?.title}
                beds={ele?.beds_html}
                size={ele?.size_html}
                adults={ele?.adults_html}
                children={ele?.children_html}
                onPressroom={() => setVideoModal(true)}
                onPressselectedRoom={() => {
                  setRoomSelectedModal(true);
                  setSelectedRoom(ele);
                }}
                onPress={() => {
                  navigate('RoomBooking', {
                    room: ele,
                  });
                }}
              />
            ))}
          </ScrollView>
        )}
      </View>

      <HotelVideoModal
        visible={videoModal}
        onClose={setVideoModal}
        url={hotelDetails?.video}
      />
      <RoomSelectionModal
        visible={roomSelectedmodal}
        onClose={setRoomSelectedModal}
        selectedRoom={selectedRoom}
        onPressRoom={number => {
          const copy = [...rooms];
          const newRooms = copy?.map(room =>
            room?.id === selectedRoom?.id
              ? {...room, selectedRoomNumber: number}
              : room,
          );

          console.log('newRooms=>>>', newRooms);
          // dispatch(setRooms(newRooms));
          setSelectedRoom({});
          setRoomSelectedModal(false);
        }}
      />
      {rooms?.some(r => r?.selectedRoomNumber) && (
        <View
          style={{
            // position: 'absolute',
            // bottom: 0,
            paddingVertical: mvs(10),
            backgroundColor: colors.white,
            ...colors.shadow,
            paddingHorizontal: mvs(20),
            borderRadius: mvs(10),
            width: '100%',
          }}>
          <Medium label={t('extra_price')} />
          {extraPrices?.map((item, index) => (
            <Row>
              <Row style={{justifyContent: 'flex-start'}}>
                <Checkbox
                  checked={item?.selected}
                  onPress={() => {
                    const copy = [...extraPrices];
                    item.selected = !item?.selected;
                    copy[index] = item;
                    setExtraPrices(copy);
                  }}
                />
                <Medium label={item?.name} style={{marginLeft: mvs(10)}} />
              </Row>
              <Medium label={`$${item?.price} `} />
            </Row>
          ))}
          <Row>
            <Medium
              label={`Total Room $${rooms?.reduce(
                (acc, room) => acc + (room?.selectedRoomNumber || 0),
                0,
              )}`}
            />
            <Medium
              label={`Service Fee $${hotelDetails?.row?.service_fee || 0}`}
            />
          </Row>
          <Row>
            <Medium
              label={'Total Price'}
              fontSize={mvs(20)}
              color={colors.primary}
            />
            <Medium
              label={`$${
                rooms?.reduce(
                  (acc, room) =>
                    acc + (room?.selectedRoomNumber || 0) * room?.price * 1,
                  0,
                ) *
                  1 +
                extraPrices
                  ?.filter(x => x?.selected)
                  ?.reduce((acc, extras) => acc + extras?.price * 1, 0) *
                  1
              }`}
              fontSize={mvs(20)}
              color={colors.primary}
            />
          </Row>

          <PrimaryButton
            onPress={() => {
              onBookNow();
            }}
            title={t(`add_to_cart`)}
            loading={loading}
          />
        </View>
      )}
      <PlusButton onPress={() => props?.navigation?.navigate('AddRoom')} />
    </View>
  );
};
export default RoomScreen;
