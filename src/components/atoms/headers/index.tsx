import React from 'react';
import { Image, StyleProp, StyleSheet, TextStyle, TouchableOpacity, View } from 'react-native';
import i18n from 'translation';
import Medium from 'typography/medium-text';
import { colors } from '../../../config/colors';
import { mvs } from '../../../config/metrices';
import Bold from '../../../typography/bold-text';
import { login_bg } from 'assets/images'
import { Row } from '../row';
import { SearchInput } from '../inputs';
type props = {
  style?: StyleProp<TextStyle>
  title?: string
  back?: boolean
}
const AppHeader = ({
  style,
  title,
  back,
  ...props
}: props) => {

  return (
    <View style={[styles.container, style]}>
      <Row style={{ alignItems: 'center' }}>
        <Medium fontSize={mvs(20)} label={title} style={[styles.title]} />
        <Image source={login_bg} style={{ height: mvs(40), width: mvs(40), borderRadius: mvs(69 / 2) }} />
      </Row>
    </View>
  )
}
export default React.memo(AppHeader);
const styles = StyleSheet.create({
  container: {
    height: mvs(120),
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(22),
    borderBottomLeftRadius: mvs(40),
    borderBottomRightRadius: mvs(40),
  },
  title: {
    fontSize: mvs(18),
    color: colors.white,
    marginVertical: mvs(12),
  },
  back: {
    marginRight: mvs(20),
  }
});