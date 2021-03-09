import React from 'react';
import { 
  StyleSheet, 
  Text,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import DescriptionBox from './DescriptionBox';

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
    fontSize: 35,
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
    width: 414,
    height: 110,
    borderRadius: 20,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
  },
})
