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
    } from 'react-native';

import TruckUpdate from './truckUpdate'


class Login extends Component {
    state = {
        name: '',
        password: '',
    }

    handleSubmit = () => {
        
        fetch('http://10.68.0.164:3001/api/login', {
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
                Actions.TruckUpdate()
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
            <View>
                <View>
                <StatusBar hidden={true} />
                <Text>Login</Text>
                <Text>Username:</Text>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(name) => this.setState({name})}
                value={this.state.name}
                />
                <Text>Password:</Text>
                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                />
                <Button
                title="Submit"
                onPress={this.handleSubmit}
                />
                </View>
            </View>
        );
    }
}

export default Login;