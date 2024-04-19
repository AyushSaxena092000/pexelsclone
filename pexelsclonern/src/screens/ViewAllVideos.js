import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {BLACK, THEME_COLOR, WHITE} from '../utils/Colors';
import {NEW_PHOTOS, POPULAR_VIDEOS, getData} from '../utils/Apis';
import {useNavigation, useRoute} from '@react-navigation/native';
import VideoItem from '../components/VideoItem';

const ViewAllVideos = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    getVideos();
  }, []);

  const getVideos = () => {
    getData(POPULAR_VIDEOS, '?per_page=100').then(res => {
      console.log('videos-->', res);
      setVideos(res.videos);
    });
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={THEME_COLOR} />
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => {
          navigation.goBack();
        }}>
        <Image source={require('../Images/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={videos}
          contentContainerStyle={{marginTop: 20}}
          renderItem={({item, index}) => {
            return <VideoItem item={item} />;
          }}
          ItemSeparatorComponent={() => <View style={{height: 20}} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default ViewAllVideos;

const styles = StyleSheet.create({
  backBtn: {
    width: 50,
    height: 50,
    backgroundColor: WHITE,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 20,
  },
  icon: {
    width: 24,
    height: 24,
  },
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});
