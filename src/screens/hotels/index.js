import * as IMG from 'assets/images';
import { PrimaryButton } from 'components/atoms/buttons';
import HotelsHeader from 'components/atoms/hotels-header';
import { HalfOutLineInput, OutLineInput } from 'components/atoms/outline-iput';
import { Row } from 'components/atoms/row';
import { mvs } from 'config/metrices';
import React from 'react';
import { ImageBackground, ScrollView, View } from 'react-native';
import Medium from 'typography/medium-text';
import styles from './styles';
import { colors } from '../../config/colors';

const Hotels = props => {
  const [text, setText] = React.useState('');
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMG.Hotels_Bg}
        style={{
          height: mvs(500),
          marginTop: 0,
          backgroundColor: colors.primary
        }}>
        <HotelsHeader style={{ height: mvs(200), }} isSearch={false} title={'Hotels'} back={true} />
      </ImageBackground>
      <View style={styles.cardContainer}>
        <View style={styles.line} />
        <ScrollView contentContainerStyle={{ flexGrow: 1, }}>
          <Medium
            style={styles.text}
            label={'Enter the information below to find available hotels.'}
          />
          <OutLineInput label={'City'} placeholder={'1'} />
          <Row style={styles.todayContainer}>
            <Medium label={'Today,01 july'} style={styles.todayText} />
            <Medium label={'Tomorrow, 01 July'} style={styles.tomarrowText} />
          </Row>
          <Row
            style={{
              marginTop: mvs(10),
              flexDirection: 'row',
            }}>
            <HalfOutLineInput label={'Room'} placeholder={'1'} />
            <HalfOutLineInput label={'Adults'} placeholder={'0'} />
          </Row>
          <Row style={{ marginTop: mvs(10) }}>
            <HalfOutLineInput label={'Childern'} placeholder={'0'} style={{}} />
            <HalfOutLineInput label={'Infants'} placeholder={'Select City'} />
          </Row>

          <PrimaryButton
            onPress={() => props?.navigation?.navigate('HotelBooking')}
            title="Search"
            containerStyle={styles.searchContainer}
          />
        </ScrollView>
      </View>
    </View>
  );
};
export default Hotels;
