import { Platform, StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { mvs, width } from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    padding: mvs(20),
  },
  bgStyles: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: mvs(20),
    paddingVertical: mvs(20),
  },
  checkRooms: {
    backgroundColor: colors.white,
    marginHorizontal: mvs(20),
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(5),
    // opacity: 0.8,
    alignSelf: 'center',
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRightColor: 'green',
  },
  reviewInput: { height: mvs(70), width: '90%' },
  review: {
    alignItems: 'center',
    marginVertical: mvs(15),
  },
  line: {
    borderWidth: mvs(2),
    borderColor: '#dfdede',
    width: mvs(104),
    alignSelf: 'center',
    marginVertical: mvs(10),
  },
  text: { width: mvs(313), fontSize: 20 },
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
    justifyContent: 'flex-end'
  },
  hotelrow: {
    marginTop: mvs(10),
    flexDirection: 'row',
  },
  goBackBtn: {
    backgroundColor: colors.white,
    padding: mvs(5),
    borderRadius: mvs(7),
  },
  editBtn: {
    backgroundColor: colors.white,
    padding: mvs(5),
    borderRadius: mvs(7),
    flexDirection: 'row'

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
  headerContainer:
  {
    position: 'absolute',
    zIndex: 1,
    top: mvs(15),
    paddingHorizontal: mvs(20),


    width: '100%'
  }

});
export default styles;
