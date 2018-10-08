import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform,Alert} from 'react-native';
import ChatBot from 'react-native-chatbot';
import {StackNavigator} from 'react-navigation';
import {Header,Left,Right,Icon, Spinner} from 'native-base';
import firebase from 'firebase';


const user='';
const METAS=[];
const steps=[];

export default class HomeScreen extends React.Component {
  state = { currentUser: null,email:null ,estatura:null ,metas:[]}
  
  componentWillMount(){
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    firebase.database().ref('/usuarios/'+currentUser.uid).once('value',(snapshot)=>{
      user=snapshot.val();
      metas=user.metas;
      METAS=[];
      
      metas.forEach(function(value,key) {
        METAS.push(key);
      });
      
      this.setState({email:user.email,metas:METAS,estatura:user.estatura});
    })
  }



  static navigationOptions={
      drawerIcon: ({tintColor})=>(
        <Icon  name="home" style={{fontSize:24,color:tintColor}}/>
      )
  }

  

  render() {
    return (
      <View>
      <Header>
          <Left style={{flex:1}}>
            <Icon name="menu" onPress={()=>this.props.navigation.openDrawer()}/>
          </Left>
        </Header>
        {this.displayChatBot()}
      </View>

    )
  }



  displayChatBot(){
    const {metas}=this.state;
    let idCont=0;
      let  steps=[];    
      if(metas.includes(1)){

        steps=[
          {
            id: ''+idCont,
            message: 'Veo que tienes el asignado el objetivo 1.',
            trigger: ''+(idCont+1),
          },
          {
            id: ''+(idCont+1),
            message: 'Bye!',
            end: true,
          },
        ];
        idCont++;
      }
      if(metas.includes(4)){
        steps.pop();
        steps.push(
          {
            id: ''+idCont,
            message: 'Veo que tienes el asignado el objetivo 4.',
            trigger: ''+(idCont+1),
          },
          {
            id: ''+(idCont+1),
            message: 'Bye!',
            end: true,
          },
        );
        idCont++;
      }

      if(metas.includes(3)){
        steps.pop();
        steps.push(
          {
            id: ''+idCont,
            message: 'Veo que tienes el asignado el objetivo 3.',
            trigger: ''+(idCont+1),
          },
          {
            id: ''+(idCont+1),
            message: 'Bye!',
            end: true,
          },
        );
        idCont++;
      }

      if(metas.includes(5)){
        steps.pop();
        steps.push(
          {
            id: ''+idCont,
            message: 'Veo que tienes el asignado el objetivo 5.',
            trigger: ''+(idCont+1),
          },
          {
            id: ''+(idCont+1),
            message: 'Bye!',
            end: true,
          },
        );
        idCont++;
      }

      if(metas.includes(6)){
        steps.pop();
        steps.push(
          {
            id: ''+idCont,
            message: 'Veo que tienes el asignado el objetivo 6.',
            trigger: ''+(idCont+1),
          },
          {
            id: ''+(idCont+1),
            message: 'Bye!',
            end: true,
          },
        );
        idCont++;
      }

     

      if(steps.length>=1){
        return <ChatBot steps={steps}/>
      }
    
  }

  
}






const stepMeta1=[
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
    user:true,
    validator: (value) => {
      if (isNaN(value)) {
        return 'value should be a number';
      }else{
        return 'Muy Bien! '+value+' its ok!';
      }
      return true;
    },
    trigger:'2',
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


const pruebaFindRisc=[
  {
    id:'0',
    message:'Esta es una prueba para la evaluación del riesgo de Diabetes Tipo 2 u otras anormalidades en el metabolismo de la glucosa',
    trigger:'1'
  },{
    id:'1',
    message:'Primero necesitamos unos datos de identificación',
    trigger:'2'
  },
  {
    id:'2',
    message:'En que rango de edad estas?',
    trigger:'3'
  },
  {
    id:'3',
    options:[
      {value:0,label:'Menos de 45 años.',trigger:'4'},
      {value:2,label:'45 a 54 años.',trigger:'4'},
      {value:3,label:'55 a 64 años.',trigger:'4'},
      {value:4,label:'mas de 64 años.',trigger:'4'},
    ],
  },
  {
    id:'4',
    message:'{previousValue}+5',
    end:true
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
