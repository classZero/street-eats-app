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
    }
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
            fetch('http://10.68.0.123:3001/api/uplocale', {
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
            fetch('http://10.68.0.123:3001/api/removelocale', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                username: this.state.username,
            }),
        }).then((response) => response.json())
        .then((resp) => {
            console.log(resp)
        })
        .catch((error) => {console.error(error);
        });
        })
    }

    removeToken = () => {
        AsyncStorage.removeItem('token').then(token => {
          console.log(token)
        })
        Actions.home()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.mapcontainer}>
                    <Map />
                </View>
                <View style={styles.buttoncontainer}>
                    <Button
                    style={styles.button}
                    title="Check into My Current Location"
                    onPress={this.checkin}
                    />
                    <Button
                    style={styles.button}
                    title="Checkout of My Current Location"
                    onPress={this.checkout}
                    />
                    <Button
                title="Logout"
                onPress={this.removeToken}
                />
                </View>
            </View>
            
        );
    }
}

export default TruckUpdate;