import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {DATE_FORMAT} from 'config/constants';
import {mvs} from 'config/metrices';
import moment from 'moment';
import React from 'react';
import {View} from 'react-native';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import styles from './styles';

const BookingDetails = props => {
  const item = props?.route?.params?.booking;

  const {t} = i18n;
  // const {userInfo} = useAppSelector(s => s?.user);
  const [loading, setLoading] = React.useState(false);

  return (
    <View style={styles.container}>
      <Header1x2x
        // style={{height: mvs(200)}}
        isSearch={false}
        title={t('booking_details')}
        back={true}
      />

      {loading ? (
        <Loader />
      ) : (
        <View style={styles.contentContainerStyle}>
          <Bold
            label={`${t('booking_id')}${':'} ${item?.id}`}
            fontSize={mvs(18)}
            color={colors.primary}
          />
          <Bold
            label={t('customer_information')}
            fontSize={mvs(16)}
            color={colors.primary}
          />
          <Row>
            <Regular label={t('full_name')} />
            <Regular label={`${item?.first_name} ${item?.last_name}`} />
          </Row>
          <Row>
            <Regular label={t('email')} />
            <Regular label={`${item?.email}`} />
          </Row>
          <Row>
            <Regular label={t('phone')} />
            <Regular label={`${item?.phone} `} />
          </Row>
          <Row>
            <Regular label={t('address')} />
            <Regular label={item?.address} />
          </Row>
          <Bold
            label={t('booking_details')}
            fontSize={mvs(16)}
            color={colors.primary}
          />
          <Row>
            <Regular label={t('booking_status')} />
            <Regular label={`${item?.status} `} />
          </Row>
          <Row>
            <Regular label={t('booking_date')} />
            <Regular
              label={moment(item?.created_at).format(DATE_FORMAT.mmm_dd_yyyy)}
            />
          </Row>
          <Row>
            <Regular label={t('booking_method')} />
            <Regular label={`${item?.gateway} `} />
          </Row>
          <Row>
            <Regular color={colors.black} label={t('start_date')} />
            <Regular
              color={colors.black}
              label={moment(item?.start_date).format(DATE_FORMAT.mmm_dd_yyyy)}
            />
          </Row>
          <Row>
            <Regular color={colors.black} label={t('end_date')} />
            <Regular
              color={colors.black}
              label={moment(item?.end_date).format(DATE_FORMAT.mmm_dd_yyyy)}
            />
          </Row>

          {item?.object_model === 'hotel' ? (
            <Row>
              <Regular label={t('night')} />
              <Regular label={`${item?.duration_nights} `} />
            </Row>
          ) : (
            <></>
          )}
          {item?.object_model === 'hotel' ? (
            <Row>
              <Regular label={t('adults')} />
              <Regular label={`${item?.adults} `} />
            </Row>
          ) : (
            <></>
          )}
          {item?.object_model === 'hotel' ? (
            <Row>
              <Regular label={t('children')} />
              <Regular label={`${item?.children} `} />
            </Row>
          ) : (
            <></>
          )}
          {item?.object_model === 'car' ? (
            <Row>
              <Regular label={t('days')} />
              <Regular label={`${item?.days} `} />
            </Row>
          ) : (
            <></>
          )}
          {item?.object_model === 'car' ? (
            <Row>
              <Regular label={t('number')} />
              <Regular label={`${item?.number} `} />
            </Row>
          ) : (
            <></>
          )}
          {item?.object_model === 'car' ? (
            <Row>
              <Regular label={t('rental_price')} />
              <Regular label={`${item?.rental_price} ${'SR'}`} />
            </Row>
          ) : (
            <></>
          )}
          <Bold label={t('extra_price')} color={colors?.primary} />
          <View>
            {item?.extra_price.map(item => (
              <Row style={{marginLeft: mvs(10)}} key={item.name}>
                <Regular label={item?.name} />
                <Regular label={`${item?.price} ${'SR'}`} />
              </Row>
            ))}
          </View>

          <View>
            {item?.buyer_fees.map(item => (
              <Row key={item.name}>
                <Regular label={item?.name} />
                <Regular label={`${item?.price} ${'SR'}`} />
              </Row>
            ))}
          </View>
          <View>
            {item?.vendor_service_fee.map(item => (
              <Row key={item.name}>
                <Regular label={item?.name} />
                <Regular label={`${item?.price} ${'SR'}`} />
              </Row>
            ))}
          </View>
          <Row>
            <Bold label={t('total')} />
            <Bold label={`${item?.total} ${'SR'}`} />
          </Row>
          <Row>
            <Bold label={t('paid')} />
            <Bold label={`${item?.paid} ${'SR'}`} />
          </Row>
        </View>
      )}
    </View>
  );
};
export default BookingDetails;
