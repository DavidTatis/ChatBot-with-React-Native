import React from 'react';
import { AppRegistry, Text, View, StatusBar, ImageBackground, Image } from 'react-native';
import { Left, Right, Icon, ActivityIndicator } from 'native-base';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import Card from './components/card.js';
import CardSection from './components/cardsection.js';
import Spinner from './components/Spinner.js';
import Header from './components/header.js';
import { createStackNavigator, StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';


export default class MainScreen extends React.Component {
    state = { main: true };
    renderOrNot() {
        if (this.state.main === true) {
            return (<Card>

                {/* <Image source={require('../assets/botImg.png')} style={{
                            margin: 20, justifyContent: 'center',
                            alignItems: 'center', height: 120, width: 120, borderRadius: 60
                        }}></Image> */}

                <CardSection >
                    <View style={{
                        padding:30,
                        height: 150,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                      <Text style={{ fontSize: 32,paddingBottom:50 }}>Bienvenido a MediBot</Text>  
                    </View>
                </CardSection>
                <CardSection>
                    <View style={{
                        height: 300,
                        padding:30,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                    
                        <Text style={{ fontSize: 16,textAlign:'justify' }}>MediBot es una plataforma de seguimiento y acompañamiento de pacientes con Diabetes Tipo 2.{"\n"}Creada para ayudarlos a completar los objetivos alimenticios propuestos por su personal médico especialista.</Text>
                        {/* <Image  source={require('../assets/captura.png')}>
                        </Image> */}
                    </View>
                </CardSection>
                <CardSection>
                    <View style={{
                        height: 100,
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }}>
                        <Button
                            raised
                            onPress={() => this.setState({ main: false })}
                            title="Inicia sesion"
                            backgroundColor="#000000"
                            style={{ width: 300 }}
                        />
                    </View>
                </CardSection>
            </Card>
            )
        } else {
            return (<View>
                <LoginScreen />
                <Button
                    raised
                    onPress={() => this.setState({ main: true })}
                    title="Atras"
                    backgroundColor="#000000"
                    style={{ width: 100, alignItems: 'center' }}
                />
            </View>)
        }
    }
    render() {
        return (
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} resizeMode='cover' source={require('../assets/wp.jpg')}>
                {/* <Header headerText={'Bienvenido'} /> */}
                {this.renderOrNot()}
            </ImageBackground>
        );
    }


}