import React, { Component } from 'react';
import { StyleSheet, Dimensions, TouchableHighlight, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GIcon from 'react-native-vector-icons/MaterialIcons';

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  render() {
    return (
        <View style={styles.topNav}>
          <Text style={{ fontSize: 35, fontWeight: "600", color: 'lightgrey' }}>SnapMate</Text>
          <Icon style={{ marginTop: 4, marginLeft: 10 }} name="barcode" size={35} color="#00BCD4" />
        </View>
    );
  }
}
const styles = StyleSheet.create({
  
  topNav: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "#eeeeee",
    width: Dimensions.get('window').width,
    paddingTop: 45,
    paddingLeft: 5,
    height: 100,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
});

//AppRegistry.registerComponent('SnapMate', () => SnapMate);
