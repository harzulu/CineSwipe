import React from 'react';
import { 
  StyleSheet, 
  Text,
  View,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import { Chip } from 'react-native-paper';

let allParams = {
  biography: false,
  music: false,
  romance: false,
  family: false,
  war: false,
  news: false,
  reality: false,
  talkShow: false,
  adventure: false,
  fantasy: false,
  animation: false,
  drama: false,
  filmNoir: false,
  horror: false,
  action: false,
  gameShow: false,
  comedy: false,
  history: false,
  western: false,
  musical: false,
  sport: false,
  thriller: false,
  short: false,
  crime: false,
  scienceFiction: false,
  mystery: false,
  documentary: false,
  netflix: false,
  prime: false,
  disney: false,
  hbo: false,
  hulu: false,
  peacock: false,
  paramount: false,
  starz: false,
  showtime: false,
  movie: false,
  series: false,
}

function change(property) {
  allParams[property] = !allParams[property];
}

export default function Profile(props) {
  return(
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Select your favorite genres:</Text>
      <View style={styles.main}>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="account-box" 
          selected={allParams.biography}
          onPress={ () => { props.changeParam("biography", !allParams.biography) ; change("biography") } } >Biography</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="disc" 
          selected={allParams.music}
          onPress={ () => { props.changeParam("music", !allParams.music) ; change("music") } } >Music</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="emoticon-kiss-outline" 
          selected={allParams.romance}
          onPress={ () => { props.changeParam("romance", !allParams.romance) ; change("romance") } } >Romance</Chip>
        <Chip
          selectedColor={"black"}
        style={styles.selectors}
          icon="account-child" 
          selected={allParams.family}
          onPress={ () => { props.changeParam("family", !allParams.family) ; change("family") } } >Family</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="tank" 
          selected={allParams.war}
          onPress={ () => { props.changeParam("war", !allParams.war) ; change("war") } } >War</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="newspaper" 
          selected={allParams.news}
          onPress={ () => { props.changeParam("news", !allParams.news) ; change("news") } } >News</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="account-star" 
          selected={allParams.reality}
          onPress={ () => { props.changeParam("reality", !allParams.reality) ; change("reality") } } >Reality</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="microphone-variant" 
          selected={allParams.talkShow}
          onPress={ () => { props.changeParam("talkShow", !allParams.talkShow) ; change("talkShow") } } >Talk Show</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="compass" 
          selected={allParams.adventure}
          onPress={ () => { props.changeParam("adventure", !allParams.adventure) ; change("adventure") } } >Adventure</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="star-four-points-outline" 
          selected={allParams.fantasy}
          onPress={ () => { props.changeParam("fantasy", !allParams.fantasy) ; change("fantasy") } } >Fantasy</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="star-face" 
          selected={allParams.animation}
          onPress={ () => { props.changeParam("animation", !allParams.animation) ; change("animation") } } >Animation</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="drama-masks" 
          selected={allParams.drama}
          onPress={ () => { props.changeParam("drama", !allParams.drama) ; change("drama") } } >Drama</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="hat-fedora" 
          selected={allParams.filmNoir}
          onPress={ () => { props.changeParam("filmNoir", !allParams.filmNoir) ; change("filmNoir") } } >Film Noir</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="skull-crossbones" 
          selected={allParams.horror}
          onPress={ () => { props.changeParam("horror", !allParams.horror) ; change("horror") } } >Horror</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="run-fast" 
          selected={allParams.action}
          onPress={ () => { props.changeParam("action", !allParams.action) ; change("action") } } >Action</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="currency-usd" 
          selected={allParams.gameShow}
          onPress={ () => { props.changeParam("gameShow", !allParams.gameShow) ; change("gameShow") } } >Game Show</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="emoticon-happy" 
          selected={allParams.comedy}
          onPress={ () => { props.changeParam("comedy", !allParams.comedy) ; change("comedy") } } >Comedy</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="book" 
          selected={allParams.history}
          onPress={ () => { props.changeParam("history", !allParams.history) ; change("history") } } >History</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="horseshoe" 
          selected={allParams.western}
          onPress={ () => { props.changeParam("western", !allParams.western) ; change("western") } } >Western</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="music" 
          selected={allParams.musical}
          onPress={ () => { props.changeParam("musical", !allParams.musical) ; change("musical") } } >Musical</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="soccer" 
          selected={allParams.sport}
          onPress={ () => { props.changeParam("sport", !allParams.sport) ; change("sport") } } >Sport</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="knife" 
          selected={allParams.thriller}
          onPress={ () => { props.changeParam("thriller", !allParams.thriller) ; change("thriller") } } >Thriller</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="film" 
          selected={allParams.short}
          onPress={ () => { props.changeParam("short", !allParams.short) ; change("short") } } >Short</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="briefcase-search" 
          selected={allParams.crime}
          onPress={ () => { props.changeParam("crime", !allParams.crime) ; change("crime") } } >Crime</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="death-star-variant" 
          selected={allParams.scienceFiction}
          onPress={ () => { props.changeParam("scienceFiction", !allParams.scienceFiction) ; change("scienceFiction") } } >Science Fiction</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="magnify" 
          selected={allParams.mystery}
          onPress={ () => { props.changeParam("mystery", !allParams.mystery) ; change("mystery") } } >Mystery</Chip>
        <Chip
          selectedColor={"black"}          style={styles.selectors} 
          icon="camcorder" 
          selected={allParams.documentary}
          onPress={ () => { props.changeParam("documentary", !allParams.documentary) ; change("documentary") } } >Documentary</Chip>
      </View>
      <Text style={styles.title}>Select your streaming services:</Text>
      <View style={styles.main}>
        <Chip
          selectedColor={"rgb(222,9,19)"}
          style={styles.selectors}
          icon="netflix" 
          selected={allParams.netflix}
          onPress={ () => { props.changeParam("netflix", !allParams.netflix) ; change("netflix") } } >Netflix</Chip>
        <Chip
          selectedColor={"rgb(247,143,1)"}
          style={styles.selectors}
          icon="amazon" 
          selected={allParams.prime}
          onPress={ () => { props.changeParam("prime", !allParams.prime) ; change("prime") } } >Amazon Prime</Chip>
        <Chip
          selectedColor={"rgb(0,53,255)"}
          style={styles.selectors}
          icon={require('../assets/Background.png')} 
          selected={allParams.disney}
          onPress={ () => { props.changeParam("disney", !allParams.disney) ; change("disney") } } >Disney+</Chip>
        <Chip
          selectedColor={"rgb(117,76,206)"}
          style={styles.selectors}
          icon={require('../assets/HBO.png')} 
          selected={allParams.hbo}
          onPress={ () => { props.changeParam("hbo", !allParams.hbo) ; change("hbo") } } >HBO Max</Chip>
        <Chip
          selectedColor={"rgb(6,197,103)"}
          style={styles.selectors}
          icon="hulu" 
          selected={allParams.hulu}
          onPress={ () => { props.changeParam("hulu", !allParams.hulu) ; change("hulu") } } >Hulu</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon={require('../assets/NBC.png')} 
          selected={allParams.peacock}
          onPress={ () => { props.changeParam("peacock", !allParams.peacock) ; change("peacock") } } >Peacock</Chip>
        <Chip
          selectedColor={"rgb(6,103,253)"}
          style={styles.selectors}
          icon={require('../assets/ParamountLogo.png')} 
          selected={allParams.paramount}
          onPress={ () => { props.changeParam("paramount", !allParams.paramount) ; change("paramount") } } >Paramount+</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon={require('../assets/StarzLogo.png')} 
          selected={allParams.starz}
          onPress={ () => { props.changeParam("starz", !allParams.starz) ; change("starz") } } >Starz</Chip>
        <Chip
          selectedColor={"rgb(247,1,2)"}
          style={styles.selectors}
          icon={require('../assets/ShowtimeLogo.png')} 
          selected={allParams.showtime}
          onPress={ () => { props.changeParam("showtime", !allParams.showtime) ; change("showtime") } } >Showtime</Chip>
      </View>
      <Text style={styles.title}>Movies and/or TV Shows:</Text>
      <View style={styles.main}>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="movie" 
          selected={allParams.movie}
          onPress={ () => { props.changeParam("movie", !allParams.movie) ; change("movie") } } >Movies</Chip>
        <Chip
          selectedColor={"black"}
          style={styles.selectors}
          icon="television-classic" 
          selected={allParams.series}
          onPress={ () => { props.changeParam("series", !allParams.series) ; change("series") } } >TV Shows</Chip>
      </View>
    </ScrollView>
  )
}

Profile.propTypes = {
  changeParam: PropTypes.func,
  paramLists: PropTypes.array,
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection:'row', 
    flexWrap:'wrap',
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Courier',
    color: 'black',
    marginBottom: 15,
  },
  selectors: {
    margin: 5,
  }
})