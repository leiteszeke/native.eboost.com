import React from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import Layout from '../../../components/Layout';

const images = [
  {id: 1, label: 'Yoga', url: 'https://picsum.photos/300/200', full: true},
  {id: 2, url: 'https://picsum.photos/200/200'},
  {id: 3, url: 'https://picsum.photos/200/200'},
  {id: 4, label: 'Fisio', url: 'https://picsum.photos/200/200'},
  {id: 5, url: 'https://picsum.photos/200/200'},
  {id: 6, url: 'https://picsum.photos/200/200'},
  {id: 7, url: 'https://picsum.photos/200/200'},
  {id: 8, url: 'https://picsum.photos/300/200', full: true},
];

const Home = () => {
  const rightIcon = () => null;

  return (
    <Layout withSafeArea={false} rightIcon={rightIcon} withLogo>
      <ScrollView style={styles.scroll}>
        <View style={styles.imageList}>
          {images.map((image) => (
            <View
              key={image.id}
              style={image.full ? styles.wideImage : styles.image}>
              <Image source={{uri: image.url}} style={styles.innerImage} />
              {image.label && (
                <Text style={styles.imageLabel}>
                  {image.label.toUpperCase()}
                </Text>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </Layout>
  );
};

const windowWidth = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  imageList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  wideImage: {
    borderRadius: 8,
    height: windowWidth / 3 + 10,
    marginBottom: 20,
    position: 'relative',
    width: windowWidth,
  },
  image: {
    borderRadius: 8,
    height: windowWidth / 3 + 10,
    marginBottom: 20,
    position: 'relative',
    width: (windowWidth - 20) / 2,
  },
  innerImage: {
    borderRadius: 8,
    height: '100%',
  },
  imageLabel: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 8,
    color: 'white',
    height: '100%',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: windowWidth / 3 + 10,
    position: 'absolute',
    textAlign: 'center',
    width: '100%',
  },
});

export default Home;
