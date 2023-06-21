import { Checkbox } from 'components/atoms/checkbox';
import { Row } from 'components/atoms/row';
import { colors } from 'config/colors';
import { mvs } from 'config/metrices';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Regular from 'typography/regular-text';

type IProps = {
    label?: string | number;
    checked?: boolean;
    children?: JSX.Element | JSX.Element[]
    onPress: (item: any) => void;
    items?: any[]
    selectedItems?: any[]

};
export const CheckboxLabel = (props: IProps) => {
    const {
        items = [],
        selectedItems = [],
        label,
        onPress = (item) => { },
    } = props;
    return (
        <View style={{ padding: mvs(10) }}>
            {items?.map((ele: any, index: any) => <Row style={styles.row}>
                <Checkbox
                    onPress={() =>
                        onPress(selectedItems?.some(s => s == ele?.id) ?
                            selectedItems?.filter(s => s != ele?.id) :
                            [...selectedItems, ele?.id])}
                    checked={selectedItems?.some(s => s == ele?.id)}
                />
                <Regular label={ele?.title} style={{ marginLeft: mvs(10) }} />
            </Row>)}
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