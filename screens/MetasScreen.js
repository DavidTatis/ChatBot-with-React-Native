import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header, Left, Right, Icon, ActivityIndicator } from 'native-base';
import firebase from 'firebase';
import Card from './components/card.js';
import CardSection from './components/cardsection.js';
import { Button } from 'react-native-elements';
import moment from 'moment';
import Emoji from 'react-native-emoji';

const user = {};
const METAS = [];
const scores = [];
const progreso = [];


export default class MetasScreen extends React.Component {
    state = { currentUser: null, email: null, estatura: null, metas: [], score: 0 }
    componentDidMount() {
        const { currentUser } = this.state;
    }

    componentWillMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        var year = moment().format('YYYY');
        var week = moment().format('WW');
        firebase.database().ref('/usuarios/' + currentUser.uid).once('value', (snapshot) => {
            user = snapshot.val();
            metas = user.metas;
            METAS = [];
            this.setState({ email: user.email, estatura: user.estatura });
            that = this;
            metas.forEach(function (value, key) {

                firebase.database().ref('/progreso/usuarios/' + currentUser.uid + '/' + year + '/' + (week - 1) + '/metas/' + key + '/')
                    .once('value', (snapshot) => {
                        progreso = snapshot.val();
                        var progresoArray = [];
                        progreso = Object.keys(progreso).map(function (key) {
                            progresoArray.push(
                                progreso[key]
                            );
                        });
                        progreso = progresoArray;
                        var respuestas = 0;
                        console.log("year,week,progreso", year, week, progreso);
                        if (progreso !== null) {
                            progreso.forEach(function (element) {
                                respuestas += Number(element["respuesta"]);
                            });
                            console.log("Respuesta", respuestas);
                            // var keyObj = "";
                            // keyObj = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1];
                            // var progresoObject = progreso[keyObj + ""];
                            // var progresoScore = progresoObject["score"];
                            METAS.push({
                                descripcion: value,
                                metaid: key,
                                score: respuestas
                            });
                            // this.setState({ metas: METAS });
                        }
                        console.log("metas: ", METAS);
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
        if (array.length >= 3 && this.state.score === 0) {
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

    calcularComentario = (score, meta) => {
        switch (meta) {
            case 1:
                if (Number(score) < 150) {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                } else {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                            {"  "}Sigue asi!{"  "}
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                        </Text>);
                }
                break;

            case 2:
                if (Number(score) < 2) {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                } else {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                            {"  "}Sigue asi!{"  "}
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                        </Text>);
                }
                break;
            case 3:
                if (Number(score) < 35) {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                } else {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                            {"  "}Sigue asi!{"  "}
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                        </Text>);
                }
                break;
            case 4:
                if (Number(score) < 21) {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                } else {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                            {"  "}Sigue asi!{"  "}
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                        </Text>);
                }
                break;
            case 5:
                if (Number(score) < 28) {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                } else {
                    return (
                        <Text style={{textAlign:'center'}}>
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                            {"  "}Sigue asi!{"  "}
                            <Emoji name="tada" style={{ fontSize: 30 }} />
                        </Text>);
                }
                break;
            default:
                return (
                    <Text style={{textAlign:'center'}}>
                        <Emoji name="muscle" style={{ fontSize: 30 }} />
                        {"  "}Animo, tu puedes dar mas!{"  "}
                        <Emoji name="muscle" style={{ fontSize: 30 }} />
                    </Text>);
                break;
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
                                        <Text style={{ fontSize: 15, fontFamily: "Arial" }}>Tu resultado de la semana anterior:
                                            <Text style={{ fontSize: 15, fontFamily: "Arial", fontWeight: "bold" }}>{" "}{(element.score)}</Text>
                                        </Text>
                                        <Text style={{ fontSize: 17, fontFamily: "Arial" }}>{"\n"}{this.calcularComentario(element.score, element.metaid)}</Text>
                                    </CardSection>
                                    {/* <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                                        <Button
                                            raised
                                            icon={{ name: 'send' }}
                                            title=""
                                            backgroundColor="#00f"
                                            style={{ width: 100 }}
                                        />
                                    </View> */}

                                </Card>
                            )
                        }
                        )
                    }
                    {/* <Card>
                        <CardSection>
                            <Text style={{ fontSize: 18, fontFamily: "Arial", fontWeight: "bold" }}>Score total: {(this.state.score).toFixed(2)}</Text>
                        </CardSection>
                    </Card> */}

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
