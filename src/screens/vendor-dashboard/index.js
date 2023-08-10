import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit'; // You'll need to install this library

const Dashboard = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [200, 300, 450, 600, 800, 1000],
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>Total Pendings</Text>
          <Text style={styles.counterValue}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>Total Earnings</Text>
          <Text style={styles.counterValue}>$1500</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>Total Bookings</Text>
          <Text style={styles.counterValue}>10</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.counterButton}>
          <Text style={styles.counterText}>Total Booking Services</Text>
          <Text style={styles.counterValue}>20</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={300}
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counterButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    alignItems: 'center',
  },
});

export default Dashboard;
