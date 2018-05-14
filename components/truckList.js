import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
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
        height: 55,
        marginLeft: -25,
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
    flatlistcontainer: {
       flexDirection: "row",
    },
    truckname: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15,
    },
    flaty: {
        marginBottom: 50,
    },
})


class TruckList extends Component {
    state = {
        data: [],
    }

    componentDidMount() {
        return fetch('http://192.168.0.27:3001/api/truckdata/all', {
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
                    <TouchableHighlight onPress={() => Actions.pop()}>
                        <Image  source={require('../assets/backbttn.png')} style={{width: 23, height: 23, marginLeft: -8, marginTop: 14}}/>
                    </TouchableHighlight>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                    <Text onPress={() => Actions.home()} style={styles.hometext} >All Trucks</Text>
                    <Image source={require('../assets/goodtruck.png')} style={{width: 45, height: 35, marginTop: 8}} />
                </View>
                <View>
                   <FlatList style={styles.flaty}
                   data={this.state.data}
                   keyExtractor={(x, i) => 'truck' + i}
                   renderItem={({ item}) => 
                   <View style={styles.flatlistcontainer}>
                   <Image source={{uri:`${item.companylogo}`}}
                style={{width: 50, height: 50, borderRadius: 25, marginBottom: 15, marginTop: 5, marginLeft: 10}} />
                    <Text onPress={() => Actions.TruckProfile({username: item.username})} style={styles.truckname} >{item.companyname}</Text>
                    </View>}
                    />
                </View>
            </View>
            
        );
    }
}

export default TruckList;