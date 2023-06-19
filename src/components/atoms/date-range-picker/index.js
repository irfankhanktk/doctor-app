import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateRangePicker from 'rn-select-date-range';

const DateRangePicker = () => {
  const [selectedRange, setRange] = useState({});
  return (
    <View style={styles.container}>
      <DateRangePicker
        onSelectDateRange={range => {
          setRange(range);
        }}
        blockSingleDateSelection={true}
        responseFormat="YYYY-MM-DD"
        maxDate={moment()}
        minDate={moment().subtract(100, 'days')}
        selectedDateContainerStyle={styles.selectedDateContainerStyle}
        selectedDateStyle={styles.selectedDateStyle}
      />
      <View style={styles.container}>
        <Text>first date: {selectedRange.firstDate}</Text>
        <Text>second date: {selectedRange.secondDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 50,
  },
  selectedDateContainerStyle: {
    height: 35,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  selectedDateStyle: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DateRangePicker;
