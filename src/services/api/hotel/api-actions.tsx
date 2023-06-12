import { STORAGEKEYS } from 'config/constants';
import { goBack } from 'navigation/navigation-ref';
import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { getData } from '../';
import { setHotels } from '../../../store/reducers/hotel-reducer';
import { UTILS } from 'utils';
import { URLS } from '../api-urls';
export const getAllHotels = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        try {
            const res = await getData(`${URLS.hotel_vendor.get_hotel_list}per_page=200`);
            // console.log('res-::hotel>>>', res);
            dispatch(setHotels(res?.data?.data));
        } catch (error: any) {
            console.log('error in getAllHospitals', UTILS.returnError(error));
            Alert.alert('', UTILS.returnError(error));
        }
    };
};

export const getHotelDetails = (hotel_id: string) => getData(`${URLS.hotel_vendor.get_hotel_for_edit}${hotel_id}`);

