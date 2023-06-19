import {StyleSheet} from 'react-native';
import {colors} from '../../../../../config/colors';
import {mvs, width} from '../../../../../config/metrices';

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  // }
  container: {
    backgroundColor: colors.white,
    padding: mvs(15),
    height: 220,
    // width: width,
    borderRadius: mvs(20),
  },
 
  contentContainerStyleModal: {
    width: '100%',
    backgroundColor: colors.transparent,
    paddingHorizontal: 20,
    paddingVertical: 0,
  },
 
  line: {
    borderWidth: mvs(2),
    borderColor: '#dfdede',
    width: mvs(104),
    alignSelf: 'center',
    marginVertical: mvs(10),
  },
  text: {width: mvs(313), fontSize: 20},
  todayContainer: {
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.primary,
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(6),
    marginVertical: mvs(15),
    borderRadius: mvs(10),
    borderColor: colors.border,
  },
  todayText: {
    color: colors.white,
    backgroundColor: colors.primary,
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(7),
  },
  tomarrowText: {
    color: colors.primary,
    // backgroundColor: colors.primary,
    paddingVertical: mvs(8),
    paddingHorizontal: mvs(20),
    borderRadius: mvs(7),
  },
  searchContainer: {
    marginVertical: mvs(20),
  },
  hotelsimgbackground: {
    height: mvs(500),
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  hotelrow: {
    marginTop: mvs(10),
    flexDirection: 'row',
  },
});
export default styles;
