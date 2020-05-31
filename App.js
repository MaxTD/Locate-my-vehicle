// IOS v1.3

import React, { useState, useEffect, Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT } from 'react-native-maps';
import FloatingButton from "./Test/FloatingButton";

// export { AppContainer, TabNavigator }

const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}
const App = () => {
  const [curentPosition, setCurentPosition] = useState(initialState);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      // alert(JSON.stringify(position))
      const { longitude, latitude } = position.coords;
    setCurentPosition({
      ...curentPosition,
      latitude,
      longitude,
    })
  },
      error => alert(error.message),
      { timeout: 20000, maximumAge: 1000}
    )
  }, [])
  
  return curentPosition.latitude ? (
    <View style={styles.containerTop}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_DEFAULT}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={curentPosition}>
        </MapView>


        <View style={{
          backgroundColor: "black", height: "10%", width: "100%",
          alignSelf: "flex-end", borderTopLeftRadius: "25", borderTopRightRadius: "25",
        }}>
        </View>
        <FloatingButton style={{ bottom: 100 }} />
      </View>
    </View>
  ) : <ActivityIndicator style={{ flex: 1 }} animating size="large"/>
};

const styles = StyleSheet.create({
  containerTop: {
    borderRadius: 6,
    flex: 1,
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

export default App;