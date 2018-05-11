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
    StatusBar,
  } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { FlatList } from 'react-native-gesture-handler';
import Map from './map'


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ad3de',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    header: {
       flexDirection: 'row', 
       justifyContent: 'space-evenly',
       backgroundColor: 'rgb(176, 199, 201)',
       height: 100,
       marginLeft: -25,
    },
    homeFullMap: {
        color: 'grey',
        marginTop: 15,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 13
    },
    homeTruckList: {
        color: 'grey',
        marginTop: 15,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 13
    },
    hometext: {
        color: 'white',
        marginTop: 15,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textShadowColor: 'grey',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,
    },
    mapcontainer: {
        marginTop: 55,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    trucklist: {
        position: 'absolute',
        marginTop: 325
    }
})


class MapFullView extends Component {
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
    }
    


    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                    <View style={styles.header}>
                    <TouchableHighlight onPress={() => Actions.pop()}>
                    <Image  source={require('../assets/backbttn.png')} style={{width: 23, height: 23, marginLeft: -8, marginTop: 14}}/>
                    </TouchableHighlight>
                        <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                        <Text onPress={() => Actions.home()} style={styles.hometext} >Street Eats</Text>
                        <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    </View>

                    <View style={styles.mapcontainer}>
                        <Map />
                    </View>
            </View>
            
        );
    }
}

export default MapFullView;