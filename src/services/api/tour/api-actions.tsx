import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { UTILS } from 'utils';

import {
    setTourAttributes,
    setTourForEdit,
    setTours,
} from '../../../store/reducers/tour-reducer';
import { URLS } from '../api-urls';
import { setLocations } from '../../../store/reducers/hotel-reducer';
import { getData, postData, postFormData } from '../';
export const getTours = (
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.tour.get_tour_list}per_page=2000`,
            );
            dispatch(
                setTours(res?.data),
            );
        } catch (error) {
            console.log('errorLL::::::::', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const getTourAttributes = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(`${URLS.tour.get_tour_attributes}`);
            // console.log('res-::tour attributes>>>', res);
            dispatch(setTourAttributes(res));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        }
    };
};
export const getLocations = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(URLS.tour.locations);
            dispatch(setLocations(res?.data));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        }
    };
};
export const getTourForEdit = (
    tour_id: any,
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.tour.get_tour_for_edit}${tour_id}`,
            );
            console.log('res of getTourForEdit=>', res);
            dispatch(setTourForEdit(res));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const postFileData = (data: any) => postFormData(`${URLS.tour.store_file}`, data);
export const onAddOrUpdateTour = (data: any) => postData(`${URLS.tour.add_update_tour}${data?.id || -1}`, data);
export const getTourDetails = (slug: any) => getData(`${URLS.tour.tour_details}${slug}`);
export const deleteTour = (tour_id: any) => getData(`${URLS.tour.delete_tour}${tour_id}`);
export const permnentlyDeleteTour = (tour_id: any) => getData(`${URLS.tour.delete_tour}${tour_id}?permanently_delete=${1}`);
export const changeTourStatus = (tour_id: any, status = 'make-publish') => getData(`${URLS.tour.change_tour_status}${tour_id}/?action=${status}`);
export const getRecoveryTours = () => getData(`${URLS.tour.recovery.get_recovery_tours}`);
export const recoverTour = (tour_id: any) => getData(`${URLS.tour.recovery.recover_tour}${tour_id}`);

// export const deleteTourRoom = (tour_id: any, room_id: any) =>
//     getData(`${URLS.tour.room.delete_room}${tour_id}/del/${room_id}`);
// export const changetourRoomStatus = (
//     tour_id: any,
//     room_id: any,
//     status = 'make-publish',
// ) =>
//     getData(
//         `${URLS.tour.room.change_room_status}${tour_id}/bulkEdit/${room_id}/?action=${status}`,
//     );

//tour availability
export const getTourAvailability = (
    tour_id: any,
    start_date: any,
    end_date: any,
) =>
    getData(
        `${URLS.tour.get_tour_availability}${tour_id}&start=${start_date}&end=${end_date}`,
    );

export const updateTourAvailability = (
    data: any
) =>
    postData(
        `${URLS.tour.store_tour_availability}`, data
    );
