import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../config/colors';
import {mvs, width} from '../../config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flex: 1,
    paddingVertical: mvs(34),
    paddingHorizontal: mvs(20),
    marginTop: mvs(14),
  },
  button: {
    width: '100%',
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: 0,
    paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
  },
  walletcard: {
    position: 'absolute',
    width: width - mvs(40),
    top: mvs(130),
    zIndex: 1,
    padding: mvs(15),
    backgroundColor: colors.white,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: mvs(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  historycontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: mvs(8),
    paddingVertical: mvs(5),
  },
  cardcontainer: {
    flexDirection: 'row',
    marginHorizontal: mvs(10),
    alignItems: 'center',
  },
});
export default styles;
