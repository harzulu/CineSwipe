import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import DescriptionBox from './DescriptionBox';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function TitleBox(props) {
  return (
    <View style={styles.titleBox}>
      <Text style={styles.title}>{props.currentMovie.title}</Text>
      <Text style={styles.subTitle}>{props.currentMovie.year}</Text>
    </View>
  );
}

DescriptionBox.propTypes = {
  currentMovie: PropTypes.object,
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontFamily: 'Georgia',
  },
  subTitle: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginTop: 5,
    fontFamily: 'Georgia',
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: (SCREEN_WIDTH - 20),
    height: 100,
    backgroundColor: '#2C3432',
    borderWidth: 2,
    borderColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 5,
  },
})
