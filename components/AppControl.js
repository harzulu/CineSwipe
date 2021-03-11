import React from 'react';
import axios from 'axios';
import config from './../config.js';
import FlipCard from 'react-native-flip-card';
import { ActivityIndicator, ProgressBar } from 'react-native-paper';
import DescriptionBox from './DescriptionBox.js';
import TitleBox from './TitleBox.js';
import FilmList from './FilmList.js';
import Search from './Search.js';
import NavBar from './NavBar.js';

import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Image, 
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
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
      currentPage: 'LOAD',
      haveData: false,
      apiData: null,
      pageMax: "0",
      movieData: [],
      currentIndex: 0,
      likedMovies: [],
      searchParametersService: [],
      searchParametersGenre: [],
      pastSearches: [],
      lastCall: {
        service: 'netflix',
        genre: '18',
        page: '1',
      },
    };
  }  
//INITIAL LOADING SCREEN
  timerLoad = () => {
    setTimeout(() => {
      this.setState({ currentPage: 'INTRO' });
    }, 2500);
    console.log("LOADED");
  }

//API METHODS
  handleShuffleApiData = () => {
    //Shuffle apiData to movieData
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
      this.setState({
        movieData: movieData,
        apiData: null,
        haveData: true,
        
      })
    } else {
      // if second call was still empty data, try new call with completely different search parameters from user selected list
      console.log("Empty return");
      console.log(apiData);
      this.handleApiPrep();
    }
  }

  handleApiPrep = () => {
    // Randomize the search parameters to be from only the user selected options    
    if(this.state.searchParametersService.length === 0 || this.state.searchParametersGenre.length === 0){
      alert("You Need to select at least one search parameter in each category to get your movies!");
    } else {

      this.setState({
        haveData: false,
      });

      let service = this.state.searchParametersService[Math.floor(Math.random() * this.state.searchParametersService.length)];
      const genreName = this.state.searchParametersGenre[Math.floor(Math.random() * this.state.searchParametersGenre.length)];
      let genre = genres[genreName];
      let newSearch = { service: service, genre: genre, page: "1000" };

      // Make initial API call with page number at 1000 to get blank return with the total number on pages to save that number,
      // to make a new call with a random number within 0 and that max page number.
      this.goForAxios(newSearch);

      setTimeout(() => {
        // Wait to finish getting and assigning response to apiData,
        // to then re-call with page number between 0 and page max
        newSearch.page = (Math.floor(Math.random() * this.state.apiData.total_pages)).toString();
        this.goForAxios(newSearch);
        setTimeout(() => {
          // Wait for second api call to finish to shuffle returned data
          this.handleShuffleApiData();
        }, 5000)
      }, 3000)

    }
  }

  goForAxios = (callObj) => {
    console.log("||==================================||");
    const service = callObj.service;
    const genre = callObj.genre;
    const page = (callObj.page === "0" ? "1" : callObj.page);
    
      axios.get(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=movie&genre=${genre}&page=${page}&language=en`, 
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
            console.log("Done with call");
            this.setState({
                apiData: response.data,
            })
          }, 2000)
        })
        .catch(error => {
          console.log(error);
        });
    }

  addLikedMovie = () => {
    // take current movie and add it to the 'likedMovies' list
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
        // set card x and y position to the touch location
        this.position.setValue({ x: gestureState.dx, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        // when the user lets go if the card:
        if (gestureState.dx > 150) {
          // if the card is to the right, it is a like.
          // if it is the last card, make a new api call,
          // else: add this card to the likedMovies list, set index to + 1
          Animated.spring(this.position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            if ((parseInt(this.state.currentIndex) + 1) >= this.state.movieData.length) { 
              this.setState({
                haveData: false,
              })
              this.handleApiPrep();
            }
            this.addLikedMovie();
            this.setState({ currentIndex: this.state.currentIndex + 1 }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else if (gestureState.dx < -150) {
          // if the card is to the left, it is a dislike.
          // if it is the last card, make a new api call,
          // else: continue on.
          Animated.spring(this.position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
            useNativeDriver: true,
          }).start(() => {
            if ((parseInt(this.state.currentIndex) + 1) >= this.state.movieData.length) { 
              this.setState({
                haveData: false,
              })
              this.handleApiPrep();
            }
            this.setState({ currentIndex: this.state.currentIndex + 1, }, () => {
              this.position.setValue({ x: 0, y: 0 })
            })
          })
        }
        else {
          // if the card is still close to the center have it spring back to the center position
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
      // Render all of the movie cards stacked to the next card will show behind
      return(this.state.movieData.map((currentMovie, i) => {
        if (i < this.state.currentIndex) {
          return null;
        } else if (i === this.state.currentIndex) {
          // return top card
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
          // return a "behind" card
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

  handleChangeBack = (ifIntro) => {
    if (ifIntro) {
      //if coming from instruction page, don't make api call
      this.setState({
        currentPage: 'MAIN',
      });
    } else {
      if (this.state.haveData === false) {
        this.handleApiPrep(); 
      }
      this.setState({
        currentPage: 'MAIN',
      });
    }
  }
// CHANGE SELECTED SEARCH PARAMETERS
  handleChangeSearchParam = (parameter, ifAdd) => {
    const services = ["netflix", "prime", "disney", "hbo", "hulu", "peacock", "paramount", "starz", "showtime"];

    if (services.includes(parameter)) {
      // if parameter is a service
      let { searchParametersService } = this.state;
      if (ifAdd) {
        // if the parameter needs to get added
        searchParametersService.push(parameter);
      } else {
        // if the parameter needs to get removed from the list
        searchParametersService = searchParametersService.filter(val => val != parameter);
      }
      this.setState({
        searchParametersService: searchParametersService,
      })
    } else {
      // if parameter is a genre
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
  }
// MAIN RENDER
  render() {
    let currentView;

    if (this.state.currentPage === 'SEARCH') {
      // page of search parameters
      currentView = <Search pageLoad={this.state.initialLoad} changeParam={this.handleChangeSearchParam} paramLists={[this.state.searchParametersService, this.state.searchParametersGenre]}/>;
    } else if (this.state.currentPage === 'LIST') {
      // page of liked movies
      currentView = <FilmList movies={this.state.likedMovies} />;
    } else if (this.state.currentPage === 'INTRO') {
      // instructions page
      return (
        <View style={{flex: 1, backgroundColor: 'rgb(142,199,250)'}}>
          <ImageBackground source={require('../assets/Intro.jpg')} style={{width: 413, height: 710}} />
          <NavBar intro={true} toList={this.handleChangeToList} toSearch={this.handleChangeToSearch} changeBack={this.handleChangeBack} />
        </View>
      );
    } else if (this.state.currentIndex === this.state.movieData.length) {
      if (this.state.haveData){
        // regular main cards page
        currentView = (
          <View style={{flex:1}}>
            {this.renderPictures()}
          </View>
        );
      } else {
        // loading animation on main page
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
      // initial loading page, then call timer method to wait and change 'currentPage'
      return (
        <View style={{flex: 1, backgroundColor: 'rgb(255,123,15)'}}>
          <ImageBackground style={{width: 414, height: 712}} source={require('./../assets/LoadGif.gif')} />
          <ProgressBar progress={1} color={'rgb(142,199,250)'} indeterminate={true} style={{marginBottom: 20}}/>
          {this.timerLoad()}
        </View>
      )
    } else {
      // normal main view with nav bar always at bottom
      return (
        <SafeAreaView style={styles.container}>
            {currentView}
            <NavBar intro={false} toList={this.handleChangeToList} toSearch={this.handleChangeToSearch} changeBack={this.handleChangeBack}/>
        </SafeAreaView>
      )
    }
  }
}
// ALL STYLES
const styles = StyleSheet.create({
  containerLoad: {
    flex: 1,
    backgroundColor: 'rgb(142,199,250)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(142,199,250)',
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
    backgroundColor: 'rgb(142,199,250)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  }
});