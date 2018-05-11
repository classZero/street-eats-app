import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { FlatList } from 'react-native-gesture-handler';


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
        height: 60,
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
    }
})


class TruckList extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        return fetch('http://10.68.0.164:3001/api/truckdata/all', {
            method: 'GET'
          }).then((response) => response.json())
              .then((resp) => {
                 this.setState({
                     data: resp.results
                 })
                 console.log(this.state.data)
              })
              .catch((error) => {
                console.error(error);
              });
    }


    render() {
        console.log(this.state.data.username)
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/truck_pin.png')} style={{width: 40, height: 40, marginTop: 8}} />
                    <Text onPress={() => Actions.home()} style={styles.hometext} >All Trucks</Text>
                    <Image source={require('../assets/truck_pin.png')} style={{width: 40, height: 40, marginTop: 8}} />
                </View>
                <View>
                   <FlatList
                   data={this.state.data}
                   keyExtractor={(x, i) => 'truck' + i}
                   renderItem={({ item}) => 
                   <View>
                    <Text onPress={() => Actions.TruckProfile({username: item.username})} >{item.companyname}</Text>
                    <Image source={{uri:`${item.companylogo}`}}
                style={{width: 50, height: 50}} />
                    </View>}
                    />
                </View>
            </View>
            
        );
    }
}

export default TruckList;