import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import GIcon from 'react-native-vector-icons/MaterialIcons';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';

export default class SnapCam extends Component {
  render() {
    return (
      <View style={styles.options}>
        <Option1 onPress={this.props.setTorch} />
        <Option2 onPress={this.props.setType} />
        <Option3 />
        <Option4 />
      </View>
    );
  }
}

function makeButton(text, color) {
  return new MKButton.Builder()
    .withBackgroundColor(color || MKColor.Transparent)
    .withFab(true)
    .withRippleLocation('center')
    .withRippleColor(getTheme().bgPlain)
    .withText(text)
    .build();
}
const Option1 = makeButton(<GIcon name="highlight" size={22} color="#333" />, MKColor.Silver);
const Option2 = makeButton(<GIcon name="switch-camera" size={22} color="#333" />);
const Option3 = makeButton(<GIcon name="zoom-in" size={22} color="#333" />);
const Option4 = makeButton(<GIcon name="zoom-out" size={22} color="#333" />);

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
  }
});
