// IOS v1.1

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

import FloatingButton from "./Test/FloatingButton";
import MapView from 'react-native-maps'
import { FontAwesome5 } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.002
const LONGTITUDE_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

// export { AppContainer, TabNavigator }

export default class Map extends Component {
  constructor(props) {
    super(props)

    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      markerPosition: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATTITUDE_DELTA,
        longitudeDelta: LONGTITUDE_DELTA,
      }

      this.setState({ initialPosition: initialRegion })
      this.setState({ markerPosition: initialRegion })
    },
      (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 })

    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var lastRegion = {
        latitude: lat,
        longitude: long,
        longitudeDelta: LONGTITUDE_DELTA,
        latitudeDelta: LATTITUDE_DELTA
      }

      this.setState({ initialPosition: lastRegion })
      this.setState({ markerPosition: lastRegion })
    })
  }

  componentWillMount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  render() {
    return (
      <View style={styles.containerTop}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.state.region}>
            <MapView.Marker
              coordinate={this.state.markerPosition}>
              <View style={styles.radius}>
                <View style={styles.marker} />
              </View>
            </MapView.Marker>
          </MapView>
          <View style={{
            backgroundColor: "blue", height: "10%", width: "100%",
            alignSelf: "flex-end", borderRadius: "25 0"
          }}>
          </View>
          <FloatingButton style={{ bottom: 100 }} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerTop: {
    borderRadius: 6,
    flex: 1,
  },
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  marker: {
    height: 15,
    width: 15,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 20 / 2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
  },
  container: {
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

AppRegistry.registerComponent('FindMyParkedCarMaps', () => FindMyParkedCarMaps);