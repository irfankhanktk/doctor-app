export const IP = 'http://124.29.208.60:5159';
export const URLS = {
  base_url: `${IP}/api/`,
  image_url: `${IP}/`,
  auth: {
    signup: 'doctor/signup',
    login: 'auth/login',
    get_user_info: 'user/userInfo',
    update_password: 'doctor/updatePassword',
    change_password: 'doctor/changePassword',
    otp_verify: 'doctor/otpVerify',
    forget_password: 'doctor/forgetPassword',
    update_profile: 'doctor/updateProfile',
    locations: 'locations',
  },
  availability: {
    add: 'doctor/addDoctorAvailability',
    get_doctor_hospitals: 'doctor/getDoctorHospital',
    get_doctor_hospital_details: 'doctor/getDoctorHospitalDetail',
    edit_hospital_availability_details: 'doctor/editHospitalAvailability',
    delete: 'doctor/deleteDoctorAvailability', //need availability_id
    // change: 'doctor/appointmentStatus',
    update_doctor_availability: 'doctor/updateDoctorAvailability',
  },
  all_hospitals: 'doctor/allHospital',
  appointment: {
    list: 'doctor/listAppointments',
    details: 'doctor/appointmentDetail',
    home_counter: 'doctor/counterAppointments',
    status_change: 'doctor/appointmentStatus',
    complete_appoinment: 'doctor/doctorCompleteAppointment',
  },
  categories: {
    getAll: 'doctor/allSpecialization',
  },
  notification: {
    get_notification: 'doctor/getNotification',
    read_notification: 'doctor/readNotification',
  },
  wallet: {
    get_wallet: 'doctor/getWallet',
    add_amount: 'doctor/addDeposit',
  },
  // hotel vendor module
  hotel_vendor: {
    get_hotel_list: 'user/hotel?',
    recovery: {
      get_recovery_hotels: 'user/hotel/recovery',
      recover_hotel: 'user/hotel/restore/', //hotel id
    },
    add_update_hotel: 'user/hotel/store/', //-1 for add new otherwise will update hotel
    delete_hotel: 'user/hotel/del/', //id for delete
    get_hotel_for_edit: 'user/hotel/edit/',
    change_hotel_status: 'user/hotel/bulkEdit/', // 5 hotel id '1/?action=' make-publish or make-hide
    get_hotel_attributes: 'user/hotel/create',
    room: {
      add_update_room: 'user/hotel/room/', //  '9/store/-1' //-1 for add new otherwise will update hotel-room
      get_room_attributes: 'user/hotel/room/', // '9/create',//
      delete_room: 'user/hotel/room/', // '9/del/1' hotel id and room id
      get_room_for_edit: 'user/hotel/room/', // '13/edit/45'
      change_room_status: 'user/hotel/room/', // '9/bulkEdit/34?action=' make-publish or make-hide
      get_hotel_rooms: 'user/hotel/room/', // '9/index'
      get_room_availability: 'user/hotel/', // 9/availability/loadDates?id=35&start=2023-05-29&end=2023-07-10
      store_room_availability: 'user/hotel/', //9/availability/store
    },
    store_file: 'hotel/store',
    locations: 'locations',
    hotel_details: 'hotel/', //hotel slug
  },
  car: {
    get_car_list: 'user/car?',
    store_car_availability: 'user/car/availability/store',
    get_car_availability: 'user/car/availability/loadDates?id=', //17&start=2023-05-29&end=2023-06-05
    recovery: {
      get_recovery_cars: 'user/car/recovery',
      recover_car: 'user/car/restore/', //car id
    },
    add_update_car: 'user/car/store/', //-1 for add new otherwise will update car
    delete_car: 'user/car/del/', //id for delete
    get_car_for_edit: 'user/car/edit/',
    change_car_status: 'user/car/bulkEdit/', // 5 car id '1/?action=' make-publish or make-hide
    get_car_attributes: 'user/car/create',
    store_file: 'hotel/store',
    locations: 'locations',
    car_details: 'car/', //car slug
  },
  event: {
    get_event_list: 'user/car?',
    store_event_availability: 'user/event/availability/store',
    get_event_availability: 'user/event/availability/loadDates?id=', //17&start=2023-05-29&end=2023-06-05
    recovery: {
      get_recovery_events: 'user/event/recovery',
      recover_event: 'user/event/restore/', //event id
    },
    add_update_event: 'user/event/store/', //-1 for add new otherwise will update event
    delete_event: 'user/event/del/', //id for delete
    get_event_for_edit: 'user/event/edit/',
    change_event_status: 'user/event/bulkEdit/', // 5 event id '1/?action=' make-publish or make-hide
    get_event_attributes: 'user/event/create',
    store_file: 'hotel/store',
    locations: 'locations',
    event_details: 'car/', //event slug
  },
  tour: {
    get_tour_list: 'user/car?',
    store_tour_availability: 'user/tour/availability/store',
    get_tour_availability: 'user/tour/availability/loadDates?id=', //17&start=2023-05-29&end=2023-06-05
    recovery: {
      get_recovery_tours: 'user/tour/recovery',
      recover_tour: 'user/tour/restore/', //tour id
    },
    add_update_tour: 'user/tour/store/', //-1 for add new otherwise will update tour
    delete_tour: 'user/tour/del/', //id for delete
    get_tour_for_edit: 'user/tour/edit/',
    change_tour_status: 'user/tour/bulkEdit/', // 5 tour id '1/?action=' make-publish or make-hide
    get_tour_attributes: 'user/tour/create',
    store_file: 'hotel/store',
    locations: 'locations',
    tour_details: 'car/', //tour slug
  },
};
