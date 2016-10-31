import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';

const ModalButton = MKButton.flatButton()
  .withText(<Text style={{ fontSize: 22, color: "rgba(250,250,250, .85)" }}>Got It &#10003;</Text>)
  .withBackgroundColor(MKColor.Transparent)
  .withRippleColor("rgba(0,0,0, .15)")
  .build();

export default class Message extends Component {
  render() {
    return (
        <View style={[styles.messageContainer, this.props.messageColor]}>
          <Text style={styles.title}>SnapMate</Text>
          <Text style={styles.message}>{this.props.message}</Text>
          <ModalButton style={styles.mesButton} onPress={this.props.close} />
        </View>
    );
  }
}
const styles = StyleSheet.create({

  mesButton: {
    height: 40,
    width: 100,
    padding: 5,
    borderWidth: 2,
    borderColor: "rgba(250,250,250, .85)",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10
  },
  title: {
    marginTop: 10,
    marginLeft: 15,
    fontSize: 25,
    fontWeight: "600",
    color: 'rgba(250,250,250, .85)'
  },
  message: {
    fontSize: 17,
    marginLeft: 15,
    fontWeight: "600",
    color: "rgba(250,250,250, .85)",
    marginTop: 5,
    lineHeight: 25,
  },
  messageContainer: {
    backgroundColor: "#00BCD4",
    position: "absolute",
    left: 0,
    zIndex: 200,
    opacity: 1,
    top: Dimensions.get('window').height * .25,
    width: Dimensions.get('window').width * .5,
    marginLeft: Dimensions.get('window').width * .25,
    shadowColor: "#000000",
    shadowOpacity: 0.95,
    shadowRadius: 75,
    shadowOffset: {
      height: 1,
      width: 0
    },
    borderRadius: 2,
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

