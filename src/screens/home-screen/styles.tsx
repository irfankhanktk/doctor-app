import { StyleSheet } from 'react-native';
import { mvs } from '../../config/metrices';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(20),
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  servicesHeading: {
    marginHorizontal: mvs(20),
  }

});
export default styles;
