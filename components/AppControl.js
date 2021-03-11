import React from 'react';
import axios from 'axios';
import config from './../config.js';
import DescriptionBox from './DescriptionBox.js';
import TitleBox from './TitleBox.js';
import FlipCard from 'react-native-flip-card';
import FilmList from './FilmList.js';
import Search from './Search.js';
import NavBar from './NavBar.js';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';

import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const genres = {
  "biography" : "1",
  "music" : "10402",
  "romance" : "10749",
  "family" : "10751",
  "war" : "10752",
  "news" : "10763",
  "reality" : "10764",
  "talkShow" : "10767",
  "adventure" : "12",
  "fantasy" : "14",
  "animation" : "16",
  "drama" : "18",
  "filmNoir" : "2",
  "horror" : "27",
  "action" : "28",
  "gameShow" : "3",
  "comedy" : "35",
  "history" : "36",
  "western" : "37",
  "musical" : "4",
  "sport" : "5",
  "thriller" : "53",
  "short" : "6",
  "crime" : "80",
  "scienceFiction" : "878",
  "mystery" : "9648",
  "documentary" : "99",
}
const popGenres = ["romance", "war", "adventure", "drama", "horror", "action", "comedy", "history", "sport", "thriller", "crime", "scienceFiction", "documentary"];

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
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 3, 0, SCREEN_WIDTH / 3],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    })

    //FOR APP_CONTROL
    this.state = {
      initialLoad: true,
      currentIndex: 0,
      currentPage: 'LOAD',
      haveData: false,
      apiData: null,
      movieData: [],
      likedMovies: [],
      searchParametersService: [],
      searchParametersGenre: [],
      pastSearches: [],
    };
  }  
//LOADING SCREEN
  timerLoad = () => {
    setTimeout(() => {
      this.setState({ currentPage: 'SEARCH' });
    }, 2000);
    console.log("LOADED");
  }

//API METHODS
  componentDidMount() {
    this.goForAxios();
  }

  handleApiRun = () => {
    //Shuffle Movies
    const { apiData, movieData } = this.state
    if (apiData.results.length != 0) {
      for (let i = 0; i < apiData.results.length; i++) {
        const num = Math.floor(Math.random() * (apiData.results.length));
        if (movieData.includes(apiData.results[num])) {
          i--;
        } else {
          movieData.push(apiData.results[num]);
        }
      }
      console.log("SHUFFLED MOVIES");
      this.setState({
        movieData: movieData,
        apiData: null,
        haveData: true,
      })
    } else {
      this.handleChangeBack();
    }
  }

  goForAxios = () => {
    console.log("SUPER Searched!");
    
    if(this.state.searchParametersService.length === 0 || this.state.searchParametersGenre.length === 0){
      if (this.state.initialLoad) {
        this.setState({
          initialLoad: false,
        })
      } else {
        alert("You Need to select at least one search parameter in each category to get your movies!");
      }
    } else {
      this.setState({
        haveData: false,
      });
      const { pastSearches } = this.state;
      const service = this.state.searchParametersService[Math.floor(Math.random() * this.state.searchParametersService.length)];
      const genreName = this.state.searchParametersGenre[Math.floor(Math.random() * this.state.searchParametersGenre.length)];
      const num = (popGenres.includes(genreName) ? 125 : 20 );
      const page = Math.floor(Math.random() * num);
      const genre = genres[genreName];
      let newSearch = { service: service, genre: genre, page: page };

      if (pastSearches.length != 0) {
        if (pastSearches.includes(newSearch)) {
          let newNum = 0;
          while(newNum === page) {
            newNum = Math.floor(Math.random() * num);
          }
          newSearch = { service: service, genre: genre, page: newNum };
          this.setState({
            pastSearches: pastSearches.push(newSearch),
          })
          page = newNum;
        }
      }
      console.log(newSearch);
      console.log('GETTING DATA FROM AXIOS');
      // axios.get(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=movie&genre=${genre}&page=${page}&language=en`, 
      // {
      //   "method": "GET",
      //   "headers": {
      //     "x-rapidapi-key": `${config.REACT_APP_API_KEY}`,
      //     "x-rapidapi-host": `${config.REACT_APP_API_HOST}`
      //   }
      // })
      // .then(response => {
      //   console.log('GETTING DATA FROM AXIOS');
      //   setTimeout(() => {
      //       this.setState({
      //           apiData: response.data,
      //       })
      //     }, 2000)
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    }

  }

  handleNewSearch = () => {
    setTimeout(() => {
      this.handleApiRun();
    }, 2000);
  }

  addLikedMovie = () => {
    let { likedMovies } = this.state;
    likedMovies.push(this.state.movieData[this.state.currentIndex]);
    this.setState({
      likedMovies: likedMovies,
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
        if (gestureState.dx > 150) {
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            if ((parseInt(this.state.currentIndex) + 1) === this.state.movieData.length) { 
              this.setState({
                haveData: false,
              })
              this.goForAxios();
              if (this.state.apiData != null) {
                this.handleNewSearch(); 
              } 
            }
            this.addLikedMovie();
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            console.log("Movie Liked!");
          })
        }
        else if (gestureState.dx < -150) {
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            this.setState({ currentIndex: this.state.currentIndex + 1, }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
            console.log("Movie Disliked!");
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
    if(this.state.movieData.length === 0) {
      return (
        <Text>Loading</Text>
      )
    } else {
      return(this.state.movieData.map((currentMovie, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i === this.state.currentIndex) {
          return (
            <Animated.View 
            {...this.PanResponder.panHandlers}
            key={i} style={[this.rotateAndTranslate, styles.main]}>

              <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], backgroundColor: 'green', position: 'absolute', top: 50, left: 40, zIndex: 1000, borderRadius: 40 }}>
                <Text style={styles.likeText}>YAY</Text>
              </Animated.View>

              <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], backgroundColor: 'red', position: 'absolute', top: 50, right: 40, zIndex: 1000, borderRadius: 40 }}>
                <Text style={styles.likeText}>NAY</Text>
              </Animated.View>

              <FlipCard 
              friction={9}
              perspective={1500}
              flipHorizontal={true}
              flipVertical={false}
              flip={false}>

                {/* Face Side */}
                <View style={styles.mainCard}>
                  <TitleBox currentMovie={currentMovie}/>
                  <Image style={styles.mainImage} 
                  source={{uri: `${currentMovie.posterURLs.original}`}} />
                </View>

                {/* Back Side */}
                <DescriptionBox currentMovie={currentMovie}/>

              </FlipCard>
            </Animated.View>
          )
        } else {
          return (
            <Animated.View 
            {...this.PanResponder.panHandlers}
            key={i} style={[{opacity: this.nextCardOpacity}, {transform: [{ scale: this.nextCardScale }],}, styles.main]}>

            <FlipCard 
            friction={9}
            perspective={1500}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}>

              {/* Face Side */}
              <View style={styles.mainCard}>
                <TitleBox currentMovie={currentMovie}/>
                <Image style={styles.mainImage} 
                source={{uri: `${currentMovie.posterURLs.original}`}} />
              </View>

              {/* Back Side */}
              <DescriptionBox currentMovie={currentMovie}/>

            </FlipCard>
          </Animated.View>
          )
        }
      })).reverse()
    }
  }

//CHANGE PAGES
  handleChangeToSearch = () => {
    this.setState({
      currentPage: 'SEARCH',
    });
  }

  handleChangeToList = () => {
    this.setState({
      currentPage: 'LIST',
    });
  }

  handleChangeBack = () => {
    if (this.state.haveData === false) {
      this.goForAxios(); 
      if (this.state.apiData != null) {
        this.handleNewSearch(); 
      }
    }
    this.setState({
      currentPage: 'MAIN',
    });
  }

  handleChangeHaveData = () => {
    this.setState({
      haveData: true,
    });
  }

  handleChangeSearchParam = (parameter, ifAdd) => {
    const services = ["netflix", "prime", "disney", "hbo", "hulu", "peacock", "paramount", "starz", "showtime"];

    if (services.includes(parameter)) {
      let { searchParametersService } = this.state;
      if (ifAdd) {
        searchParametersService.push(parameter);
      } else {
        searchParametersService = searchParametersService.filter(val => val != parameter);
      }
      this.setState({
        searchParametersService: searchParametersService,
      })
    } else {
      let { searchParametersGenre } = this.state;
      if (ifAdd) {
        searchParametersGenre.push(parameter);
      } else {
        searchParametersGenre = searchParametersGenre.filter(val => val != parameter);
      }
      this.setState({
        searchParametersGenre: searchParametersGenre,
      })
    }
    console.log("Changed param! " + parameter + " " + ifAdd);
  }

  render() {
    let currentView;

    if (this.state.haveData === false && this.state.apiData != null) {
      this.handleApiRun();
    }

    if (this.state.currentPage === 'SEARCH') {
      currentView = <Search pageLoad={this.state.initialLoad} changeParam={this.handleChangeSearchParam} paramLists={[this.state.searchParametersService, this.state.searchParametersGenre]}/>;
    } else if (this.state.currentPage === 'LIST') {
      currentView = <FilmList movies={this.state.likedMovies} />;
    } else if (this.state.currentIndex === this.state.movieData.length) {
      if (this.state.haveData){
        currentView = (
          <View style={{flex:1}}>
            {this.renderPictures()}
          </View>
        );
      } else {
        currentView = (
          <View style={styles.wait}>
            <Text style={styles.waitText}>Getting Your Movies!</Text>
            <ActivityIndicator animating={true} color={"#FF7D0D"} size={'large'} style={{margin: 10}}/>
            <Text style={styles.waitTextSmall}>Hint:</Text>
            <Text style={styles.waitTextSmall}>Remember to select some search</Text>
            <Text style={styles.waitTextSmall}>options on the "search" page!</Text>
          </View>
        )
      }
    } else if (this.state.haveData){
      currentView = (
        <View style={{flex:1}}>
          {this.renderPictures()}
        </View>
      );
    }

    if (this.state.currentPage === 'LOAD') {
      return (
        <SafeAreaView style={styles.containerLoad}>
          <View style={styles.loadMain}>
            <Image style={styles.loadImage} source={require('./../assets/LoadGif.gif')} />
            <ProgressBar progress={1} color={"#FF7D0D"} indeterminate={true}/>
          </View>
          {this.timerLoad()}
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>
            {currentView}
            <NavBar toList={this.handleChangeToList} toSearch={this.handleChangeToSearch} changeBack={this.handleChangeBack}/>
        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: '#2C3432',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#71AFA9',
  },
  loadImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  loadMain: {
    width: (SCREEN_WIDTH),
    height: (SCREEN_HEIGHT - 90),
    padding: 10,
    position: 'absolute',
  },
  text: {
    height: 40,
    fontSize: 20,
    fontFamily: 'Courier'
  },
  main: {
    width: (SCREEN_WIDTH),
    height: (SCREEN_HEIGHT - 90),
    padding: 10,
    position: 'absolute',
  },
  mainImage: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  mainCard: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
    backgroundColor: 'black',
  },
  likeText: {
    color: 'black', 
    fontSize: 32, 
    fontWeight: '800', 
    padding: 10,
    fontFamily: 'Courier',
  },
  waitText: {
    fontSize: 30,
    fontWeight: "500",
    fontFamily: 'Courier'
  },
  waitTextSmall: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: 'Courier'
  },
  wait: {
    flex: 1,
    backgroundColor: '#71AFA9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  }
});