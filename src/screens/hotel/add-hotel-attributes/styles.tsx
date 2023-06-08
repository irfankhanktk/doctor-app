import fonts from 'assets/fonts';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle:{
    paddingTop:mvs(69),
  },
 
});
export default styles;
