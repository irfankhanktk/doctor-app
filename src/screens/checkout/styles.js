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
    hospital: { width: width - mvs(40), height: mvs(200) }
});
export default styles;