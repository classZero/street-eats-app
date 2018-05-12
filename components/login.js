import React, { Component } from 'react';
import {Actions} from 'react-native-router-flux';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    StatusBar,
    Keyboard,
    AsyncStorage,
    TouchableHighlight
    } from 'react-native';

import TruckUpdate from './truckUpdate'

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

class Login extends Component {
    state = {
        name: '',
        password: '',
    }

    handleSubmit = () => {
        
        fetch('http://192.168.2.97:3001/api/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.name,
                password: this.state.password,
            }),
        }).then((response) => response.json())
        .then((resp) => {
            if(resp.message === 'Login Successful') {
                AsyncStorage.setItem('token', resp.token)
                AsyncStorage.setItem('username', resp.user)
                AsyncStorage.setItem('isAuth', 'true')
                Actions.TruckUpdate({loggedIn: true})
            } else {
                alert("Bad username and/or password")
            }
        })
        .catch((error) => {console.error(error);
        });

        this.setState({
            name: '',
            password: '',
        })
        Keyboard.dismiss()
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.header}>
                    <TouchableHighlight onPress={() => Actions.pop()}>
                        <Image  source={require('../assets/backbttn.png')} style={{width: 23, height: 23, marginLeft: -8, marginTop: 14}}/>
                    </TouchableHighlight>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text onPress={() => Actions.home()} style={styles.hometext} >Login</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                </View>

                <View>
                <StatusBar hidden={true} />
                <Text>Username:</Text>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                />
                <Text>Password:</Text>
                <TextInput secureTextEntry={true}
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                />
                <Button
                title="Submit"
                onPress={this.handleSubmit}
                color="white"
                />
                <Button
                title="Home"
                onPress={() => Actions.pop()}
                />
                </View>
            </View>
        );
    }
}

export default Login;