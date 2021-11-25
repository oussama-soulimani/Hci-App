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

const ClickedContext = React.createContext();
const DrawingContext = React.createContext();

function Sign(){
  const[RoomDrawings,addRoomDrawing]=useContext(DrawingContext)

  const handleSignature = signature => {
    addRoomDrawing(signature)

  };

  return (
    <View style={{height:355,}}>
      <SignatureScreen
          onOK ={handleSignature}
          autoClear={true} 
          descriptionText={'Draw a Room'}
          minWidth = {1.5}
          maxWidth = {1.5}
          trimWhitespace={false}
      />
    </View>
  );
}
function Roomline(props){
  const[RoomClicked, setRoomClicked]=useState(false);

  function handleRoomClick(){
    setRoomClicked(!RoomClicked)
  }

  return(
    <View>
    <TouchableOpacity onPress={()=>handleRoomClick()}>
      <View style={{flexDirection:'row', marginBottom:7, marginLeft:5, borderWidth:3, borderColor:'pink',}}>
        <Fold style={{alignSelf:'center'}} width={20} height={20}/>
        <Text style={{flex:3,fontFamily: 'Montserrat_300Light',fontSize:20,color:'#6D9AB0'}}>{props.roomName}</Text>
      </View>
    </TouchableOpacity>
      {RoomClicked ?
        (props.Drawing==null ? 
          <Sign/>:
        props.Drawing!=null? 
        <Image style={{width: "80%", height:255, borderWidth:3,borderColor:'red', alignSelf:'center'}}
        source={{uri: props.Drawing}}></Image>:null)
      :null
      } 
      </View>
  );
}


function EditRoomline(){
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
        onSubmitEditing = {() => addRoom(currentRoom)}//on enter click
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


function DrawScreen(){
  const [NextPressed,setNextPressed]=useState(true) // state of next screen button
  const [Rooms,setRooms]=useState([]) //all name of rooms
  const [RoomDrawings,setRoomDrawings]=useState([]) //all name of rooms


  function LoadRooms(){
    var content = []
    for(var i=0; i<Rooms.length; i++){
      content.push(<Roomline key = {i} roomName={Rooms[i]} Drawing = {RoomDrawings[i]}/>)
    }
    return <View>{content}</View>;
  }
  
  function addRoom(newRoom){
    setRooms(
      Rooms=> [...Rooms, newRoom]
    )
  }

  function addRoomDrawing(Drawing){
    setRoomDrawings(
      RoomDrawings=> [...RoomDrawings, Drawing]
    )
  }
  
  return(
    <View style={{flex:1}}>
      <View style={styles.addButtonContainer}>
          <Text  style={{fontSize: 30,fontFamily: 'Montserrat_300Light',color: '#6D9AB0',alignSelf:'center',}}>Add Room</Text>
      </View>
      <View style={styles.drawRoomContainer}>
        <View  style={styles.RoomListContainer}>
          <DrawingContext.Provider value={[RoomDrawings,addRoomDrawing]}>
          <LoadRooms/>
          </DrawingContext.Provider>
          <ClickedContext.Provider value={[Rooms, addRoom]}>
             <EditRoomline/>
          </ClickedContext.Provider>
        </View >
      </View>
        <View style = {styles.NextButton} >
          <Next width={60} height={60} onPress={()=>setNextPressed(!NextPressed)}/>
        </View>
    </View>

  );
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
      </View>);
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
