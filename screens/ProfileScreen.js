import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Header, Left, Right, Icon, ActivityIndicator } from 'native-base';
import firebase from 'firebase';


const user = {};
const METAS = [];


export default class ProfileScreen extends React.Component {
  state = { currentUser: null, email: null, estatura: null, metas: [] }
  componentDidMount() {
    const { currentUser } = this.state;
  }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.database().ref('/usuarios/' + currentUser.uid).once('value', (snapshot) => {
      user = snapshot.val();
      metas = user.metas;
      METAS = [];
      metas.forEach(function (value, key) {
        METAS.push(key + " - " + value);
      });
      this.setState({ email: user.email, metas: METAS, estatura: user.estatura });
    })
  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="person" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  render() {

    return (
      <View>
        <Header>
          <Left style={{ flex: 1 }}>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
        </Header>

        <Text>Email: {this.state.email}</Text>
        <Text>Estatura: {this.state.estatura}</Text>

      </View>
    )
  }
}

// export function getMetas(){
//   return firebase.database().ref('metas/').once('value').then(function(snapshot) {
//     var username = (snapshot.val() && snapshot.val()) || 'Anonymous';
//     x=username;
//   });
// }

// export function getQuotes(callback) {
//   const quotesRef =firebase.database().ref('metas/1');

//   //start listening for new data
//   quotesRef.on('value', function(snapshot) {
//       callback(true, snapshot, null);
//       x=snapshot;
//   });
// }

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
