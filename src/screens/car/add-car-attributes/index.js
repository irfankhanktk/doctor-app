import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {KeyboardAvoidScrollview} from 'components/atoms/keyboard-avoid-scrollview';
import {t} from 'i18next';
import React, {useState} from 'react';
import {Alert, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {PrimaryButton} from 'components/atoms/buttons';
import {Checkbox} from 'components/atoms/checkbox';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import {goBack, resetStack} from 'navigation/navigation-ref';
import {useDispatch, useSelector} from 'react-redux';
import {onAddOrUpdateCar} from 'services/api/car/api-actions';
import Regular from 'typography/regular-text';
import {UTILS} from 'utils';
import Bold from 'typography/bold-text';

import {I18nManager} from 'react-native';
import {setCarForEdit} from 'store/reducers/car-reducer';
import {useAppDispatch} from 'hooks/use-store';

const AddCarAttributes = props => {
  const {navigation, route} = props;
  const dispatch = useAppDispatch();
  const {car} = useSelector(s => s);
  const {car_attributes, edit_car} = car;
  const [addBtnLoading, setAddBtnLoading] = React.useState(false);

  const [selectedTypes, setSelectedTypes] = useState(
    edit_car?.row?.terms?.map(x => ({...x, id: x?.term_id})) || [],
  );
  console.log('selected type===>', selectedTypes);
  const attributes = car_attributes?.attributes?.map(ele => ({
    ...ele,
    data: ele?.terms || [],
  }));
  React.useEffect(() => {
    setSelectedTypes(
      edit_car?.row?.terms?.map(x => ({...x, id: x?.term_id})) || [],
    );
  }, [edit_car?.row?.terms]);
  const onSubmit = async () => {
    try {
      setAddBtnLoading(true);
      const res = await onAddOrUpdateCar({
        ...edit_car,
        selected_terms: selectedTypes?.map(x => x?.id),
      });
      dispatch(
        setCarForEdit({
          ...edit_car,
          row: {
            ...edit_car.row,
            id: res?.id,
          },
        }),
      );
      Alert.alert(t('save_changes_successfully'));
      resetStack('CarStack');
      console.log('res=>>>add update car>>', res);
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
  const nestedMap =
    attributes?.map(section => ({
      name: section.name,
      data: section.data?.map(item => renderItem({item})), // assuming renderItem is a function that renders each item
    })) || [];
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
        <AntDesign
          size={20}
          name={I18nManager.isRTL ? 'arrowright' : 'arrowleft'}
          color={'black'}
        />
      </TouchableOpacity>
      <KeyboardAvoidScrollview
        contentContainerStyle={styles.contentContainerStyle}>
        {nestedMap?.map(section => (
          <React.Fragment key={section?.name}>
            <Row style={{justifyContent: 'flex-start'}}>
              <Bold fontSize={mvs(18)} label={'ATTRIBUTE:'} />
              <Bold
                style={{marginLeft: mvs(10), fontSize: mvs(18)}}
                label={section?.name}
              />
            </Row>
            {section.data}
          </React.Fragment>
        ))}
        <PrimaryButton
          onPress={onSubmit}
          loading={addBtnLoading}
          disabled={!selectedTypes?.length}
          title={t('save_changes')}
          containerStyle={{marginTop: mvs(30), marginBottom: mvs(20)}}
        />
      </KeyboardAvoidScrollview>
    </View>
  );
};

export default AddCarAttributes;
