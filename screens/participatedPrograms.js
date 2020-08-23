import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config'
import MyHeader from '../components/MyHeader';

export default class participatedPrograms extends Component{
  constructor(){
    super()
    this.state = {
      userId  : firebase.auth().currentUser.email,
      requestedProgramsList : []
    }
  this.requestRef= null
  }

  getRequestedProgramsList =()=>{
    this.requestRef = db.collection("requested_programs")
    .where('user_id','==',this.state.userId)
    .where("program_status", '==','applied')
    .onSnapshot((snapshot)=>{
      var requestedProgramssList = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedProgramsList : requestedProgramssList
      });
    })
  }

  componentDidMount(){
    this.getrequestedProgramsList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    console.log(item.book_name);
    return (
      <ListItem
        key={i}
        title={item.program_name}
        subtitle={item.programStatus}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader title="Participated programs" navigation ={this.props.navigation}/>
        <View style={{flex:1}}>
          {
            this.state.requestedProgramsList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested programs</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.requestedProgramsList}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#ff5722",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})