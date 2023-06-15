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
      store_room_availability: '',
    },
    store_file: 'hotel/store',
    locations: 'locations',
    hotel_details: 'hotel/'//hotel slug
  },
};
