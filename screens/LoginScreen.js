// Login.js
import React from 'react';
import { View, Text, Image, TextInput, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import Card from './components/card.js';
import CardSection from './components/cardsection.js';
import Spinner from './components/Spinner.js';
import { Hoshi } from 'react-native-textinput-effects';
import Header from './components/header.js';



class Login extends React.Component {
	state = { email: '', password: '', error: '', loading: false };
	onButtonPress() {
		this.setState({ error: '', loading: true });
		const { email, password } = this.state;
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(this.onLoginSuccess.bind(this))
			.catch( this.onLoginFail.bind(this));
	}

	registrar() {
		this.setState({ error: '' });
		const { email, password } = this.state;
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.catch(() => {
				this.setState({ error: '*Registro invalido.' });
			});

	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			loading: false,
			error: 'inicio exitoso'
		});
	}

	onLoginFail() {
		this.setState({
			error: '*Usuario o contraseña incorrecta.',
			loading: false
		});
	}


	renderButton() {
		if (this.state.loading) {
			return <Spinner size="small" />
		}
		return (
			<Button
				raised
				onPress={this.onButtonPress.bind(this)}
				icon={{ name: 'send' }}
				title="Ingresar"
				backgroundColor="#3333ff"
				style={{ width: 300 }}
			/>);

	}

	render() {
		return (
			<Card>
				<Header headerText={'Inicia Sesion'} />
				<CardSection>
					<View style={{
						backgroundColor:'#ffffff',
						height: 250,
						flex: 1,
						flexDirection: 'column',
						justifyContent: 'space-around',
						alignItems: 'center'
					}}
					>
						<Text style={{ color: 'red', fontSize: 16 }}>
							{this.state.error}
						</Text>
						<Hoshi
							value={this.state.email}
							onChangeText={email => this.setState({ email })}
							label={'Usuario'}
							style={{ width: 300 }}
							borderColor={'#000000'}
							backgroundColor={'#ffffff'}
						/>
						<Hoshi
							secureTextEntry
							value={this.state.password}
							onChangeText={password => this.setState({ password })}
							label={'Contraseña'}
							style={{ width: 300 }}
							borderColor={'#000000'}
							backgroundColor={'#ffffff'}
						/>
						{this.renderButton()}
					</View>
				</CardSection>
			</Card>
		);
	}
};


export default Login;
