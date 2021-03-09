import React from 'react';
import axios from 'axios';
import config from './../config.js';
import DescriptionBox from './DescriptionBox.js';
import TitleBox from './TitleBox.js';
import FlipCard from 'react-native-flip-card'

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
  TouchableOpacity,
} from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

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
    //Shuffle Movies
    const { apiData } = this.state
    let newMovies = [];
    let pictures = []
    for (let i = 0; i < apiData.results.length; i++) {
      const num = Math.floor(Math.random() * (apiData.results.length));
      if (newMovies.includes(apiData.results[num])) {
        i--;
      } else {
        newMovies.push(apiData.results[num]);
        pictures.push({id: i, picture: apiData.results[num].posterURLs.original})
      }
    }
    console.log("SHUFFLED MOVIES");
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
    // const service = "hulu"
    // const type = "movie"
    // const genre = "18"
    const page = Math.floor(Math.random() * 150);// 1 through 150
    console.log("Page number" + page);

    console.log('GETTING DATA FROM AXIOS');
      setTimeout(() => {
          this.setState({
              apiData: {"results":[{"imdbID":"tt0061512","tmdbID":"903","imdbRating":81,"imdbVoteCount":162909,"tmdbRating":78,"backdropPath":"/syGjgODx7pJb4tF1ipwTwrRdJxm.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/syGjgODx7pJb4tF1ipwTwrRdJxm.jpg","300":"https://image.tmdb.org/t/p/w300/syGjgODx7pJb4tF1ipwTwrRdJxm.jpg","780":"https://image.tmdb.org/t/p/w780/syGjgODx7pJb4tF1ipwTwrRdJxm.jpg","original":"https://image.tmdb.org/t/p/original/syGjgODx7pJb4tF1ipwTwrRdJxm.jpg"},"originalTitle":"Cool Hand Luke","genres":[80,18],"countries":["US"],"year":1967,"runtime":127,"cast":["Paul Newman","George Kennedy","Luke Askew","Morgan Woodward","Harry Dean Stanton","Dennis Hopper","Lou Antonio"],"significants":["Stuart Rosenberg"],"title":"Cool Hand Luke","overview":"When petty criminal Luke Jackson is sentenced to two years in a Florida prison farm, he doesn't play by the rules of either the sadistic warden or the yard's resident heavy, Dragline, who ends up admiring the new guy's unbreakable will. Luke's bravado, even in the face of repeated stints in the prison's dreaded solitary confinement cell, \"the box,\" make him a rebel hero to his fellow convicts and a thorn in the side of the prison officers.","tagline":"What we've got here is failure to communicate.","video":"CDWJmrt-5I4","posterPath":"/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","185":"https://image.tmdb.org/t/p/w185/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","342":"https://image.tmdb.org/t/p/w342/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","500":"https://image.tmdb.org/t/p/w500/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","780":"https://image.tmdb.org/t/p/w780/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","92":"https://image.tmdb.org/t/p/w92/sqelBKOEdYruo497Jx6SAC3jBMY.jpg","original":"https://image.tmdb.org/t/p/original/sqelBKOEdYruo497Jx6SAC3jBMY.jpg"},"age":13,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/397323/","added":1609561370,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt13322484","tmdbID":"776979","imdbRating":69,"imdbVoteCount":431,"tmdbRating":67,"backdropPath":"/SO6e7bLmkPY6RY1q8xK5lVVUYm.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/SO6e7bLmkPY6RY1q8xK5lVVUYm.jpg","300":"https://image.tmdb.org/t/p/w300/SO6e7bLmkPY6RY1q8xK5lVVUYm.jpg","780":"https://image.tmdb.org/t/p/w780/SO6e7bLmkPY6RY1q8xK5lVVUYm.jpg","original":"https://image.tmdb.org/t/p/original/SO6e7bLmkPY6RY1q8xK5lVVUYm.jpg"},"originalTitle":"Cops and Robbers","genres":[16,6,18],"countries":["US"],"year":2020,"runtime":7,"cast":["Timothy Ware-Hill"],"significants":["Arnon Manor","Timothy Ware-Hill"],"title":"Cops and Robbers","overview":"Animation and activism unite in this multimedia spoken-word response to police brutality and racial injustice.","tagline":"Our cries of injustice are yelled into a void","video":"MKQbQd_cbmI","posterPath":"/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","185":"https://image.tmdb.org/t/p/w185/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","342":"https://image.tmdb.org/t/p/w342/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","500":"https://image.tmdb.org/t/p/w500/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","780":"https://image.tmdb.org/t/p/w780/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","92":"https://image.tmdb.org/t/p/w92/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg","original":"https://image.tmdb.org/t/p/original/wzvLbFgo4dv9KxkE9FLoMxygWDd.jpg"},"age":14,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/81354555/","added":1609295576,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt1570728","tmdbID":"50646","imdbRating":74,"imdbVoteCount":475168,"tmdbRating":72,"backdropPath":"/ym8ltC5YqYFyclMfdYvtwukplfQ.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/ym8ltC5YqYFyclMfdYvtwukplfQ.jpg","300":"https://image.tmdb.org/t/p/w300/ym8ltC5YqYFyclMfdYvtwukplfQ.jpg","780":"https://image.tmdb.org/t/p/w780/ym8ltC5YqYFyclMfdYvtwukplfQ.jpg","original":"https://image.tmdb.org/t/p/original/ym8ltC5YqYFyclMfdYvtwukplfQ.jpg"},"originalTitle":"Crazy, Stupid, Love.","genres":[35,18,10749],"countries":["US"],"year":2011,"runtime":118,"cast":["Steve Carell","Julianne Moore","Emma Stone","Ryan Gosling","Marisa Tomei","Kevin Bacon","Analeigh Tipton"],"significants":["Glenn Ficarra","John Requa"],"title":"Crazy, Stupid, Love.","overview":"Cal Weaver is living the American dream. He has a good job, a beautiful house, great children and a beautiful wife, named Emily. Cal's seemingly perfect life unravels, however, when he learns that Emily has been unfaithful and wants a divorce. Over 40 and suddenly single, Cal is adrift in the fickle world of dating. Enter, Jacob Palmer, a self-styled player who takes Cal under his wing and teaches him how to be a hit with the ladies.","tagline":"This is crazy. This is stupid. This is love.","video":"flvz5RMRx7E","posterPath":"/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","185":"https://image.tmdb.org/t/p/w185/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","342":"https://image.tmdb.org/t/p/w342/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","500":"https://image.tmdb.org/t/p/w500/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","780":"https://image.tmdb.org/t/p/w780/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","92":"https://image.tmdb.org/t/p/w92/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg","original":"https://image.tmdb.org/t/p/original/coKTdJdnl3XcxWY9ofyfkf05rYP.jpg"},"age":11,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/70167068/","added":1614632896,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt2652118","tmdbID":"263341","imdbRating":61,"imdbVoteCount":18002,"tmdbRating":60,"backdropPath":"/k6fkif9weBS3uINEaPiq78cbmPO.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/k6fkif9weBS3uINEaPiq78cbmPO.jpg","300":"https://image.tmdb.org/t/p/w300/k6fkif9weBS3uINEaPiq78cbmPO.jpg","780":"https://image.tmdb.org/t/p/w780/k6fkif9weBS3uINEaPiq78cbmPO.jpg","original":"https://image.tmdb.org/t/p/original/k6fkif9weBS3uINEaPiq78cbmPO.jpg"},"originalTitle":"Crouching Tiger, Hidden Dragon: Sword of Destiny","genres":[28,12,18,14],"countries":["CN"],"year":2016,"runtime":103,"cast":["Michelle Yeoh","Donnie Yen","Jason Scott Lee","Natasha Liu Bordizzo","Harry Shum Jr.","Eugenia Yuan","Roger Yuan"],"significants":["Yuen Woo-ping"],"title":"Crouching Tiger, Hidden Dragon: Sword of Destiny","overview":"A story of lost love, young love, a legendary sword and one last opportunity at redemption.","tagline":"The past returns with a vengeance.","video":"WdhvxJZDqzU","posterPath":"/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","185":"https://image.tmdb.org/t/p/w185/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","342":"https://image.tmdb.org/t/p/w342/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","500":"https://image.tmdb.org/t/p/w500/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","780":"https://image.tmdb.org/t/p/w780/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","92":"https://image.tmdb.org/t/p/w92/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg","original":"https://image.tmdb.org/t/p/original/te3aeAyhkfqgpa5BSTq3oNxGqQD.jpg"},"age":14,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80039717/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt1661820","tmdbID":"276902","imdbRating":61,"imdbVoteCount":11356,"tmdbRating":58,"backdropPath":"/hC40extLAy0XlchiWHbW5ozilxZ.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/hC40extLAy0XlchiWHbW5ozilxZ.jpg","300":"https://image.tmdb.org/t/p/w300/hC40extLAy0XlchiWHbW5ozilxZ.jpg","780":"https://image.tmdb.org/t/p/w780/hC40extLAy0XlchiWHbW5ozilxZ.jpg","original":"https://image.tmdb.org/t/p/original/hC40extLAy0XlchiWHbW5ozilxZ.jpg"},"originalTitle":"Cut Bank","genres":[80,18,53],"countries":["US"],"year":2014,"runtime":92,"cast":["Liam Hemsworth","Teresa Palmer","John Malkovich","Bruce Dern","Billy Bob Thornton","Michael Stuhlbarg","Oliver Platt"],"significants":["Matt Shakman"],"title":"Cut Bank","overview":"25-year-old Dwayne McLaren, a former athlete turned auto mechanic, dreams of getting out of tiny Cut Bank, Montana the coldest town in America. But his effort to do so sets in motion a deadly series of events that change his life and the life of the town forever...","tagline":"Good Folks. Bad Deeds.","video":"uvavIfjTDaE","posterPath":"/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","185":"https://image.tmdb.org/t/p/w185/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","342":"https://image.tmdb.org/t/p/w342/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","500":"https://image.tmdb.org/t/p/w500/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","780":"https://image.tmdb.org/t/p/w780/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","92":"https://image.tmdb.org/t/p/w92/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg","original":"https://image.tmdb.org/t/p/original/hP5N3R8qqe7JT4N3esgh23GOpCN.jpg"},"age":16,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80011622/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt3547306","tmdbID":"493065","imdbRating":49,"imdbVoteCount":1627,"tmdbRating":67,"backdropPath":"/mbvP37gpODCkaCcYkdwK0FFnFKv.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/mbvP37gpODCkaCcYkdwK0FFnFKv.jpg","300":"https://image.tmdb.org/t/p/w300/mbvP37gpODCkaCcYkdwK0FFnFKv.jpg","780":"https://image.tmdb.org/t/p/w780/mbvP37gpODCkaCcYkdwK0FFnFKv.jpg","original":"https://image.tmdb.org/t/p/original/mbvP37gpODCkaCcYkdwK0FFnFKv.jpg"},"originalTitle":"Cut Throat City","genres":[28,80,18,53],"countries":["US"],"year":2020,"runtime":123,"cast":["Terrence Howard","Wesley Snipes","T.I.","Eiza González","Shameik Moore","Demetrius Shipp Jr.","Joel David Moore"],"significants":["RZA"],"title":"Cut Throat City","overview":"Four boyhood friends return to New Orleans’ Lower Ninth Ward after Hurricane Katrina, to find their home decimated and prospects for work swept away. Turning to a local gangster for employment, the crew is hired to pull off a daring casino heist, right in the heart of the city.","tagline":"Desperate times. Dangerous measures.","video":"87r31Z_d4LQ","posterPath":"/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","185":"https://image.tmdb.org/t/p/w185/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","342":"https://image.tmdb.org/t/p/w342/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","500":"https://image.tmdb.org/t/p/w500/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","780":"https://image.tmdb.org/t/p/w780/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","92":"https://image.tmdb.org/t/p/w92/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg","original":"https://image.tmdb.org/t/p/original/a2Dcje3NkmySevZo5hVCfPaxqdL.jpg"},"age":17,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80202711/","added":1611446289,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt9777644","tmdbID":"581859","imdbRating":65,"imdbVoteCount":40729,"tmdbRating":66,"backdropPath":"/Aq5Zhj9iaTF6BEKNk05dlUxeHKa.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/Aq5Zhj9iaTF6BEKNk05dlUxeHKa.jpg","300":"https://image.tmdb.org/t/p/w300/Aq5Zhj9iaTF6BEKNk05dlUxeHKa.jpg","780":"https://image.tmdb.org/t/p/w780/Aq5Zhj9iaTF6BEKNk05dlUxeHKa.jpg","original":"https://image.tmdb.org/t/p/original/Aq5Zhj9iaTF6BEKNk05dlUxeHKa.jpg"},"originalTitle":"Da 5 Bloods","genres":[12,18,10752],"countries":["US"],"year":2020,"runtime":156,"cast":["Delroy Lindo","Jonathan Majors","Clarke Peters","Norm Lewis","Isiah Whitlock Jr.","Mélanie Thierry","Paul Walter Hauser"],"significants":["Spike Lee"],"title":"Da 5 Bloods","overview":"Four African-American Vietnam veterans return to Vietnam. They are in search of the remains of their fallen squad leader and the promise of buried treasure. These heroes battle forces of humanity and nature while confronted by the lasting ravages of the immorality of the Vietnam War.","tagline":"A War Never Ends","video":"D5RDTPfsLAI","posterPath":"/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","185":"https://image.tmdb.org/t/p/w185/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","342":"https://image.tmdb.org/t/p/w342/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","500":"https://image.tmdb.org/t/p/w500/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","780":"https://image.tmdb.org/t/p/w780/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","92":"https://image.tmdb.org/t/p/w92/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg","original":"https://image.tmdb.org/t/p/original/yx4cp1ljJMDSFeEex0Zjv45b55E.jpg"},"age":17,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/81045635/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt5834660","tmdbID":"429765","imdbRating":70,"imdbVoteCount":1467,"tmdbRating":72,"backdropPath":"/2JTnzY6JvIDpBggRJndcNhpL8nJ.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/2JTnzY6JvIDpBggRJndcNhpL8nJ.jpg","300":"https://image.tmdb.org/t/p/w300/2JTnzY6JvIDpBggRJndcNhpL8nJ.jpg","780":"https://image.tmdb.org/t/p/w780/2JTnzY6JvIDpBggRJndcNhpL8nJ.jpg","original":"https://image.tmdb.org/t/p/original/2JTnzY6JvIDpBggRJndcNhpL8nJ.jpg"},"originalTitle":"Dance Academy: The Movie","genres":[18],"countries":["AU"],"year":2017,"runtime":101,"cast":["Xenia Goodwin","Alicia Banit","Dena Kaplan","Thomas Lacey","Keiynan Lonsdale","Jordan Rodrigues","Tara Morice"],"significants":["Jeffrey Walker"],"title":"Dance Academy: The Movie","overview":"This 2017 movie follows the original dance academy TV show and tracks where the characters are in their lives now.","tagline":"Big City. Bigger Dreams.","video":"Pxscjv1kXME","posterPath":"/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","185":"https://image.tmdb.org/t/p/w185/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","342":"https://image.tmdb.org/t/p/w342/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","500":"https://image.tmdb.org/t/p/w500/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","780":"https://image.tmdb.org/t/p/w780/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","92":"https://image.tmdb.org/t/p/w92/cZoob2n35Pxon5W0vbvE8Osgcy.jpg","original":"https://image.tmdb.org/t/p/original/cZoob2n35Pxon5W0vbvE8Osgcy.jpg"},"age":10,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80244472/","added":1600370986,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt2980516","tmdbID":"266856","imdbRating":77,"imdbVoteCount":407192,"tmdbRating":79,"backdropPath":"/jE43L9ni4OWhjwXcDlEKkVnfscW.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/jE43L9ni4OWhjwXcDlEKkVnfscW.jpg","300":"https://image.tmdb.org/t/p/w300/jE43L9ni4OWhjwXcDlEKkVnfscW.jpg","780":"https://image.tmdb.org/t/p/w780/jE43L9ni4OWhjwXcDlEKkVnfscW.jpg","original":"https://image.tmdb.org/t/p/original/jE43L9ni4OWhjwXcDlEKkVnfscW.jpg"},"originalTitle":"The Theory of Everything","genres":[1,18,10749],"countries":["GB"],"year":2014,"runtime":123,"cast":["Eddie Redmayne","Felicity Jones","Charlie Cox","Emily Watson","Simon McBurney","David Thewlis","Maxine Peake"],"significants":["James Marsh"],"title":"The Theory of Everything","overview":"The Theory of Everything is the extraordinary story of one of the world’s greatest living minds, the renowned astrophysicist Stephen Hawking, who falls deeply in love with fellow Cambridge student Jane Wilde.","tagline":"His Mind Changed Our World. Her Love Changed His.","video":"8RHU0X5CYpU","posterPath":"/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","185":"https://image.tmdb.org/t/p/w185/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","342":"https://image.tmdb.org/t/p/w342/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","500":"https://image.tmdb.org/t/p/w500/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","780":"https://image.tmdb.org/t/p/w780/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","92":"https://image.tmdb.org/t/p/w92/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg","original":"https://image.tmdb.org/t/p/original/kJuL37NTE51zVP3eG5aGMyKAIlh.jpg"},"age":8,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80000644/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt4986098","tmdbID":"476926","imdbRating":48,"imdbVoteCount":28472,"tmdbRating":54,"backdropPath":"/h45LDCoPWmFMTTb7taGhOPBIGKJ.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/h45LDCoPWmFMTTb7taGhOPBIGKJ.jpg","300":"https://image.tmdb.org/t/p/w300/h45LDCoPWmFMTTb7taGhOPBIGKJ.jpg","780":"https://image.tmdb.org/t/p/w780/h45LDCoPWmFMTTb7taGhOPBIGKJ.jpg","original":"https://image.tmdb.org/t/p/original/h45LDCoPWmFMTTb7taGhOPBIGKJ.jpg"},"originalTitle":"The Titan","genres":[18,9648,878,53],"countries":["US","GB","ES"],"year":2018,"runtime":97,"cast":["Sam Worthington","Taylor Schilling","Tom Wilkinson","Agyness Deyn","Nathalie Emmanuel","Corey Johnson","Aleksandar Jovanović"],"significants":["Lennart Ruff"],"title":"The Titan","overview":"On a bleak future Earth, a soldier endures a radical genetic transformation to save humanity. But his wife fears he's becoming more creature than man.","tagline":"Evolve or die","video":"ctM8zpe3BHo","posterPath":"/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","185":"https://image.tmdb.org/t/p/w185/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","342":"https://image.tmdb.org/t/p/w342/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","500":"https://image.tmdb.org/t/p/w500/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","780":"https://image.tmdb.org/t/p/w780/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","92":"https://image.tmdb.org/t/p/w92/qRmQazyIBZR4pQIk9VruiZul0Au.jpg","original":"https://image.tmdb.org/t/p/original/qRmQazyIBZR4pQIk9VruiZul0Au.jpg"},"age":16,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80148210/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt1070874","tmdbID":"556984","imdbRating":78,"imdbVoteCount":104592,"tmdbRating":78,"backdropPath":"/v8Nf6Y1qL1Q3PWTBezXNPPaXqza.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/v8Nf6Y1qL1Q3PWTBezXNPPaXqza.jpg","300":"https://image.tmdb.org/t/p/w300/v8Nf6Y1qL1Q3PWTBezXNPPaXqza.jpg","780":"https://image.tmdb.org/t/p/w780/v8Nf6Y1qL1Q3PWTBezXNPPaXqza.jpg","original":"https://image.tmdb.org/t/p/original/v8Nf6Y1qL1Q3PWTBezXNPPaXqza.jpg"},"originalTitle":"The Trial of the Chicago 7","genres":[18,36,53],"countries":["IN","GB","US"],"year":2020,"runtime":130,"cast":["Sacha Baron Cohen","Eddie Redmayne","Yahya Abdul-Mateen II","Jeremy Strong","Mark Rylance","Joseph Gordon-Levitt","Michael Keaton"],"significants":["Aaron Sorkin"],"title":"The Trial of the Chicago 7","overview":"What was supposed to be a peaceful protest turned into a violent clash with the police. What followed was one of the most notorious trials in history.","tagline":"In 1968, democracy refused to back down.","video":"OAaZIfeQzT0","posterPath":"/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","185":"https://image.tmdb.org/t/p/w185/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","342":"https://image.tmdb.org/t/p/w342/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","500":"https://image.tmdb.org/t/p/w500/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","780":"https://image.tmdb.org/t/p/w780/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","92":"https://image.tmdb.org/t/p/w92/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg","original":"https://image.tmdb.org/t/p/original/ahf5cVdooMAlDRiJOZQNuLqa1Is.jpg"},"age":13,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/81043755/","added":1602839214,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt1507571","tmdbID":"324562","imdbRating":59,"imdbVoteCount":2210,"tmdbRating":53,"backdropPath":"/y4tXfE2Cyvlw7BaTHxW1GnZSrO7.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/y4tXfE2Cyvlw7BaTHxW1GnZSrO7.jpg","300":"https://image.tmdb.org/t/p/w300/y4tXfE2Cyvlw7BaTHxW1GnZSrO7.jpg","780":"https://image.tmdb.org/t/p/w780/y4tXfE2Cyvlw7BaTHxW1GnZSrO7.jpg","original":"https://image.tmdb.org/t/p/original/y4tXfE2Cyvlw7BaTHxW1GnZSrO7.jpg"},"originalTitle":"The Tribes of Palos Verdes","genres":[18],"countries":[],"year":2017,"runtime":104,"cast":["Maika Monroe","Jennifer Garner","Cody Fern","Justin Kirk","Noah Silver","Alicia Silverstone","Elisabeth Röhm"],"significants":["Brendan Malloy","Emmett Malloy"],"title":"The Tribes of Palos Verdes","overview":"When the situation at her idyllic Palos Verdes home turns volatile, young Medina attempts to surf her way to happiness.","tagline":"Life comes in waves.","video":"384jA6J0rK8","posterPath":"/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","185":"https://image.tmdb.org/t/p/w185/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","342":"https://image.tmdb.org/t/p/w342/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","500":"https://image.tmdb.org/t/p/w500/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","780":"https://image.tmdb.org/t/p/w780/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","92":"https://image.tmdb.org/t/p/w92/8w4JecmVtqcSMk4mdiHURzISsYz.jpg","original":"https://image.tmdb.org/t/p/original/8w4JecmVtqcSMk4mdiHURzISsYz.jpg"},"age":16,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80208793/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt8404614","tmdbID":"551332","imdbRating":76,"imdbVoteCount":108453,"tmdbRating":76,"backdropPath":"/mHz65gYQ3SmkQH3GKWSKWUkK5zW.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/mHz65gYQ3SmkQH3GKWSKWUkK5zW.jpg","300":"https://image.tmdb.org/t/p/w300/mHz65gYQ3SmkQH3GKWSKWUkK5zW.jpg","780":"https://image.tmdb.org/t/p/w780/mHz65gYQ3SmkQH3GKWSKWUkK5zW.jpg","original":"https://image.tmdb.org/t/p/original/mHz65gYQ3SmkQH3GKWSKWUkK5zW.jpg"},"originalTitle":"The Two Popes","genres":[1,35,18,36],"countries":["US"],"year":2019,"runtime":125,"cast":["Jonathan Pryce","Anthony Hopkins","Sidney Cole","Juan Minujín","Federico Torre","Matthew T. Reynolds","María Ucedo"],"significants":["Fernando Meirelles"],"title":"The Two Popes","overview":"Frustrated with the direction of the church, Cardinal Bergoglio requests permission to retire in 2012 from Pope Benedict. Instead, facing scandal and self-doubt, the introspective Pope Benedict summons his harshest critic and future successor to Rome to reveal a secret that would shake the foundations of the Catholic Church.","tagline":"","video":"T5OhkFY1PQE","posterPath":"/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","185":"https://image.tmdb.org/t/p/w185/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","342":"https://image.tmdb.org/t/p/w342/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","500":"https://image.tmdb.org/t/p/w500/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","780":"https://image.tmdb.org/t/p/w780/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","92":"https://image.tmdb.org/t/p/w92/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg","original":"https://image.tmdb.org/t/p/original/4d4mTSfDIFIbUbMLUfaKodvxYXA.jpg"},"age":12,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80174451/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt5755796","tmdbID":"426461","imdbRating":60,"imdbVoteCount":161,"tmdbRating":65,"backdropPath":"","backdropURLs":{},"originalTitle":"The Unmarried Wife","genres":[18,10749],"countries":["PH"],"year":2016,"runtime":130,"cast":["Angelica Panganiban","Dingdong Dantes","Paulo Avelino","Maricar Reyes","Denise Laurel","Dimples Romana","Justin Cuyugan"],"significants":["Maryo J. de los Reyes"],"title":"The Unmarried Wife","overview":"A woman is torn between trying to save her failing marriage or pursuing the possibility of a new love.","tagline":"","video":"","posterPath":"/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","185":"https://image.tmdb.org/t/p/w185/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","342":"https://image.tmdb.org/t/p/w342/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","500":"https://image.tmdb.org/t/p/w500/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","780":"https://image.tmdb.org/t/p/w780/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","92":"https://image.tmdb.org/t/p/w92/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg","original":"https://image.tmdb.org/t/p/original/kS8bZU5WO3BdXFQ6dG5FqdX2NHm.jpg"},"age":13,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80160692/","added":1611691122,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt6571548","tmdbID":"628534","imdbRating":72,"imdbVoteCount":32884,"tmdbRating":68,"backdropPath":"/f97trg5SKptuFVn2bpObjBexTuw.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/f97trg5SKptuFVn2bpObjBexTuw.jpg","300":"https://image.tmdb.org/t/p/w300/f97trg5SKptuFVn2bpObjBexTuw.jpg","780":"https://image.tmdb.org/t/p/w780/f97trg5SKptuFVn2bpObjBexTuw.jpg","original":"https://image.tmdb.org/t/p/original/f97trg5SKptuFVn2bpObjBexTuw.jpg"},"originalTitle":"The White Tiger","genres":[80,18],"countries":["SG","US"],"year":2021,"runtime":125,"cast":["Adarsh Gourav","Rajkummar Rao","Priyanka Chopra","Mahesh Manjrekar","Vijay Maurya","Mahesh Pillai","Nalneesh Neel"],"significants":["Ramin Bahrani"],"title":"The White Tiger","overview":"An ambitious Indian driver uses his wit and cunning to escape from poverty and rise to the top. An epic journey based on the New York Times bestseller.","tagline":"Eat or get eaten up.","video":"oM-Nw9XzqVM","posterPath":"/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","185":"https://image.tmdb.org/t/p/w185/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","342":"https://image.tmdb.org/t/p/w342/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","500":"https://image.tmdb.org/t/p/w500/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","780":"https://image.tmdb.org/t/p/w780/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","92":"https://image.tmdb.org/t/p/w92/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg","original":"https://image.tmdb.org/t/p/original/7K4mdWaLGF2F4ASb2L12tlya9c9.jpg"},"age":17,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80202877/","added":1611445376,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt7643622","tmdbID":"606755","imdbRating":52,"imdbVoteCount":514,"tmdbRating":65,"backdropPath":"/c366kkpn3e6o016UBW8scmBLxyl.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/c366kkpn3e6o016UBW8scmBLxyl.jpg","300":"https://image.tmdb.org/t/p/w300/c366kkpn3e6o016UBW8scmBLxyl.jpg","780":"https://image.tmdb.org/t/p/w780/c366kkpn3e6o016UBW8scmBLxyl.jpg","original":"https://image.tmdb.org/t/p/original/c366kkpn3e6o016UBW8scmBLxyl.jpg"},"originalTitle":"The World We Make","genres":[18],"countries":["US"],"year":2019,"runtime":108,"cast":["Richard Kohnke","Rose Reid","Gregory Alan Williams","Kevin Sizemore","Caleb Castille","Gunnar Sizemore"],"significants":["Brian Baugh"],"title":"The World We Make","overview":"18 year old Lee (a spirited equestrian) and Jordan (an academic and football standout) are at the threshold of building a life together. But their character is tested when racial bias surfaces in their otherwise progressive small town.","tagline":"Dreams are worth fighting for","video":"_n0Dt07fK2E","posterPath":"/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","185":"https://image.tmdb.org/t/p/w185/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","342":"https://image.tmdb.org/t/p/w342/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","500":"https://image.tmdb.org/t/p/w500/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","780":"https://image.tmdb.org/t/p/w780/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","92":"https://image.tmdb.org/t/p/w92/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg","original":"https://image.tmdb.org/t/p/original/8P4vyLBBDyAMxBdmeIFI5zWaiYi.jpg"},"age":5,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/81078908/","added":1612979113,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt8172466","tmdbID":"587808","imdbRating":49,"imdbVoteCount":1770,"tmdbRating":66,"backdropPath":"/r00r7FPrBRdDU1mRAAJ0Ds30yM6.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/r00r7FPrBRdDU1mRAAJ0Ds30yM6.jpg","300":"https://image.tmdb.org/t/p/w300/r00r7FPrBRdDU1mRAAJ0Ds30yM6.jpg","780":"https://image.tmdb.org/t/p/w780/r00r7FPrBRdDU1mRAAJ0Ds30yM6.jpg","original":"https://image.tmdb.org/t/p/original/r00r7FPrBRdDU1mRAAJ0Ds30yM6.jpg"},"originalTitle":"Backdraft 2","genres":[28,80,18,53],"countries":["BE","US"],"year":2019,"runtime":102,"cast":["Joe Anderson","Alisha Bailey","Jessamine-Bliss Bell","William Baldwin","Donald Sutherland","Patrick Walshe McBride","Alastair Mackenzie"],"significants":["Gonzalo López-Gallego"],"title":"Backdraft 2","overview":"Years after the original Backdraft, Sean, son of the late Steve \"Bull\" McCaffrey, is assigned to investigate a deadly fire only to realize it is something much more sinister.","tagline":"","video":"Rlqs75o9vOk","posterPath":"/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","185":"https://image.tmdb.org/t/p/w185/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","342":"https://image.tmdb.org/t/p/w342/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","500":"https://image.tmdb.org/t/p/w500/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","780":"https://image.tmdb.org/t/p/w780/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","92":"https://image.tmdb.org/t/p/w92/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg","original":"https://image.tmdb.org/t/p/original/d5QfKjWG5UcEbbo7btAmXnJpaOn.jpg"},"age":15,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/81053958/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt5653514","tmdbID":"430043","imdbRating":65,"imdbVoteCount":6406,"tmdbRating":65,"backdropPath":"/yTkPVSqQg4icpkzfO1o4uwkJxj3.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/yTkPVSqQg4icpkzfO1o4uwkJxj3.jpg","300":"https://image.tmdb.org/t/p/w300/yTkPVSqQg4icpkzfO1o4uwkJxj3.jpg","780":"https://image.tmdb.org/t/p/w780/yTkPVSqQg4icpkzfO1o4uwkJxj3.jpg","original":"https://image.tmdb.org/t/p/original/yTkPVSqQg4icpkzfO1o4uwkJxj3.jpg"},"originalTitle":"Bad Day for the Cut","genres":[28,80,18,53],"countries":["GB"],"year":2017,"runtime":99,"cast":["Nigel O'Neill","Susan Lynch","Józef Pawłowski","Stuart Graham","Anna Próchniak","Ian McElhinney","David Pearse"],"significants":["Chris Baugh"],"title":"Bad Day for the Cut","overview":"A middle-aged Irish farmer, who still lives at home with his mother, sets off on a mission of revenge when the old lady is murdered.","tagline":"","video":"rqAmglk317k","posterPath":"/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","185":"https://image.tmdb.org/t/p/w185/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","342":"https://image.tmdb.org/t/p/w342/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","500":"https://image.tmdb.org/t/p/w500/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","780":"https://image.tmdb.org/t/p/w780/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","92":"https://image.tmdb.org/t/p/w92/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg","original":"https://image.tmdb.org/t/p/original/53Jh8cMCfDOI87XnPBCIiTCwN6U.jpg"},"age":17,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80174219/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt0303714","tmdbID":"10611","imdbRating":63,"imdbVoteCount":29692,"tmdbRating":63,"backdropPath":"/sZlYGTuCc4icx51bVLgz6O8fkfm.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/sZlYGTuCc4icx51bVLgz6O8fkfm.jpg","300":"https://image.tmdb.org/t/p/w300/sZlYGTuCc4icx51bVLgz6O8fkfm.jpg","780":"https://image.tmdb.org/t/p/w780/sZlYGTuCc4icx51bVLgz6O8fkfm.jpg","original":"https://image.tmdb.org/t/p/original/sZlYGTuCc4icx51bVLgz6O8fkfm.jpg"},"originalTitle":"Barbershop","genres":[35,18],"countries":["US"],"year":2002,"runtime":102,"cast":["Ice Cube","Anthony Anderson","Cedric the Entertainer","Sean Patrick Thomas","Eve","Troy Garity","Michael Ealy"],"significants":["Tim Story"],"title":"Barbershop","overview":"A day in the life of a barbershop on the south side of Chicago. Calvin, who inherited the struggling business from his deceased father, views the shop as nothing but a burden and waste of his time. After selling the shop to a local loan shark, Calvin slowly begins to see his father's vision and legacy and struggles with the notion that he just sold it out.","tagline":"Everyone's gettin' lined up.","video":"BH5kMAHANr0","posterPath":"/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","185":"https://image.tmdb.org/t/p/w185/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","342":"https://image.tmdb.org/t/p/w342/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","500":"https://image.tmdb.org/t/p/w500/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","780":"https://image.tmdb.org/t/p/w780/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","92":"https://image.tmdb.org/t/p/w92/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg","original":"https://image.tmdb.org/t/p/original/yeV2H5dJmaR4XmNNG6q3ikV8a8y.jpg"},"age":9,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/60023633/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt5477566","tmdbID":"397717","imdbRating":58,"imdbVoteCount":6566,"tmdbRating":58,"backdropPath":"/5SJdWsNNrWDBCSyf7KUdBTzGMmr.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/5SJdWsNNrWDBCSyf7KUdBTzGMmr.jpg","300":"https://image.tmdb.org/t/p/w300/5SJdWsNNrWDBCSyf7KUdBTzGMmr.jpg","780":"https://image.tmdb.org/t/p/w780/5SJdWsNNrWDBCSyf7KUdBTzGMmr.jpg","original":"https://image.tmdb.org/t/p/original/5SJdWsNNrWDBCSyf7KUdBTzGMmr.jpg"},"originalTitle":"Barry","genres":[1,18],"countries":["US"],"year":2016,"runtime":104,"cast":["Devon Terrell","Anya Taylor-Joy","Ashley Judd","Jenna Elfman","Jason Mitchell","Ellar Coltrane","Linus Roache"],"significants":["Vikram Gandhi"],"title":"Barry","overview":"A biopic of Barack Obama set during his time as a college student in New York City.","tagline":"Before he was Barack, he was Barry","video":"i6qlPeS1kGY","posterPath":"/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","185":"https://image.tmdb.org/t/p/w185/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","342":"https://image.tmdb.org/t/p/w342/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","500":"https://image.tmdb.org/t/p/w500/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","780":"https://image.tmdb.org/t/p/w780/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","92":"https://image.tmdb.org/t/p/w92/rGpWxSspU2KFItp5AgMPtRSvxv.jpg","original":"https://image.tmdb.org/t/p/original/rGpWxSspU2KFItp5AgMPtRSvxv.jpg"},"age":13,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80144803/","added":1600283847,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt0103772","tmdbID":"402","imdbRating":70,"imdbVoteCount":179612,"tmdbRating":68,"backdropPath":"/8UjZdkSANL1x1SGrjvKiA7yhYBN.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/8UjZdkSANL1x1SGrjvKiA7yhYBN.jpg","300":"https://image.tmdb.org/t/p/w300/8UjZdkSANL1x1SGrjvKiA7yhYBN.jpg","780":"https://image.tmdb.org/t/p/w780/8UjZdkSANL1x1SGrjvKiA7yhYBN.jpg","original":"https://image.tmdb.org/t/p/original/8UjZdkSANL1x1SGrjvKiA7yhYBN.jpg"},"originalTitle":"Basic Instinct","genres":[18,9648,53],"countries":["FR","US"],"year":1992,"runtime":127,"cast":["Michael Douglas","Sharon Stone","Jeanne Tripplehorn","George Dzundza","Denis Arndt","Leilani Sarelle","Bruce A. Young"],"significants":["Paul Verhoeven"],"title":"Basic Instinct","overview":"A police detective is in charge of the investigation of a brutal murder, in which a beautiful and seductive woman could be involved.","tagline":"A brutal murder. A brilliant killer. A cop who can't resist the danger.","video":"EZc7uAUa38Q","posterPath":"/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","185":"https://image.tmdb.org/t/p/w185/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","342":"https://image.tmdb.org/t/p/w342/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","500":"https://image.tmdb.org/t/p/w500/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","780":"https://image.tmdb.org/t/p/w780/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","92":"https://image.tmdb.org/t/p/w92/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg","original":"https://image.tmdb.org/t/p/original/76Ts0yoHk8kVQj9MMnoMixhRWoh.jpg"},"age":17,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/286139/","added":1601542330,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt2368619","tmdbID":"333669","imdbRating":63,"imdbVoteCount":38916,"tmdbRating":62,"backdropPath":"/hb8brf5uYGt2t1qy33I5fHvmPkM.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/hb8brf5uYGt2t1qy33I5fHvmPkM.jpg","300":"https://image.tmdb.org/t/p/w300/hb8brf5uYGt2t1qy33I5fHvmPkM.jpg","780":"https://image.tmdb.org/t/p/w780/hb8brf5uYGt2t1qy33I5fHvmPkM.jpg","original":"https://image.tmdb.org/t/p/original/hb8brf5uYGt2t1qy33I5fHvmPkM.jpg"},"originalTitle":"Bastille Day","genres":[28,80,18,53],"countries":["FR","LU","GB","US"],"year":2016,"runtime":92,"cast":["Idris Elba","Richard Madden","Charlotte Le Bon","Kelly Reilly","José Garcia","Anatol Yusef","Ériq Ebouaney"],"significants":["James Watkins"],"title":"Bastille Day","overview":"Michael Mason is an American pickpocket living in Paris who finds himself hunted by the CIA when he steals a bag that contains more than just a wallet. Sean Briar, the field agent on the case, soon realises that Michael is just a pawn in a much bigger game and is also his best asset to uncover a large-scale conspiracy.","tagline":"With law comes disorder","video":"23I6KFna8Fk","posterPath":"/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","185":"https://image.tmdb.org/t/p/w185/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","342":"https://image.tmdb.org/t/p/w342/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","500":"https://image.tmdb.org/t/p/w500/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","780":"https://image.tmdb.org/t/p/w780/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","92":"https://image.tmdb.org/t/p/w92/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg","original":"https://image.tmdb.org/t/p/original/lTby7l0zX7xG8Pt0eNrWBrNzdqX.jpg"},"age":14,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80022615/","added":1600370015,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt4853102","tmdbID":"382322","imdbRating":64,"imdbVoteCount":50032,"tmdbRating":66,"backdropPath":"/wNyhtxSazhYVSG1So8zgGTqVFVo.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/wNyhtxSazhYVSG1So8zgGTqVFVo.jpg","300":"https://image.tmdb.org/t/p/w300/wNyhtxSazhYVSG1So8zgGTqVFVo.jpg","780":"https://image.tmdb.org/t/p/w780/wNyhtxSazhYVSG1So8zgGTqVFVo.jpg","original":"https://image.tmdb.org/t/p/original/wNyhtxSazhYVSG1So8zgGTqVFVo.jpg"},"originalTitle":"Batman: The Killing Joke","genres":[16,28,80,18,53],"countries":["US"],"year":2016,"runtime":72,"cast":["Kevin Conroy","Mark Hamill","Tara Strong","Ray Wise","Robin Atkin Downes","Brian George","John DiMaggio"],"significants":["Sam Liu"],"title":"Batman: The Killing Joke","overview":"As Batman hunts for the escaped Joker, the Clown Prince of Crime attacks the Gordon family to prove a diabolical point mirroring his own fall into madness.","tagline":"The madness begins","video":"ZQTqu1_iQkw","posterPath":"/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","185":"https://image.tmdb.org/t/p/w185/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","342":"https://image.tmdb.org/t/p/w342/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","500":"https://image.tmdb.org/t/p/w500/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","780":"https://image.tmdb.org/t/p/w780/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","92":"https://image.tmdb.org/t/p/w92/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg","original":"https://image.tmdb.org/t/p/original/nxncAAL1FUKtQWs4uhs5jf1MVut.jpg"},"age":13,"streamingInfo":{"hbo":{"us":{"link":"https://play.hbomax.com/page/urn:hbo:page:GYDkvhgbFAb2dwgEAAAA7:type:feature","added":1614671386,"leaving":0}},"netflix":{"us":{"link":"https://www.netflix.com/title/80107414/","added":1602759786,"leaving":0}}},"originalLanguage":"en"},{"imdbID":"tt1365050","tmdbID":"283587","imdbRating":77,"imdbVoteCount":74457,"tmdbRating":76,"backdropPath":"/vDfbeUK3OhoeyQRlUODwfSy6tyE.jpg","backdropURLs":{"1280":"https://image.tmdb.org/t/p/w1280/vDfbeUK3OhoeyQRlUODwfSy6tyE.jpg","300":"https://image.tmdb.org/t/p/w300/vDfbeUK3OhoeyQRlUODwfSy6tyE.jpg","780":"https://image.tmdb.org/t/p/w780/vDfbeUK3OhoeyQRlUODwfSy6tyE.jpg","original":"https://image.tmdb.org/t/p/original/vDfbeUK3OhoeyQRlUODwfSy6tyE.jpg"},"originalTitle":"Beasts of No Nation","genres":[18,10752],"countries":["GH","US"],"year":2015,"runtime":137,"cast":["Abraham Attah","Idris Elba","Emmanuel Nii Adom Quaye","Opeyemi Fagbohungbe","Emmanuel Affadzi","Richard Pepple","Ama K. Abebrese"],"significants":["Cary Joji Fukunaga"],"title":"Beasts of No Nation","overview":"A drama based on the experiences of Agu, a child fighting in the civil war of an unnamed, fictional West African country. Follows the journey of Agu as he's forced to join a group of soldiers. While Agu fears his commander and many of the men around him, his fledgling childhood has been brutally shattered by the war raging through his country, and he is at first torn between conflicting revulsion and fascination. Depicts the mechanics of war and does not shy away from explicit, visceral detail, painting a complex, difficult picture of Agu as a child soldier.","tagline":"Child. Captive. Killer.","video":"oRsaclO0VbU","posterPath":"/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","posterURLs":{"154":"https://image.tmdb.org/t/p/w154/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","185":"https://image.tmdb.org/t/p/w185/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","342":"https://image.tmdb.org/t/p/w342/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","500":"https://image.tmdb.org/t/p/w500/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","780":"https://image.tmdb.org/t/p/w780/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","92":"https://image.tmdb.org/t/p/w92/8CgowbCv28a0laVTnPoOrvzVnB7.jpg","original":"https://image.tmdb.org/t/p/original/8CgowbCv28a0laVTnPoOrvzVnB7.jpg"},"age":16,"streamingInfo":{"netflix":{"us":{"link":"https://www.netflix.com/title/80044545/","added":1600283847,"leaving":0}}},"originalLanguage":"en"}],"total_pages":88},
              buttonView: true,
          })
        }, 2000)

    // axios.get(`https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=${service}&type=${type}&genre=${genre}&page=${page}&language=en`, 
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
    //           buttonView: true,
    //       })
    //     }, 2000)
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });
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
            console.log("Movie Liked!");
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
            console.log("Movie Disliked!");
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

        <Animated.View style={{ opacity: this.likeOpacity, transform: [{ rotate: '-30deg' }], backgroundColor: 'green', position: 'absolute', top: 50, left: 40, zIndex: 1000 }}>
          <Text style={styles.likeText}>YAY</Text>
        </Animated.View>

        <Animated.View style={{ opacity: this.dislikeOpacity, transform: [{ rotate: '30deg' }], backgroundColor: 'red', position: 'absolute', top: 50, right: 40, zIndex: 1000 }}>
          <Text style={styles.likeText}>NAY</Text>
        </Animated.View>


        <FlipCard 
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}>

          {/* Face Side */}
          <View style={styles.mainCard}>
            <TitleBox currentMovie={this.state.currentMovie}/>
            
              <Image style={styles.mainImage} 
              source={{uri: `${imageUrl}`}} />
            
          </View>

          {/* Back Side */}
          <DescriptionBox apiCall={() => this.goForAxios()} currentMovie={this.state.currentMovie}/>

        </FlipCard>

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
          <View style={styles.loadMain}>
            <Image style={styles.loadImage} source={require('./../assets/LoadGif.gif')} />
          </View>
          {this.timerLoad()}
        </SafeAreaView>
      )
    } else {
      return (
        <SafeAreaView style={styles.container}>

            {/* <TitleBox currentMovie={this.state.currentMovie}/> */}

            {/*ANIMATION CARD*/}
            <View style={{flex:1}}>
              {this.renderPictures()}
            </View>
            {/*ANIMATION CARD*/}
            
              <View style={styles.buttonsRow}>
                <AnimatedTouchable style={styles.buttons} onPress={() => alert("YOU PRESSED IT!")}>
                  <Image style={styles.buttonImage} source={require('./../assets/filmLogo.png')} />
                </AnimatedTouchable>

                <AnimatedTouchable style={styles.buttons} onPress={() => alert("YOU PRESSED IT!")}>
                  <Image style={styles.buttonImage} source={require('./../assets/searchLogo.png')} />
                </AnimatedTouchable>

                <AnimatedTouchable style={styles.buttons} onPress={() => alert("YOU PRESSED IT!")}>
                  <Image style={styles.buttonImage} source={require('./../assets/profileLogo.png')} />
                </AnimatedTouchable>
              </View>
            
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
    backgroundColor: '#2C3432',
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
    height: (SCREEN_HEIGHT - 100),
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
    shadowColor: "#FAF198",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15,
    elevation: 13,
  },
  likeText: {
    borderWidth: 1, 
    borderColor: 'black', 
    color: 'black', 
    fontSize: 32, 
    fontWeight: '800', 
    padding: 10
  },
  buttonsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute', 
    bottom: 0
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
});