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
import { getData } from '../';
export const getCars = (
    setLoading: (bool: boolean) => void,
    page: number,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const { car_filter, cars } = getState()?.car;
            let filter = UTILS._removeEmptyKeys(car_filter);
            console.log('filter=---->', filter);
            if (!filter?.terms?.length) delete filter?.terms;
            filter = { ...filter, price_range: filter?.price_range?.join(';') };
            if (!filter?.review_score?.length) delete filter?.review_score;
            if (!filter?.star_rate?.length) delete filter?.star_rate;

            const params = new URLSearchParams({
                ...filter,
                page,
            });
            const queryString = params.toString();
            console.log('queryString=>:::', queryString);
            // return res;
            const res = await getData(
                `${URLS.car.get_car_list}?${queryString}`,
            );
            dispatch(
                setCars(
                    page > 1
                        ? { ...cars, data: [...cars?.data, ...res?.data?.data] }
                        : res?.data,
                ),
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
export const onAddOrUpdateCar = (data: any) => postData(`${URLS.car.add_update_car}${data?.id || -1}`, data);
export const getCarDetails = (slug: any) => getData(`${URLS.car.car_details}${slug}`);
export const deleteCar = (car_id: any) => getData(`${URLS.car.delete_car}${car_id}`);
export const permnentlyDeleteCar = (car_id: any) => getData(`${URLS.car.delete_car}${car_id}?permnently_delete=${1}`);
export const changeCarStatus = (car_id: any, status = 'make-publish') => getData(`${URLS.car.change_car_status}${car_id}/?action=${status}`);
export const getRecoveryCars = () => getData(`${URLS.car.recovery.get_recovery_cars}`);
export const recoverCar = (car_id: any) => getData(`${URLS.car.recovery.recover_car}${car_id}`);
//room endpoints
export const getRoomAttributes = (car_id: any) =>
    getData(`${URLS.car.room.get_room_attributes}${car_id}/create`);
export const onAddOrUpdateRoom = (data: any, car_id: any) =>
    postData(
        `${URLS.car.room.add_update_room}${car_id}/store/${data?.id || -1
        }`,
        data,
    );
export const getCarRooms = (car_id: any) =>
    getData(`${URLS.car.room.get_car_rooms}${car_id}/index `);
export const getRoomForEdit = (car_id: any, room_id: any) =>
    getData(
        `${URLS.car.room.get_room_for_edit}${car_id}/edit/${room_id}`,
    );
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

//room availability
// export const getRoomAvailability = (
//     car_id: any,
//     room_id: any,
//     start_date: any,
//     end_date: any,
// ) =>
//     getData(
//         `${URLS.car.room.get_room_availability}${car_id}/availability/loadDates?id=${room_id}&start=${start_date}&end=${end_date}`,
//     );
// export const updateRoomAvailability = (
//     car_id: string,
//     data = {
//         price: 350,
//         number: 9,
//         is_instant: 0,
//         is_default: true,
//         price_html: '$350',
//         event: '$350',
//         start_date: '2023-06-16',
//         end_date: '2023-07-02',
//         target_id: 36,
//     }
// ) =>
//     postData(
//         `${URLS.car.room.store_room_availability}${car_id}/availability/store`, data
//     );
