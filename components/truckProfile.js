import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


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
            <View>
                <Image source={{uri: `${this.state.data.logo}`}}
                style={{width: 200, height: 200}} />
                <Text>{this.state.data.companyname}</Text>
                <Text>{this.state.data.aboutus}</Text>
                <Image source={{uri: `${this.state.data.menuurl}`}}
                style={{width: 200, height: 200}} />
            </View>
        );
    }
}

export default TruckProfile;