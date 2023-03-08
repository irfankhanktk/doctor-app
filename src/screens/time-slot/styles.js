import { Platform, StyleSheet } from "react-native";
import { colors } from '../../config/colors';
import { mvs } from "../../config/metrices";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingTop: mvs(34),
        paddingBottom: mvs(80),
        paddingHorizontal: mvs(0),
    },
    button: {
        width: '100%',
        paddingHorizontal: mvs(20),
        position: 'absolute',
        bottom: 0,
        paddingTop: mvs(5),
        paddingBottom: mvs(Platform?.OS === 'android' ? 20 : 40),
        backgroundColor: colors.white
    },
    doctorInfo: {
        borderWidth: StyleSheet.hairlineWidth,
        padding: mvs(10),
        borderRadius: mvs(12),
        borderColor: colors.border
    }

});
export default styles;