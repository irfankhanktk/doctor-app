import { StyleSheet } from "react-native";
import { mvs } from "config/metrices";
import { colors } from 'config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        padding: mvs(20),
        paddingTop: '35%',
    },
    button: {
        marginTop: mvs(40),
    },
    accountText: {
        color: colors.primary,
        alignSelf: 'center',
        marginTop: mvs(20)
    }
});
export default styles;