import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../config/colors';
import {mvs, width} from '../../../config/metrices';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    marginTop: mvs(10),
    borderRadius: mvs(8),
    width: '95%',
    alignSelf: 'center',
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bar: {
    height: mvs(3),
    borderRadius: mvs(5),
    width: mvs(104),
    alignSelf: 'center',
    backgroundColor: colors.lightGray,
    marginBottom: mvs(20),
  },
  container: {
    // backgroundColor: colors.white,
    padding: mvs(15),
    // width: width,
    // borderRadius: mvs(20),
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingVertical: mvs(Platform.OS === 'ios' ? 40 : 20),
  },
  row: {width: '45%', justifyContent: 'flex-start'},
  label: {
    fontSize: mvs(12),
    marginHorizontal: mvs(10),
  },
  searchContainer: {
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(20),
    // borderRadius: mvs(10),
  },
});
export default styles;
