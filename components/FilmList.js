import React from 'react';
import PropTypes from 'prop-types';
import TitleBox from './TitleBox.js';
import ListDescription from './ListDescription.js';
import FlipCard from 'react-native-flip-card';

import { 
  StyleSheet, 
  Text,
  View,
  Dimensions,
  Image,
  ScrollView
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// List of cards but only of liked movies
export default function FilmList(props) {
  let currentView;
  if (props.movies.length < 1) {
    // if no liked movies
    currentView = (
      <View style={styles.main}>
        <Text style={{color: 'white', fontSize: 20}}>No movies</Text>
      </View>
    )
  } else {
    // render all movies
    currentView = (props.movies.map((index, i) => {
      return (
        <View key={i} style={styles.mainCard}>
          <FlipCard 
          friction={9}
          perspective={1500}
          flipHorizontal={true}
          flipVertical={false}
          flip={false}>
            {/* Face Side */}
            <View style={styles.card}>
              <TitleBox currentMovie={index}/>
              <Image style={styles.mainImage} 
              source={{uri: `${index.posterURLs.original}`}} />
            </View>
            {/* Back Side */}
            <View style={styles.card}>
              <ListDescription currentMovie={index}/>
            </View>
          </FlipCard>
        </View>
      )
    }));
  }
  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Your Liked Movies:</Text>
      {currentView}
    </ScrollView>
  )
}

FilmList.propTypes = {
  movies: PropTypes.array,
  changeState: PropTypes.func,
}

// ALL STYLING
const styles = StyleSheet.create({
  main: {
    marginTop: 280,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Courier',
  },  
  mainCard: {
    width: (SCREEN_WIDTH),
    height: (SCREEN_HEIGHT - 90),
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: 'black',
  },
  mainImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 70,
    marginLeft: 39,
    marginRight: 39,
    marginBottom: 10,
    // shadowColor: "white",
    // shadowOffset: {
    //   width: 0,
    //   height: 11,
    // },
    // shadowOpacity: 0.57,
    // shadowRadius: 15.19,
    // elevation: 23,
  },
  buttonImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 70,
  },
})