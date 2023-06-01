import {mvs, width} from 'config/metrices';
import {StyleSheet} from 'react-native';
import {colors} from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingVertical: mvs(20),
    paddingHorizontal: mvs(20),
  },
  time: {marginVertical: mvs(15)},
  prescriptioncard: {
    marginVertical: mvs(15),
    backgroundColor: colors.white,
    borderRadius: mvs(10),
    paddingHorizontal: mvs(10),
    paddingVertical: mvs(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  hospital: {width: width - mvs(40), height: mvs(200)},
});
export default styles;
