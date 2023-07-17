import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../config/colors';
import {mvs, width} from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    padding: mvs(20),
  },
  contentContainerStyleNew: {
    // flexGrow: 1,
    paddingHorizontal: mvs(10),
    marginVertical: mvs(10),
    paddingVertical: mvs(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
 borderWidth:StyleSheet.hairlineWidth,
    borderRadius: mvs(6),
    borderColor:colors.border
  },
 
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRightColor: 'green',
  },
  reviewInput: {height: mvs(70), width: '90%'},
  review: {
    alignItems: 'center',
    marginVertical: mvs(15),
  },
  // line: {
  //   borderWidth: mvs(2),
  //   borderColor: '#dfdede',
  //   width: mvs(104),
  //   alignSelf: 'center',
  //   marginVertical: mvs(10),
  // },
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
    height: mvs(250),
    marginTop: 0,
    backgroundColor: colors.primary,
  },
  hotelrow: {
    marginTop: mvs(10),
    flexDirection: 'row',
  },
  editBtn:{
    // backgroundColor: colors.white,
    padding: mvs(2),
    borderRadius: mvs(7),
    // flexDirection:'row'
    
  },
  deleteBtn: {
    borderRadius: mvs(5),
    marginTop: mvs(20),
    width: '48%',
    marginBottom: mvs(20),
    height: mvs(40),
  },
  publishBtn: {
    borderRadius: mvs(5),
    marginTop: mvs(20),
    width: '48%',
    marginBottom: mvs(20),
    height: mvs(40),
  },
});
export default styles;
