import { mvs, width } from "config/metrices";
import { StyleSheet } from "react-native";
import { colors } from '../../config/colors';

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
    time: { marginVertical: mvs(15), },
    hospital: { width: width - mvs(40), height: mvs(200) },
    appoinment: {
        paddingVertical: mvs(5),
        paddingHorizontal: mvs(15),
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.secondary,
        marginBottom: mvs(20)
    },
    appoinmentDetails: { color: colors.primary, fontSize: mvs(18), marginHorizontal: mvs(15) }
});
export default styles;