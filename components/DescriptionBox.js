import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';

export default function DescriptionBox(props) {

  if (props.description === "NONE") {
    return(
      <View style={styles.infoBox}>
        <Button onPress={props.apiCall} title={"SEARCH!"} />
      </View>
    )
  } else {
    return (
      <View style={styles.infoBox}>
        <Text style={styles.text}>{props.description}</Text>
      </View>
    )
  }
}

DescriptionBox.propTypes = {
  apiCall: PropTypes.func,
  changeMovie: PropTypes.func,
  description: PropTypes.string,

}

const styles = StyleSheet.create({
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 414,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  text: {
    height: 25,
    fontSize: 10,
    fontFamily: 'Courier',
    color: 'black',
  },
})
