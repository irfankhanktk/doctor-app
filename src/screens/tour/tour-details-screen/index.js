import * as IMG from 'assets/tour/images';
import {Row} from 'components/atoms/row';
import {mvs} from 'config/metrices';
import React from 'react';

import MyMap from 'components/molecules/map';
import RatingStar from 'components/molecules/rating-star';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import i18n from 'translation';
import Bold from 'typography/bold-text';
import Medium from 'typography/medium-text';
import Regular from 'typography/regular-text';
import HtmlView from '../../../components/atoms/render-html/index';
import {colors} from '../../../config/colors';
import styles from './styles';

import CollapsibleView from 'components/atoms/collapsible-view';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Loader} from 'components/atoms/loader';
import {navigate} from 'navigation/navigation-ref';
import ImageView from 'react-native-image-viewing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getTourDetails} from 'services/api/tour/api-actions';
import RelatedTourCard from 'components/molecules/tour/related-tour-card';
import TourVideoModal from 'components/molecules/tour/modals/tour-video-modal';
const TourDetailsScreen = props => {
  const [videoModal, setVideoModal] = React.useState(false);
  const [tourDetails, setTourDetails] = React.useState({});
  const [visible, setIsVisible] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const {t} = i18n;
  const {slug, id} = props?.route?.params || {};
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await getTourDetails(slug);
      setLoading(false);
      setTourDetails(res);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImagePress = index => {
    setCurrentIndex(index);
    setIsVisible(true);
  };

  return (
    <View style={styles.container}>
      <Header1x2x isSearch={false} title={t('tour_details')} back={true} />
      {loading ? (
        <Loader />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}>
            <ImageBackground
              source={
                tourDetails?.row?.image_id
                  ? {uri: tourDetails?.row?.image_id}
                  : IMG.Tour_bg
              }
              style={styles.imgbackground}>
              <Row style={{paddingHorizontal: mvs(10)}}>
                <Row
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingVertical: mvs(5),
                  }}>
                  <TouchableOpacity
                    onPress={() => setVideoModal(true)}
                    style={{
                      marginHorizontal: mvs(20),
                    }}>
                    <Entypo name="video" color={colors.black} size={mvs(30)} />
                  </TouchableOpacity>
                </Row>
                <TouchableOpacity
                  style={styles.editBtn}
                  onPress={() => navigate('AddTour', {id: id})}>
                  <Entypo name="edit" color={colors.black} size={mvs(30)} />
                </TouchableOpacity>
              </Row>
            </ImageBackground>

            <View style={styles.cardContainer}>
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: mvs(20),
                  flexGrow: 1,
                }}>
                <Medium style={styles.text} label={tourDetails?.row?.title} />
                <Row style={{justifyContent: 'flex-start'}}>
                  <Entypo
                    name="location"
                    color={colors.black}
                    size={mvs(18)}
                    style={{marginRight: mvs(10)}}
                  />
                  <Medium
                    label={tourDetails?.row?.address}
                    style={{marginHorizontal: mvs(10)}}
                  />
                </Row>
                <ScrollView
                  contentContainerStyle={{
                    marginVertical: mvs(10),
                  }}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {tourDetails?.row?.gallery?.map((item, index) => (
                    <Row
                      style={{
                        backgroundColor: colors.secondary,
                        marginRight: mvs(10),
                        borderRadius: mvs(15),
                        padding: mvs(10),
                      }}>
                      <TouchableOpacity
                        key={index}
                        onPress={() => handleImagePress(index)}>
                        <Image
                          source={item?.large ? {uri: item?.large} : IMG.Car_bg}
                          style={{
                            height: mvs(80),
                            width: mvs(80),
                            resizeMode: 'cover',
                            borderRadius: mvs(10),
                          }}
                        />
                      </TouchableOpacity>
                    </Row>
                  ))}
                </ScrollView>
                <Medium
                  label={t('description')}
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                />
                <HtmlView html={tourDetails?.row?.content} />
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('FAQS')}
                />

                <View>
                  {tourDetails?.row?.faqs?.map(ele => (
                    <>
                      <CollapsibleView
                        collaspsableColor={colors.black}
                        maxH={60}
                        label={ele?.title}
                        numberOfLines={2}>
                        <Regular label={ele?.content} />
                      </CollapsibleView>
                    </>
                  ))}
                </View>
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('tour_features')}
                />
                <Row style={{paddingVertical: mvs(8)}}>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="airbag"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Airbag'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="radio"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'FM Radio'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="tour-door"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Power Windows'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                </Row>
                <Row style={{paddingVertical: mvs(8)}}>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="motion-sensor"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={' Sensor'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <Ionicons
                      name="speedometer"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Speed KM'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                  <Row style={{justifyContent: 'flex-start'}}>
                    <MaterialCommunityIcons
                      name="steering"
                      color={colors.black}
                      size={mvs(16)}
                    />
                    <Regular
                      label={'Steering Wheel'}
                      style={{marginLeft: mvs(5)}}
                      fontSize={mvs(12)}
                    />
                  </Row>
                </Row>
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('location')}
                />
                {/* <MyMap
                  coord={{
                    latitude: (tourDetails?.row?.map_lat || 19.229727) * 1,
                    longitude: (tourDetails?.row?.map_lng || 72.98447) * 1,
                  }}
                /> */}
                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('review')}
                />
                <Row>
                  <Row
                    style={{
                      backgroundColor: colors.primary,
                      alignSelf: 'flex-start',
                      paddingVertical: mvs(5),
                      paddingHorizontal: mvs(10),
                      borderRadius: mvs(5),
                      alignItems: 'center',
                    }}>
                    <Bold
                      style={{
                        color: colors.white,
                        fontSize: mvs(15),
                        lineHeight: mvs(20),
                      }}
                      label={tourDetails?.row?.review_score}
                    />
                    <Icon name={'star'} size={mvs(15)} color={colors.yellow} />
                  </Row>
                </Row>
                <ScrollView
                  contentContainerStyle={{marginVertical: mvs(10)}}
                  horizontal
                  showsHorizontalScrollIndicator={false}>
                  {tourDetails?.review_list?.data?.map((item, index) => (
                    <Row
                      style={{
                        backgroundColor: colors.secondary,
                        marginRight: mvs(10),
                        padding: mvs(10),
                      }}>
                      <Image
                        source={IMG.Doctors}
                        style={{
                          height: mvs(30),
                          width: mvs(30),
                          borderRadius: mvs(15),
                        }}
                      />
                      <View style={{marginLeft: mvs(10), width: mvs(100)}}>
                        <Medium label={item?.author?.name} />
                        <Regular fontSize={mvs(12)} label={item?.content} />
                        <RatingStar rate={item?.rate_number} />
                      </View>
                    </Row>
                  ))}
                </ScrollView>

                <Medium
                  style={{marginTop: mvs(12), fontSize: mvs(18)}}
                  label={t('you_might_also_like')}
                />
                <View
                  style={{
                    marginBottom: mvs(Platform.OS == 'android' ? 20 : 40),
                  }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{paddingVertical: mvs(20)}}>
                    {tourDetails?.tour_related?.map(ele => (
                      <RelatedTourCard
                        item={ele}
                        onPress={() =>
                          props?.navigation?.push('CarDetails', {
                            slug: ele?.slug,
                          })
                        }
                      />
                    ))}
                  </ScrollView>
                </View>
              </ScrollView>
            </View>

            <ImageView
              images={tourDetails?.row?.gallery?.map((item, index) => ({
                uri: `${item.large}`,
              }))}
              imageIndex={currentIndex}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />
            <TourVideoModal
              visible={videoModal}
              onClose={setVideoModal}
              url={tourDetails?.row?.video}
            />
          </ScrollView>
        </>
      )}
    </View>
  );
};
export default TourDetailsScreen;
