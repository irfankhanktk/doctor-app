import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../config/colors';
import {mvs, width} from '../../../config/metrices';
import fonts from 'assets/fonts';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle:{
    paddingTop:mvs(69),
  },
  bannerImageContainer:{
    width:'100%',
    height:mvs(250),
    marginTop:mvs(10),
    backgroundColor: colors.lightGray
  },
  buttonContainerStyle:{
    width:mvs(150),
    borderRadius:mvs(5),
    alignSelf:'center',
    top:mvs(150),
    position:'absolute',
    zIndex:1
  },
  galleryText:{
    marginTop:mvs(20)
  },
  galleryContainer:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: colors.secondary,
    borderRadius: mvs(5),
    height: mvs(100),
    width: mvs(100),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: mvs(10),
  },
  headerText: {
    fontFamily: fonts.medium,
    fontSize: mvs(12),
    color: colors.black,
    textAlign: "center",
  },

  image: {
    height: mvs(100),
    width: "100%",
  },
  txtRemove: {
    color: colors.white,
  },
  removeContainer: {
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    bottom:mvs(10)
  },
  errorLabel: {
    color: colors.red,
    fontSize: mvs(10),
    marginBottom: mvs(5),
    height: mvs(15),
    marginHorizontal: mvs(5),
  },
});
export default styles;
