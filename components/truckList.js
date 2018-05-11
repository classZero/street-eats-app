import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {Actions} from 'react-native-router-flux'
import { FlatList } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0080ff',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
    },
    hometext: {
        color: 'black',
        marginTop: 20,
        flexDirection: 'row',
        textAlign: 'center',
        fontSize: 20,
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
                <Text onPress={() => Actions.pop()} style={styles.hometext} >Street Eats</Text>
                <View>
                   <FlatList
                   data={this.state.data}
                   keyExtractor={(x, i) => 'truck' + i}
                   renderItem={({ item}) => 
                   <View>
                    <Text onPress={() => Actions.TruckProfile({username: item.username})} >{item.companyname}</Text>
                    <Image source={{uri: `${item.companylogo}`}}
                style={{width: 50, height: 50}} />
                    </View>}
                    />
                </View>
            </View>
            
        );
    }
}

export default TruckList;