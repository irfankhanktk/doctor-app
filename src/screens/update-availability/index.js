import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { Loader } from 'components/atoms/loader';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { arrayFormat } from 'config/constants';
import { mvs } from 'config/metrices';
import { goBack } from 'navigation/navigation-ref';
import React from 'react';
import { Alert } from 'react-native';
import { Platform, View } from 'react-native';
import { onAddAvailability, onEditHospitalAvailbilityDetails, updateDoctorAvailabilityDaysTime } from 'services/api/api-actions';
import i18n from 'translation';
import { PrimaryButton } from '../../components/atoms/buttons';
import { InputWithIcon } from '../../components/atoms/inputs';
import { KeyboardAvoidScrollview } from '../../components/atoms/keyboard-avoid-scrollview';
import { useAppDispatch, useAppSelector } from '../../hooks/use-store';
import Medium from '../../typography/medium-text';
import styles from './styles';

const UpdateAvailability = (props) => {
  const { navigation } = props;
  const { t } = i18n;
  const dispatch = useAppDispatch();
  const { doctor, user } = useAppSelector(s => s);
  const { userInfo } = user;
  const { hospitals } = doctor;
  const [payload, setPayload] = React.useState({})
  const [loading, setLoading] = React.useState(false);
  const [screenLoading, setScreenLoading] = React.useState(true);
  const hospital_id = props?.route?.params?.hospital_id;
  React.useEffect(() => {
    (async () => {
      try {
        setScreenLoading(true);
        const res = await onEditHospitalAvailbilityDetails(hospital_id, userInfo?.id);
        setPayload(res?.hospital);

      } catch (error) {
        console.log('error=>', error);
      } finally {
        setScreenLoading(false);
      }
    })()
  }, [hospital_id])

  const onSubmit = async () => {
    try {
      setLoading(true)
      const res = await updateDoctorAvailabilityDaysTime(payload);
      Alert.alert('success', 'Availability updated Successfully')
      goBack();
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>
      <Header1x2x title={`${hospitals?.find(h => h?.id === hospital_id)?.title}`} />
      {screenLoading ?
        <Loader />
        : <KeyboardAvoidScrollview contentContainerStyle={styles.contentContainerStyle}>
          <View style={{
            marginTop: mvs(20),
            paddingBottom: mvs(20),
          }}>
            <View style={{}}>
              {
                payload?.days?.map((day, dayIndex) => (
                  <View key={dayIndex}>
                    <Medium label={`${day?.day}`} color={colors.primary} fontSize={mvs(16)} />
                    <Row>
                      <View style={{ width: '49%' }}>
                        <InputWithIcon
                          label={t('start_time')}
                          items={arrayFormat}
                          onChangeText={(str) => {
                            const days = payload?.days;
                            days[dayIndex].start_time = str;
                            const copy = { ...payload }
                            copy.days = days;
                            setPayload(copy);
                          }}
                          id={day?.start_time}
                          value={arrayFormat[day?.start_time]?.title} />
                      </View>
                      <View style={{ width: '49%' }}>
                        <InputWithIcon
                          items={arrayFormat}
                          label={t('end_time')}
                          placeholder={t('hospital')}
                          onChangeText={(str) => {
                            const days = payload?.days;
                            days[dayIndex].end_time = str;
                            const copy = { ...payload }
                            copy.days = days;
                            setPayload(copy);
                          }}
                          id={day?.end_time}
                          value={arrayFormat[day?.end_time]?.title}
                        />
                      </View>
                    </Row>
                  </View>
                ))
              }
            </View>
          </View>
        </KeyboardAvoidScrollview>}
      <View style={{
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        paddingBottom: mvs(Platform.OS === 'ios' ? 40 : 20),
        width: '100%',
        paddingHorizontal: mvs(20),
      }}>
        <PrimaryButton
          loading={loading}
          // disabled={Object.keys(errors)?.length > 0 || Object.keys(touched)?.length === 0}
          title={t('save')}
          onPress={onSubmit}
          containerStyle={styles.button}
        />
      </View>
    </View>

  );
};
export default UpdateAvailability;
