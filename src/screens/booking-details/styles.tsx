import { Platform, StyleSheet } from 'react-native';

import { colors } from 'config/colors';
import { mvs } from 'config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(20),
  },
  contentContainerStyleNew: {
    paddingHorizontal: mvs(10),
    marginVertical: mvs(10),
    backgroundColor: colors.white,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    borderRadius: mvs(6),
  },
  heading: { marginTop: mvs(12), fontSize: mvs(18) },
  avgRow: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(10),
    borderRadius: mvs(5),
    alignItems: 'center',
  },
  reviewInput: { height: mvs(70), width: '90%' },
  review: {
    alignItems: 'center',
    marginTop: mvs(15),
    marginBottom: mvs(Platform.OS == 'android' ? 20 : 40),
  },
  timeRow: {
    alignItems: 'center',
  },
  value: { fontSize: mvs(18), color: colors.black },
  alignItems: { alignItems: 'center' },
  label: {
    fontSize: mvs(12),
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRightColor: 'green',
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
  },
  hotelrow: {
    marginTop: mvs(10),
    flexDirection: 'row',
  },
});
export default styles;
