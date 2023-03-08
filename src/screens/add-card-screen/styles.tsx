import {StyleSheet} from 'react-native';
import {mvs} from '../../config/metrices';
import {colors} from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    paddingTop: mvs(40),
    paddingHorizontal: mvs(20),
  },
  button: {
    marginTop: mvs(20),
  },
  accountText: {
    color: colors.primary,
    alignSelf: 'center',
    marginTop: mvs(20),
  },
  forgot: {
    // alignSelf: 'center',
    alignItems: 'center',
    marginBottom: mvs(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  carddescrp: {
    alignSelf: 'center',
    marginBottom: mvs(10),
  },
});
export default styles;
