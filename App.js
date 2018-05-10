import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import map from './components/map'
import home from './components/home'
import splash from './components/splash'

export default class App extends React.Component {
  render() {
    return <Router>
      <Scene key="root" hideNavBar={true}>
      <Scene key="splash" component={splash}  initial />
      <Scene key="home" component={home} title="Home"  />
      <Scene key="map" component={map} title="Map"  />
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