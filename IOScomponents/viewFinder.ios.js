import React, { Component } from 'react';
import {  StyleSheet, Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GIcon from 'react-native-vector-icons/MaterialIcons';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';

export default class ViewFinder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finderColor: this.props.finderColor,
    };
  }
  render() {
    return (
        <View style={styles.viewFinder}>
          <View style={[styles.finder1, this.state.finderColor]} ></View>
          <View style={[styles.finder2, this.state.finderColor]}></View>
          <View style={[styles.finder3, this.state.finderColor]}></View>
          <View style={[styles.finder4, this.state.finderColor]}></View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  viewFinder: {
    flexWrap: "wrap",
    flexDirection: "row",
    height: Dimensions.get('window').height * .43,
    width: Dimensions.get('window').width * .85,
    marginTop: - Dimensions.get('window').height * .45,
  },
  finder1: {
    height: Dimensions.get('window').height * .1,
    width: Dimensions.get('window').width * .2,
    borderWidth: 2,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  finder2: {
    height: Dimensions.get('window').height * .1,
    width: Dimensions.get('window').width * .2,
    marginLeft: Dimensions.get('window').width * .45,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderBottomWidth: 0
  },
  finder3: {
    height: Dimensions.get('window').height * .1,
    width: Dimensions.get('window').width * .2,
    marginTop: Dimensions.get('window').height * .2,
    borderWidth: 2,
    borderRightWidth: 0,
    borderTopWidth: 0
  },
  finder4: {
    height: Dimensions.get('window').height * .1,
    width: Dimensions.get('window').width * .2,
    marginTop: Dimensions.get('window').height * .2,
    marginLeft: Dimensions.get('window').width * .45,
    borderWidth: 2,
    borderLeftWidth: 0,
    borderTopWidth: 0
  }
});
