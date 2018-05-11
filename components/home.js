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
        bottom: 350,
    },
    trucklist: {
        position: 'absolute',
        marginTop: 325
    }
})


class Home extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        return fetch('http://10.68.0.164:3001/api/truckdata/active', {
            method: 'GET'
          }).then((response) => response.json())
              .then((resp) => {
                 this.setState({
                     data: resp.results
                 })
                 console.log(this.state.data)
              })
              .catch((error) => {
                console.error(error);
              });
    }
    


    render() {
        return (
            <View style={styles.container}>
            <StatusBar hidden={true} />
                <View style={styles.header}>
                    <Text onPress={() => Actions.TruckList()} style={styles.homeTruckList}>Truck List</Text>
                    <Image source={require('../assets/truck_pin.png')} style={{width: 40, height: 40, marginTop: 8}} />
                    <Text style={styles.hometext} >Street Eats</Text>
                    <Image source={require('../assets/truck_pin.png')} style={{width: 40, height: 40, marginTop: 8}} />
                    <Text onPress={() => Actions.Map()} style={styles.homeFullMap}>Full Map</Text>
                </View>
            <View style={styles.mapcontainer}>
                   <Map />
            </View>
            <View style={styles.trucklist}>
                <FlatList
                   data={this.state.data}
                   keyExtractor={(x, i) => 'truck' + i}
                   renderItem={({ item}) => 
                    <Text onPress={() => Actions.TruckProfile({username: item.username})}>{item.companyname}</Text>}
                    />
            </View>
            </View>
            
        );
    }
}

export default Home;