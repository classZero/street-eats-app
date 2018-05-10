import MapView, {Marker} from 'react-native-maps';
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableHighlight,
  StatusBar,
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
  marker: {
    width: 5,
    height: 5,
  },
});



class Map extends Component {
  state = {
    region: {
      latitude: 36.1699412,
          longitude: -115.1398295,
          latitudeDelta: 0.5,
          longitudeDelta: 0.0421
    }
  }
  
componentDidMount() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      this.setState({
        region: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.0011
        }
      });
    },
    (error) => alert(JSON.stringify(error)),
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
  );
}
// <MapView
// style={ styles.map }
// initialRegion={{
//   latitude: 36.1699412,
//   longitude: -115.1398295,
//   latitudeDelta: 0.5,
//   longitudeDelta: 0.0421,
// }}
// >

  render() {
    return (
      <MapView style={ styles.map } showsUserLocation = {true}
      showsMyLocationButton={true}
      initialRegion={this.state.region}
           region={this.state.region}
           onRegionChange={this.onRegionChange}
      >
      <View>
      <StatusBar hidden={true} />        
      <Marker
      coordinate={{latitude: 36.1699412,
        longitude: -115.1398295}}
        title={'Sushi 4 You'}
        description={'12278 Kings Eagle Street Las Vegas, NV 89141'}
        onPress={e => console.log(e.nativeEvent)}
      >
      <Image source={require('../assets/truck_pin.png')}
        style={{width: 50, height: 50}} />
      </Marker>
      </View>
      </MapView>
    );
  }
}
export default Map;