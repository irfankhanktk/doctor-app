import Stars from 'components/atoms/stars';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Checkbox } from '../checkbox';
import { Row } from '../row';

type IProps = {
    label?: string | number;
    checked?: boolean;
    children?: JSX.Element | JSX.Element[]
    onPress: (item: any) => void;
    item?: any
    selectedStars: any[]

};
export const CheckboxRating = (props: IProps) => {
    const {
        onPress = (star) => { },
        selectedStars = []
    } = props;
    return (
        <View style={{ padding: mvs(10) }}>

            <Row style={styles.row}>
                <Checkbox
                    onPress={() => onPress(selectedStars?.some(x => x == 5) ? selectedStars?.filter(x => x != 5) : [...selectedStars, 5])}
                    checked={selectedStars?.some(x => x == 5)} />
                <Stars rate={5} />
            </Row>
            <Row style={styles.row}>
                <Checkbox
                    onPress={() => onPress(selectedStars?.some(x => x == 4) ? selectedStars?.filter(x => x != 4) : [...selectedStars, 4])}
                    checked={selectedStars?.some(x => x == 4)} />
                <Stars rate={4} />
            </Row>
            <Row style={styles.row}>
                <Checkbox
                    onPress={() => onPress(selectedStars?.some(x => x == 3) ? selectedStars?.filter(x => x != 3) : [...selectedStars, 3])}
                    checked={selectedStars?.some(x => x == 3)} />
                <Stars rate={3} />
            </Row>
            <Row style={styles.row}>
                <Checkbox
                    onPress={() => onPress(selectedStars?.some(x => x == 2) ? selectedStars?.filter(x => x != 2) : [...selectedStars, 2])}
                    checked={selectedStars?.some(x => x == 2)} />
                <Stars rate={2} />
            </Row>
            <Row style={styles.row}>
                <Checkbox
                    onPress={() => onPress(selectedStars?.some(x => x == 1) ? selectedStars?.filter(x => x != 1) : [...selectedStars, 1])}
                    checked={selectedStars?.some(x => x == 1)} />
                <Stars rate={1} />
            </Row>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: mvs(5),
        height: mvs(20),
        width: mvs(20),
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        marginBottom: mvs(5),
        width: '45%',
        justifyContent: 'flex-start',
    }
});