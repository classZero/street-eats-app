import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import {Actions} from 'react-native-router-flux'


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#9ad3de',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    createdBy: {
        textAlign: 'center',
        fontSize: 15,
        marginTop: 50
    }
})

class Modal extends Component {

    render() {
        setTimeout(() => Actions.home(), 2000)
        return (
            <View style={styles.container}>
            <StatusBar hidden={true} />
                <Text style={styles.text}>Welcome To Street Eats</Text>
                <Text style={styles.createdBy}>Created by: Leo Lugo, Kevin McGahey, Kevin Jossendal, and Chris Steinle</Text>
            </View>
            
        );
    }
}

export default Modal;