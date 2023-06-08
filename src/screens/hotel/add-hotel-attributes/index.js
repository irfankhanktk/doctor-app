import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const AddHotelAttributes = () => {
  const [selectedTypes, setSelectedTypes] = useState([]);

  const propertyTypes = [
    {id: 1, name: 'Apartment'},
    {id: 2, name: 'House'},
    {id: 3, name: 'Condo'},
    {id: 4, name: 'Townhouse'},
    {id: 5, name: 'Villa'},
  ];

  const handleTypeSelect = type => {
    const isSelected = selectedTypes.includes(type);
    if (isSelected) {
      setSelectedTypes(
        selectedTypes.filter(selectedType => selectedType !== type),
      );
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Select Property Types</Text>
      {propertyTypes.map(type => (
        <TouchableOpacity
          key={type.id}
          style={[
            styles.checkbox,
            selectedTypes.includes(type) && styles.checkboxSelected,
          ]}
          onPress={() => handleTypeSelect(type)}>
          <Text style={styles.checkboxLabel}>{type.name}</Text>
        </TouchableOpacity>
      ))}
      <Text>Selected types: {JSON.stringify(selectedTypes)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxSelected: {
    backgroundColor: '#e6e6e6',
  },
  checkboxLabel: {
    marginLeft: 8,
  },
});

export default AddHotelAttributes;
