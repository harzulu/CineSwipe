import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Button,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function DescriptionBox(props) {
  console.log(props.currentMovie);
  console.log("CURRENT MOVIE");
  if (props.description === "NONE") {
    return(
      <View style={styles.infoBox}>
        <Button onPress={props.apiCall} title={"SEARCH!"} />
      </View>
    )
  } else {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.textTitle}>"{props.currentMovie.title}"</Text>
        <Text style={styles.text}>{props.currentMovie.tagline}</Text>
        <Text style={styles.text}>Runtime: {props.currentMovie.runtime}min</Text>
        <Text style={styles.text}>IMDb Rating: {props.currentMovie.imdbRating}</Text>
        <Text style={styles.text}>Synopsis:</Text>
        <Text style={styles.text}>"{props.currentMovie.overview}"</Text>
      </View>
    )
  }
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
    height: (SCREEN_HEIGHT - 150),
    padding: 10,
    position: 'absolute',
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 20,
  },
  textTitle: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 45,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 20,
  },
})
