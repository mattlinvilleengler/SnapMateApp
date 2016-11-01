import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MKButton, MKColor, getTheme } from 'react-native-material-kit';

export default class BottomNav extends Component {
  constructor(props) {
    super(props)
    this.state = {
    };
  }
  render() {
    return (
      <View style={styles.cont}>
        <View style={{ zIndex: 5 }}>
          <ColoredRaisedButton onPress={this.props.func} />
        </View>
        <View style={styles.bottomNav}>
          <Icon style={styles.bIcon} name="user-circle-o" size={25} color="#999" />
          <Icon style={styles.bIcon} name="shopping-cart" size={25} color="#999" />
          <Icon style={styles.bIcon} name="shopping-bag" size={25} color="#999" />
          <Icon style={styles.bIcon} name="phone" size={25} color="#999" />
        </View>
      </View>
    );
  }
}
const ColoredRaisedButton = MKButton.coloredFab()
  .withText(<Icon name="camera" size={15} color="#333" />)
  .withBackgroundColor(MKColor.Cyan)
  .build();

const styles = StyleSheet.create({

  bottomNav: {
    alignItems: "stretch",
    flexWrap: "wrap",
    flexDirection: "row",
    marginTop: -25,
    backgroundColor: "#eeeeee",
    width: Dimensions.get('window').width,
    paddingTop: 5,
    paddingLeft: 5,
    height: 55,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
  },
  bIcon: {
    marginTop: 10,
    width: Dimensions.get('window').width * .24,
    textAlign: 'center'
  },
  cont: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0
  }
});
