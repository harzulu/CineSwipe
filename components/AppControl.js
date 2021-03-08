import React from 'react';
import axios from 'axios';
import config from './../config.js';
import MovieShuffle from './MovieShuffle.js';
import DescriptionBox from './DescriptionBox.js';
import TitleBox from './TitleBox.js';

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

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export default class AppControl extends React.Component {
  constructor(props) {
    super(props);
    //FOR ANIMATION
    this.position = new Animated.ValueXY();
    //FOR APP_CONTROL
    this.state = {
      currentIndex: 0,
      loading: true,
      buttonView: false,
      haveData: false,
      apiData: null,
      moviePictures: [],
      currentMovie: {
        title: "N/A",
        type: "movie",
        year: "2021",
        imdbID: "ff0000000",
        imdbRating: "0",
        overview: "NONE",
      },
    };
  }  
//LOADING SCREEN
  timerLoad = () => {
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    console.log("LOADED");
  }
//API METHODS
  handleApiRun = () => {
    const newMovies = MovieShuffle(this.state.apiData.results);
    const num = parseInt(this.state.currentIndex);
    console.log("SHUFFLED MOVIES");
    let pictures = []
    for (let i = 0; i < newMovies.length; i++ ) {
      pictures.push({id: i, picture: newMovies[i].posterURLs.original})
    }
    this.setState({
      apiData: newMovies,
      haveData: true,
      currentMovie: newMovies[num],
      moviePictures: pictures,
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
      console.log('GETTING DATA FROM AXIOS');
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
//CHANGE CURRENT MOVIE
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

//ANIMATION METHODS
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

  render() {
    if(this.state.haveData === false && this.state.apiData != null) {
      this.handleApiRun();
    }

    let picture;
    if (this.state.moviePictures.length === 0) {
      picture = 'https://picsum.photos/400/700';
    } else {
      picture = this.state.moviePictures[this.state.currentIndex].picture;
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

            <TitleBox currentMovie={this.state.currentMovie}/>

            {/*ANIMATION CARD*/}
            <View style={{flex:1}}>
              <Animated.View 
              {...this.PanResponder.panHandlers}
              style={[{ transform: this.position.getTranslateTransform() }, styles.main]}>
                <Image style={styles.mainImage} 
                source={{uri: `${picture}`}} />
              </Animated.View>
            </View>
            {/*ANIMATION CARD*/}

            <DescriptionBox apiCall={() => this.goForAxios()} changeMovie={() => this.getMovie()} description={this.state.currentMovie.overview}/>

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
  text: {
    height: 40,
    fontSize: 20,
    fontFamily: 'Courier'
  },
  main: {
    flex: 1,
    width: (SCREEN_WIDTH - 20),
    height: (SCREEN_HEIGHT - 150),
    padding: 10,
  },
  mainImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  }
});