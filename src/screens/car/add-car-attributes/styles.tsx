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
    paddingTop:mvs(20),
  },
  backButton: {
    width: mvs(32),
    height: mvs(32),
    
    marginLeft: mvs(16),
    borderRadius: mvs(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(10),
  },
 
});
export default styles;
