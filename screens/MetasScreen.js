import React from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import { StackNavigator, createBottomTabNavigator } from 'react-navigation';
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



class MetasSemanaAnterior extends React.Component {
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
                        if (progreso !== null) {
                            var progresoArray = [];
                            progreso = Object.keys(progreso).map(function (key) {
                                progresoArray.push(
                                    progreso[key]
                                );
                            });
                            progreso = progresoArray;
                            var respuestas = 0;
                            console.log("year,week,progreso", year, week, progreso);
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
                        } else {
                            METAS.push({
                                descripcion: value,
                                metaid: key,
                                score: 'Aun no has registrado datos.'
                            });
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

        if (typeof (score) !== 'string') {
            switch (meta) {
                case 1:
                    if (Number(score) < 150) {
                        score = score + ' Minutos';
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;

                case 2:
                    if (Number(score) < 2) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 3:
                    if (Number(score) < 35) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 4:
                    if (Number(score) < 21) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 5:
                    if (Number(score) < 28) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                default:
                    return (
                        <Text style={{ textAlign: 'center' }}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                    break;
            }
        } else {
            return null;
        }

    }

    render() {

        return (
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} resizeMode='cover' source={require('../assets/wp.jpg')}>
                <Header>
                    <Left style={{ flex: 1 }}>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                </Header>
                <Card>
                    <CardSection>
                        <Text style={{ fontSize: 24, fontFamily: "Arial", margin: 5, marginTop: 10 }}>Tus Metas - Semana Anterior</Text>
                    </CardSection>
                    {this.calcularScoreTotal(this.state.metas)}
                    {
                        (this.state.metas).map((element, i) => {

                            return (
                                <Card key={i}>
                                    <Text style={{ fontSize: 20, fontFamily: "Arial", marginLeft: 8 }}>{element.descripcion}.</Text>
                                    <Text style={{ fontSize: 15, fontFamily: "Arial" }}>Tu resultado de la semana anterior:</Text>
                                    <Text style={{ fontSize: 15, fontFamily: "Arial", fontWeight: "bold" }}>{" "}{(element.score)}</Text>
                                    <Text style={{ fontSize: 17, fontFamily: "Arial" }}>{"\n"}{this.calcularComentario(element.score, element.metaid)}</Text>
                                    <CardSection>
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


            </ImageBackground>
        )
    }
}

class MetasScreen extends React.Component {
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
                firebase.database().ref('/progreso/usuarios/' + currentUser.uid + '/' + year + '/' + (week) + '/metas/' + key + '/')
                    .once('value', (snapshot) => {
                        progreso = snapshot.val();
                        if (progreso !== null) {
                            var progresoArray = [];
                            progreso = Object.keys(progreso).map(function (key) {
                                progresoArray.push(
                                    progreso[key]
                                );
                            });
                            progreso = progresoArray;
                            var respuestas = 0;
                            console.log("year,week,progreso", year, week, progreso);
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
                        } else {
                            METAS.push({
                                descripcion: value,
                                metaid: key,
                                score: 'Aun no has registrado datos.'
                            });
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

        if (typeof (score) !== 'string') {
            switch (meta) {
                case 1:
                    if (Number(score) < 150) {
                        score = score + ' Minutos';
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;

                case 2:
                    if (Number(score) < 2) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 3:
                    if (Number(score) < 35) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 4:
                    if (Number(score) < 21) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                case 5:
                    if (Number(score) < 28) {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                                {"  "}Animo, tu puedes dar mas!{"  "}
                                <Emoji name="muscle" style={{ fontSize: 30 }} />
                            </Text>);
                    } else {
                        return (
                            <Text style={{ textAlign: 'center' }}>
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                                {"  "}Sigue asi!{"  "}
                                <Emoji name="tada" style={{ fontSize: 30 }} />
                            </Text>);
                    }
                    break;
                default:
                    return (
                        <Text style={{ textAlign: 'center' }}>
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                            {"  "}Animo, tu puedes dar mas!{"  "}
                            <Emoji name="muscle" style={{ fontSize: 30 }} />
                        </Text>);
                    break;
            }
        } else {
            return null;
        }

    }

    render() {

        return (
            <ImageBackground style={{ width: '100%', height: '100%', flex: 1 }} resizeMode='cover' source={require('../assets/wp.jpg')}>
                <Header>
                    <Left style={{ flex: 1 }}>
                        <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
                    </Left>
                </Header>
                <Card>
                    <CardSection>
                        <Text style={{ fontSize: 24, fontFamily: "Arial", margin: 5, marginTop: 10 }}>Tus Metas - Semana Actual</Text>
                    </CardSection>
                    {this.calcularScoreTotal(this.state.metas)}
                    {
                        (this.state.metas).map((element, i) => {

                            return (
                                <Card key={i}>
                                    <Text style={{ fontSize: 20, fontFamily: "Arial", marginLeft: 8 }}>{element.descripcion}.</Text>
                                    <Text style={{ fontSize: 15, fontFamily: "Arial" }}>Tu resultado de la semana anterior:</Text>
                                    <Text style={{ fontSize: 15, fontFamily: "Arial", fontWeight: "bold" }}>{" "}{(element.score)}</Text>
                                    <Text style={{ fontSize: 17, fontFamily: "Arial" }}>{"\n"}{this.calcularComentario(element.score, element.metaid)}</Text>
                                    <CardSection>
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


            </ImageBackground>
        )
    }
}

export default createBottomTabNavigator({
    'Esta Semana': MetasScreen,
    'Semana Anterior': MetasSemanaAnterior,
}, {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === 'Esta Semana') {
                    iconName = `ios-arrow-dropdown${focused ? '-circle-outline' : ''}`;
                } else if (routeName === 'Semana Anterior') {
                    iconName = `ios-archive${focused ? '' : '-outline'}`;
                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor} />;
            },
            drawerIcon: ({ tintColor }) => {
            return<Icon name="flag" style={{ fontSize: 24, color: tintColor }} />
            }
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    });
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
