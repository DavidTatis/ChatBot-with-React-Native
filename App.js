import React from 'react';
import { StyleSheet, Text, View, StatusBar,Button, Platform, SafeAreaView, ScrollView,Dimensions,
  Image} from 'react-native';
import {createDrawerNavigator,DrawerItems} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import firebase from 'firebase';
import Spinner from './screens/components/Spinner';
import LoginScreen from './screens/LoginScreen';




export default class App extends React.Component {
  state={loggedIn: null};
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

    firebase.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({loggedIn:true});
      }else{
        this.setState({loggedIn:false});
      }
    });
  }

  render() {
    return (
      <View style={{flex:1,marginTop: (Platform.OS === 'ios') ? 18 : 24 }}>
        {this.displayLoginOrNot()}
      </View>
        
     );
  }

  displayLoginOrNot(){
    switch (this.state.loggedIn) {
      case true:
        return (<AppDrawerNavigator style={{ flex: 1, marginTop: (Platform.OS === 'ios') ? 18 : 24 }}/>);
      case false:
        return <LoginScreen />
      default:
          return <Spinner size="large"/>
    }
  }
}



const {width} = Dimensions.get('window');

const CustomDrawnerComponent= (props)=>(
  <SafeAreaView style={{flex:1}}>
    <View style={{height:150, backgroundColor:'white',alignItems:'center',justifyContent:'center'}}>
      <Image source={require ('./assets/avatar.png')} style={{height:120, width:120,borderRadius:60}}></Image>
    </View>
    
    <ScrollView>
      <DrawerItems {...props}/>
    </ScrollView>
    <View>
      <Button title="Logout" onPress={()=>firebase.auth().signOut()}/>
    </View>
  </SafeAreaView>
)

const AppDrawerNavigator = createDrawerNavigator({
    HomeScreen:HomeScreen,
    Profile:ProfileScreen
  },
  {
    contentComponent:CustomDrawnerComponent,
    drawerWidth:width,
    contentOptions:{
      activeTintColor:'orange'
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
