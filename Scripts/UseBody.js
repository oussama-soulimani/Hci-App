import React, {useEffect, useState, useContext} from 'react';
import { useAppState } from '@react-native-community/hooks'
import { View,TextInput,Modal, Pressable } from 'react-native';
import {AutoSizeText, ResizeTextMode} from 'react-native-auto-size-text';
import { styles } from '../Styles/StyleHeader';
import {Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Header} from './Header'
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen from 'react-native-signature-canvas';

import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Montserrat_300Light,Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat'
import { headerTextContext, settingsButtonContext } from './App';
import { AlertsScreen } from './ConfigBody';
import Back from'../images/back.svg'
import NotificationIcon from '../images/notification.svg'
import AddIcon from '../images/add.svg'
import DeleteIcon from '../images/delete.svg'
import BlueAttic from '../images/Blue/attic.svg'
import BlueDefaultRoom from '../images/Blue/defaultRoom.svg';
import BlueBathroom from '../images/Blue/bathroom.svg';
import BlueEntrance from '../images/Blue/entrance.svg';
import BlueKitchen from '../images/Blue/kitchen.svg';
import BlueLivingRoom from '../images/Blue/livingroom.svg';
import BlueDiningRoom from '../images/Blue/diningRoom.svg';
import BlueBedRoom from '../images/Blue/bedroom.svg';
import Fold from '../images/fold.svg';

import WhiteAttic from '../images/White/attic.svg'
import WhiteDefaultRoom from '../images/White/defaultRoom.svg';
import WhiteBathroom from '../images/White/bathroom.svg';
import WhiteEntrance from '../images/White/entrance.svg';
import WhiteKitchen from '../images/White/kitchen.svg';
import WhiteLivingRoom from '../images/White/livingroom.svg';
import WhiteDiningRoom from '../images/White/diningRoom.svg';
import WhiteBedRoom from '../images/White/bedroom.svg';

import RedAttic from '../images/Red/attic.svg'
import RedDefaultRoom from '../images/Red/defaultRoom.svg';
import RedBathroom from '../images/Red/bathroom.svg';
import RedEntrance from '../images/Red/entrance.svg';
import RedKitchen from '../images/Red/kitchen.svg';
import RedLivingRoom from '../images/Red/livingroom.svg';
import RedDiningRoom from '../images/Red/diningRoom.svg';
import RedBedRoom from '../images/Red/bedroom.svg';

const DrawingContext = React.createContext();

const RoomNameContext = React.createContext();
const RoomDrawingContext = React.createContext();

const ClickedContext = React.createContext();

export function GetIcon(props){
  var name = props.name
  var color = props.color
  if(name==null){
    return<View></View>
  }
  if(name.includes("bed")|| name.includes("Bed")){
    if(color=="Blue")
      return <BlueBedRoom/>
    else if(color=="White")
      return <WhiteBedRoom/>
    else if(color=="Red")
      return <RedBedRoom/>
  }else if(name.includes("attic")|| name.includes("Attic")){
    if(color=="Blue")
      return <BlueAttic/>
    else if(color=="White")
      return <WhiteAttic/>
    else if(color=="Red")
      return <RedAttic/>
  }else if(name.includes("Bath")|| name.includes("bath")){
    if(color=="Blue")
      return <BlueBathroom/>
    else if(color=="White")
      return <WhiteBathroom/>
    else if(color=="Red")
      return <RedBathroom/>
  }else if(name.includes("Entrance")|| name.includes("entrance")|| name.includes("Hall")||name.includes("hall")){
    if(color=="Blue")
      return <BlueEntrance/>
    else if(color=="White")
      return <WhiteEntrance/>
    else if(color=="Red")
      return <RedEntrance/>
  }else if(name.includes("Living")|| name.includes("living")){
    if(color=="Blue")
      return <BlueLivingRoom/>
    else if(color=="White")
      return <WhiteLivingRoom/>
    else if(color=="Red")
      return <RedLivingRoom/>
  }else if(name.includes("Kitchen")|| name.includes("kitchen")){
    if(color=="Blue")
      return <BlueKitchen/>
    else if(color=="White")
      return <WhiteKitchen/>
    else if(color=="Red")
      return <RedKitchen/>
  }else if(name.includes("dining")|| name.includes("Dining")){
    if(color=="Blue")
      return <BlueDiningRoom/>
    else if(color=="White")
      return <WhiteDiningRoom/>
    else if(color=="Red")
      return <RedDiningRoom/>
  }else{ 
    if(color=="Blue")
      return <BlueDefaultRoom/>
    else if(color=="White")
      return(<WhiteDefaultRoom/>)
    else 
      return <RedDefaultRoom/>
  }
}
function RoomBox(props){
  
  return(
  <TouchableOpacity key={props.num} style={props.Drawings.length%2!=0 && props.num==props.Drawings.length-1?styles.LastElement: styles.roomImageContainer} onPress={()=>props.HandleRoomPress(props.Keys[props.num], props.Drawings[props.num])}>
    <View style={props.Drawings.length%2!=0 && props.num==props.Drawings.length-1?styles.roomImageContainer: {flexDirection:'column'}}>
    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center', flexWrap: 'wrap'}}>
      <Text style={styles.roomdrawingName}>{props.Keys[props.num]}</Text>
      <GetIcon name = {props.Keys[props.num]} color={"Blue"}/>
    </View>
    <Image resizeMode='contain' style={styles.roomImage}source={{uri: props.Drawings[props.num]}}></Image>
    </View>
  </TouchableOpacity>
  )
}
export function RoomsScreen(){
  const [Keys, setKeys] = useState([]);
  const [Drawings, setDrawings] = useState([]);
  const [RoomPressed, setRoomPressed] = useState(false);
  const [PressedRoomDrawing,setPressedRoomDrawing ] = useState("");
  const [PressedRoomName, setPressedRoomName]=useState("");
  const [settingsPressed, setsettingsPressed]=useContext(settingsButtonContext);
  
  const [RN, setRN] = useState([]);
  const [RD, setRD] = useState([]);

  async function getDrawings(){
    let drawing;
    let keys;
    try {
      keys = await AsyncStorage.getAllKeys()
      setRN(keys)
      if(keys!=null){
        setKeys(keys)
        for(var i=0; i<keys.length; i++){
          drawing = await AsyncStorage.getItem(keys[i])
          if(drawing!=null && Drawings.length==0){
            setDrawings(Drawings =>[...Drawings, drawing]); 
            setRD(RD =>[...RD, drawing])
          }
        }
        console.log("Done")
      }
    }catch(e) {
      console.log("Error: "+e);
    }
  }
  const handleRN = (value)=>{
    setRN(value);
  }
  const handleRD = (value)=>{
    setRD(value);
  }

  function HandleRoomPress(Roomname, Drawing){
    setPressedRoomDrawing(Drawing)
    setPressedRoomName(Roomname)
    setRoomPressed(!RoomPressed)
  }

  function GetRoomDrawings(){
    var drawings = [];
    console.log("*****")
    console.log(RD.length);
    console.log(RN.length);
    console.log("*****")
    for(var i=0; i<RD.length; i++){
      drawings.push( <RoomBox key = {i} Keys = {RN} Drawings = {RD} num={i} HandleRoomPress={HandleRoomPress}/>)
    }
    return (<ScrollView style={{ flex:0.9,}}><View style={styles.roomsContainer}>{drawings}</View></ScrollView>)
  }

  const AppState = useAppState();
  useEffect(()=>{
    if(AppState=='active'){
      getDrawings();

      setsettingsPressed([settingsPressed[0],"RoomsScreen"])
    }
  }, [AppState])

  return (
    <RoomDrawingContext.Provider value={[RD, handleRD]}>
    <RoomNameContext.Provider value={[RN, handleRN]}>
      <View style={{flex:1}}>
        {!RoomPressed && !settingsPressed[0]?
        <View style={{flex:1}}>
        <View style={{flex:0.10,alignItems:'center',  justifyContent:'center'}}>
          <Text style={styles.Bigtext}>Rooms</Text>
        </View>
        <GetRoomDrawings/>
        </View>:
        RoomPressed ? 
        <RoomScreen RoomName = {PressedRoomName} Drawing ={PressedRoomDrawing}/>:
        settingsPressed[0]&& 
        <SettingsScreen/>}
      </View>
      </RoomNameContext.Provider>
      </RoomDrawingContext.Provider> 
  )
}
function RoomScreen(props){
  const [headerText, setText] = useContext(headerTextContext);
  const [BackPressed, setBackPressed]=useState(false);
  const [settingsPressed, setsettingsPressed]=useContext(settingsButtonContext);

  const handleBack = ()=>{
    setBackPressed(true);
    setText('Usage');
  }


  useEffect(()=>{
    setsettingsPressed([settingsPressed[0],"RoomScreen"])
    setText(props.RoomName);
  }, [])
  return (
    <View style={{flex:1}} >
    {!BackPressed && !settingsPressed[0] ?<View style={{flex:1}}>
    <View style={styles.RoomScreenContainer}>
    <Image resizeMode='contain' style={styles.RoomScreenRoom} source={{uri: props.Drawing}}></Image>
    </View>
    <View style={styles.RoomScreenText}>
      <Text style={{fontSize: 35, fontFamily: 'Montserrat_500Medium', color: '#6D9AB0',}}>Window Open</Text>
      <Text style={{fontSize: 35, fontFamily: 'Montserrat_500Medium', color: '#6D9AB0',}}>20 °C </Text>
      <Text style={{fontSize: 35, fontFamily: 'Montserrat_500Medium', color: '#6D9AB0',}}>13:28 </Text>
    </View>
    <View style={{marginLeft:6,marginBottom:6,flex:0.2, justifyContent:"flex-end"}}>
    <Back width={60} height={60} onPress={()=>handleBack()}/>
    </View>

    </View>: BackPressed?<RoomsScreen/>: settingsPressed[0] && <SettingsScreen/> }
    </View>
  )
}

function Sign(props){
  const[RoomDrawings,addRoomDrawing]=useContext(DrawingContext)

  const handleSignature = async signature => {
    props.handlepopup(false);
    addRoomDrawing(signature)
  };

  return (
    <View style={styles.drawroompopup}>
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
  const [showPopup, setshowPopup] = useState(false);

  function handlePopup(value){
    setshowPopup(value);
  }
  function handleRoomClick(){
    if(props.Drawing==null){
      setshowPopup(true);
    }
    setRoomClicked(!RoomClicked)
  }

  return(
    <View>
    <TouchableOpacity onPress={()=>handleRoomClick()}>
      <View style={{flexDirection:'row', marginBottom:7, marginLeft:5,}}>
        <Fold style={{alignSelf:'center'}} width={20} height={20}/>
        <Text style={{flex:3,fontFamily: 'Montserrat_300Light',fontSize:20,color:'#6D9AB0'}}>{props.roomName}</Text>
      </View>
    </TouchableOpacity>
      {RoomClicked ?
        (props.Drawing==null ? 
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30}}>
          <Modal animationType='fade' transparent={true} visible={showPopup}>
            <Sign handlepopup={handlePopup}/>
          </Modal>
          </View>
          :
        props.Drawing!=null? 
        <Image style={{width: "80%", height:255, alignSelf:'center'}}
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
    <View style={{flexDirection:'row', marginBottom:7, marginLeft:5, }}>
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

function AddRoomScreen(){
  const [BackPressed,setBackPressed]=useState(false)
  const [RoomDrawings,setRoomDrawings]=useState([]) //all drawing of rooms
  const [Rooms,setRooms]=useState([]) //all name of rooms
  const [RN, handleRN] = useContext(RoomNameContext)
  const [RD, handleRD] = useContext(RoomDrawingContext)

  function addRoomDrawing(Drawing){
    handleRD(RoomDrawings=> [...RoomDrawings, Drawing])
    setRoomDrawings(RoomDrawings=> [...RoomDrawings, Drawing])
  }

  function LoadRooms(){
    var content = []
    for(var i=0; i<Rooms.length; i++){
      content.push(<Roomline key = {i} roomName={Rooms[i]} Drawing = {RoomDrawings[i]}/>)
    }
    return <View>{content}</View>;
  }

  function addRoom(newRoom){
    handleRN(Rooms=> [...Rooms, newRoom])
    setRooms(Rooms=> [...Rooms, newRoom])
    
  }
  async function handleBackPress(){
    console.log(Rooms.length +" Rooms added")
    for(var i=0; i<Rooms.length; i++){
      try{
        await AsyncStorage.setItem(Rooms[i], RoomDrawings[i])
      }catch(e){
        console.log("Error storing: "+e);
      }
    }
    setBackPressed(true)
  }
  return(
    <View style={{flex:1}}>
      {!BackPressed? <View style={{flex:1}}>
      <View style={styles.addButtonContainer}>
          <Text style=
          {{
            fontSize: 30,
            fontFamily: 'Montserrat_300Light',
            color: '#6D9AB0',
            alignSelf:'center',
          }}>Add Room</Text>
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
      <View style = {styles.BackButtonContainer} >
        <Back width={60} height={60} onPress={()=>handleBackPress()}/>
      </View>
      </View>:<SettingsScreen/>}
    </View>
  );

}

function DeleteRoomsScreen(){
  const [Rooms, setRooms]=useState([]);
  const [pressed, setPressed] = useState([])
  const [Backpressed, setBackpressed] = useState(false)
  const [RN, handleRN] = useContext(RoomNameContext)
  const [RD, handleRD] = useContext(RoomDrawingContext)

  async function getRooms(){
    console.log("Get Rooms");
    var Roomnames = [];
    try{
      Roomnames = await AsyncStorage.getAllKeys();
      if(Roomnames!=null){
        setRooms(Roomnames);
        console.log(Roomnames.toString())
      }
      else
        console.log("No Rooms to show")
    }catch(e){
      console.log("ERROR: "+e)
    }
  }

  function RoomButton(props){

    return(
      <TouchableOpacity onPress = {()=>HandlePress(props.RoomName)} style={pressed.indexOf(props.RoomName)==-1? styles.DeleteButton:styles.DeleteButtonPressed}>
        <View  style={{width:'70%',alignItems:'center'}}>
        <AutoSizeText style={pressed.indexOf(props.RoomName)==-1? styles.SettingsText:styles.SettingsTextPressed} fontSize={25} numberOfLines={1} mode={ResizeTextMode.max_lines}>{props.RoomName}</AutoSizeText>
        </View>
        <View style={{ width:'30%', alignItems:'center'}}>
        <GetIcon name={props.RoomName} color={pressed.indexOf(props.RoomName)==-1? "Blue":"Red"}/>
        </View>
    </TouchableOpacity>
    );
  }

  
  const HandlePress = (name)=>{
    console.log(name)
    var index = pressed.indexOf(name);
    //console.log(index)
    if(index==-1){ // add to array
      setPressed(pressed =>[...pressed, name])
    }else{ //remove from array
     setPressed(pressed.filter(element=>element!==name))
    }
    //console.log("Pressed: "+pressed.toString());
  }
  function RoomsButtons(){
    var content = [];
    for(var i=0; i<Rooms.length; i+=2){
      if(i+1<Rooms.length){ //even length
        content.push(
          <View key = {i} style={{flexDirection:'row', }}>
            <RoomButton RoomName={Rooms[i]}/>
            <RoomButton RoomName={Rooms[i+1]}/>
          </View>
        )
      }else{ //uneven length
        content.push(
          <View key = {i}>
            <RoomButton RoomName={Rooms[i]}/>
          </View>
        )
      }
    }
    return ( <View style={{ alignItems:'center', flex:0.}}>{content}</View>
    )
  }

  useEffect(()=>{
    getRooms();
  },[])

  async function removeRoom(name){
    try{
      await AsyncStorage.removeItem(name)
    }catch(e){
      console.log("ERROR: "+e);
    }
  }
  const handleBack = ()=>{
    console.log("Removing "+pressed.toString());
    setBackpressed(true)
    console.log(pressed.length)
    for(var i=0; i<pressed.length; i++){
      removeRoom(pressed[i])
      var index = RN.indexOf(pressed[i])
      handleRN(RN.filter(element=>element!=pressed[i]));
      handleRD(RD.filter(element=>element!=RD[index]))
    }

  }
  return(
    <View style={{flex:1}}>

       {!Backpressed?<View style={{flex:1}}>
      <View style={{flex:0.15, justifyContent:'center', borderWidth:3}}>
      <Text style={{ fontSize: 30, fontFamily: 'Montserrat_300Light', color: '#6D9AB0', alignSelf:'center',}}>Delete Rooms</Text>
      </View>
      <View style={{flex:0.7,alignItems:'center', borderWidth:3, justifyContent:'center'}}>
      <RoomsButtons/>
      </View>
      <View style = {styles.DeleteScreenBack} >
        <Back width={60} height={60} onPress={()=>handleBack()}/>
    </View>
    </View>:<SettingsScreen/>}
    </View>
  )
}
function SettingsScreen(){
  const [settingsPressed, setsettingsPressed]=useContext(settingsButtonContext);
  const [BackPressed, setBackPressed]=useState(false);
  const [AlertButton,setAlertButton] = useState(false);
  const [AddRoomButton,setAddRoomButton] = useState(false);
  const [DeleteRoomButton,setDeleteRoomButton] = useState(false);

  const handleBack = ()=>{
    setBackPressed(true);
    setsettingsPressed(false);
  }

  return (
    <View style={{flex:1}}>

      {!BackPressed && !AlertButton && !AddRoomButton && !DeleteRoomButton ?
      <View style={{flex:1}}>
      <View style={{flex:0.2}}></View>
      <View style={{flex:0.4, alignItems:'center', borderWidth:3}}>
      <TouchableOpacity onPress = {()=>setAlertButton(true)}style={styles.SettingBox}>
        <View style={{marginLeft:5, flex:3, alignItems:'center'}}>
        <AutoSizeText style={styles.SettingsText} fontSize={25} numberOfLines={1} mode={ResizeTextMode.max_lines}>Alerts</AutoSizeText>
        </View>
        <View style={{ flex:0.7, flexDirection:'row', justifyContent:'flex-end'}}>
        <NotificationIcon/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setAddRoomButton(true)} style={styles.SettingBox}>
        <View style={{flex:3, alignItems:'center'}}>
        <AutoSizeText style={styles.SettingsText} fontSize={25} numberOfLines={1} mode={ResizeTextMode.max_lines}>Add Rooms</AutoSizeText>
        </View>
        <View style={{ flex:0.7, flexDirection:'row', justifyContent:'flex-end'}}>
        <AddIcon style={{marginRight:2}}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setDeleteRoomButton(true)} style={styles.SettingBox}>
        <View style={{flex:3, alignItems:'center',justifyContent:'flex-start'}}>
        <AutoSizeText style={{fontFamily:'Montserrat_300Light', color:'#6D9AB0',color:'#C20000'}} fontSize={40} numberOfLines={1} mode={ResizeTextMode.max_lines}>Delete Rooms</AutoSizeText>
        </View>
        <View style={{ flex:0.7, flexDirection:'row', justifyContent:'flex-end'}}>
        <DeleteIcon/>
        </View>
      </TouchableOpacity>
      </View>
      <View style = {styles.BackButtonContainer} >
        <Back width={60} height={60} onPress={()=>handleBack()}/>
    </View>
    </View>:
    settingsPressed[1]=="RoomScreen" && 
    !AlertButton && 
    !AddRoomButton &&
    !DeleteRoomButton ?
    <RoomScreen/>:
    settingsPressed[1]=="RoomsScreen" && 
    !AlertButton && 
    !AddRoomButton &&
    !DeleteRoomButton ?
    <RoomsScreen/>:
    AlertButton && 
    !AddRoomButton &&
    !DeleteRoomButton 
    ?<AlertsScreen/>: 
    AddRoomButton &&
    !DeleteRoomButton ? 
    <AddRoomScreen/>:<DeleteRoomsScreen/>}
    </View>
  )
}