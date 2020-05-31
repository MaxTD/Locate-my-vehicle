// IOS v1.7

import React, { useState, useEffect, Component } from 'react';
import {
  Button,
  Text,
  Animated,
  TouchableWithoutFeedback,
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import { AntDesign, Entypo } from "@expo/vector-icons";

class FloatingButton extends React.Component {

  animation = new Animated.Value(0)

  constructor(props) {
    super(props);
  }

  _onPress() {
    console.log("Pinned")
  }

  toggleMenu = () => {
    const toValue = this.open ? 0 : 1;

    Animated.spring(this.animation, {
      toValue,
      friction: 5
    }).start();

    this.open = !this.open;
  }

  render() {
    const pinStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -80]
          })
        }
      ]
    };

    const thumbStyle = {
      transform: [
        { scale: this.animation },
        {
          translateY: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, -140]
          })
        }
      ]
    };

    const rotation = {
      transform: [
        {
          rotate: this.animation.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
          })
        }
      ]
    };

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, thumbStyle]}>
            <Entypo onPress={() => this.props.onLocate()} name="hair-cross" size={20} color="black" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback>
          <Animated.View style={[styles.button, styles.secondary, pinStyle]}>
            <Entypo onPress={() => this._onPress()} name="location-pin" size={20} color="black" />
          </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={this.toggleMenu}>
          <Animated.View style={[styles.button, styles.menu, rotation]}>
            <AntDesign name="plus" size={24} color="black" />
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}



export default class App extends React.Component {

  // export default class App extends Component {


  state = {

    focusedLocation: {
      latitude: 37.7900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta:
        Dimensions.get("window").width /
        Dimensions.get("window").height *
        0.0122
    },
    locationChosen: false
  }

  pickLocationHandler = event => {
    const coords = event.nativeEvent.coordinate;
    this.map.animateToRegion({
      ...this.state.focusedLocation,
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    this.setState(prevState => {
      return {
        focusedLocation: {
          ...prevState.focusedLocation,
          latitude: coords.latitude,
          longitude: coords.longitude
        },
        locationChosen: true
      };
    });

  };

  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const coordsEvent = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          }
        }
      };
      this.pickLocationHandler(coordsEvent);
    },
      err => {
        console.log(err);
        alert("Fetching the Position failed, please pick one manually!");
      })
  }


  render() {
    // let marker = null;

    // if (this.state.locationChosen) {
    //   marker = <MapView.Marker coordinate={this.state.focusedLocation} />;
    // }

    return (
      <View style={styles.containerTop}>
        <View style={styles.container1}>
          <MapView
            initialRegion={this.state.focusedLocation}
            region={!this.state.locationChosen ? this.state.focusedLocation : null}
            style={styles.map}
            onPress={this.pickLocationHandler}
            ref={ref => this.map = ref}
          showsUserLocation={true}
          >
            {/* {marker} */}
          </MapView>

          <View style={{
            backgroundColor: "black", height: "10%", width: "100%",
            alignSelf: "flex-end", borderTopLeftRadius: "25", borderTopRightRadius: "25",
          }}>
          </View>
          <FloatingButton onLocate={this.getLocationHandler} style={{ bottom: 100 }} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute"
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#FFF",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 }
  },
  menu: {
    backgroundColor: "#FFF"
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: "#FFF"
  },
  containerTop: {
    borderRadius: 6,
    flex: 1,
  },
  container1: {
    display: "flex",
    height: "100%",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute'
  },
  Welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
