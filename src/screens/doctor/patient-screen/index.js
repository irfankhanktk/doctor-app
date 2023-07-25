import {useIsFocused} from '@react-navigation/native';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {EmptyList} from 'components/molecules/doctor/empty-list';
import PopularPatientCard from 'components/molecules/doctor/popular-patient-card';
import {useAppSelector} from 'hooks/use-store';
import {t} from 'i18next';
import React from 'react';
import {FlatList, View} from 'react-native';
import {getHomeData} from 'services/api/doctor/api-actions';
import styles from './style';
import {Loader} from 'components/atoms/loader';

const AllPatientScreen = () => {
  const {userInfo} = useAppSelector(s => s?.user);
  const isFocus = useIsFocused();

  const [homeData, setHomeData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        if (isFocus) {
          setLoading(true);
          const res = await getHomeData(userInfo?.id);
          setHomeData(res);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [isFocus]);

  const uniquePatient = [];
  const seenIds = new Set();

  homeData?.patients?.forEach(entry => {
    if (!seenIds.has(entry.id)) {
      uniquePatient.push(entry);
      seenIds.add(entry.id);
    }
  });

  return (
    <View style={{flex: 1}}>
      <Header1x2x back={true} title={t('all_patients')} />

      {loading ? (
        <Loader loading />
      ) : (
        <FlatList
          ListEmptyComponent={
            !loading && <EmptyList label={t('no_patients')} />
          }
          contentContainerStyle={styles.contentContainerStyle}
          data={uniquePatient}
          renderItem={({item, index}) => {
            return (
              <PopularPatientCard
                style={{width: '100%'}}
                key={index}
                name={item?.name}
                image={item?.avatar_id ? `${item?.avatar_id}` : false}
                Imagestyle={{width: '100%'}}
              />
            );
          }}
          keyExtractor={(item, index) => index?.toString()}
        />
      )}
    </View>
  );
};
export default AllPatientScreen;
