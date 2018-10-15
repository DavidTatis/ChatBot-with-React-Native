// Login.js
import React from 'react';
import { View, Text, Image, TextInput, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { Hoshi } from 'react-native-textinput-effects';

class RespuestaChatBot extends React.Component {
    state = { respuesta: 0 };

    disabledBtn = false;
    onButtonPress() {
        var currentDate = new Date();
        currentDate = currentDate.getTime();
        var score = this.state.respuesta / this.props.correctValue;
        score=score*100;
        if(this.state.respuesta>=this.props.correctValue){ 
            score=100;
        }
        
        const { currentUser } = firebase.auth()
        firebase.database()
            .ref('progreso/usuarios/' + currentUser.uid + '/metas/' + this.props.meta)
            .child(currentDate)
            .set({
                'respuesta': this.state.respuesta,
                'score': score
            }).then((data) => {
                //success callback
                if (this.state.respuesta >= this.props.correctValue) {
                    this.props.triggerNextStep({ trigger: this.props.currentStep + 1 });
                } else {
                    this.props.triggerNextStep({ trigger: this.props.currentStep + 4 });
                }
                this.disabledBtn = true;
            }).catch((error) => {
                //error callback
                console.log('error ', error)
            })


    }

    renderButton() {
        return (
            <Button
                raised
                onPress={this.onButtonPress.bind(this)}
                icon={{ name: 'check' }}
                backgroundColor="#3333ff"
                disabled={this.disabledBtn}
                style={{ width: 50, marginTop: 15 }}
            />);

    }

    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <Hoshi
                    keyboardType='numeric'
                    value={this.state.respuesta}
                    onChangeText={respuesta => this.setState({ respuesta })}
                    editabled={!this.disabledBtn}
                    style={{ width: 150 }}
                    borderColor={'#000000'}
                    backgroundColor={'#ffffff'}
                />
                {this.renderButton()}
            </View>
        );
    }
};


export default RespuestaChatBot;
