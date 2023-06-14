import Header1x2x from 'components/atoms/headers/header-1x-2x';
import { KeyboardAvoidScrollview } from 'components/atoms/keyboard-avoid-scrollview';
import { t } from 'i18next';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import styles from './styles';

import fonts from 'assets/fonts';
import { Checkbox } from 'components/atoms/checkbox';
import { Row } from 'components/atoms/row';
import { mvs } from 'config/metrices';
import { SectionList } from 'react-native';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';
import { colors } from 'config/colors';
import { PrimaryButton } from 'components/atoms/buttons';
import { useSelector } from 'react-redux';
import { UTILS } from 'utils';
import { onAddOrUpdateHotel } from 'services/api/hotel/api-actions';

const AddHotelAttributes = props => {
  const { navigation, route } = props;
  const { hotel } = useSelector(s => s);
  const { hotel_attributes, edit_hotel } = hotel;
  console.log('route-->>params', route?.params);
  console.log('hotel_attributes :::::::', hotel_attributes?.attributes);

  const [selectedTypes, setSelectedTypes] = useState(edit_hotel?.row?.terms?.map(x => ({ ...x, id: x?.term_id })) || []);
  console.log('selected type===>', selectedTypes);
  const attributes = hotel_attributes?.attributes?.map(ele => ({
    ...ele,
    data: ele?.terms || [],
  }));

  const onSubmit = async () => {
    try {
      const res = await onAddOrUpdateHotel({
        ...route?.params,
        id: edit_hotel?.row?.id || null,
        gallery: route?.params?.gallery?.map(x => x?.data?.id)?.join(),
        banner_image_id: route?.params?.banner_image_id?.data?.id,
        image_id: route?.params?.image_id?.data?.id,
        terms: selectedTypes?.map(x => x?.id),
      });
      console.log('res=>>>add update hotel>>', res);
    } catch (error) {
      Alert.alert(UTILS.returnError(error));
    }
  };
  const handleCheckboxSelect = item => {
    const selectedIndex = selectedTypes.findIndex(
      selectedItem => (selectedItem.id === item?.id)
    );

    if (selectedIndex !== -1) {
      // Item is already selected, remove it from the selectedTypes array
      const updatedSelectedTypes = [...selectedTypes];
      updatedSelectedTypes.splice(selectedIndex, 1);
      setSelectedTypes(updatedSelectedTypes);
    } else {
      // Item is not selected, add it to the selectedTypes array
      setSelectedTypes([...selectedTypes, item]);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedTypes.some(
      selectedItem => (selectedItem.id === item.id),
    );

    return (
      <Row style={{ justifyContent: 'flex-start', padding: mvs(10) }}>
        <Checkbox
          checked={isSelected}
          onPress={() => handleCheckboxSelect(item)}
        />

        <Regular
          style={{ marginLeft: mvs(10), fontSize: mvs(16) }}
          label={item?.name}
        />
      </Row>
    );
  };

  return (
    <View style={styles.container}>
      <Header1x2x title={t('attributes')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <SectionList
          sections={attributes}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({ section: { name } }) => (
            <Row style={{ justifyContent: 'flex-start' }}>
              <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} />
              <Bold
                style={{ marginLeft: mvs(10), fontSize: mvs(18) }}
                label={name}
              />
            </Row>
          )}
        />
        <PrimaryButton
          onPress={onSubmit}
          disabled={!selectedTypes?.length}
          title={'Add Hotel'}
          containerStyle={{ marginTop: mvs(30), marginBottom: mvs(20) }}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default AddHotelAttributes;
