import fonts from 'assets/fonts';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: colors.white,
  },
  contentContainerStyle:{
    paddingTop:mvs(30),
    
  },
  bannerImageContainer:{
    width:'100%',
    height:mvs(250),
    marginTop:mvs(10),
    backgroundColor: colors.lightGray
  },
  manageRoomBtn:{
    width: '49%',
    height: mvs(40),
    borderRadius: mvs(5),
  },
  buttonContainerStyle:{
    width:mvs(150),
    borderRadius:mvs(5),
    alignSelf:'center',
    top:mvs(150),
    position:'absolute',
    zIndex:1
  },
  buttonTextStyle:{
    fontFamily:fonts.bold
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
    fontSize:mvs(14)
    
  },
  removeContainer: {
    backgroundColor: "red",
    width: "100%",
    alignItems: "center",
    bottom:mvs(10)
  },
  policyContainer:{
    borderWidth:StyleSheet.hairlineWidth,
    borderColor:colors.lightGray,
    marginTop:mvs(10),
    padding:mvs(10),
    borderRadius:mvs(10)

  },
  errorLabel: {
    // alignSelf: 'flex-start',
    color: colors.red,
    // backgroundColor: 'red',
    fontSize: mvs(10),
    marginBottom: mvs(5),
    height: mvs(15),
    marginHorizontal: mvs(5),
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
