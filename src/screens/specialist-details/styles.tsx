import { StyleSheet } from "react-native";
import { mvs, width } from "../../config/metrices";
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingHorizontal: mvs(20),
        paddingTop: mvs(20),
    },
    card: {
        marginBottom: mvs(20),
        // borderWidth: 1,
        borderRadius: mvs(20),
        backgroundColor: colors.white,
        padding: mvs(20),
        ...colors.shadow,
    },
    platiniumCard: {
        marginBottom: mvs(20),
        borderRadius: mvs(15),
        backgroundColor: colors.blueHalf,
        padding: mvs(20),
        ...colors.shadow,
        width: width - mvs(40),
        marginRight: mvs(20),
    },
    heartContainer: {
        position: 'absolute',
        right: mvs(20),
        top: mvs(-13),
        justifyContent: 'center',
        alignItems: 'center',
        height: mvs(30),
        width: mvs(30),
        borderRadius: mvs(15),
        backgroundColor: colors.red
    },
    heading: { marginTop: mvs(20), marginHorizontal: mvs(20) }

});
export default styles;