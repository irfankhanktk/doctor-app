import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle:{
        paddingTop:mvs(69),
        
      },
      nextButton:{
        marginTop:mvs(25),
        marginBottom:mvs(20)
      },
      policyContainer:{
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:colors.lightGray,
        marginTop:mvs(10),
        padding:mvs(10),
        borderRadius:mvs(10)
      },
      enableServiceContainer:{
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:colors.lightGray,
        marginTop:mvs(10),
        padding:mvs(10),
        borderRadius:mvs(10)
      },
      addItem:{
        width: mvs(80),
        height: mvs(30),
        borderRadius: mvs(5),
        alignSelf: 'flex-end',
        marginTop: mvs(10),
      }
});
export default styles