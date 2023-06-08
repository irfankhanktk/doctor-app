import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

import fonts from 'assets/fonts';
import {Checkbox} from 'components/atoms/checkbox';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {SectionList} from 'react-native';
import Regular from 'typography/regular-text';
import Bold from 'typography/bold-text';
import {colors} from 'config/colors';
import {PrimaryButton} from 'components/atoms/buttons';

const AddHotelAttributes = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  console.log('selected type===>', selectedTypes);
  const attributes = [
    {
      title: 'PROPERTY TYPE',
      data: [
        {id: 1, name: 'Homestays'},
        {id: 2, name: 'Hotels'},
        {id: 3, name: 'Apartments'},
      ],
    },
    {
      title: 'FACILITIES',
      data: [
        {id: 4, name: 'Wake-up call'},
        {id: 5, name: 'Bicycle hire'},
        {id: 6, name: 'Car hire'},
      ],
    },
    {
      title: 'HOTEL SERVICE',
      data: [
        {id: 7, name: 'Hotel transport'},
        {id: 8, name: 'Fiesta Restaurant'},
        {id: 9, name: 'Havana Lobby bar'},
      ],
    },
  ];

  const handleCheckboxSelect = item => {
    const selectedIndex = selectedTypes.findIndex(
      selectedItem => selectedItem.id === item.id,
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

  return (
    <View style={styles.container}>
      <Header1x2x title={t('attributes')} back={true} />
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        <SectionList
          sections={attributes}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
          renderSectionHeader={({section: {title}}) => (
            <Row style={{justifyContent: 'flex-start'}}>
              <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} />
              <Bold
                style={{marginLeft: mvs(10), fontSize: mvs(18)}}
                label={title}
              />
            </Row>
          )}
        />
        <PrimaryButton
          title={'Add Hotel'}
          containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default AddHotelAttributes;
