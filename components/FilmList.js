import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Button,
  Dimensions,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function FilmList(props) {
  if (props.movies.length < 1) {
    return (
      <View style={styles.main}>
        <Text style={{color: 'white', fontSize: 20}}>No movies</Text>
      </View>
    )
  } else {
    return (props.movies.map((index, i) => {
      return (
        <View style={styles.main}>
          <Text key={i} style={{color: 'white', fontSize: 20}}>{index.title}</Text>
        </View>
      )
    }))
  }
}

FilmList.propTypes = {
  movies: PropTypes.array,
}

const styles = StyleSheet.create({
  main: {
    width: (SCREEN_WIDTH - 20),
    height: (SCREEN_HEIGHT - 50),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  }
})