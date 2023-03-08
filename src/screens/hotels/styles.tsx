import { StyleSheet } from 'react-native';
import { colors } from '../../config/colors';
import { mvs, width } from '../../config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    padding: mvs(20),
  },
  cardContainer: {
    paddingHorizontal: mvs(20),
    backgroundColor: colors.white,
    position: 'absolute',
    width: width,
    // height: mvs(500),
    bottom: 0,
    // marginTop: mvs(380),
    borderTopLeftRadius: mvs(25),
    borderTopRightRadius: mvs(25),
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
    borderWidth: mvs(2),
    color: colors.primary,
    paddingVertical: mvs(5),
    paddingHorizontal: mvs(6),
    marginVertical: mvs(15),
    borderRadius: mvs(12),
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
});
export default styles;
