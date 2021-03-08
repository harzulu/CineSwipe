import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  Button,
  ImageBackground,
  Dimensions,
  Animated,
  PanResponder,
} from 'react-native';
import axios from 'axios';
import config from './../config.js';
import MovieShuffle from './MovieShuffle.js';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class AppControl extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      loading: true,
      haveData: false,
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

  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({

      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {

        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {

      }
    })
  }


  timerLoad = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  }

  handleApiRun = () => {
    const newMovies = MovieShuffle(this.state.apiData.results);
    const num = parseInt(this.state.currentIndex);
    console.log(newMovies);
    this.setState({
      apiData: newMovies,
      haveData: true,
      currentMovie: newMovies[num],
    })
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
        }, 2000)
      })
      .catch(error => {
        console.log(error);
      });
  }

  getMovie = () => {
    let num;
    
    if (this.state.currentIndex === (this.state.apiData.length-1)) {
      num = 0;
    } else {
      num = parseInt(this.state.currentIndex+1);
    }
    this.setState({
      currentMovie: this.state.apiData[num],
      currentIndex: num,
    })
  }

  render() {
    let currentButton;
    if (this.state.buttonView) {
      currentButton = <Button onPress={this.getMovie} title={"Change Movie!"} />
      //console.log("Movie Change!");
    } else {
      currentButton = <Button onPress={this.goForAxios} title={"SEARCH!"} />
      //console.log("Searched!");
    }

    if(this.state.haveData === false && this.state.apiData != null) {
      this.handleApiRun();
    }

    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.subTitle}>Welcome to CineSwipe!</Text>
          <Text style={styles.subTitle}>Loading......</Text>
          {this.timerLoad()}
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>

            <View style={styles.titleBox}>
              <Text style={styles.title}>{this.state.currentMovie.title}</Text>
              <Text style={styles.subTitle}>{this.state.currentMovie.year}</Text>
            </View>

            <View style={{flex:1}}>
              <Animated.View 
              {...this.PanResponder.panHandlers}
              style={[{ transform: this.position.getTranslateTransform() }, styles.main]}>
                <Image style={styles.mainImage} 
                source={{uri: `${this.state.currentMovie.posterURLs.original}`}} />
              </Animated.View>
            </View>

            <View style={styles.infoBox}>
              {currentButton}
            </View>

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
    flex: 1,
    width: (SCREEN_WIDTH - 20),
    height: (SCREEN_HEIGHT - 150),
    padding: 10,
  },
  text: {
    height: 40,
    fontSize: 20,
    fontFamily: 'Courier'
  },
  infoBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 410,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    marginBottom: 5,
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
    width: 410,
    height: 100,
    borderRadius: 20,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'white',
  },
  mainImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  }
});