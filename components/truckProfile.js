import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, ScrollView } from 'react-native';
import {Actions} from 'react-native-router-flux'

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
        width: 375,
        backgroundColor: 'rgb(176, 199, 201)',
        height: 55,
        // marginLeft: -25,
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
    
class TruckProfile extends Component {
    state = {
        data: {}
    }
    componentDidMount() {
        return fetch('http://10.68.0.164:3001/api/truckprofile/' + this.props.username, {
            method: 'GET'
          }).then((response) => response.json())
              .then((resp) => {
                 this.setState({
                     data: resp
                 })
              })
              .catch((error) => {
                console.error(error);
              });
    }



    render() {
        return (
            <View style={styles.container}>
            <View style={styles.header}>
                    <TouchableHighlight onPress={() => Actions.pop({loggedIn: this.props.loggedIn})}>
                        <Image  source={require('../assets/backbttn.png')} style={{width: 23, height: 23, marginLeft: -8, marginTop: 14}}/>
                    </TouchableHighlight>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text onPress={() => Actions.home({loggedIn: this.props.loggedIn})} style={styles.hometext} >{this.state.data.companyname}</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
            </View>
            <ScrollView>
                <Image source={{uri: `${this.state.data.logo}`}}
                style={{width: 200, height: 200, borderRadius: 25, marginLeft: 90, marginTop: 15, marginBottom: 15}} />
                <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: 'white', textShadowColor: 'grey',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 4,}}>About Us</Text>
                <Text style={{marginRight: 10, marginLeft: 10}}>{this.state.data.aboutus}</Text>
                <Image source={{uri: `${this.state.data.menuurl}`}}
                style={{width: 300, height: 400, marginLeft: 35, marginTop: 15, marginBottom: 15}} />
            </ScrollView>
            </View>
        );
    }
}

export default TruckProfile;