import { STORAGEKEYS } from 'config/constants';
import { goBack } from 'navigation/navigation-ref';
import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { getData, postData, postFormData, postImage } from '../';
import { setHotelAttributes, setHotels, setLocations } from '../../../store/reducers/hotel-reducer';
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
export const getHotelDetails = (hotel_id: string) => getData(`${URLS.hotel_vendor.get_hotel_for_edit}${hotel_id}`);
export const postFileData = (data: any) => postFormData(`${URLS.hotel_vendor.store_file}`, data);
export const onAddOrUpdateHotel = (data: any) => postData(`${URLS.hotel_vendor.add_update_hotel}${data?.id || -1}`, data);

