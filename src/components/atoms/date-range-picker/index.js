import {colors} from 'config/colors';
import moment from 'moment';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DateRange from 'rn-select-date-range';

const DateRangePicker = ({children, onChangeText, setVisible, visible}) => {
  // const [visible, setVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setVisible(true);
        }}>
        {children}
      </TouchableOpacity>
      {visible && (
        <View
          style={{
            width: '100%',
            backgroundColor: colors.white,
            // position: 'absolute',
            zIndex: 1001,
            // top: 0,
          }}>
          <DateRange
            onConfirm={() => {
              setVisible(false);
            }}
            onClear={() => {
              setVisible(false);
              onChangeText({firstDate: '', secondDate: ''});
            }}
            onSelectDateRange={range => {
              // setVisible(false);

              onChangeText(range);
            }}
            blockSingleDateSelection={true}
            responseFormat="YYYY-MM-DD"
            // maxDate={moment()}
            // minDate={moment().subtract(100, 'days')}
            selectedDateContainerStyle={styles.selectedDateContainerStyle}
            selectedDateStyle={styles.selectedDateStyle}
          />
        </View>
      )}
    </>
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
