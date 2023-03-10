import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { arrayFormat, weekDays } from 'config/constants';
import { mvs } from 'config/metrices';
import React from 'react';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { onAddAvailability } from 'services/api/api-actions';
import i18n from 'translation';
import { PrimaryButton } from '../../components/atoms/buttons';
import { InputWithIcon } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import Medium from '../../typography/medium-text';
import styles from './styles';

const EditAvailability = (props) => {
  const { navigation } = props;
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const { doctor, user } = useAppSelector(s => s);
  const { userInfo } = user;
  const { hospitals } = doctor;
  const initialValues = {
    hospital: '',
  };
  const obj = {
    hospital_id: 0,
    days: [
      {
        start_time: 0,
        end_time: 1,
        day: weekDays[0],
      }
    ]
  }
  const [payload, setPayload] = React.useState([
    obj
  ])
  const [loading, setLoading] = React.useState(false);
  return (
    <View style={styles.container}>
      <Header1x2x title={t('edit_availibility')} />
      <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
        <PrimaryButton onPress={() => setPayload([...payload, obj])} title='Add Hospital' containerStyle={{
          // marginBottom: mvs(20)
        }} />
        {payload?.map((item, index) => {
          let copy = [...payload];
          let days = copy[index].days;
          return (
            <View style={[styles.payloadView, { borderBottomWidth: payload?.length - 1 === index ? 0 : 3 }]}
              key={index}>
              {payload?.length > 1 && <TouchableOpacity onPress={() => {
                copy?.splice(index, 1);
                setPayload(copy);
              }} style={styles.payload}>
                <Icon size={mvs(20)} name={'closecircle'} color={colors.primary} />
              </TouchableOpacity>}
              <InputWithIcon
                items={hospitals}
                placeholder={t('hospital')}
                onChangeText={(str) => {
                  copy[index].hospital_id = str;
                  console.log('payload=>', payload);
                  setPayload(copy);
                }}
                id={payload[index]?.hospital_id}
                value={hospitals?.find(h => h?.id === payload[index]?.hospital_id)?.title}
              />
              <View style={{ paddingHorizontal: mvs(12) }}>
                <ScrollView
                  contentContainerStyle={{ marginBottom: mvs(5) }}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                >
                  {weekDays.map((item, weekIndex) => {

                    let newDays = days;
                    const bool = days?.some(d => d?.day === item);
                    return (
                      <PrimaryButton
                        key={weekIndex}
                        containerStyle={[styles.primaryButton, { backgroundColor: bool ? colors.primary : colors.blueHalf}]}
                        onPress={() => {
                          console.log('days?.length ', days?.length);
                          if (bool) {
                            if (days?.length !== 1) {
                              newDays = days?.filter(d => d?.day !== item);
                            } else {
                              alert('You must select atlease one day')
                            }
                          } else {
                            newDays = [...days, { start_time: 0, end_time: 1, day: item }]
                          }
                          copy[index].days = newDays;
                          setPayload(copy);
                        }}
                        title={item?.substring(0, 3)} />)
                  })
                  }
                </ScrollView>
                {
                  days?.map((day, dayIndex) => (
                    <>
                      <Medium label={`${day?.day}`} color={colors.primary} fontSize={mvs(16)} />
                      <Row key={dayIndex}>
                        <View style={{ width: '49%' }}>
                          <InputWithIcon
                            items={arrayFormat}
                            onChangeText={(str) => {
                              days[dayIndex].start_time = str;
                              copy[index].days = days;
                              setPayload(copy);
                            }}
                            label={t('start_time')}
                            id={day?.start_time}
                            value={arrayFormat[day?.start_time]?.title} />
                        </View>
                        <View style={{ width: '49%' }}>
                          <InputWithIcon
                            items={arrayFormat}
                            label={t('end_time')}
                            placeholder={t('hospital')}
                            onChangeText={(str) => {
                              days[dayIndex].end_time = str;
                              copy[index].days = days;
                              setPayload(copy);
                            }}
                            id={day?.end_time}
                            value={arrayFormat[day?.end_time]?.title}
                          />
                        </View>
                      </Row>
                    </>

                  ))
                }
              </View>
            </View>)
        })}
        <View style={styles.save}>
          <PrimaryButton
            loading={loading}
            // disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
            title={t('save')}
            onPress={() => dispatch(onAddAvailability({ doctor_id: userInfo?.id, availability: payload }, setLoading, props))}
            containerStyle={styles.button}
          />
        </View>
      </KeyboardAvoidScrollview>
    </View>

  );
};
export default EditAvailability;
