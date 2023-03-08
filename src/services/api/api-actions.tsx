import {STORAGEKEYS} from 'config/constants';
import {goBack, navigate} from 'navigation/navigation-ref';
import {Alert} from 'react-native';
import {AppDispatch, RootState} from 'store';
import {getData, postData} from '.';
import {
  setHospitals,
  setSpecCategories,
} from '../../store/reducers/doctor-reducer';
import {setUserInfo} from '../../store/reducers/user-reducer';
import {UTILS} from '../../utils';
import {URLS} from './api-urls';

// export const getNearByHospitals = async (lat: any, long: any) => {
//     try {
//         return postData(URLS.doctor_module.near_by_hospitals, {
//             lat,
//             long,
//         });
//     } catch (error: any) {
//         Alert.alert('', UTILS.returnError(error));
//     }
// }
export const getAppointmentsList = async (
  doctor_id: string,
  setLoading: (bool: boolean) => void,
  status?: string,
) => {
  try {
    setLoading(true);
    const data = {
      doctor_id,
      status,
    };
    if (status === 'total') {
      delete data?.status;
    }
    const res = await postData(URLS.appointment.list, data);
    return res;
  } catch (error: any) {
    // console.log('error in getSpecCategories', error);
    Alert.alert('', UTILS.returnError(error));
  } finally {
    setLoading(false);
  }
};
export const getAppointmentDetails = async (
  appointment_id: string,
  setLoading: (bool: boolean) => void,
) => {
  try {
    console.log('appointment_id=>', appointment_id);

    setLoading(true);
    const res = await postData(URLS.appointment.details, {
      appointment_id,
    });
    return res;
  } catch (error: any) {
    // console.log('error in getSpecCategories', error);
    Alert.alert('', UTILS.returnError(error));
  } finally {
    setLoading(false);
  }
};
export const onChangeAppoinmentStatus = async (
  appointment_id: string,
  status: string,
  setLoading: (bool: any) => void,
) => {
  try {
    console.log('onChangeAppoinmentStatus appointment_id=>', appointment_id);
    setLoading(appointment_id);
    const res = await postData(URLS.appointment.status_change, {
      appointment_id,
      status,
    });
    goBack();
    // return res;
  } catch (error: any) {
    // console.log('error in getSpecCategories', error);
    Alert.alert('', UTILS.returnError(error));
  } finally {
    setLoading(false);
  }
};
//
export const getAllHospitals = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.all_hospitals);
      console.log('res of getAllHospitals=>', res);
      dispatch(setHospitals(res?.allHospitals || []));
    } catch (error: any) {
      console.log('error in getAllHospitals', error);
      Alert.alert('', UTILS.returnError(error));
    }
  };
};
// get specialist categories
export const getAllCategories = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.categories.getAll);
      console.log('res of getAllCategories=>', res);
      dispatch(setSpecCategories(res?.allSpecialization || []));
    } catch (error: any) {
      console.log('error in getAllCategories', error);
      Alert.alert('', UTILS.returnError(error));
    }
  };
};
export const getHomeData = async (doctor_id: string) => {
  try {
    const res = await postData(URLS.appointment.home_counter, {
      doctor_id,
    });
    console.log('res of getHomeData=>', res);
    // dispatch(setHospitals(res?.allHospitals || []));
    return res;
  } catch (error: any) {
    console.log('error in getHomeData', error);
    Alert.alert('', UTILS.returnError(error));
  }
};
export const onDeleteAvailbility = async (
  availability_id: number,
  setLoading: (bool: any) => void,
) => {
  try {
    setLoading(availability_id);
    const res = await postData(URLS.availability.delete, {
      availability_id,
    });
    console.log('res of onDeleteAvailbility=>', res);
    Alert.alert('Delete', res?.message);
    goBack();
  } catch (error: any) {
    console.log('error in onDeleteAvailbility', error);
    Alert.alert('', UTILS.returnError(error));
  } finally {
    setLoading(false);
  }
};
export const onEditHospitalAvailbilityDetails = async (
  hospital_id: number,
  doctor_id: number,
) => {
  try {
    const res = await postData(
      URLS.availability.edithospitalAvailabilityDetails,
      {
        hospital_id,
        doctor_id,
      },
    );
    console.log('res of onEditHospitalAvailbilityDetails=>', res);
    return res;
  } catch (error: any) {
    console.log('error in onEditHospitalAvailbilityDetails', error);
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
//
export const getDoctorAvailability = async (doctor_id: string) => {
  try {
    const res = await postData(URLS.availability.getDoctorHospitals, {
      doctor_id,
    });
    console.log('res of getDoctorAvailability=>', res);
    return res;
  } catch (error: any) {
    console.log('error in getDoctorAvailability', error);
    Alert.alert('', UTILS.returnError(error));
    throw error;
  }
};
export const getDoctorAvailabilityDetails = async (
  doctor_id: string,
  hospital_id: string,
) => {
  try {
    const res = await postData(URLS.availability.getDoctorHospitalDetails, {
      doctor_id,
      hospital_id,
    });
    console.log('res of getDoctorAvailabilityDetails=>', res);
    return res;
  } catch (error: any) {
    console.log('error in getDoctorAvailabilityDetails', error);
    Alert.alert('', UTILS.returnError(error));
    throw error;
  }
};

export const onSignup = (
  values: any,
  setLoading: (bool: boolean) => void,
  props: any,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(URLS.auth.signup, values);
      console.log('res of onSignupPress=>', res);
      Alert.alert('Account', 'Accrout is created successfully');
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      dispatch(setUserInfo(res?.user));
      UTILS.resetStack(props, 'BottomTab');
    } catch (error: any) {
      console.log('error in onSignupPress', UTILS?.returnError(error));
      Alert.alert('', error?.message);
    } finally {
      setLoading(false);
    }
  };
};
export const onAddAvailability = (
  values: any,
  setLoading: (bool: boolean) => void,
  props: any,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      console.log('values=>', values);

      const res = await postData(URLS.availability.add, values);
      console.log('res of onAddAvailability=>', res);

      // UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      // dispatch(setUserInfo(res?.user));

      // UTILS.resetStack(props, 'Home');
      // navigate('AddAvailability', values)
    } catch (error: any) {
      console.log('error in onSignupPress', error);
      Alert.alert('', error?.message);
    } finally {
      setLoading(false);
    }
  };
};
// export const onUpdateProfile = (values: any, setLoading: (bool: boolean) => void, props: any) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         try {
//             setLoading(true)
//             const res = await postData(URLS.auth.update_profile, values);
//             console.log('res of onUpdateProfile=>', res);

//             UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
//             dispatch(setUserInfo(res?.user));
//             goBack();
//         } catch (error: any) {
//             console.log('error in onUpdateProfile', error);
//             Alert.alert('', error?.message,);
//         } finally {
//             setLoading(false);
//         }
//     }
// }
// export const onUpdatePassword = (values: any, setLoading: (bool: boolean) => void, props: any) => {
//     return async (dispatch: AppDispatch, getState: () => RootState) => {
//         try {
//             setLoading(true)
//             const res = await postData(URLS.auth.update_password, values);
//             console.log('res of onUpdatePassword=>', res);
//             Alert.alert('Password Changed Successfully')
//         } catch (error: any) {
//             console.log('error in onSignupPress', UTILS.returnError(error));
//             Alert.alert('', error?.message,);
//         } finally {
//             setLoading(false);
//         }
//     }
// }
export const onLogin = (
  values: any,
  setLoading: (bool: boolean) => void,
  props: any,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(URLS.auth.login, values);
      console.log('res of onLogin=>', res);
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.doctor));
      dispatch(setUserInfo(res?.doctor));
      UTILS.resetStack(props, 'BottomTab');
    } catch (error: any) {
      console.log('error in login', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    } finally {
      setLoading(false);
    }
  };
};
export const onVerifyOtp = (values: any) => {
  return postData(URLS.auth.login, values);
};
export const onLogoutPress = (props: any) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      // await logout();
      await UTILS.clearStorage();
      dispatch(setUserInfo(null));
      UTILS.resetStack(props, 'Splash');
    } catch (error: any) {
      console.log('error in onDeleteTask', error);
      Alert.alert('', error);
    }
  };
};
