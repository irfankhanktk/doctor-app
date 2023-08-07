import { STORAGEKEYS } from 'config/constants';
import { goBack, resetStack } from 'navigation/navigation-ref';
import { Alert } from 'react-native';
import { AppDispatch, RootState } from 'store';
import { getData, postArrrayFormData, postData, postFormData } from './../';
import {
  setHospitals,
  setSpecCategories,
} from '../../../store/reducers/doctor-reducer';
import {
  setNotifications,
  setUserInfo,
  setWallet,
} from '../../../store/reducers/user-reducer';
import { UTILS } from 'utils';
import { URLS } from '../api-urls';

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

export const onChangePassword = async (values: any) => {
  try {
    const res = await postData(URLS.auth.change_password, values);
    return res;
  } catch (error: any) {
    console.log('error in change password', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
export const onChangeAppoinmentStatus = async (
  appointment_id: string,
  status: string,
  setLoading: (bool: any) => void,
) => {
  try {
    setLoading(true);
    const res = await postData(URLS.appointment.status_change, {
      appointment_id,
      status,
    });

    setLoading(false);
  } catch (error: any) {
    // console.log('error in onChangeAppoinmentStatus', error);
    setLoading(false);
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
export const onCompleteAppoinment = async (
  values: any,
  medicine_receipt: any[],
  setLoading: (bool: any) => void,
) => {
  try {
    setLoading(true);
    const formData = new FormData();
    formData.append('appointment_id', values.appointment_id);
    formData.append('amount', values.amount);
    formData.append('payment_method', values.payment_method);
    formData.append('otp', values.otp);
    formData.append('image', values.image);

    // medicine_receipt.forEach(tag => formData.append('medicine_receipt[]', tag));
    formData.append('medicine_receipt', JSON.stringify(medicine_receipt));
    const res = await postArrrayFormData(
      URLS.appointment.complete_appoinment,
      formData,
    );
    setLoading(false);
  } catch (error: any) {
    console.log('error in onCompleteAppoinment', UTILS.returnError(error));
    setLoading(false);
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
//
export const getAllHospitals = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.all_hospitals);
      dispatch(setHospitals(res?.allHospitals || []));
    } catch (error: any) {
      console.log('error in getAllHospitals', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    }
  };
};
// get specialist categories
export const getAllCategories = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const res = await getData(URLS.categories.getAll);
      dispatch(setSpecCategories(res?.allSpecialization || []));
    } catch (error: any) {
      console.log('error in getAllCategories', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
    }
  };
};
export const getHomeData = async (doctor_id: string) => {
  try {
    const res = await postData(URLS.appointment.home_counter, {
      doctor_id,
    });
    return res;
  } catch (error: any) {
    console.log('error in getHomeData', UTILS.returnError(error));
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
    console.log('error in onDeleteAvailbility', UTILS.returnError(error));
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
      URLS.availability.edit_hospital_availability_details,
      {
        hospital_id,
        doctor_id,
      },
    );
    return res;
  } catch (error: any) {
    console.log(
      'error in onEditHospitalAvailbilityDetails',
      UTILS.returnError(error),
    );
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
//
export const getDoctorAvailability = async (doctor_id: string) => {
  try {
    const res = await postData(URLS.availability.get_doctor_hospitals, {
      doctor_id,
    });
    return res;
  } catch (error: any) {
    console.log('error in getDoctorAvailability', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
export const onReadNotifications = async (values: any) => {
  try {
    const res = await postData(URLS.notification.read_notification, values);
    return res;
  } catch (error: any) {
    console.log('error in readNotifications', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
export const updateDoctorAvailabilityDaysTime = async (values: any) => {
  try {
    const res = await postData(
      URLS.availability.update_doctor_availability,
      values,
    );
    return res;
  } catch (error: any) {
    console.log(
      'error in updateDoctorAvailabilityDaysTime',
      UTILS.returnError(error),
    );
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
export const getDoctorAvailabilityDetails = async (
  doctor_id: string,
  hospital_id: string,
) => {
  try {
    const res = await postData(URLS.availability.get_doctor_hospital_details, {
      doctor_id,
      hospital_id,
    });
    return res;
  } catch (error: any) {
    console.log(
      'error in getDoctorAvailabilityDetails',
      UTILS.returnError(error),
    );
    Alert.alert('', UTILS.returnError(error));
    throw UTILS.returnError(error);
  }
};
///Notifications///

// export const onSignup = (
//   values: any,
//   setLoading: (bool: boolean) => void,
//   props: any,
//   setOtpLoading: (bool: boolean) => void,
// ) => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     try {
//       setLoading(true);
//       const res = await postData(URLS.auth.signup, values);
//       console.log('res of onSignupPress=>', res);
//       Alert.alert('Account', 'Accrout is created successfully');
//       UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
//       dispatch(setUserInfo(res?.user));
//       UTILS.resetStack(props, 'BottomTab');
//     } catch (error: any) {
//       console.log('error in onSignupPress', UTILS?.returnError(error));
//       Alert.alert('', error?.message);
//     } finally {
//       setLoading(false);
//     }
//   };
// };




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
      Alert.alert('', 'Availability Added Successfully');
      goBack();
      // UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      // dispatch(setUserInfo(res?.user));

      // UTILS.resetStack(props, 'Home');
      // navigate('AddAvailability', values)
    } catch (error: any) {
      console.log('error in onSignupPress', UTILS.returnError(error));
      Alert.alert('', UTILS.returnError(error));
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


export const onVerifyOtp = (values: any) => {
  return postData(URLS.auth.login, values);
};

export const onForgot = async (values: any) => {
  try {
    const res = await postData(URLS.auth.forget_password, values);
    console.log('res of onforgot=>', res);
    return res;
  } catch (error: any) {
    console.log('error in forgot password', UTILS.returnError(error));
    Alert.alert('', UTILS.returnError(error));
  }
};
export const onVerifyOtpRenewpassword = (
  values: any,
  props: any,
  onClose: any,
  setLoading: (bool: boolean) => void,
  isSignup?: boolean,
) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      setLoading(true);
      const res = await postData(URLS.auth.otp_verify, values);
      setLoading(false);
      console.log('res of onforgot=>', res);
      UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
      dispatch(setUserInfo(res?.user));
      console.log('res===>>>>> onverifyotp', res);
      if (isSignup) {
        UTILS.setItem(STORAGEKEYS.user, JSON.stringify(res?.user));
        dispatch(setUserInfo(res?.user));
        props?.navigation?.pop(2);
      } else {
        props?.navigation?.navigate('RenewPasswordScreen', {
          email: values?.email,
        });
      }
    } catch (error: any) {
      console.log('error in forgot password', UTILS.returnError(error));

      Alert.alert('', UTILS.returnError(error));
    } finally {
      onClose();
    }
  };
};

