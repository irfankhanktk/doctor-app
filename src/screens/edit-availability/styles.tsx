import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';
import {Platform} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle: {
        paddingTop: mvs(30),
        paddingHorizontal: mvs(20)
    },
    button: {
        marginTop: mvs(20),
    },
    accountText: {
        color: colors.primary,
        alignSelf: 'center',
        marginTop: mvs(20)
    },
    payloadView:{
        marginTop: mvs(20), paddingBottom: mvs(20),
    },
    payload:{ padding: mvs(5), marginBottom: mvs(5), alignSelf: 'flex-end', },
    primaryButton:{
        width: mvs(60),
        borderRadius: mvs(10), height: mvs(36), marginRight: mvs(10)
    },
    save:{
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        paddingBottom: mvs(Platform.OS === 'ios' ? 40 : 20),
        width: '100%'
      }
});
export default styles;