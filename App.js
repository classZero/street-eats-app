import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Swiper from 'react-native-swiper'
import Map from './components/map'
import home from './components/home'
import splash from './components/splash'
import TruckList from './components/truckList'
import TruckProfile from './components/truckProfile'
import MapFullView from './components/mapfullview'
import Login from './components/login'

export default class App extends React.Component {
  render() {
    return <Router>
      <Scene key="root" hideNavBar={true}>

      <Scene hideNavBar={true} key="splash" component={splash}  initial />
      
      <Scene hideNavBar={true} key="home" component={home} title="Home" type="reset"  />

      <Scene hideNavBar={true} key="Map" component={Map} title="Map"  />
     
      <Scene hideNavBar={true} key="TruckList" component={TruckList} title="Truck List" />

      <Scene hideNavBar={true} key="TruckProfile" component={TruckProfile} title="Truck Profile" />
      
      <Scene hideNavBar={true} key="MapFullView" component={MapFullView} title="Map Full View" />

      <Scene hideNavBar={true} key="Login" component={Login} title="Login" />

      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});