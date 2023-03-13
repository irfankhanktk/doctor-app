import {StyleSheet} from 'react-native';
import {mvs} from '../../config/metrices';
import {colors} from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: mvs(30),
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(100),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  rendercontainer: {
    // width: width - 40,
    padding: mvs(10),
    borderColor: colors.border,
    backgroundColor: colors.white,
    // borderWidth: 0.4,
    borderRadius: mvs(10),
    ...colors.shadow,
  },
  notificationicon: {
    width: mvs(35),
    height: mvs(35),
    resizeMode: 'contain',
  },
  titleandtextview: {
    flex: 1,
    paddingHorizontal: mvs(5),
  },
});
export default styles;
