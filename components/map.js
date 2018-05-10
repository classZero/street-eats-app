import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {Actions} from 'react-native-router-flux'

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
class map extends Component {

    render() {
        return (
            <MapView
            onPress={() => Actions.pop()}
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
          coordinate={{latitude: 36.187869,
            longitude: -115.160571}}
          />
          <Marker
          coordinate={{latitude: 36.195255,
            longitude: -115.159659}}
          />
          </MapView>
            
        );
    }
}

export default map;