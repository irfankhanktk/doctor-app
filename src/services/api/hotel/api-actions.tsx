import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { UTILS } from 'utils';
import { getData, postData, postFormData } from '../';
import {
    setHotelAttributes,
    setHotelForEdit,
    setHotels,
    setLocations
} from '../../../store/reducers/hotel-reducer';
import { URLS } from '../api-urls';
export const getAllHotels = (setLoading: (bool: boolean) => void) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.hotel_vendor.get_hotel_list}per_page=200`,
            );
            // console.log('res-::hotel>>>', res);

            dispatch(setHotels(res?.data?.data));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const getHotelAttributes = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(`${URLS.hotel_vendor.get_hotel_attributes}`);
            // console.log('res-::hotel attributes>>>', res);
            dispatch(setHotelAttributes(res));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        }
    };
};
export const getLocations = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(URLS.hotel_vendor.locations);
            console.log('res of getLocations=>', res);
            dispatch(setLocations(res?.data));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        }
    };
};
export const getHotelForEdit = (
    hotel_id: any,
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.hotel_vendor.get_hotel_for_edit}${hotel_id}`,
            );
            console.log('res of getHotelForEdit=>', res);
            dispatch(setHotelForEdit(res));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const postFileData = (data: any) => postFormData(`${URLS.hotel_vendor.store_file}`, data);
export const onAddOrUpdateHotel = (data: any) => postData(`${URLS.hotel_vendor.add_update_hotel}${data?.id || -1}`, data);
export const getHotelDetails = (slug: any) => getData(`${URLS.hotel_vendor.hotel_details}${slug}`);
export const deleteHotel = (hotel_id: any) => getData(`${URLS.hotel_vendor.delete_hotel}${hotel_id}`);
export const permnentlyDeleteHotel = (hotel_id: any) => getData(`${URLS.hotel_vendor.delete_hotel}${hotel_id}?permnently_delete=${1}`);
export const changeHotelStatus = (hotel_id: any, status = 'make-publish') => getData(`${URLS.hotel_vendor.change_hotel_status}${hotel_id}/?action=${status}`);
export const getRecoveryHotels = () => getData(`${URLS.hotel_vendor.recovery.get_recovery_hotels}`);
export const recoverHotel = (hotel_id: any) => getData(`${URLS.hotel_vendor.recovery.recover_hotel}${hotel_id}`);
//room endpoints
export const getRoomAttributes = (hotel_id: any) =>
    getData(`${URLS.hotel_vendor.room.get_room_attributes}${hotel_id}/create`);
export const onAddOrUpdateRoom = (data: any, hotel_id: any) =>
    postData(
        `${URLS.hotel_vendor.room.add_update_room}${hotel_id}/store/${data?.id || -1
        }`,
        data,
    );
export const getHotelRooms = (hotel_id: any) =>
    getData(`${URLS.hotel_vendor.room.get_hotel_rooms}${hotel_id}/index `);
export const getRoomForEdit = (hotel_id: any, room_id: any) =>
    getData(
        `${URLS.hotel_vendor.room.get_room_for_edit}${hotel_id}/edit/${room_id}`,
    );
export const deleteHotelRoom = (hotel_id: any, room_id: any) =>
    getData(`${URLS.hotel_vendor.room.delete_room}${hotel_id}/del/${room_id}`);
export const changeHotelRoomStatus = (
    hotel_id: any,
    room_id: any,
    status = 'make-publish',
) =>
    getData(
        `${URLS.hotel_vendor.room.change_room_status}${hotel_id}/bulkEdit/${room_id}/?action=${status}`,
    );

//room availability
export const getRoomAvailability = (
    hotel_id: any,
    room_id: any,
    start_date: any,
    end_date: any,
) =>
    getData(
        `${URLS.hotel_vendor.room.get_room_availability}${hotel_id}/availability/loadDates?id=${room_id}&start=${start_date}&end=${end_date}`,
    );
export const updateRoomAvailability = (
    hotel_id: string,
    data = {
        price: 350,
        number: 9,
        is_instant: 0,
        is_default: true,
        price_html: '$350',
        event: '$350',
        start_date: '2023-06-16',
        end_date: '2023-07-02',
        target_id: 36,
    }
) =>
    postData(
        `${URLS.hotel_vendor.room.store_room_availability}${hotel_id}/availability/store`, data
    );
