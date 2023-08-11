import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import {mvs, width} from 'config/metrices';
import {t} from 'i18next';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit'; // You'll need to install this library
import {useDispatch} from 'react-redux';
import {getDashBoard} from 'services/api/auth-api-actions';
import Bold from 'typography/bold-text';
import styles from './style';
import moment from 'moment';
import {DATE_FORMAT} from 'config/constants';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = React.useState([]);
  console.log(
    'dashboard data check=====>',
    dashboardData?.data?.earning_chart_data?.datasets,
  );
  const cardReport = dashboardData?.data?.cards_report;
  const chartData = dashboardData?.data?.earning_chart_data;
  const loadDashboard = async () => {
    try {
      const res = await getDashBoard();
      setDashboardData(res);
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
        data: [1560, 0, 0, 2180, 0],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Header1x2x back title={t('dashboard')} />
      <View style={{paddingVertical: mvs(30), paddingHorizontal: mvs(20)}}>
        <Row style={styles.buttonContainer}>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={cardReport?.[0]?.title} />
            <Bold fontSize={mvs(20)} label={cardReport?.[0]?.amount} />
            <Bold fontSize={mvs(12)} label={cardReport?.[0]?.desc} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={cardReport?.[1]?.title} />
            <Bold fontSize={mvs(20)} label={cardReport?.[1]?.amount} />
            <Bold fontSize={mvs(12)} label={cardReport?.[1]?.desc} />
          </TouchableOpacity>
        </Row>
        <Row style={styles.buttonContainer}>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={cardReport?.[2]?.title} />
            <Bold fontSize={mvs(20)} label={cardReport?.[2]?.amount} />
            <Bold fontSize={mvs(12)} label={cardReport?.[2]?.desc} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.counterButton}>
            <Bold label={cardReport?.[3]?.title} />
            <Bold fontSize={mvs(20)} label={cardReport?.[3]?.amount} />
            <Bold fontSize={mvs(12)} label={cardReport?.[3]?.desc} />
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
