import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';
import { Platform } from "react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        paddingTop: mvs(10),
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
    primaryButton: {
        width: mvs(60),
        borderRadius: mvs(10), height: mvs(36), marginRight: mvs(10)
    },
    save: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        paddingBottom: mvs(Platform.OS === 'ios' ? 40 : 20),
        width: '100%'
    }
});
export default styles;