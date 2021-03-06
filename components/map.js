import MapView, {Marker} from 'react-native-maps';
import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import Geocoder from 'react-native-geocoding';
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
    },
    data: []
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
  return fetch('http://10.68.0.166:3001/api/truckdata/active', {
      method: 'GET'
    }).then((response) => response.json())
        .then((resp) => {
          this.setState({
            data: resp.results
        })
        })
        .catch((error) => {
          console.error(error);
        });
}

  render() {
    return (
      <MapView style={ styles.map } showsUserLocation = {true}
      showsMyLocationButton={true}
      initialRegion={this.state.region}
           region={this.state.region}
           onRegionChange={this.onRegionChange}
      >
      <StatusBar hidden={true} />      
      {this.state.data.map((truck, i) => { 
        return ( <Marker key={"truck" + i}
        coordinate={{latitude: truck.lat , longitude: truck.lng}}
        title={truck.companyname}
        OnLongPress={(e) => console.log(e)}
        >
        <Image source={require('../assets/goodtruck.png')}
           style={{width: 75, height: 50}} />
        </Marker>
        )
      })}
      </MapView>
    );
  }
}
export default Map;