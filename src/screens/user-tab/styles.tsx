import { StyleSheet } from 'react-native';
import { mvs, width } from 'config/metrices';
import { colors } from 'config/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    flex: 1,
    padding: mvs(20),
  },
  body: {
    flex: 1,

  },
  scrollview: { flexGrow: 1, paddingTop: mvs(20) },
  dashboardBtn: {
    backgroundColor: colors.white,
    height: mvs(40),
    width: '50%',
    borderRadius: mvs(5),
    alignSelf: 'center',
    marginTop: mvs(10),
  },
  linkContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: mvs(10),
    backgroundColor: colors.secondary,
    width: width,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    alignSelf: 'center',
    paddingTop: mvs(30),
    paddingHorizontal: mvs(20),

  },
  name: {
    alignSelf: 'center',
    fontSize: mvs(24),
    marginTop: mvs(10),
    color: colors.white,
  },
  email: {
    alignSelf: 'center',
    fontSize: mvs(14),
    color: `${colors.white}`,
  },
  item: {
    marginBottom: mvs(15),
  },
  itemtabs: {
    marginBottom: mvs(15),

    flexDirection: 'row',
    // borderWidth: 1,
    alignItems: 'center',
    borderRadius: mvs(10),
    padding: mvs(10),
    backgroundColor: colors.white,
    // justifyContent: 'space-between',
    width: width - mvs(40),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  itemText: {
    fontSize: mvs(16),
    color: `${colors.black}`,
  },
  itemText1: {
    fontSize: mvs(16),
    color: `${colors.black}`,
    marginLeft: mvs(10),
  },
  img: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logouttab: {
    flexDirection: 'row',
    marginBottom: mvs(15),
  },
  imgUpload: {
    height: mvs(100),
    width: mvs(100),
    borderRadius: mvs(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
export default styles;
