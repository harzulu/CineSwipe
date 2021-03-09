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

export default function Search(props) {
  return (
    <View style={styles.main}>
      <Text style={{color: 'white', fontSize: 20}}>YOU DID IT SEARCH!</Text>
    </View>
  )
}

Search.propTypes = {
  searchFunction: PropTypes.func,
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