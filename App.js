import MapView, {Marker} from 'react-native-maps';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


class Home extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <MapView
        style={ styles.map }
        initialRegion={{
          latitude: 36.1699412,
          longitude: -115.1398295,
          latitudeDelta: 0.5,
          longitudeDelta: 0.0421,
        }}
      >
      <Marker
      coordinate={{latitude: 36.1699412,
        longitude: -115.1398295}}
      />
      <Marker
      coordinate={{latitude: 35.1699412,
        longitude: -115.1398295}}
      />
      </MapView>

    );
  }
}
export default Home;