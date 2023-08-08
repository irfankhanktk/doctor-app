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
    paddingVertical: mvs(20),
  },

});
export default styles;
