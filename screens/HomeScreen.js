import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Alert } from 'react-native';
import ChatBot from 'react-native-chatbot';
import { StackNavigator } from 'react-navigation';
import { Header, Left, Right, Icon, Spinner } from 'native-base';
import firebase from 'firebase';


const user = '';
const METAS = [];
const steps = [];
let ejerciciosHoy = "";
export default class HomeScreen extends React.Component {
  state = { currentUser: null, email: null, estatura: null, metas: [] }

  componentWillMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.database().ref('/usuarios/' + currentUser.uid).once('value', (snapshot) => {
      user = snapshot.val();
      metas = user.metas;
      METAS = [];

      metas.forEach(function (value, key) {
        METAS.push(key);
      });

      this.setState({ email: user.email, metas: METAS, estatura: user.estatura });
    })
  }



  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" style={{ fontSize: 24, color: tintColor }} />
    )
  }



  render() {
    return (
      <View style={{height:650}}>
        <Header>
          <Left style={{ flex: 1 }}>
            <Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />
          </Left>
        </Header>
       
        {this.displayChatBot()}
        
      </View>

    )
  }



  displayChatBot() {
    const { metas } = this.state;
    let idCont = 10;
    let steps = [];
    if (metas.includes(1)) {

      steps = [
        {
          id: '1',
          message: 'Veo que tienes el objetivo 1',
          trigger: '2',
        },
        {
          id: '2',
          message: '¿ Ya has realizado tus ejercicios de hoy ?',
          trigger: '3',
        },
        {
          id: '3',
          options: [
            { value: ejerciciosHoy = "Si", label: 'Si', trigger: '4' },
            { value: ejerciciosHoy = "No", label: 'No', trigger: '7' },]
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

    if (metas.includes(2)) {
      steps.push(
        {
          id: idCont,
          message: 'Veo que tienes el objetivo 2',
          trigger: idCont + 1,
        },
        {
          id: idCont + 1,
          message: '¿ Has realizado tus 2 ejercicios de intensidad moderada ?',
          trigger: idCont + 2,
        },
        {
          id: idCont + 2,
          options: [
            { value: ejerciciosHoy = "Si", label: 'Si', trigger: idCont + 3 },
            { value: ejerciciosHoy = "No", label: 'No', trigger: idCont + 6 },]
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






    if (metas.includes(4)) {

      steps.push(
        {
          id: idCont,
          message: 'Veo que tienes el objetivo 4',
          trigger: idCont + 1,
        },
        {
          id: idCont + 1,
          message: '¿ Has comido frutas durante el dia ?',
          trigger: idCont + 2,
        },
        {
          id: idCont + 2,
          options: [
            { value: ejerciciosHoy = "Si", label: 'Si', trigger: idCont + 3 },
            { value: ejerciciosHoy = "No", label: 'No', trigger: idCont + 6 },]
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
          trigger:idCont+9
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
          trigger:idCont+9
        }
      );
      idCont = idCont + 9;

    }


    if (metas.includes(3)) {
      steps.push(
        {
          id: idCont,
          message: 'Veo que tienes el objetivo 3',
          trigger: idCont + 1,
        },
        {
          id: idCont + 1,
          message: 'Ya comiste tus verduras de hoy',
          trigger: idCont + 2,
        },
        {
          id: idCont + 2,
          options: [
            { value: ejerciciosHoy="Si", label: 'Si', trigger: idCont + 3 },
            { value: ejerciciosHoy="Ni", label: 'No', trigger: idCont + 6 },]
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

    if(metas.includes(5)){
      steps.push(
        {
          id: idCont,
          message: 'Veo que tienes el objetivo 5',
          trigger: idCont+1,
      },
      {
          id: idCont+1,
          message:'¿ Tomaste aceite de oliva extra virgen por la mañana ?',
          trigger: idCont+2,
      },
      {
          id: idCont+2,
          options: [
    { value: ejerciciosHoy="Si", label: 'Si', trigger: idCont+3 },
    { value: ejerciciosHoy="No", label: 'No', trigger: idCont+6 },]
      },
  {
          id: idCont+3,
          message: 'Sigue asi',
          trigger: idCont+4,
      },
  {
          id: idCont+4,
          message: 'El aceite de oliva extra virgen antes del desayuno ayuda a mejorar la absorcion de nutrientes de nuestro cuerpo',
          trigger: idCont+5,
      },
      {
          id: idCont+5,
          message: 'No olvides hacerlo mañana en la mañana',
          trigger: idCont+9,
      },
  {
          id: idCont+6,
          message: 'Te aconsejo que lo hagas, es muy facil',
          trigger: idCont+7,
      },
  {
          id: idCont+7,
          message: 'Y tiene una gran ayuda para nuestro organismo',
          trigger: idCont+8,
      },
  {
          id: idCont+8,
          message: 'Asi que prueba a hacerlo mañana temprano antes del desayuno',
          trigger: idCont+9,
      },
      )
      idCont=idCont+9;
    }


    

    



    if (steps.length >= 1) {
      steps.push(
        {
          id:idCont,
          message:'Bueno, espero estes muy bien! Hasta mañana.',
          end:true
        }
      )
      return <ChatBot steps={steps} />
    }

  }


}






const stepMeta1 = [
  {
    id: '0',
    message: 'Hola! Como estas?',
    trigger: '1',
  },
  {
    id: '1',
    options: [
      { value: 1, label: 'Bien', trigger: '2' },
      { value: 2, label: 'Algo Mal', trigger: '2' },
    ],
  },
  {
    id: '2',
    message: 'Cuentame, cuntos minutos has hecho ejercicio?',
    trigger: '3',
  },
  {
    id: '3',
    user: true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      } else {
        return 'Muy Bien! ' + value + ' its ok!';
      }
      return true;
    },
    trigger: '2',
  }
];


const steps2 = [
  {
    id: '0',
    message: 'Hola, ¿Como te sientes el dia de hoy?',
    trigger: '1',
  },
  {
    id: '1',
    options: [
      { value: 1, label: 'Bien ', trigger: '2' },
      { value: 2, label: 'Algo Mal', trigger: '2' },
    ],
  }
]

// if(true){
// steps2.push({
//   id: '2',
//   message: 'tus metas son',
//   trigger: '1',
// },)
// }


const pruebaFindRisc = [
  {
    id: '0',
    message: 'Esta es una prueba para la evaluación del riesgo de Diabetes Tipo 2 u otras anormalidades en el metabolismo de la glucosa',
    trigger: '1'
  }, {
    id: '1',
    message: 'Primero necesitamos unos datos de identificación',
    trigger: '2'
  },
  {
    id: '2',
    message: 'En que rango de edad estas?',
    trigger: '3'
  },
  {
    id: '3',
    options: [
      { value: 0, label: 'Menos de 45 años.', trigger: '4' },
      { value: 2, label: '45 a 54 años.', trigger: '4' },
      { value: 3, label: '55 a 64 años.', trigger: '4' },
      { value: 4, label: 'mas de 64 años.', trigger: '4' },
    ],
  },
  {
    id: '4',
    message: '{previousValue}+5',
    end: true
  }

];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
