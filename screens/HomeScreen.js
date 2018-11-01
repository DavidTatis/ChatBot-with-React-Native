import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Alert } from 'react-native';
import ChatBot from 'react-native-chatbot';
import { Button } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import RespuestaChatBot from './components/respuestaChatBot';
import { Header, Left, Right, Icon, Spinner, Switch } from 'native-base';
import firebase from 'firebase';
import moment from 'moment';

const user = '';
const METAS = [];
const steps = [];
let ejerciciosHoy = "";
var didmount = false;
export default class HomeScreen extends React.Component {
  state = { currentUser: null, email: null, estatura: null, metas: [], respuestasMetas: [],loaded:0 }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    var year = moment().format('YYYY');
    var week = moment().format('WW');
    var day = moment().format('E');

    firebase.database().ref('/usuarios/' + currentUser.uid).once('value', (snapshot) => {
      user = snapshot.val();
      metas = user.metas;
      METAS = [];

      metas.forEach(function (value, key) {
        METAS.push(key);
      });
      var respuestasMetas = [];
      var that = this;
      var contWillMount=0;
      metas.forEach(function (value, key) {
        firebase.database().ref('/progreso/usuarios/' + currentUser.uid + '/' + year + '/' + week + '/metas/' + key + '/')
          .once('value', (snapshot) => {
            var progresoArray = [];
            if (snapshot !== null) {
              progreso = snapshot.val();
              try {
                progreso = Object.keys(progreso).map(function (key) {
                  progresoArray.push(
                    progreso[key]
                  );
                });
              } catch (err) { }
            }

            progreso = progresoArray;
            var respuestas = 0;
            if (progreso !== null) {
              progreso.forEach(function (element, key2) {
                respuestas += Number(element["respuesta"]);

              });
              var keyObj = "-1";
              try {
                keyObj = Object.keys(snapshot.val())[Object.keys(snapshot.val()).length - 1];
              } catch (err) { }

              // var progresoObject = progreso[keyObj + ""];
              // var progresoScore = progresoObject["score"];
              respuestasMetas[key] = {
                descripcion: value,
                ultimaRespuesta: keyObj,
                respuestas: respuestas
              };
              // this.setState({ metas: METAS });
              contWillMount++;
            }
            that.setState({ respuestasMetas: respuestasMetas,loaded:contWillMount })
          }).then(

          );
      });
      this.setState({ email: user.email, metas: METAS, estatura: user.estatura });
    })



  }

  componentDidUpdate() {
    this.didmount = true;
  }


  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    )
  }



  render() {
    if(this.state.loaded>=3){
      return (
        <View style={{ height: 650 }}>
          <Header>
            <Left style={{ flex: 1 }}>
              <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
            </Left>
          </Header>
          {
            this.displayChatBot()
          }
        </View>
      )
    }else{
      return null;
    }
    
  }

  ejerciciosHoy = false;


  validateDateOfQuestion(meta) {
    try {
      var returnBool = false;
      var objMeta = this.state.respuestasMetas[meta];
      if (objMeta.ultimaRespuesta !== "-1") {
        var date = new Date(Number(objMeta.ultimaRespuesta));
        var todayDay = new Date();
        var tday = moment(todayDay).format("DD");
        var day = moment(date).format("DD");
        var hora = moment(date).format("HH");
        // var day=moment(objMeta.ultimaRespuesta).format('dd HH');
        switch (meta) {
          case 1:
            if (day !== tday && Number(objMeta.respuestas) < 150) returnBool = true;
            break;

          case 2:
            if (day !== tday && Number(objMeta.respuestas) < 2 && (tday === 2 || tday === 6)) returnBool = true;
            break;

          case 3:
            if (Number(objMeta.respuestas) < 5) returnBool = true;
            break;

          case 4:
            if (Number(objMeta.respuestas) < 3) returnBool = true;
            break;

          case 5:
            if (Number(objMeta.respuestas) < 4) returnBool = true;
            break;

          case 6:
            break;

          case 7:
            break;

          case 8:
            break;

          case 9:
            break;

          case 10:
            break;

          case 11:
            break;

          case 12:
            break;

          case 13:
            break;

          case 14:
            break;

          case 15:
            break;

        }
        return returnBool;
      } else {
        return true;
      }

    } catch (err) {
      console.log("err");
    }

  }


  displayChatBot() {
    
      const { metas } = this.state;
      let idCont = 10;
      let steps = [];



      if (metas.includes(1) && this.validateDateOfQuestion(1)) {
        steps = [
          {
            id: '1',
            message: 'Y cuentame...',
            trigger: '2',
          },
          {
            id: '2',
            message: 'Cuantos minutos de ejercicios has hecho hoy?',
            trigger: 3
          },
          {
            id: '3',
            component: (<RespuestaChatBot correctValue={22} currentStep={3} meta={1} />),
            waitAction: true
          },

          {
            id: '4',
            message: 'Que bien',
            trigger: '5',
          },
          {
            id: '5',
            message: 'Recuerda que tienes que realizar 150 minutos a la semana',
            trigger: '6',
          },
          {
            id: '6',
            message: 'Te recomiendo que hagas al menos 25 minutos de ejercicio 6 dias a la semana.',
            trigger: idCont
          },
          {
            id: '7',
            message: 'Animate y realizalos',
            trigger: '8',
          },
          {
            id: '8',
            message: 'El ejercicio es fundamental para lograr mantener unos niveles adecuados de azucar',
            trigger: '9',
          },

          {
            id: '9',
            message: 'Si no te sientes bien llama a tu medico',
            trigger: idCont,
          }
        ];

      }

      if (metas.includes(2) && this.validateDateOfQuestion(2)) {
        steps.push(
          {
            id: idCont,
            message: 'Y cuentame...',
            trigger: idCont + 1,
          },
          {
            id: idCont + 1,
            message: '¿ Cuantos ejercicios de intensidad moderada has realizado hoy ?',
            trigger: idCont + 2,
          },
          {
            id: idCont + 2,
            component: (<RespuestaChatBot correctValue={1} currentStep={(idCont + 2)} meta={2} />),
            waitAction: true
          },
          {
            id: idCont + 3,
            message: 'Genial',
            trigger: idCont + 4,
          },
          {
            id: idCont + 4,
            message: 'Si te sientes con ganas de mas puedes aumentar el numero y la intensidad de los ejercicios',
            trigger: idCont + 5,
          },
          {
            id: idCont + 5,
            message: 'Prueba a inscribirte a un gimnasio',
            trigger: idCont + 9
          },
          {
            id: idCont + 6,
            message: 'Recuerda que no tienes que exigirte tanto',
            trigger: idCont + 7,
          },
          {
            id: idCont + 7,
            message: 'Lo recomendable es manejar bicicleta, o trotar a buen ritmo',
            trigger: idCont + 8,
          },
          {
            id: idCont + 8,
            message: 'Animo',
            trigger: idCont + 9,
          },
        );

        idCont = idCont + 9;

      }






      if (metas.includes(4) && this.validateDateOfQuestion(4)) {

        steps.push(
          {
            id: idCont,
            message: 'Y cuentame...',
            trigger: idCont + 1,
          },
          {
            id: idCont + 1,
            message: '¿ Cuantas porciones de frutas has comido durante el dia ?',
            trigger: idCont + 2,
          },
          {
            id: idCont + 2,
            component: (<RespuestaChatBot correctValue={3} currentStep={(idCont + 2)} meta={4} />),
            waitAction: true
          },
          {
            id: idCont + 3,
            message: 'Muy bien',
            trigger: idCont + 4,
          },
          {
            id: idCont + 4,
            message: 'Recuerda que debes comer mas de 3 porciones',
            trigger: idCont + 5,
          },
          {
            id: idCont + 5,
            message: 'Las frutas son la merienda perfecta, pero tambien son buenas en el desayuno y acompando ensaladas',
            trigger: idCont + 9
          },
          {
            id: idCont + 6,
            message: 'Tienes que comerlas',
            trigger: idCont + 7,
          },
          {
            id: idCont + 7,
            message: 'Ademas de ser muy ricas las frutas son importantisimas para nuestro cuerpo',
            trigger: idCont + 8,
          },
          {
            id: idCont + 8,
            message: 'Hay frutas para todos los gustos, y las puedas comer a cualquier hora',
            trigger: idCont + 9
          }
        );
        idCont = idCont + 9;

      }


      if (metas.includes(3) && this.validateDateOfQuestion(3)) {
        steps.push(
          {
            id: idCont,
            message: 'Y cuentame...',
            trigger: idCont + 1,
          },
          {
            id: idCont + 1,
            message: '¿Cuantas porciones de verduras comiste hoy?',
            trigger: idCont + 2,
          },
          {
            id: idCont + 2,
            component: (<RespuestaChatBot correctValue={5} currentStep={(idCont + 2)} meta={3} />),
            waitAction: true
          },
          {
            id: idCont + 3,
            message: 'Muy bien',
            trigger: idCont + 4,
          },
          {
            id: idCont + 4,
            message: '5 porciones de verdura al dia son indispensables para una dieta balanceada ',
            trigger: idCont + 5,
          },
          {
            id: idCont + 5,
            message: 'Prueba a comer gran variedad de verduras, todas aportan nutrientes especificos para nuestro cuerpo',
            trigger: idCont + 9
          },
          {
            id: idCont + 6,
            message: 'Puedes agregarlas en tu proxima comida',
            trigger: idCont + 7,
          },
          {
            id: idCont + 7,
            message: 'Las verduras van bien a cualquier hora ',
            trigger: idCont + 8,
          },

          {
            id: idCont + 8,
            message: 'Si no te gustan, encuentra la que mejor te sepa y usala lo que mas puedas, acompañada de otras',
            trigger: idCont + 9,
          },
        );
        idCont = idCont + 9;
      }

      if (metas.includes(5) && this.validateDateOfQuestion(5)) {
        steps.push(
          {
            id: idCont,
            message: 'Y cuentame...',
            trigger: idCont + 1,
          },
          {
            id: idCont + 1,
            message: '¿ Cuantas cucharadas de aceite de oliva virgen extra tomaste hoy?',
            trigger: idCont + 2,
          },
          {
            id: idCont + 2,
            component: (<RespuestaChatBot correctValue={4} currentStep={(idCont + 2)} meta={5} />),
            waitAction: true
          },
          {
            id: idCont + 3,
            message: 'Sigue asi',
            trigger: idCont + 4,
          },
          {
            id: idCont + 4,
            message: 'El aceite de oliva extra virgen antes del desayuno ayuda a mejorar la absorcion de nutrientes de nuestro cuerpo',
            trigger: idCont + 5,
          },
          {
            id: idCont + 5,
            message: 'No olvides hacerlo mañana en la mañana',
            trigger: idCont + 9,
          },
          {
            id: idCont + 6,
            message: 'Te aconsejo que lo hagas, es muy facil',
            trigger: idCont + 7,
          },
          {
            id: idCont + 7,
            message: 'Y tiene una gran ayuda para nuestro organismo',
            trigger: idCont + 8,
          },
          {
            id: idCont + 8,
            message: 'Asi que prueba a hacerlo mañana temprano antes del desayuno',
            trigger: idCont + 9,
          },
        )
        idCont = idCont + 9;
      }

      if (ejerciciosHoy === "Si") {
        const { currentUser } = firebase.auth()
        firebase.database().ref('progreso/usuarios/' + currentUser.uid + '/metas/1/').push({
          'fecha': '2018-09-24 20:00',
          'score': '1'
        }).then((data) => {
          //success callback
        }).catch((error) => {
          //error callback
          console.log('error ', error)
        })
      }


      if (steps.length >= 1) {


        steps.push(
          {
            id: idCont,
            message: 'Bueno, espero estes muy bien! Hasta mañana.',
            end: true
          }
        )
        return <ChatBot steps={steps} />
      } 
      else {
        steps.push(
          {
            id: idCont,
            message: 'Hola! Parece que ya me contastes de tu progreso. Genial!',
            end: true
          }
        )
        return <ChatBot steps={steps} />
      }

    
  }



}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
