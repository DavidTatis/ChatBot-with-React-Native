import React from 'react';
import {Text, View, AppRegistry} from 'react-native';

const Header=(props)=>{

	const {viewStyle, textStyle}= Styles;
	return (
	<View style={viewStyle}>
		<Text style={textStyle}>{props.headerText}</Text>
	</View>
	);
}

const Styles={
	textStyle:{
		fontSize: 30,
    	color: '#000000',
    	textShadowOffset: {width:0, height:3},
    	textShadowColor: '#ff0000'
	},
	viewStyle:{
		backgroundColor: '#E3F2FD',
		justifyContent: 'center',
		alignItems: 'center',
		height:80,
		paddingTop: 30,
		shadowColor: '#ff0000',
		shadowOffset: {width:0, height:4},
		shadowOpacity: 0.2,
		elevation: 2,
		position: 'relative'
	}

};


export default Header;