import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import styles from './styles';

import {PrimaryButton} from 'components/atoms/buttons';
import {Checkbox} from 'components/atoms/checkbox';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {resetStack} from 'navigation/navigation-ref';
import {useSelector} from 'react-redux';
import {onAddOrUpdateHotel} from 'services/api/hotel/api-actions';
import Bold from 'typography/bold-text';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';

const AddHotelAttributes = props => {
  const {navigation, route} = props;
  const {hotel} = useSelector(s => s);
  const {hotel_attributes, edit_hotel} = hotel;
  const [addBtnLoading, setAddBtnLoading] = React.useState(false);

  const [selectedTypes, setSelectedTypes] = useState(
    edit_hotel?.row?.terms?.map(x => ({...x, id: x?.term_id})) || [],
  );

  const attributes = hotel_attributes?.attributes?.map(ele => ({
    ...ele,
    data: ele?.terms || [],
  }));
  React.useEffect(() => {
    setSelectedTypes(
      edit_hotel?.row?.terms?.map(x => ({...x, id: x?.term_id})) || [],
    );
  }, [edit_hotel?.row?.terms]);
  const onSubmit = async () => {
    try {
      setAddBtnLoading(true);
      const res = await onAddOrUpdateHotel({
        ...edit_hotel,
        selected_terms: selectedTypes?.map(x => x?.id),
      });
      resetStack('HotelStack');
    } catch (error) {
      Alert.alert(UTILS.returnError(error));
    } finally {
      setAddBtnLoading(false);
    }
  };
  const handleCheckboxSelect = item => {
    const selectedIndex = selectedTypes.findIndex(
      selectedItem => selectedItem.id === item?.id,
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

  const renderItem = ({item}) => {
    const isSelected = selectedTypes.some(
      selectedItem => selectedItem.id === item.id,
    );

    return (
      <Row style={{justifyContent: 'flex-start', padding: mvs(10)}}>
        <Checkbox
          checked={isSelected}
          onPress={() => handleCheckboxSelect(item)}
        />

        <Regular
          style={{marginLeft: mvs(10), fontSize: mvs(16)}}
          label={item?.name}
        />
      </Row>
    );
  };
  const nestedMap = attributes?.map(section => ({
    name: section.name,
    data: section.data.map(item => renderItem({item})), // assuming renderItem is a function that renders each item
  }));
  return (
    <View style={styles.container}>
      <Header1x2x title={t('attributes')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        {nestedMap.map(section => (
          <React.Fragment key={section.name}>
            <Row style={{justifyContent: 'flex-start'}}>
              <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} />
              <Bold
                style={{marginLeft: mvs(10), fontSize: mvs(18)}}
                label={section.name}
              />
            </Row>
            {section.data}
          </React.Fragment>
        ))}
        <PrimaryButton
          onPress={onSubmit}
          loading={addBtnLoading}
          disabled={!selectedTypes?.length}
          title={t('add_hotel')}
          containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default AddHotelAttributes;
