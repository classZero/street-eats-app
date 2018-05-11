import React, { Component } from 'react';
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
            console.log(resp.token)
            AsyncStorage.setItem('token', resp.token)
        })
        .catch((error) => {console.error(error);
        });

        this.setState({
            name: '',
            password: ''
        })
        Keyboard.dismiss()
    }

    showToken = () => {
        AsyncStorage.getItem('token').then(token => {
            console.log(token)
            const d = "sadsad"
        })
    }

    render() {
        return (
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
                <Button
                title="Show token"
                onPress={this.showToken}
                />
            </View>
        );
    }
}

export default Login;