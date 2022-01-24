import React, {useEffect, useState, useContext, useRef} from 'react';
import { useAppState } from '@react-native-community/hooks'
import { View,TextInput,Modal, Pressable } from 'react-native';
import {AutoSizeText, ResizeTextMode} from 'react-native-auto-size-text';
import { styles,screenWidth, screenHeight } from '../Styles/StyleHeader';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {Montserrat_300Light,Montserrat_400Regular, Montserrat_500Medium } from '@expo-google-fonts/montserrat'

import {Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignatureScreen from 'react-native-signature-canvas';
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

import Draggable from 'react-native-draggable';

const DrawingContext = React.createContext();

const RoomNameContext = React.createContext();
const RoomDrawingContext = React.createContext();
const RoomSensorsContext = React.createContext();
const ClickedContext = React.createContext();
const SensorsContext = React.createContext();

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
  <TouchableOpacity key={props.num} style={props.Drawings.length%2!=0 && props.num==props.Drawings.length-1?styles.LastElement: styles.roomImageContainer} onPress={()=>props.HandleRoomPress(props.Keys[props.num], props.Drawings[props.num], props.num)}>
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
  const [PressedRoom, setPressedRoom] = useState();
  const [PressedRoomDrawing,setPressedRoomDrawing ] = useState("");
  const [PressedRoomName, setPressedRoomName]=useState("");
  const [settingsPressed, setsettingsPressed]=useContext(settingsButtonContext);
  const [headerText, setText] = useContext(headerTextContext);

  const [RN, setRN] = useState([]); //RoomName
  const [RD, setRD] = useState([]); //RoomDrawing
  const [RS, setRS] = useState([]); //RoomSensors
  

  useEffect(()=>{
    setText("Usage");
  })
  async function getDrawings(){
    let drawing;
    let keys;
    try {
      var filterNames = await AsyncStorage.getAllKeys()
      keys = filterNames.filter(element=>element!="Mode");
      setRN(keys)
      if(keys!=null){
        setKeys(keys)
        for(var i=0; i<keys.length; i++){
          drawing = await AsyncStorage.getItem(keys[i])
          if(drawing!=null && Drawings.length==0){
            var drawingArray = JSON.parse(drawing)
            setDrawings(Drawings =>[...Drawings, drawingArray[0]]); 
            setRD(RD =>[...RD, drawingArray[0]])
            setRS(RS =>[...RS, drawingArray[1]])
          }
        }
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
  const handleRS = (value)=>{
    setRS(value);
  }

  function HandleRoomPress(Roomname, Drawing, Num){
    setPressedRoomDrawing(Drawing)
    setPressedRoomName(Roomname)
    setPressedRoom(Num);
    setRoomPressed(!RoomPressed)
  }

  function GetRoomDrawings(){
    var drawings = [];
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
    
  <RoomSensorsContext.Provider value={[RS, handleRS]}>
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
      <RoomScreen RoomName = {PressedRoomName} Drawing ={PressedRoomDrawing} num={PressedRoom} />:
      settingsPressed[0]&& 
      <SettingsScreen/>}
    </View>
    </RoomNameContext.Provider>
    </RoomDrawingContext.Provider> 
    </RoomSensorsContext.Provider> 
  )
}
function RoomScreen(props){
  const [headerText, setText] = useContext(headerTextContext);
  const [BackPressed, setBackPressed]=useState(false);
  const [settingsPressed, setsettingsPressed]=useContext(settingsButtonContext);
  const [Dimensions, setDimensions]= useState([0,0])//width, height
  const textRef = useRef(null);
  const [RS, handleRS] = useContext(RoomSensorsContext)

  /**
   * RS[1][2][3]
   * 1: index of room
   * 2: index of sensor
   * 3: index of x or y
   */
  useEffect(() => {
    textRef.current.measure((x,y,w,h, px, py)=>{
      var dims = []
      dims[0] = w
      dims[1] = h
      setDimensions(dims)
     })
  },[]);

  const handleBack = ()=>{
    setBackPressed(true);
    setText('Usage');
  }


  useEffect(()=>{
    setsettingsPressed([settingsPressed[0],"RoomScreen"])
    setText(props.RoomName);
  }, [])
  function List(){
    var content = []
    for(var i=0; i<RS[props.num].length; i++){
      content.push(<Draggable key={i}
        x={RS[props.num][i][0]*Dimensions[0]} 
        y={RS[props.num][i][1]*Dimensions[1]} 
        renderText='' 
        isCircle renderSize={30} 
        renderColor='#93B3C8'
        disabled
      />)
    }
    return content;
  }
  return (
    <View style={{flex:1}} >
    {!BackPressed && !settingsPressed[0] && <List/>}
    {!BackPressed && !settingsPressed[0] ?<View style={{flex:1}}>
    <View style={styles.RoomScreenContainer}>
    <Image ref={textRef}  resizeMode='contain' style={styles.RoomScreenRoom} source={{uri: props.Drawing}}></Image>
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
  const [RoomSensors,handleSensors] = useContext(SensorsContext)

  var InitialSensorsPosition = [(screenWidth/2)-30,(screenHeight-355)/2]
  var SensorsPositions = [[],[],[]];
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);

  const handleSignature = async signature => {

    props.handlepopup(false);
    addRoomDrawing(signature)
    var filteredList = []
    for(var i=0; i<3; i++){
      if(SensorsPositions[i].length==2){
        filteredList.push(SensorsPositions[i])
      }
    }
    handleSensors(RoomSensors=>[...RoomSensors, filteredList])
  };

  function handleRelease(x, y, i){
    const Xperc = x/screenWidth
    const Yperc=(y-((screenHeight-355)/2))/300
    SensorsPositions[i] = [Xperc, Yperc];
    
  }
  return (
    <View style={styles.drawroompopup}>
      <Draggable  
        onDragRelease={textRef1!=null ? ()=>textRef1.current.measure((x,y,w,h, px, py)=>{handleRelease(px, py, 0) }):()=>console.log("")} 
        x={InitialSensorsPosition[0]} 
        y={InitialSensorsPosition[1]} 
        renderText='' 
        isCircle 
        renderSize={30} 
        renderColor='green'>
      <View ref={textRef1}style={{borderWidth:0.01, height:30, width:30}}></View>
      </Draggable>

      <Draggable  
        onDragRelease={textRef2!=null ? ()=>textRef2.current.measure((x,y,w,h, px, py)=>{handleRelease(px, py, 1) }):()=>console.log("")}
        x={InitialSensorsPosition[0]} 
        y={InitialSensorsPosition[1]} 
        renderText='' 
        isCircle 
        renderSize={30} 
        renderColor='green'>
      <View ref={textRef2}style={{borderWidth:0.01, height:30, width:30}}></View>
      </Draggable>

      <Draggable  
        onDragRelease={textRef3!=null ? ()=>textRef3.current.measure((x,y,w,h, px, py)=>{handleRelease(px, py, 2) }):()=>console.log("")}
        x={InitialSensorsPosition[0]} 
        y={InitialSensorsPosition[1]} 
        renderText='' 
        isCircle 
        renderSize={30} 
        renderColor='green'>
      <View ref={textRef3}style={{borderWidth:0.01, height:30, width:30}}></View>
      </Draggable>

      <View style={{width:'100%', height:'100%'}} >
      <SignatureScreen
          onOK ={handleSignature}
          autoClear={true} 
          descriptionText={'Draw a Room'}
          minWidth = {1.5}
          maxWidth = {1.5}
          trimWhitespace={false}
      />
    </View>
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
  const [RoomDrawings,setRoomDrawings]=useState([]) //Drawings of newly created rooms
  const [Rooms,setRooms]=useState([]) //Names of newly created rooms
  const [RoomSensors,setRoomSensors]=useState([]) // Sensors of newly created rooms

  const [RN, handleRN] = useContext(RoomNameContext)
  const [RD, handleRD] = useContext(RoomDrawingContext)
  const [RS, handleRS] = useContext(RoomSensorsContext)
  

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
  function handleSensors(value){
    setRoomSensors(value)
  }
  async function handleBackPress(){
    handleRS(RS=>[...RS, RoomSensors])
    for(var i=0; i<Rooms.length; i++){
      try{
        await AsyncStorage.setItem(Rooms[i], JSON.stringify([RoomDrawings[i],RoomSensors[i]]))
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
        <SensorsContext.Provider value={[RoomSensors,handleSensors]}>
          <LoadRooms/>
          </SensorsContext.Provider>
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
  const [RS, handleRS] = useContext(RoomSensorsContext)

  async function getRooms(){
    var Roomnames = [];
    try{
      var filterNames = await AsyncStorage.getAllKeys();
      Roomnames = filterNames.filter(element=>element!="Mode");
      if(Roomnames!=null){
        setRooms(Roomnames);
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
    var index = pressed.indexOf(name);
    if(index==-1){ // add to array
      setPressed(pressed =>[...pressed, name])
    }else{ //remove from array
     setPressed(pressed.filter(element=>element!==name))
    }
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
    setBackpressed(true)
    for(var i=0; i<pressed.length; i++){
      removeRoom(pressed[i])
      var index = RN.indexOf(pressed[i])
      handleRN(RN.filter(element=>element!=pressed[i]));
      handleRD(RD.filter(element=>element!=RD[index]))
      handleRS(RS.filter(element=>element!=RS[index]))
      
    }

  }
  return(
    <View style={{flex:1}}>
       {!Backpressed?<View style={{flex:1}}>
      <View style={{flex:0.15, justifyContent:'center',}}>
      <Text style={{ fontSize: 30, fontFamily: 'Montserrat_300Light', color: '#6D9AB0', alignSelf:'center',}}>Delete Rooms</Text>
      </View>
      <View style={{flex:0.75, justifyContent:'center',}}>
      <RoomsButtons/>
      </View>
      <View style = {{flex:0.1, width:screenWidth,alignItems:'flex-end', paddingRight: 10, padding: 10, flex:0.2, justifyContent:'flex-end'}} >
        <TouchableOpacity onPress={()=>handleBack()} style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}}>
          <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
        </TouchableOpacity>
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
      <View style={{flex:0.75, justifyContent:'center', alignItems:'center'}}>
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