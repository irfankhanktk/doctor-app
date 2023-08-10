import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: mvs(50),
  },
  counterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: mvs(8),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    width: '48%',
    paddingVertical: mvs(25),
  },
  counterText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  counterValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  chartContainer: {
    // width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default styles;
