import { StyleSheet } from "react-native";
import { mvs } from "../../config/metrices";
import { colors } from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    contentContainerStyle: {
        flexGrow: 1,
        paddingVertical: mvs(30),
        paddingHorizontal: mvs(20)
    },
    columnWrapperStyle: {
        justifyContent: 'space-between',
    }
});
export default styles;