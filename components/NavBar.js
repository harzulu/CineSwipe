import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
let currentColor = "#EB5B49";

function changeColor(color) {
  if (color === "list") {
    currentColor = "#FFBB00";
  } else if (color === "search") {
    currentColor = "#EB5B49";
  } else if (color === "main") {
    currentColor = "#FF7D0D";
  }
}

export default function NavBar(props) {
  return(
    <View style={[styles.buttonsRow, {backgroundColor: currentColor}]}>
      <AnimatedTouchable style={styles.buttons} onPress={() => {props.toList(); changeColor("list")}}>
        <Image style={styles.buttonImage} source={require('./../assets/listLogo.png')} />
      </AnimatedTouchable>

      <AnimatedTouchable style={styles.buttons} onPress={() => {props.changeBack(props.intro); changeColor("main")}}>
        <Image style={styles.buttonImage} source={require('./../assets/filmLogo.png')} />
      </AnimatedTouchable>

      <AnimatedTouchable style={styles.buttons} onPress={() => {props.toSearch(); changeColor("search")}}>
        <Image style={styles.buttonImage} source={require('./../assets/searchLogo.png')} />
      </AnimatedTouchable>
    </View>
  )
}

NavBar.propTypes = {
  toList: PropTypes.func,
  toSearch: PropTypes.func,
  changeBack: PropTypes.func,
  intro: PropTypes.bool,
} 

const styles = StyleSheet.create({
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute', 
    bottom: 0,
    height: 64,
    borderTopWidth: 2,
    borderTopColor: 'black',
  },
  buttons: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    width: 60,
    marginLeft: 39,
    marginRight: 39,
    marginBottom: 10,
  },
  buttonImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 70,
  },
})