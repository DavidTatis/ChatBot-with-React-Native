import React from 'react';
import {
  StyleSheet, Text, View, StatusBar, Button, Platform, SafeAreaView, ScrollView, Dimensions,
  Image
} from 'react-native';
import { ImageBackground, createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import firebase from 'firebase';
import Spinner from './screens/components/Spinner';
import LoginScreen from './screens/LoginScreen';
import MetasScreen from './screens/MetasScreen';
import MainScreen from './screens/MainScreen';

const email = "xx";
const METAS = [];
const user = '';
let userAvatar = 'avatar.png';


export default class App extends React.Component {
  state = { loggedIn: null, score: "33", sexo: '', email: user.email, metas: METAS, estatura: user.estatura };

  componentWillMount() {
    var config = {
      apiKey: "AIzaSyDLbE80J5le-MjtEZuilqYe4UJl78fE1u8",
      authDomain: "proyectofinal-f71a5.firebaseapp.com",
      databaseURL: "https://proyectofinal-f71a5.firebaseio.com",
      projectId: "proyectofinal-f71a5",
      storageBucket: "proyectofinal-f71a5.appspot.com",
      messagingSenderId: "144874976337"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        firebase.database().ref('/usuarios/' + currentUser.uid).once('value', (snapshot) => {
          user = snapshot.val();
          if (user.metas === undefined) {
            firebase.auth().signOut()
          } else {
            metas = user.metas;
            METAS = [];
            metas.forEach(function (value, key) {
              METAS.push(key + " - " + value);
            });

            userAvatar = user.sexo === "Masculino" ? require('./assets/avatarMan.jpg') : require('./assets/avatar.png');
            this.setState({ loggedIn: true, sexo: user.sexo, email: user.email, metas: METAS, estatura: user.estatura });
          }
        })


      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  render() {

    return (
      <View style={{ flex: 1, marginTop: (Platform.OS === 'ios') ? 18 : 24 }}>
        {this.displayLoginOrNot()}
      </View>

    );
  }

  displayLoginOrNot() {
    switch (this.state.loggedIn) {
      case true:
        email = this.state.email;
        return (<AppDrawerNavigator style={{ flex: 1, marginTop: (Platform.OS === 'ios') ? 18 : 24 }} />);
      case false:
        return (
            <MainScreen />
        )
      default:
        return <Spinner size="large" />
    }
  }



}


const { width } = Dimensions.get('window');

const CustomDrawnerComponent = (props) => (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Image source={userAvatar} style={{ height: 120, width: 120, borderRadius: 60 }}></Image>
    </View>
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 15 }}>{email}</Text>
    </View>

    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
    <View>
      <Button title="Logout" onPress={() => firebase.auth().signOut()} />
    </View>
  </SafeAreaView>
)



const AppDrawerNavigator = createDrawerNavigator({
  ChatBot: HomeScreen,
  Profile: ProfileScreen,
  Metas: MetasScreen
},
  {
    contentComponent: CustomDrawnerComponent,
    drawerWidth: width,
    contentOptions: {
      activeTintColor: 'orange'
    }
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export const Login = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  // Main:{
  //     screen:MainScreen
  // }
})