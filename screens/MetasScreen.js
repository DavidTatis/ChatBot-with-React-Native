import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Left, Right, Icon, ActivityIndicator } from 'native-base';
import firebase from 'firebase';
import Card from './components/card.js';
import CardSection from './components/cardsection.js';


const user = {};
const METAS = [];
const scores = [];
const progreso = {};


export default class MetasScreen extends React.Component {
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
                firebase.database().ref('/progreso/usuarios/' + currentUser.uid + '/metas/' + key + '/')
                    .once('value', (snapshot) => {
                        progreso = snapshot.val();
                        if (progreso !== null) {
                            console.log("progreso:", progreso);
                        }

                    });

                METAS.push({
                    'descripcion': value,
                    'score': progreso.score
                });
            });
            this.setState({ email: user.email, metas: METAS, estatura: user.estatura });
        });


    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="flag" style={{ fontSize: 24, color: tintColor }} />
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
                <Card>
                    <CardSection>
                        <Text style={{ fontSize: 24, fontFamily: "Arial", margin: 5, marginTop: 10 }}>Tus Metas</Text>
                    </CardSection>
                    {
                        (this.state.metas).map((element, i) => {
                            return (
                                <Card key={i}>
                                    <Text style={{ fontSize: 20, fontFamily: "Arial", marginLeft: 8 }}>{element.descripcion}.</Text>
                                    <CardSection>
                                        <Text style={{ fontSize: 15, fontFamily: "Arial", fontWeight: "bold" }}>score: {element.scsore}</Text>
                                    </CardSection>
                                </Card>
                            )
                        }
                        )
                    }
                    <CardSection>
                        <Text style={{ fontSize: 18, fontFamily: "Arial", fontWeight: "bold" }}>Score total: 69</Text>
                    </CardSection>
                </Card>


            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
