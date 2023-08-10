import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import {mvs, width} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit'; // You'll need to install this library
import styles from './style';
import {getDashBoard} from 'services/api/auth-api-actions';
import {useDispatch} from 'react-redux';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';

const Dashboard = () => {
  const dispatch = useDispatch();
  const loadDashboard = async () => {
    try {
      dispatch(getDashBoard());
    } catch (error) {
      console.log('error=>', error);
    }
  };
  React.useEffect(() => {
    loadDashboard();
  }, []);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header1x2x back title={t('dashboard')} />
      <View style={{paddingVertical: mvs(30), paddingHorizontal: mvs(20)}}>
        <Row style={styles.buttonContainer}>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={' Pendings'} />
            <Bold fontSize={mvs(20)} label={'SR 5'} />
            <Bold fontSize={mvs(12)} label={'Total Pendings'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={'Earnings'} />
            <Bold fontSize={mvs(20)} label={'SR 1500'} />
            <Bold fontSize={mvs(12)} label={'Total Earnings'} />
          </TouchableOpacity>
        </Row>
        <Row style={styles.buttonContainer}>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={'Bookings'} />
            <Bold fontSize={mvs(20)} label={'10'} />
            <Bold fontSize={mvs(12)} label={'Total Bookings'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={'Services'} />
            <Bold fontSize={mvs(20)} label={'20'} />
            <Bold fontSize={mvs(12)} label={'Total Bookable Services'} />
          </TouchableOpacity>
        </Row>
      </View>
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={width}
          height={280}
          yAxisLabel=""
          chartConfig={{
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          style={styles.chart}
        />
      </View>
    </View>
  );
};

export default Dashboard;
