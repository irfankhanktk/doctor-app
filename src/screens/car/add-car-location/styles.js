import {mvs} from 'config/metrices';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    width: mvs(32),
    height: mvs(32),
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft: mvs(16),
    borderRadius: mvs(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(60),
  },
  searchContainer: {
    position: 'absolute',
    width: '100%',
    marginTop: mvs(70),
  },
  nextButton: {
    paddingHorizontal: mvs(20),
    position: 'absolute',
    bottom: mvs(50),
    width: '100%',
  },
  backButton: {
    width: mvs(32),
    height: mvs(32),
    backgroundColor: 'white',
    position: 'absolute',
    marginLeft: mvs(16),
    borderRadius: mvs(100),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: mvs(10),
  },
});
export default styles;
