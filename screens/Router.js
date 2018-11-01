import React from 'react';
import {createStackNavigator,createSwitchNavigator} from 'react-navigation';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';

export const Login=createStackNavigator({
    LoginScreen:{
        screen:LoginScreen
    },
    // Main:{
    //     screen:MainScreen
    // }
})
export const rootNavigator=(value=true)=>{
    createSwitchNavigator({
        LoginScreen:{
            screen:LoginScreen
        }
    },{
        initialRouteName:value? 'LoginScreen': 'MainScreen'
    })
}