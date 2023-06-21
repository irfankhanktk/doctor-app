import { PrimaryButton } from 'components/atoms/buttons';
import { CheckboxRating } from 'components/atoms/checkbox-rating';
import CollapsibleView from 'components/atoms/collapsible-view';
import { DatePicker } from 'components/atoms/date-picker';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import MultiSliders from 'components/atoms/multi-slider';
import { Row } from 'components/atoms/row';
import { CheckboxLabel } from 'components/atoms/checkbox-label';
import { mvs } from 'config/metrices';
import { useAppDispatch } from 'hooks/use-store';
import moment from 'moment';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import { colors } from '../../../config/colors';
import styles from './styles';
import { setClearCarFilter, setCarFilter } from '../../../store/reducers/car-reducer';
const propertyType = [
  {
    title: 'Convertibles',
    checked: false,
    id: 61,
  },
  {
    title: 'Coupes',
    checked: false,
    id: 62,
  },
  {
    title: 'Hatchbacks',
    checked: false,
    id: 63,
  },
  {
    title: 'Minivans',
    checked: false,
    id: 64,
  },
  {
    title: 'Sedan',
    checked: false,
    id: 65,
  },
  {
    title: 'SUVs',
    checked: false,
    id: 66,
  },
  {
    title: 'Trucks',
    checked: false,
    id: 67,
  },
  {
    title: 'Wagons',
    checked: false,
    id: 68,
  },
];
const facilities = [
  {
    title: 'Airbag',
    checked: false,
    id: 69,
  },
  {
    title: 'FM Radio',
    checked: false,
    id: 70,
  },
  {
    title: 'Power Windows',
    checked: false,
    id: 71,
  },
  {
    title: 'Sensor',
    checked: false,
    id: 72,
  },
  {
    title: 'Speed Km',
    checked: false,
    id: 73,
  },
  {
    title: 'Steering Wheel',
    checked: false,
    id: 74,
  },
];
const services = [
  {
    title: 'Havana Lobby bar',
    checked: false,
    id: 48,
  },
  {
    title: 'Fiesta Restaurant',
    checked: false,
    id: 49,
  },
  {
    title: 'Hotel transport services',
    checked: false,
    id: 50,
  },
  {
    title: 'Free luggage deposit',
    checked: false,
    id: 51,
  },
  {
    title: 'Laundry Services',
    checked: false,
    id: 52,
  },
  {
    title: 'Pets welcome',
    checked: false,
    id: 53,
  },
  {
    title: 'Tickets',
    checked: false,
    id: 54,
  },
];
const CarFilterScreen = (props: any) => {
  const [text, setText] = React.useState('');
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const { hotel, car } = useSelector(s => s);
  const { locations, car_filter, cars } = car;

  console.log('carfilter=>>>', car_filter);
  return (
    <View style={styles.container}>
      <Header1x2x
        style={{ height: mvs(60) }}
        isSearch={false}
        title={t('filter_cars')}
        back={true}
      />
      <View style={styles.cardContainer}>
        <View style={styles.line} />
        <Row style={{ alignItems: 'center', paddingHorizontal: mvs(20) }}>
          <PrimaryButton
            title={t('Clear')}
            onPress={() => dispatch(setClearCarFilter())}
            containerStyle={{ width: mvs(100) }}
          />
          <Medium label={`${cars?.data?.length || 0} ${t('cars_found')} `} />
        </Row>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(20) }}>
          <Row style={styles.todayContainer}>
            <DatePicker
              onChangeText={date =>
                dispatch(setCarFilter({ ...car_filter, start: date }))
              }>
              <Medium
                label={moment(car_filter?.start).format('ll')}
                style={styles.todayText}
              />
            </DatePicker>
            <DatePicker
              min={new Date(car_filter?.start).setDate(
                new Date(car_filter?.start).getDate() + 1,
              )}
              onChangeText={date =>
                dispatch(setCarFilter({ ...car_filter, end: date }))
              }>
              <Medium
                label={moment(car_filter?.end).format('ll')}
                style={styles.tomarrowText}
              />
            </DatePicker>
          </Row>
          {/* <Row style={styles.hotelrow}>
            <HalfOutLineInput
              label={t('Room')}
              value={hotel_filter?.rooms}
              onChangeText={t =>
                dispatch(setHotelFilter({...hotel_filter, rooms: t}))
              }
              placeholder={'1'}
            />
            <HalfOutLineInput
              label={t('Adults')}
              value={hotel_filter?.adults}
              onChangeText={t =>
                dispatch(setHotelFilter({...hotel_filter, adults: t}))
              }
              placeholder={'0'}
            />
          </Row> */}

          {/* <Row style={{marginTop: mvs(10), marginBottom: mvs(15)}}>
            <HalfOutLineInput
              label={t('Childern')}
              value={hotel_filter?.children}
              onChangeText={t =>
                dispatch(setHotelFilter({...hotel_filter, children: t}))
              }
              placeholder={'0'}
              style={{}}
            />
            
          </Row> */}
          <CollapsibleView
            maxH={60}
            label={
              locations?.find(x => x?.id == car_filter?.location_id)?.title ||
              t('city')
            }>
            <ScrollView>
              {locations?.map(loc => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setCarFilter({ ...car_filter, location_id: loc?.id }),
                      );
                    }}>
                    <Regular
                      label={loc?.title}
                      color={
                        loc?.id == car_filter?.location_id
                          ? colors.primary
                          : colors.black
                      }
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </CollapsibleView>
          <CollapsibleView maxH={60} label={t('filter_price')}>
            <MultiSliders
              rangeValue={car_filter?.price_range}
              setRangeValue={price_range =>
                dispatch(setCarFilter({ ...car_filter, price_range }))
              }
            />
          </CollapsibleView>
          {/* <CollapsibleView label={t('hotel_star')}>
            <CheckboxRating
              selectedStars={hotel_filter?.star_rate}
              onPress={star_rate =>
                dispatch(setHotelFilter({...hotel_filter, star_rate}))
              }
            />
          </CollapsibleView> */}
          <CollapsibleView label={t('review_score')}>
            <CheckboxRating
              selectedStars={car_filter?.review_score}
              onPress={review_score =>
                dispatch(setCarFilter({ ...car_filter, review_score }))
              }
            />
          </CollapsibleView>
          <CollapsibleView maxH={100} label={t('car_type')}>
            <CheckboxLabel
              items={propertyType}
              selectedItems={car_filter?.terms}
              onPress={terms => dispatch(setCarFilter({ ...car_filter, terms }))}
            />
          </CollapsibleView>
          <CollapsibleView maxH={230} label={t('car_features')}>
            <CheckboxLabel
              items={facilities}
              selectedItems={car_filter?.terms}
              onPress={terms => dispatch(setCarFilter({ ...car_filter, terms }))}
            />
          </CollapsibleView>
          {/* <CollapsibleView maxH={250} label={t('hotel_service')}>
            <CheckboxLabel
              items={services}
              selectedItems={hotel_filter?.terms}
              onPress={terms =>
                dispatch(setHotelFilter({...hotel_filter, terms}))
              }
            />
          </CollapsibleView> */}
          <PrimaryButton
            onPress={() => props?.navigation?.navigate('CarHomeScreen')}
            title={t('search')}
            containerStyle={styles.searchContainer}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default CarFilterScreen;
