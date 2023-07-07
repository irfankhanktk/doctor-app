import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { UTILS } from 'utils';

import { getData, postData, postFormData } from '../';
import {
    setEventAttributes,
    setEventForEdit,
    setEvents,
} from '../../../store/reducers/event-reducer';
import { URLS } from '../api-urls';
export const getEvents = (
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.event.get_event_list}per_page=2000`,
            );
            dispatch(
                setEvents(res?.data),
            );
        } catch (error) {
            console.log('errorLL::::::::', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const getEventAttributes = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(`${URLS.event.get_event_attributes}`);
            // console.log('res-::event attributes>>>', res);
            dispatch(setEventAttributes(res));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        }
    };
};
export const getEventForEdit = (
    event_id: any,
    setLoading: (bool: boolean) => void,
) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            setLoading(true);
            const res = await getData(
                `${URLS.event.get_event_for_edit}${event_id}`,
            );
            console.log('res of getEventForEdit=>', res);
            dispatch(setEventForEdit(res));
        } catch (error) {
            console.log('error', UTILS.returnError(error));
            Alert.alert('Error', UTILS.returnError(error));
        } finally {
            setLoading(false);
        }
    };
};
export const postFileData = (data: any) => postFormData(`${URLS.event.store_file}`, data);
export const onAddOrUpdateevent = (data: any) => postData(`${URLS.event.add_update_event}${data?.id || -1}`, data);
export const getEventDetails = (slug: any) => getData(`${URLS.event.event_details}${slug}`);
export const deleteEvent = (event_id: any) => getData(`${URLS.event.delete_event}${event_id}`);
export const permnentlyDeleteEvent = (event_id: any) => getData(`${URLS.event.delete_event}${event_id}?permanently_delete=${1}`);
export const changeEventStatus = (event_id: any, status = 'make-publish') => getData(`${URLS.event.change_event_status}${event_id}/?action=${status}`);
export const getRecoveryEvents = () => getData(`${URLS.event.recovery.get_recovery_events}`);
export const recoverEvent = (event_id: any) => getData(`${URLS.event.recovery.recover_event}${event_id}`);

export const getEventAvailability = (
    event_id: any,
    start_date: any,
    end_date: any,
) =>
    getData(
        `${URLS.event.get_event_availability}${event_id}&start=${start_date}&end=${end_date}`,
    );

export const updateEventAvailability = (
    data: any
) =>
    postData(
        `${URLS.event.store_event_availability}`, data
    );
