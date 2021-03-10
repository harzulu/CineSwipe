import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Button,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function Profile(props) {
  return (
    <View style={styles.main}>
      <Text style={{color: 'white', fontSize: 20}}>YOU DID IT PROFILE!</Text>
    </View>
  )
}

Profile.propTypes = {
  changeState: PropTypes.func,
}

const styles = StyleSheet.create({
  main: {
    width: (SCREEN_WIDTH - 20),
    height: (SCREEN_HEIGHT - 50),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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