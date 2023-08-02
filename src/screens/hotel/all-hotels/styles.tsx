import { StyleSheet } from 'react-native';
import { colors } from '../../../config/colors';
import { mvs, width } from '../../../config/metrices';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingHorizontal: mvs(20),
    paddingTop: mvs(20),

    paddingBottom: mvs(100),
  },
  bg: {
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    paddingBottom: mvs(10),
    overflow: 'hidden',
  },
});
export default styles;
