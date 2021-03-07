import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity,
  Image, 
  Button,
  TouchableWithoutFeedback,
  ImageBackground
} from 'react-native';
import axios from 'axios';
import config from './../config.js';

export default class AppControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      apiData: null,
      buttonView: false,
      currentMovie: {
        posterURLs: {original: 'https://picsum.photos/400/700'},
        title: "N/A",
        type: "movie",
        year: "2021",
        imdbID: "ff0000000",
        imdbRating: "0",
      },
    };
  }

  timerLoad = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  goForAxios = () => {
    console.log("SUPER Searched!");
    const service = "netflix"
    const type = "movie"
    const genre = "18"

    axios.get(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${type}&genre=${genre}&page=1&language=en`, 
    {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": `${config.REACT_APP_API_KEY}`,
        "x-rapidapi-host": `${config.REACT_APP_API_HOST}`
      }
    })
    .then(response => {
      console.log('getting data from axios', response.data);
      setTimeout(() => {
          this.setState({
              apiData: response.data,
              buttonView: true,
          })
          this.getMovie;
      }, 2000)
    })
    .catch(error => {
      console.log(error);
    });
  }

  getMovie = () => {
    const num = Math.floor(Math.random() * this.state.apiData.results.length);
    this.setState({
      currentMovie: this.state.apiData.results[num],
    })
  }

  render() {
    let currentButton;
    if (this.state.buttonView) {
      currentButton = <Button onPress={this.getMovie} title={"Change Movie!"} />
    } else {
      currentButton = <Button onPress={this.goForAxios} title={"SEARCH!"} />
      console.log("Searched!");
    }
    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.subTitle}>Welcome to Cine-Swipe!</Text>
          <Text style={styles.subTitle}>Loading......</Text>
          {this.timerLoad()}
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <ImageBackground source={{uri: `${this.state.currentMovie.posterURLs.original}`}} style={styles.main}>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{this.state.currentMovie.title}</Text>
              <Text style={styles.subTitle}>{this.state.currentMovie.year}</Text>
            </View>
            <View style={styles.infoBox}>
              {currentButton}
            </View>
          </ImageBackground>
        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    height: 500,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 2,
  },
  text: {
    height: 40,
    fontSize: 20,
    fontFamily: 'Courier'
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 390,
    height: 150,
    borderRadius: 60,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginTop: 240,
  },
  title: {
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  subTitle: {
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    marginTop: 5,
  },
  titleBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 390,
    height: 100,
    borderRadius: 60,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
    marginBottom: 200,
  }
});