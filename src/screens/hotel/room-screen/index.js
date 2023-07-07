import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import React from 'react';

import {PlusButton, PrimaryButton} from 'components/atoms/buttons';
import {Loader} from 'components/atoms/loader';
import {colors} from 'config/colors';
import {Alert, ScrollView, View} from 'react-native';
import Medium from 'typography/medium-text';
import styles from './styles';

import Header1x2x from 'components/atoms/headers/header-1x-2x';
import HotelVideoModal from 'components/molecules/hotel/modals/hotel-video-modal';
import {useAppSelector} from 'hooks/use-store';
import {t} from 'i18next';
import {navigate} from 'navigation/navigation-ref';
// import {addToCart, getRooms} from 'services/api/hotel-api-actions';
// import {setRooms} from 'store/reducers/hotel-reducer';

import {Checkbox} from 'components/atoms/checkbox';
import HotelRoom from 'components/molecules/hotel/hotel-room';
import RoomSelectionModal from 'components/molecules/hotel/modals/room-selection-modal';
import {
  changeHotelRoomStatus,
  deleteHotelRoom,
  getHotelRooms,
} from 'services/api/hotel/api-actions';
import {UTILS} from 'utils';
const initialFilter = {
  start_date: null,
  end_date: null,
  children: 0,
  adults: 1,
};
const RoomScreen = props => {
  const {navigation} = props;
  const {user, hotel} = useAppSelector(s => s);
  const {userInfo} = user;
  const [filterData, setFilterData] = React.useState({
    start_date: '',
    end_date: '',
    children: '0',
    adults: '1',
  });
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setdeleteLoading] = React.useState(false);
  const [videoModal, setVideoModal] = React.useState(false);
  const [roomSelectedmodal, setRoomSelectedModal] = React.useState(false);
  const [selectedRoom, setSelectedRoom] = React.useState({});
  const [rooms, setRooms] = React.useState([]);
  const [statusChangeLoading, setStatusChangeLoading] = React.useState(false);
  const {hotel_id} = props?.route?.params;
  const {hotelDetails} = props?.route?.params;

  const getRooms = async () => {
    try {
      setLoading(true);
      const res = await getHotelRooms(hotel_id);
      setRooms(res?.rows?.data);
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
  const onDeleteRoom = async (hotel_id, room_id) => {
    try {
      setdeleteLoading(room_id);
      await deleteHotelRoom(hotel_id, room_id);
      setRooms(rooms?.filter(x => x?.id !== room_id));
      Alert.alert('Room delete successfully');
    } catch (error) {
      Alert.alert('Error', UTILS.returnError(error));
    } finally {
      setdeleteLoading(false);
    }
  };
  const roomStatusChangePress = async (hotel_id, room_id, status) => {
    try {
      setStatusChangeLoading(room_id);
      if (status === 'publish') {
        await changeHotelRoomStatus(hotel_id, room_id, 'make-hide');
        setRooms(pre =>
          pre?.map(x => (x?.id === room_id ? {...x, status: 'draft'} : {...x})),
        );
      } else {
        await changeHotelRoomStatus(hotel_id, room_id, 'make-publish');
        setRooms(pre =>
          pre?.map(x =>
            x?.id === room_id ? {...x, status: 'publish'} : {...x},
          ),
        );
      }
      Alert.alert('Hotel status change');
    } catch (error) {
      Alert.alert(UTILS.returnError(error));
    } finally {
      setStatusChangeLoading(false);
    }
  };
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      getRooms();
    });
    return unsubscribe;
  }, [props.navigation]);
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
            {rooms?.map((ele, index) => (
              <HotelRoom
                key={index}
                selectedRoomNumber={ele?.selectedRoomNumber}
                hotel_img={{uri: `${ele?.image_id?.url}`}}
                roomtitle={ele?.title}
                beds={ele?.beds}
                size={ele?.size}
                adults={ele?.adults}
                children={ele?.children}
                number={ele?.number}
                status={ele?.status}
                deleteLoading={deleteLoading === ele?.id}
                loading={statusChangeLoading === ele?.id}
                onPressStatusChange={() =>
                  roomStatusChangePress(hotel_id, ele?.id, ele?.status)
                }
                onPressEditRoom={() =>
                  props?.navigation?.navigate('AddRoom', {
                    hotel_id,
                    room_id: ele?.id,
                  })
                }
                onPressDeleteRoom={() => onDeleteRoom(hotel_id, ele?.id)}
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
          setSelectedRoom({});
          setRoomSelectedModal(false);
        }}
      />
      {rooms?.some(r => r?.selectedRoomNumber) && (
        <View
          style={{
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
      <PlusButton
        onPress={() =>
          props?.navigation?.navigate('AddRoom', {hotel_id, room_id: null})
        }
      />
    </View>
  );
};
export default RoomScreen;
