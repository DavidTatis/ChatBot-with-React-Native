import React from 'react';
import {View} from 'react-native';
const CardSection= (props) =>{
	return(
		<View style={styles.containerStyle}>
			{props.children}
		</View>
	);

};

const styles={
	containerStyle:{
		borderBottomWidth:1,
		padding: 5,
		backgroundColor:'rgba(250, 250, 250, 0.3)',
		justifyContent: 'flex-start',
		flexDirection:'row',
		borderColor: '#000',
		position: 'relative'
	}
};

export default CardSection;