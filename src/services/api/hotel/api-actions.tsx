import { STORAGEKEYS } from 'config/constants';
import { goBack } from 'navigation/navigation-ref';
import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { getData, postData, postFormData, postImage } from '../';
import { setHotelAttributes, setHotelForEdit, setHotels, setLocations, setRoomAttributes } from '../../../store/reducers/hotel-reducer';
import { UTILS } from 'utils';
import { URLS } from '../api-urls';
import React from 'react';
export const getAllHotels = (setLoading: (bool: boolean) => void) => {

    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true)
            const res = await getData(`${URLS.hotel_vendor.get_hotel_list}per_page=200`);
            // console.log('res-::hotel>>>', res);

            dispatch(setHotels(res?.data?.data));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        } finally {
            setLoading(false)
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
export const getHotelForEdit = (hotel_id: any, setLoading: (bool: boolean) => void) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(`${URLS.hotel_vendor.get_hotel_for_edit}${hotel_id}`);
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
export const changeHotelStauts = (hotel_id: any, status = 'make-publish') => getData(`${URLS.hotel_vendor.change_hotel_status}${hotel_id}/?action=${status}`);
export const getRecoveryHotels = () => getData(`${URLS.hotel_vendor.recovery.get_recovery_hotels}`);
export const recoverHotel = (hotel_id: any) => getData(`${URLS.hotel_vendor.recovery.recover_hotel}${hotel_id}`);
//room endpoints
export const getRoomAttributes = (hotel_id: any) => getData(`${URLS.hotel_vendor.room.get_room_attributes}${hotel_id}/create`);
export const onAddOrUpdateRoom = (data: any, hotel_id: any) => postData(`${URLS.hotel_vendor.room.add_update_room}${hotel_id}/store/${data?.id || -1}`, data);
export const getHotelRooms = (hotel_id: any) => getData(`${URLS.hotel_vendor.room.get_hotel_rooms}${hotel_id}/index `);
export const getRoomForEdit = (hotel_id: any, room_id: any) => getData(`${URLS.hotel_vendor.room.get_room_for_edit}${hotel_id}/edit/${room_id}`);
export const deleteHotelRoom = (hotel_id: any, room_id: any) => getData(`${URLS.hotel_vendor.room.delete_room}${hotel_id}/del/${room_id}`);
export const changeHotelRoomStatus = (hotel_id: any, room_id: any, status = 'make-publish') => getData(`${URLS.hotel_vendor.room.change_room_status}${hotel_id}/bulkEdit/${room_id}/?action=${status}`);
