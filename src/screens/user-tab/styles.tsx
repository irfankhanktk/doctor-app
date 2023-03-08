import { StyleSheet } from 'react-native';
import { mvs, width } from '../../config/metrices';
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  contentContainerStyle: {
    flex: 1,
    padding: mvs(20),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(20),
    paddingTop: mvs(40),
  },
  linkContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: mvs(36),
    backgroundColor: colors.secondary,
    width: width,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    alignSelf: 'center',
    paddingVertical: mvs(30),
    paddingHorizontal: mvs(20)
  },
  name: {
    alignSelf: 'center',
    fontSize: mvs(24),
    marginTop: mvs(10),
    color: colors.white
  },
  email: {
    alignSelf: 'center',
    fontSize: mvs(14),
    color: `${colors.white}`,
  },
  item: {
    marginBottom: mvs(15),
  },
  itemText: {
    fontSize: mvs(16),
    color: `${colors.black}`,
  },
  img: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: mvs(35),
    backgroundColor: colors.black,
    alignSelf: 'center'
  }
});
export default styles;
