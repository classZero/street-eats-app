import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
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

StatusBar.setBarStyle('light-content', true)

class home extends Component {
    state = {
        data: [],
    }

    componentWillMount() {
        this.fetchData()
    }

    fetchData = async () => {
        const response = await fetch('https://randomuser.me/api?results=10')
        const json = await response.json()
        this.setState({data: json.results})
    }

    displayUsers() {
        return this.state.data.map((user, i) => {
        return  (<View key={i}><Text>{user.name.first}</Text></View>)
        })
    }

    render() {
        console.log(this.state.data[0])
        return (
            <View style={styles.container}>
                <Text onPress={() => Actions.map()} style={styles.hometext} >Street Eats</Text>
                <View>
                   {this.displayUsers()}
                </View>
            </View>
            
        );
    }
}

export default home;