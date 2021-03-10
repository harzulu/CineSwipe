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

export default function DescriptionBox(props) {

  const num = parseInt(props.currentMovie.imdbRating);
  let rating;
  if (num <= 30) {
    rating = <Text style={[styles.textInfo, {color: '#CC1204',}]}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  } else if (num <= 50) {
    rating = <Text style={[styles.textInfo, {color: '#D66904',}]}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  } else if (num <= 70) {
    rating = <Text style={[styles.textInfo, {color: '#BF9A06',}]}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  } else if (num <= 85) {
    rating = <Text style={[styles.textInfo, {color: '#5E8503',}]}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  } else if (num >= 85) {
    rating = <Text style={[styles.textInfo, {color: '#00851F',}]}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  } else {
    rating = <Text style={styles.textInfo}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
  }

  const hours = parseInt(parseInt(props.currentMovie.runtime)/ 60);
  const min = (parseInt(props.currentMovie.runtime) % 60);
  return (
    <View style={styles.infoBox}>
      <Text style={styles.textTitle}>{props.currentMovie.title}</Text>
      <Text style={styles.text}>-{props.currentMovie.year}-</Text>
      <Text style={styles.text}>"{props.currentMovie.tagline}"</Text>
      <Text style={styles.textInfo}>Runtime: {hours} hr {min} min</Text>
      {rating}
      <Text style={styles.textInfo}>Synopsis:</Text>
      <Text style={styles.text}>"{props.currentMovie.overview}"</Text>
      <Image style={styles.backDropImage} source={{uri: `${props.currentMovie.backdropURLs.original}`}}/>
    </View>
  )
}

DescriptionBox.propTypes = {
  apiCall: PropTypes.func,
  changeMovie: PropTypes.func,
  currentMovie: PropTypes.object,

}

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
    borderRadius: 20,
    width: (SCREEN_WIDTH - 20),
    height: (SCREEN_HEIGHT - 110),
    padding: 10,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  textInfo: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 15,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 15,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 15,
  },
  textTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 40,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 15,
    marginTop: 20,
  },
  backDropImage: {
    flex: 1,
    width: 350,
    borderRadius: 20,
  }
})
