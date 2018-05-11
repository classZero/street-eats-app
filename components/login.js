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
  } from 'react-native';


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
            console.log(resp)})
        .catch((error) => {console.error(error);
        });

        this.setState({
            name: '',
            password: ''
        })
        Keyboard.dismiss()
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
            </View>
        );
    }
}

export default Login;