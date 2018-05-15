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
    AsyncStorage,
    Vibration,
} from 'react-native';
import Map from './map'


const styles = StyleSheet.create ({
    container: {
        backgroundColor: '#9ad3de',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    mapcontainer: {
        marginTop: 55,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 350,
    },
    buttoncontainer: {
        marginTop: 15,
        flexDirection: 'column',
        position: 'absolute',
        top: 400,
        width: 400,
        display: 'flex',
    },
    button: {
    width: 200,
    height: 200,
    flex: 1,
    },
    header: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly',
        backgroundColor: 'rgb(176, 199, 201)',
        height: 55,
        marginLeft: -45,
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
})


class TruckUpdate extends Component {
    state = {
        region: {
            latitude: '',
            longitude: '',
        },
        username: '',
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            this.setState({
                region: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            }
            });
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        )

        AsyncStorage.getItem('username').then(username => {
            this.setState({
                username
            })
        })
    }

    checkin = () => {
        AsyncStorage.getItem('token').then(token => {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            fetch('http://10.68.0.164:3001/api/uplocale', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                lat: this.state.region.latitude,
                long: this.state.region.longitude,
                username: this.state.username,
            }),
        }).then((response) => response.json())
        .then((resp) => {
            console.log(resp)
            Vibration.vibrate()
            alert("You have updated your location!")
        })
        .catch((error) => {console.error(error);
        });
        })
    }

    checkout = () => {
        AsyncStorage.getItem('token').then(token => {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
            fetch('http://10.68.0.164:3001/api/removelocale', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username: this.state.username,
            }),
        }).then((response) => response.json())
        .then((resp) => {
            console.log(resp)
            Vibration.vibrate()
            alert("You have closed your truck!")
        })
        .catch((error) => {console.error(error);
        });
        })
    }

    removeToken = () => {
        AsyncStorage.removeItem('token').then(token => {
          console.log(token)
        })
        Actions.home({loggedIn: false})
    }

    render() {
        console.log(this.props.loggedIn)
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableHighlight onPress={() => Actions.home({loggedIn: this.props.loggedIn})}>
                        <Image  source={require('../assets/backbttn.png')} style={{width: 23, height: 23, marginLeft: -8, marginTop: 14}}/>
                    </TouchableHighlight>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text onPress={() => Actions.home({loggedIn: this.props.loggedIn})} style={styles.hometext} >Profile</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                </View>

                <View style={styles.mapcontainer}>
                    <Map />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                    style={styles.button}
                    title="Open up Shop"
                    onPress={this.checkin}
                    color="white"
                    />
                    <Button
                    style={styles.button}
                    title="Close up Shop"
                    onPress={this.checkout}
                    color="white"
                    />
                    <Button
                    title="Logout"
                    onPress={this.removeToken}
                    color="white"
                    />
                    <Button
                    title="Home"
                    onPress={() => Actions.home({loggedIn: this.props.loggedIn})}
                    color="white"
                    />
                </View>
            </View>
            
        );
    }
}

export default TruckUpdate;