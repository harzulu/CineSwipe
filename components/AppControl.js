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
    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      transform: [{
        rotate: this.rotate
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    this.dislikeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp',
    })

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

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
      likedMovies: [],
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
  componentDidMount() {
    this.goForAxios();
  }

  handleApiRun = () => {
    const newMovies = MovieShuffle(this.state.apiData.results);
    console.log("SHUFFLED MOVIES");
    let pictures = []
    for (let i = 0; i < newMovies.length; i++ ) {
      pictures.push({id: i, picture: newMovies[i].posterURLs.original})
    }
    this.setState({
      apiData: newMovies,
      haveData: true,
      currentMovie: newMovies[0],
      moviePictures: pictures,
      currentIndex: 0,
    })
  }

  goForAxios = () => {
    console.log("SUPER Searched!");
    const service = "hulu"
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
    if (this.state.apiData === null) {
      console.log("EMPTY");
    } else {
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
  }

//ANIMATION METHODS
  UNSAFE_componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 150) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.getMovie();
          })
        }
        else if (gestureState.dx < -150) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            this.getMovie();
          })
        }
        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 6,
            useNativeDriver: true,
          }).start()
        }
      }
    })
  }

  renderPictures = () => {
    let imageUrl, idNum;

    if (this.state.moviePictures.length === 0) {
      imageUrl = 'https://picsum.photos/400/700';
      idNum = 0;
    } else {
      imageUrl = this.state.moviePictures[this.state.currentIndex].picture;
      idNum = this.state.moviePictures[this.state.currentIndex].id;
    }
    return (
      <Animated.View 
      {...this.PanResponder.panHandlers}
      key={idNum} style={[this.rotateAndTranslate, styles.main]}>

        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <Text style={styles.likeText}>LIKE</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <Text style={styles.dislikeText}>NOPE</Text>
        </Animated.View>

        <Image style={styles.mainImage} 
        source={{uri: `${imageUrl}`}} />
      </Animated.View>
    )
  }

  render() {
    if(this.state.haveData === false && this.state.apiData != null) {
      this.handleApiRun();
    }

    if (this.state.loading) {
      return (
        <SafeAreaView style={styles.containerLoad}>
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
              {this.renderPictures()}
            </View>
            {/*ANIMATION CARD*/}

            <DescriptionBox apiCall={() => this.goForAxios()} description={this.state.currentMovie.overview}/>

        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: 'salmon',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'salmon',
  },
  text: {
    height: 40,
    fontSize: 20,
    fontFamily: 'Courier'
  },
  main: {
    width: (SCREEN_WIDTH),
    height: (SCREEN_HEIGHT - 200),
    padding: 10,
    position: 'absolute',
  },
  mainImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  likeText: {
    borderWidth: 1, 
    borderColor: 'green', 
    color: 'green', 
    fontSize: 32, 
    fontWeight: '800', 
    padding: 10
  },
  dislikeText: {
    borderWidth: 1, 
    borderColor: 'red', 
    color: 'red', 
    fontSize: 32, 
    fontWeight: '800', 
    padding: 10
  }
});