import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { UTILS } from 'utils';

import {
    setCarAttributes,
    setCarForEdit,
    setCars,
} from './../../../store/reducers/car-reducer';
import { URLS } from '../api-urls';
import { setLocations } from './../../../store/reducers/hotel-reducer';
import { getData, postData, postFormData } from '../';
export const getCars = (
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.car.get_car_list}per_page=2000`,
            );
            dispatch(
                setCars(res?.data),
            );
        } catch (error) {
            console.log('errorLL::::::::', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const getCarAttributes = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(`${URLS.car.get_car_attributes}`);
            // console.log('res-::car attributes>>>', res);
            dispatch(setCarAttributes(res));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        }
    };
};
export const getLocations = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(URLS.car.locations);
            dispatch(setLocations(res?.data));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        }
    };
};
export const getCarForEdit = (
    car_id: any,
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.car.get_car_for_edit}${car_id}`,
            );
            console.log('res of getCarForEdit=>', res);
            dispatch(setCarForEdit(res));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const postFileData = (data: any) => postFormData(`${URLS.car.store_file}`, data);
export const onAddOrUpdateCar = (data: any) => postData(`${URLS.car.add_update_car}${data?.row?.id || -1}`, {
    ...data?.row,
    id: data?.row?.id || null,
    banner_image_id: data?.row?.banner_image_id?.data?.id || '',
    gallery: data?.row?.gallery?.map((x: any) => x?.data?.id)?.join(),
    image_id: data?.row?.image_id?.data?.id || '',
    star_rate: data?.row?.star_rate || '0',
    terms: data?.selected_terms,
});
export const getCarDetails = (slug: any) => getData(`${URLS.car.car_details}${slug}`);
export const deleteCar = (car_id: any) => getData(`${URLS.car.delete_car}${car_id}`);
export const permnentlyDeleteCar = (car_id: any) => getData(`${URLS.car.delete_car}${car_id}?permanently_delete=${1}`);
export const changeCarStatus = (car_id: any, status = 'make-publish') => getData(`${URLS.car.change_car_status}${car_id}/?action=${status}`);
export const getRecoveryCars = () => getData(`${URLS.car.recovery.get_recovery_cars}`);
export const recoverCar = (car_id: any) => getData(`${URLS.car.recovery.recover_car}${car_id}`);

// export const deleteCarRoom = (car_id: any, room_id: any) =>
//     getData(`${URLS.car.room.delete_room}${car_id}/del/${room_id}`);
// export const changecarRoomStatus = (
//     car_id: any,
//     room_id: any,
//     status = 'make-publish',
// ) =>
//     getData(
//         `${URLS.car.room.change_room_status}${car_id}/bulkEdit/${room_id}/?action=${status}`,
//     );

//car availability
export const getCarAvailability = (
    car_id: any,
    start_date: any,
    end_date: any,
) =>
    getData(
        `${URLS.car.get_car_availability}${car_id}&start=${start_date}&end=${end_date}`,
    );

export const updateCarAvailability = (
    data: any
) =>
    postData(
        `${URLS.car.store_car_availability}`, data
    );
