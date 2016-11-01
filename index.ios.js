import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, View } from 'react-native';
import Camera from 'react-native-camera';
import Header from './IOScomponents/header.ios.js';
import Message from './IOScomponents/message.ios.js';
import SnapCam from './IOScomponents/snapCam.ios';
import BottomNav from './IOScomponents/bottomNav.ios';
import Logic from './logicIOS/logic'

export default class SnapMate extends Component {
  constructor(props) {
    super(props)
    this.logic = new Logic();
    this.state = {
      finderColor: { borderColor: "whitesmoke" },
      messageColor: { backgroundColor: "#00BCD4" },
      barcodeRunning: false,
      showMessage: false,
      message: ""
    };
  }
  render() {
    return (
      <View style={styles.container}>
      { this.state.showMessage && <View style={styles.overlay}></View>}
        { this.state.showMessage && <Message close={this.logic.closeModal.bind(this)} message={this.state.message} messageColor={this.state.messageColor} />}
        <Header/>
        <SnapCam finderColor={this.state.finderColor} onBarCodeRead={this.logic.takeCode.bind(this)} />
        <BottomNav func={this.logic.takePicture.bind(this)}/>
      </View>
    );
  }
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
