import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Dimensions, ouchableHighlight, Text, View } from 'react-native';
import Camera from 'react-native-camera';
import Icon from 'react-native-vector-icons/FontAwesome';
import GIcon from 'react-native-vector-icons/MaterialIcons';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';
import ViewFinder from './viewFinder.ios.js';
import OptGroup from './optGroup.ios.js';

export default class SnapCam extends Component {
  constructor(props) {
    super(props)
    this.state = {
      camType: "back",
      torchMode: Camera.constants.TorchMode.off
    };
  }
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          } }
          style={styles.preview}
          keepAwake={true}
          onBarCodeRead={this.props.onBarCodeRead}
          captureAudio={false}
          type={this.state.camType}
          torchMode={this.state.torchMode}
          pinchToZoom={true}
          aspect={Camera.constants.Aspect.fill}>
        </Camera>
        <ViewFinder finderColor={this.props.finderColor}/>
        <OptGroup setTorch={this.setTorch.bind(this)} setType={this.setType.bind(this)}/>
      </View>
    );
  }
    setTorch() {
    if (this.state.torchMode === Camera.constants.TorchMode.off) {
      this.setState({ torchMode: Camera.constants.TorchMode.on });
    } else {
      this.setState({ torchMode: Camera.constants.TorchMode.off });
    }
  }
  setType() {
    if (this.state.camType === "back") {
      this.setState({ camType: "front" });
    } else {
      this.setState({ camType: "back" });
    }
  }
}
const styles = StyleSheet.create({
  options: {
    alignItems: "stretch",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: 15,
    backgroundColor: "transparent",
    width: Dimensions.get('window').width * .3,
    paddingTop: 5,
    paddingLeft: 5,
    height: 55,
  },
  preview: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    height: Dimensions.get('window').height * .5,
    width: Dimensions.get('window').width,
    top: 0,
    marginBottom: 0
  }
});
