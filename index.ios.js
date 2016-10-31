import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, ouchableHighlight, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GIcon from 'react-native-vector-icons/MaterialIcons';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';
import Header from './IOScomponents/header.ios.js';
import Message from './IOScomponents/message.ios.js';
import SnapCam from './IOScomponents/snapCam.ios.js';
import BottomNav from './IOScomponents/bottomNav.ios.js';

export default class SnapMate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finderColor: { borderColor: "whitesmoke" },
      messageColor: { backgroundColor: "#00BCD4" },
      barcodeRunning: false,
      showMessage: false,
      message: "",
      na: null
    };
  }
  render() {
    return (
      <View style={styles.container}>
      { this.state.showMessage && <View style={styles.overlay}></View>}
        { this.state.showMessage && <Message close={this.closeModal.bind(this)} message={this.state.message} messageColor={this.state.messageColor} />}
        <Header/>
        <SnapCam finderColor={this.state.finderColor} onBarCodeRead={this.takeCode.bind(this)} />
        <BottomNav func={this.takeCode.bind(this)}/>
      </View>
    );
  }
  takeCode(e) {
    var self = this;
    if (self.state.barcodeRunning === false) {
      self.setState({ barcodeRunning: true });
      self.setState({ finderColor: { borderColor: "#00BCD4" } });
      var x = self.findCode(e.data);
      setTimeout(function () {
        self.setState({ showMessage: true });
        if (x.success == true) {
          self.setState({ message: x.name + "\n #" + e.data });
        } else {
          self.setState({ messageColor: { backgroundColor: "#004d56" } });
          self.setState({ message: "Product is not currently in stock." });
        }
      }, 250)
    }
  }
  findCode(code) {
    res = { success: false, name: "" }
    for (var i = 0; i < products.length; i++) {
      if (+products[i].upc === +code) {
        res.success = true;
        res.name = products[i].product_name;
      }
    }
    return res;
  }
  closeModal() {
    this.setState({ showMessage: false });
    this.setState({ barcodeRunning: false });
    this.setState({ finderColor: { borderColor: "whitesmoke" } });
    this.setState({ messageColor: { backgroundColor: "#00BCD4" } });
  }
}

var products = [];
(function getProducts() {
  return fetch('https://snapmate-e09f3.firebaseio.com/products.json?print=pretty')
    .then((response) => response.json())
    .then((responseJson) => {
      products = parseResponse(responseJson);
      return responseJson;
    })
    .catch((error) => {
      console.error(error);
    });
})();

function parseResponse(res) {
  var arr = [];
  for (var r in res) {
    arr.push(res[r]);
  }
  return arr;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingTop: 0,
    alignItems: 'center'
  },
    overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 100,
    opacity: .85,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    backgroundColor: '#f9f9f9',
    overflow: "hidden"
  },
});


AppRegistry.registerComponent('SnapMate', () => SnapMate);
