import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, Modal,ScrollView,KeyboardAvoidingView } from 'react-native';
import StudentScreen from '../screens/StudentScreen'

import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
     
      password: '',
      isVisible : false,
      firstName : "",
      lastName : "",
      mobileNumber:"",
      address : "",
      confirmPassword : "",
      schoolName: "",
      schoolAddress: "",
      age: "",
      grade: "",
      country: "",
      city: "",
      email: ""
    }
  }

  userLogin = (email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.props.navigation.navigate(StudentScreen)
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (firstName, password,confirmPassword) =>{
    if(password !== confirmPassword){
        return Alert.alert("password doesn't match\nCheck your password.")
    }else{
      firebase.auth().createUserWithEmailAndPassword(firstName, password)
      .then((response)=>{
        db.collection('users').add({
          first_name:this.state.firstName,
          last_name:this.state.lastName,
          mobile_number:this.state.mobileNumber,
          school_address:this.state.schoolAddress,
          address:this.state.address,
          school_name:this.state.schoolName,
          age: this.state.age,
          grade: this.state.grade,
          country: this.state.country,
          city: this.state.city,
          email_id: this.state.email
        }) 
        return  Alert.alert(
             'User Added Successfully',
             '',
             [
               {text: 'OK', onPress: () => this.setState({"isVisible" : false})},
             ]
         );
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        return Alert.alert(errorMessage)
      });
    }

  }

  showModal = ()=>(
    <Modal
      animationType="fade"
      transparent={true}
      visible={this.state.isVisible}
      >
      <View style={styles.modalContainer}>
        <ScrollView style={{width:'100%'}}>
          <KeyboardAvoidingView style={{flex:1,justifyContent:'center', alignItems:'center'}}>
          <Text
            style={{justifyContent:'center', alignSelf:'center', fontSize:30,color:"black",margin:50}}
            >Registration</Text>
          <TextInput
            style={styles.formTextInput}
            placeholder ={"First name"}
            maxLength ={19}
            onChangeText={(text)=>{
              this.setState({
                firstName: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Last Name"}
            maxLength ={25}
            onChangeText={(text)=>{
              this.setState({
                Name: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Mobile Number"}
            maxLength ={10}
            keyboardType={'numeric'}
            onChangeText={(text)=>{
              this.setState({
                mobileNumber: Number
              })
            }}
          />
           <TextInput
            style={styles.formTextInput}
            placeholder ={"school name"}
            
           
            onChangeText={(text)=>{
              this.setState({
                schoolName: text
              })
            }}
          />
            <TextInput
            style={styles.formTextInput}
            placeholder ={"school address"}
            multiline= {true}
           
            onChangeText={(text)=>{
              this.setState({
                schoolAddress: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"House address"}
            multiline = {true}
            onChangeText={(text)=>{
              this.setState({
                address: text
              })
            }}
          />
           <TextInput
            style={styles.formTextInput}
            placeholder ={"email-address"}
            keyboardType= {"email-address"}
            onChangeText={(text)=>{
              this.setState({
                email: text
              })
            }}
          />
           <TextInput
            style={styles.formTextInput}
            placeholder ={"country"}
            
            onChangeText={(text)=>{
              this.setState({
                country: text
              })
            }}
          />
          <TextInput
            style={styles.formTextInput}
            placeholder ={"Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password: text
              })
            }}
          /><TextInput
            style={styles.formTextInput}
            placeholder ={"Confrim Password"}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                confirmPassword: text
              })
            }}
          />
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={()=>
                this.userSignUp(this.state.email, this.state.password, this.state.confirmPassword)
              }
            >
            <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.modalBackButton}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={()=>this.setState({"isVisible":false})}
            >
            <Text style={{color:"black"}}>Cancel</Text>
            </TouchableOpacity>
          </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </Modal>
  )


  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent:'center',alignItems:'center'}}>
          {
            this.showModal()
          }
          <View style= {styles.santaView}>
            <Image source={require('../assets/logo.png')}
          style={styles.santaImage}/>
          </View>
        </View>
        <View style={styles.profileContainer}>

          <Text style={styles.title}>CharityZan</Text>
          <Text style={{color:'#F5E1DA'}}> A community service platform</Text>
          
         </View>
         <View style={styles.santaView}>
          <Image
          source={require('../assets/logo.png')}
          style={styles.santaImage}
           />
           </View>
       
      
        <View style={styles.buttonContainer}>
          <Text style={{color:'#F5E1DA', fontSize:18, fontWeight:'bold',marginLeft:55}}>EMAIL-ID</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
            style={styles.loginBox}
            keyboardType ={'email-address'}
            onChangeText={(text)=>{
              this.setState({
                username: text
              })
            }}
            />
          </View>
          <Text style={{color:'#F5E1DA', fontSize:18, fontWeight:'bold',marginLeft:55}}>PASSWORD</Text>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.email, this.state.password)}}
              >
              <Text style={{color:"black", fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{
                this.setState({"isVisible":true})
              }}
              >
                <Text style={{color:"black", fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#3FA798'
  },
  profileContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  title :{
    fontSize:60,
    fontWeight:'300',
    // fontFamily:'AvenirNext-Heavy',
    color : '#F5E1DA'
  },
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor:'#FFF',
    fontSize: 20,
    marginBottom:20,
    marginTop:5

  },
  santaView:{
    marginTop: 0.5,
    marginBottom: 0.1,
    flex:0.75,
    justifyContent:"center",
    alignItems:"center",
    //padding:RFValue(10)
  },
  santaImage:{
    width:"60%",
    height:"105%",
    resizeMode:"stretch"
  },
  button:{
    width:"75%",
    height:60,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#F5E1DA",
    elevation:10
  },
  buttonContainer:{
    flex:1.5,
  },
  modalContainer:{
    flex:1,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#F5E1DA",
    marginRight:30,
    marginLeft : 30,
    marginTop:80,
    marginBottom:80,
  },
  formTextInput:{
    width:"75%",
    height:35,
    alignSelf:'center',
    borderColor:'#FFF',
    borderRadius:10,
    borderWidth:1,
    marginTop:20,
    padding:10
  },
  registerButton:{
    width:200,
    height:40,
    alignItems:'center',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:10,
    marginTop:30
  },
  registerButtonText:{
    color: "black",
    fontSize:15,
    fontWeight:'bold'
  },
  cancelButton:{
    width:200,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    marginTop:5,
  },
})