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
    ImageBackground,
    AsyncStorage,
    } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { FlatList } from 'react-native-gesture-handler';
import Map from './map'
import MapFullView from './mapfullview'


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
        color: '#d6edf1',
        marginTop: 15,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 15,
        textShadowColor: '#9ad3de',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
    },
    homeTruckList: {
        color: '#d6edf1',
        marginTop: 15,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 15,
        textShadowColor: '#9ad3de',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1,
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
        marginTop: 360,
    },
    trucklisty: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 25,
        marginTop: 10,
    },
    activetruckheader: {
        marginTop: 325,
        position: 'absolute',
    },
    activetrucktext: {
        textAlign: 'center',
        marginLeft: 150,
        fontWeight: 'bold',
        textShadowColor: 'grey',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,
        color: 'white',
    },
    flatlistcontainer: {
        flexDirection: 'row',
    },
    flatlists: {
        marginBottom: 50,
    }
})


class Home extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        return fetch('http://10.68.0.123:3001/api/truckdata/active', {
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
            <View style={styles.container}>
            
            <StatusBar hidden={true} />
                
                <View style={styles.header}>
                    <Text onPress={() => Actions.TruckList()} style={styles.homeTruckList}>All Trucks</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text style={styles.hometext} >Street Eats</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text onPress={() => Actions.Login()} style={styles.homeFullMap}>Truck Login</Text>
                </View>

            <View style={styles.mapcontainer}>
                <Map />
            </View>

            <View>
            <TouchableHighlight onPress={() => Actions.MapFullView()}>
            <ImageBackground source={require('../assets/expand.png')} style={{position: 'absolute', marginTop: 180, width: 30, height: 30, marginLeft: 340}}>Enlarge Map</ImageBackground>
            </TouchableHighlight>
            </View>

            <View style={styles.activetruckheader}>
                <Text style={styles.activetrucktext}>Active Trucks</Text>
            </View>

            <View style={styles.trucklist}>
                <FlatList style={styles.flatlists}
                data={this.state.data}
                keyExtractor={(x, i) => 'truck' + i}
                renderItem={({ item}) =>
                <View style={styles.flatlistcontainer}> 
                    <Image source={{uri:`${item.companylogo}`}} style={{width: 50, height: 50, borderRadius: 25, marginBottom: 15, marginTop: 0, marginLeft: 10}} />
                    <Text onPress={() => Actions.TruckProfile({username: item.username})} style={styles.trucklisty} >{item.companyname}</Text>
                    </View>}
                    />
            </View>
            
            </View>
            
        );
    }
}

export default Home;