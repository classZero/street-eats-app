import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Actions} from 'react-native-router-flux'


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center',
        fontSize: 40,
    }
})

class modal extends Component {

    render() {
        setTimeout(() => Actions.home(), 2000)
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Welcome To Street Eats</Text>
            </View>
            
        );
    }
}

export default modal;