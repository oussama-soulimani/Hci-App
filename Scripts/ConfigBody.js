import React, { useState,useEffect, useRef } from 'react';
import { Montserrat_300Light} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font';
import {Image,View, Text,TextInput,ActivityIndicator, Button,TouchableOpacity,ScrollView} from 'react-native';
import { styles } from "../Styles/StyleHeader";
import AppLoading from 'expo-app-loading';
import Next from '../images/next.svg';
import Fold from '../images/fold.svg';
import SignatureScreen from 'react-native-signature-canvas';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClickedContext = React.createContext();

const Sign = () => {

  const handleSignature = signature => {
    console.debug(signature)
  };

  const handleEmpty = () => {
    console.debug('Empty');
  }

  const handleClear = () => {
    console.debug('clear success!');
  }

  const handleRedo = () =>{
    console.log("Redo");
  }
  return (
    <View style={{height:355,}}>
      <SignatureScreen
          onOK ={handleSignature}
          onEmpty={handleEmpty}
          onClear={handleClear}
          onRedo={handleRedo}
          autoClear={true} 
          descriptionText={'Draw a Room'}
          trimWhitespace={true}
          minWidth = {1.5}
          maxWidth = {1.5}
      />
    </View>
  );
}
function Roomline(props){
  const[Draw, setDraw] = useState(false);
  return(
    <View>
    <TouchableOpacity onPress={()=>setDraw(!Draw)}>
    <View style={{flexDirection:'row', marginBottom:7, marginLeft:5, borderWidth:3, borderColor:'pink',}}>
      <Fold style={{alignSelf:'center'}} width={20} height={20}/>
      <Text style={{
        flex:3,
        fontFamily: 'Montserrat_300Light', 
        fontSize:20,
        color:'#6D9AB0'}}
      >{props.roomName}</Text>
    </View>
    </TouchableOpacity>
      {Draw && <Sign/>} 
    </View>
  );
}


function AddRoom(){
  
  const [currentRoom, setcurrentRoom] = useState('')

  const modRoom = (room) =>{
    setcurrentRoom(room)
  }
  const[room, addRoom] = useContext(ClickedContext);

  return(
    <View style={{flexDirection:'row', marginBottom:7, marginLeft:5, borderWidth:3, borderColor:'pink', }}>
      <Fold style={{alignSelf:'center'}} width={20} height={20}/>
      <View style={styles.roomName}>
      <TextInput 
        onSubmitEditing = {() => addRoom(currentRoom)}
        placeholder="New Name" 
        style={styles.roomNameText}
        onChangeText={text=>modRoom(text)}
      ></TextInput>
      </View>
      <View style={styles.applyButton}>
      <TouchableOpacity onPress={()=>addRoom(currentRoom)}>
      <Text  style={{
        fontFamily: 'Montserrat_300Light', 
        fontSize:20, 
        color:'#F2F6F8'}}
      >Apply</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


class DrawScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      Applied:false,
      NextPressed: true,
      Rooms:[],
    AddPressed:false,
    }
  }

  LoadRooms = ()=>{
    var content = []
    for(var i=0; i<this.state.Rooms.length; i++){
      content.push(<Roomline key = {i} roomName={this.state.Rooms[i]}/>)
    }
    return <View>{content}</View>;
  }
  
  addRoom = (newRoom) =>{
    this.setState(
      {Rooms: [...this.state.Rooms, newRoom]}
    )
    this.setState({Applied:true})
  }
  render(){
    return(
      <View style={{flex:1}}>
        <View style={styles.addButtonContainer}>
          <View style={styles.addButton}>
            <TouchableOpacity onPress={()=>this.setState({Applied:false})}>
            <Text  style={{
              fontFamily: 'Montserrat_300Light', 
              fontSize:20, 
              color:'#F2F6F8'}}
            >Add Room</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.drawRoomContainer}>
          <ScrollView  style={styles.RoomListContainer}>
            <this.LoadRooms/>
            <ClickedContext.Provider value={[this.state.Rooms, this.addRoom]}>
              {!this.state.Applied && <AddRoom />}
            </ClickedContext.Provider>
          </ScrollView >
        </View>
          <View style = {styles.NextButton} >
            <Next width={60} height={60} onPress={()=>this.setState({NextPressed: !this.state.NextPressed})}/>
          </View>
      </View>

    );
  }
}


class PlaceSensorsScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: false,/*Moet later op true */
    }
  }

  
  render(){
    return(
      <View style={{flex:1}}>
        {this.state.NextPressed ? <View style={{flex:1}}>
          <View style={{flex:1, justifyContent:'center',}}>
            <Text style={{fontSize: 30,fontFamily: 'Montserrat_300Light',color: '#6D9AB0',alignSelf:'center',}}>Place Sensors</Text>
          </View>
          <View style = {styles.NextButton} >
            <Next width={60} height={60} onPress={()=>this.setState({NextPressed: !this.state.NextPressed})}/>
          </View>
        </View>:<DrawScreen/>}
      </View>
    );
  }
}
class RenameSensorScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: false,/*Moet later op true */
    }
  }
    render(){
    return(
      <View style={{flex:1}}>
      {this.state.NextPressed ?<View style = {styles.DetectBox}>
        <View style={styles.SensorListHeader}>
          <Text style={styles.SensorListHeaderText}>3 Sensors Detected</Text>
        </View>
        <View style={styles.sensorListContainer}>
          <View style={styles.SensorList}>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 1</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="New Name" style={styles.sensorRenameText}></TextInput>
            </View>
            <View  style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 2</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="New Name" style={styles.sensorRenameText}></TextInput>
            </View>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 3</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="New Name" style={styles.sensorRenameText}></TextInput>
            </View>
          </View>
        </View>
        <View style = {styles.NextButton} >
        <Next width={60} height={60} onPress={()=>this.setState({NextPressed: !this.state.NextPressed})}/>
        </View>
      </View>:<PlaceSensorsScreen/>}
      </View>    );
  }
}

const animate = () => {
  const [translation, setTranslation] = useState(0);
  
  return (
    <View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'orange',
        transform: [{ translateX: translation }],
      }}
    />
  );
};

const Expire = (props)=>{
  const [visible, setVisible] = useState(true)
    setTimeout(() => {setVisible(false)},props.delay);
  return(
    visible ? <View>{props.children}</View>:<View><RenameSensorScreen/></View>
  );
};


class ListDetectedSensors extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: false,/*Moet later op true */
    }
  }
  
  render(){
    return(
      <View>
      {this.state.NextPressed ? <View style = {styles.DetectBox}>
        <View style={styles.SensorListHeader}>
          <Text style={styles.SensorListHeaderText}>3 Sensors Detected</Text>
        </View>
        <View style={styles.sensorListContainer}>
          <View style={styles.SensorList}>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 1</Text>
            </View>
            <View  style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 2</Text>
            </View>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 3</Text>
            </View>
          </View>
        </View>
        <View style = {{width:'100%',borderWidth: 3,alignItems:'flex-end', paddingRight: 10,}} >
        <Next width={60} height={60} onPress={()=>this.setState({NextPressed: !this.state.NextPressed})}/>
        </View>
      </View>:<RenameSensorScreen/>}
      </View>
    );
  }
}

export function Body(){
  const [visible, setVisible] = useState(false);
  let [fontsloaded] = useFonts({ Montserrat_300Light})

  if(!fontsloaded)
    return (<AppLoading/>)
  return (
    <View style={styles.Body}>
      {visible ?<View style={styles.bodyContent}>
      <Text style={styles.BodyLoadingText}>Detecting sensors </Text>
      <View style={styles.loadingView}>
        <ActivityIndicator size={150} color="#93B3C8" style={{marginBottom: 90,}} />
        <Button title="Press me" onPress={() => setVisible(false)} />
      </View>
      </View>: <View>{<ListDetectedSensors></ListDetectedSensors>}</View>}
  </View>
  );
}
