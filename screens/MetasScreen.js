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
    state = { currentUser: null, email: null, estatura: null, metas: [], score: 0 }
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
            this.setState({ email: user.email, estatura: user.estatura });
            that = this;
            metas.forEach(function (value, key) {

                firebase.database().ref('/progreso/usuarios/' + currentUser.uid + '/metas/' + key + '/')
                    .once('value', (snapshot) => {
                        progreso = snapshot.val();
                        if (progreso !== null) {
                            var keyObj = "";
                            keyObj = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length-1];
                            var progresoObject = progreso[keyObj + ""];
                            var progresoScore = progresoObject["score"];
                            METAS.push({
                                descripcion: value,
                                score: progresoScore
                            });
                            // this.setState({ metas: METAS });
                        }
                        that.setState({ metas: METAS })
                    }).then(

                    );


            });

        });


    }

    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="flag" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    calcularScoreTotal = (array) => {
        if (array.length >=3 && this.state.score===0) {
            var score = 0;
            var cont = 0;
            array.forEach(element => {
                score += element["score"];
                cont++;
            });
            score = score / cont;
            this.setState({ score: score });
        }

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
                    {this.calcularScoreTotal(this.state.metas)}
                    {
                        (this.state.metas).map((element, i) => {

                            return (
                                <Card key={i}>
                                    <Text style={{ fontSize: 20, fontFamily: "Arial", marginLeft: 8 }}>{element.descripcion}.</Text>
                                    <CardSection>
                                        <Text style={{ fontSize: 15, fontFamily: "Arial", fontWeight: "bold" }}>score: {(element.score).toFixed(2)}</Text>
                                    </CardSection>
                                </Card>
                            )
                        }
                        )
                    }
                    <CardSection>
                        <Text style={{ fontSize: 18, fontFamily: "Arial", fontWeight: "bold" }}>Score total: {(this.state.score).toFixed(2)}</Text>
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
