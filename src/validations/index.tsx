// const validateEmail = (email: string) => {
//   const re =
//     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// };
import * as yup from 'yup';

export const signinFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  password: yup
    .string()
    .required('error_pass_enter')
    .min(8, 'error_pass_short'),
});
export const forgotemailFormValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
});
export const renewpasswordFormValidation = yup.object().shape({
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
});
export const signupFormValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  // last_name: yup.string().required('req_first_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),
  password: yup.string().required('req_pass').min(8, 'weak_pass'),
  confirm_password: yup
    .string()
    .required('req_pass')
    .oneOf([yup.ref('password')], 'miss_match_pass'),
  doc_cat_id: yup.string().required('req_cat'),
  zip_code: yup.string().required('req_zip_code'),
  city: yup.string().required('req_city'),
  short_description: yup.string().required('req_short_description'),
  state: yup.string().required('req_state'),
  price: yup.string().required('req_price'),
  experience: yup.string().required('req_experience'),
});
export const updateProfileFormValidation = yup.object().shape({
  name: yup.string().required('req_name'),
  // last_name: yup.string().required('req_first_name'),
  email: yup.string().email('invalid_email').required('req_email'),
  phone: yup
    .number()
    .typeError('invalid_phone')
    .positive('invalid_phone')
    .integer('invalid_phone')
    .min(8, 'invalid_phone')
    .required('Phone is required'),

  doc_cat_id: yup.string().required('req_cat'),
  zip_code: yup.string().required('req_zip_code'),
  city: yup.string().required('req_city'),
  state: yup.string().required('req_state'),
  price: yup.string().required('req_price'),
  experience: yup.string().required('req_experience'),
});
// export const updateProfileFormValidation = yup.object().shape({
//   first_name: yup.string().required('req_first_name'),
//   // last_name: yup.string().required('req_first_name'),
//   email: yup.string().email('invalid_email').required('req_email'),
//   phone: yup
//     .number()
//     .typeError('invalid_phone')
//     .positive('invalid_phone')
//     .integer('invalid_phone')
//     .min(8, 'invalid_phone')
//     .required('Phone is required'),
// });
export const updatePasswordValidation = yup.object().shape({
  email: yup.string().email('invalid_email').required('req_email'),
  old_password: yup.string().required('req_pass').min(8, 'weak_pass'),
  new_password: yup
    .string()
    .required('New Password is required')
    .min(8, 'New weak_pass'),
});
export const addHotelValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  content: yup.string().required('content_required'),
  star_rate: yup.string().required('hotel_rating_required'),
  video: yup.string().required('link_required').url('invalid_link'),
  policy: yup.array().of(
    yup.object().shape({
      title: yup.string().required('policy_title'),
      content: yup.string().required('policy_content'),
    })
  ),
  banner_image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      })
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});
export const addCarValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  content: yup.string().required('content_required'),

  video: yup.string().required('link_required').url('invalid_link'),
  policy: yup.array().of(
    yup.object().shape({
      title: yup.string().required('policy_title'),
      content: yup.string().required('policy_content'),
    })
  ),
  banner_image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      })
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});
export const addRoomValidation = yup.object().shape({
  title: yup.string().required('title_required'),
  // content: yup.string().required('content_required'),
  number: yup.string().required('number_required'),
  price: yup.string().required('price_required'),
  beds: yup.string().required('beds_required'),
  size: yup.string().required('size_required'),
  adults: yup.string().required('adults_required'),
  ical_import_url: yup.string().required('link_required').url('invalid_link'),
  gallery: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().required('select_image'),
      })
    )
    .required('select_image'),
  image_id: yup
    .object()
    .shape({
      url: yup.string().required('select_image'),
    })
    .required('select_image'),
});

export const addPriceHotelValidation = yup.object().shape({
  check_in_time: yup.string().required('Check-in time is required'),
  check_out_time: yup.string().required('Check-out time is required'),
  min_day_before_booking: yup.string().required('Minimum days before booking is required'),
  min_day_stays: yup.string().required('Minimum days of stay is required'),
  default_state: yup.string().required('Default state is required'),
  number: yup.string().required('Hotel number is required'),
  price: yup.string().required('Price is required'),
  sale_price: yup.string().required('Sale price is required'),
  enable_extra_price: yup.string().required('Enable extra price is required'),
  extra_price: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Extra price name is required'),
      price: yup.string().required('Extra price is required'),
      type: yup.string().required('Extra price type is required'),
      per_person: yup.string().required('Per person field is required'),
    })
  ),
  enable_service_fee: yup.string().required('Enable service fee is required'),
  service_fee: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Service fee name is required'),
      desc: yup.string().required('Service fee description is required'),
      price: yup.string().required('Service fee price is required'),
      type: yup.string().required('Service fee type is required'),
      per_person: yup.string().required('Per person field is required'),
    })
  ),
});