import React, { useState,useContext, useRef, useEffect } from 'react';
import {Modal, Image,View, Text,TextInput,ActivityIndicator, Button,TouchableOpacity,ScrollView, Pressable} from 'react-native';
import { styles, screenWidth, screenHeight } from "../Styles/StyleHeader";
import {Montserrat_400Regular, Montserrat_500Medium} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import Next from '../images/next.svg';
import Fold from '../images/fold.svg';
import Accept from '../images/accept.svg';
import Reject from '../images/reject.svg';
import SignatureScreen from 'react-native-signature-canvas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Clock from '../images/clock.svg'
import { headerTextContext } from './App';
import { RoomsScreen } from './UseBody';
import Draggable from 'react-native-draggable';
import { useTheme } from 'react-native-elements';
import {Load} from './Body';
const ClickedContext = React.createContext();
const DrawingContext = React.createContext();
const SensorsContext = React.createContext();

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

export class ListDetectedSensors extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: true,/*Moet later op true */
      RescanPressed:false,
    }
  }
  
  render(){
    return(
      <View>
      {this.state.NextPressed && !this.state.RescanPressed ? <View style = {styles.DetectBox}>
        <View style={{top:0, flex:.9, width:'100%', justifyContent:'center', alignItems:'center',}}>
          <Text style={styles.Bigtext}>3 Sensors Detected</Text>
        </View>
        <View style = {{width:'100%', flexDirection:'row', paddingRight: 10, padding: 10, flex:0.1, borderWidth:3,}} >
        <View style={{width:'50%'}}>
          <TouchableOpacity style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}} onPress={()=>this.setState({RescanPressed: !this.state.RescanPressed})}>
            <Text style={{fontSize:20, color:'#6D9AB0' }}>Rescan</Text>
          </TouchableOpacity>
          </View>
          <View style={{width:'50%', alignItems:"flex-end"}}>
          <TouchableOpacity style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}} onPress={()=>this.setState({NextPressed: !this.state.NextPressed})}>
            <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>: this.state.RescanPressed ? <Load/>:<RenameSensorScreen/>}
      </View>
    );
  }
}

class RenameSensorScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: true,/*Moet later op true */
    }
  }
    render(){
    return(
      <View style={{flex:1}}>
      {this.state.NextPressed ?<View style = {styles.DetectBox}>
        <View style={styles.SensorListHeader}>
          <Text style={styles.Bigtext}>Rename the sensors</Text>
        </View>
        <View style={styles.sensorListContainer}>
          <View style={styles.SensorList}>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 1</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="Enter New Name" style={styles.sensorRenameText}></TextInput>
            </View>
            <View  style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 2</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="Enter New Name" style={styles.sensorRenameText}></TextInput>
            </View>
            <View style={styles.sensor}>
              <Text style={styles.sensorText}>Sensor 3</Text>
            </View>
            <View style={styles.sensorRename}>
              <TextInput placeholder="Enter New Name" style={styles.sensorRenameText}></TextInput>
            </View>
          </View>
        </View>
        <View style = {{width:'100%',alignItems:'flex-end', paddingRight: 10, padding: 10}} >
          <TouchableOpacity onPress={()=>this.setState({NextPressed: !this.state.NextPressed})} style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}}>
            <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>:<PlaceSensorsScreen/>}
      </View>);
  }
}


class PlaceSensorsScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      NextPressed: true,/*Moet later op true */
    }
  }

  
  render(){
    return(
      <View style={{flex:1}}>
        {this.state.NextPressed ? <View style={{flex:1}}>
          <View style={{flex:1, justifyContent:'center',}}>
            <Text style={{fontSize: 30,fontFamily: 'Montserrat_300Light',color: '#6D9AB0',alignSelf:'center',}}>Place Sensors</Text>
          </View>
          <View style = {{width:screenWidth,alignItems:'flex-end', paddingRight: 10, padding: 10}} >
          <TouchableOpacity onPress={()=>this.setState({NextPressed: !this.state.NextPressed})} style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}}>
            <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
        </View>:<DrawScreen/>}
      </View>
    );
  }
}


function DrawScreen(){
  const [NextPressed,setNextPressed]=useState(false) // moet later op false
  const [Rooms,setRooms]=useState([]) //all name of rooms
  const [RoomDrawings,setRoomDrawings]=useState([]) //allke drawing of rooms
  const [Drawing, setDrawing] = useState();
  const [RoomSensors,setRoomSensors]=useState([]) //allke drawing of rooms
  const [ApplyClicked, setApplyClicked] = useState(false)


  
  async function storeRoomName(Roomname, RoomDrawing){
    try{
      await AsyncStorage.setItem(Roomname, RoomDrawing)
    }catch(e){
      console.log("Error storing: "+e);
    }
  }

  function handleNextPress(){
    if(RoomDrawings.length==Rooms.length){
      for(var i=0; i<Rooms.length; i++){
        storeRoomName(Rooms[i], JSON.stringify([RoomDrawings[i], RoomSensors[i]]));
      }
      setNextPressed(!NextPressed)
    }else{
      alert("Click on a room to draw")
    }
  }

  function LoadRooms(){
    var content = []
    for(var i=0; i<Rooms.length-1; i++){
      content.push(<Roomline key = {i} roomName={Rooms[i]} Drawing = {RoomDrawings[i]} last = {false}/>)
    }
    if(Rooms.length!=0){
      content.push(<Roomline key = {Rooms.length-1} roomName={Rooms[Rooms.length-1]} Drawing = {RoomDrawings[Rooms.length-1]} last = {true} ApplyClicked = {ApplyClicked} />)
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
  function addRoomSensor(Sensor){
    setRoomSensors(
      RoomSensors=> [...RoomSensors, Sensor]
      )
  }
  
  return(
    <View style={{flex:1}}>
      {!NextPressed ?<View style={{flex:1}}>
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
          <SensorsContext.Provider value = {[RoomSensors, addRoomSensor]}>
          <DrawingContext.Provider value={[RoomDrawings,addRoomDrawing]}>
          <LoadRooms/>
          </DrawingContext.Provider>
          </SensorsContext.Provider>
          <ClickedContext.Provider value={[Rooms, addRoom]}>
             <EditRoomline setApplyClicked = {setApplyClicked}/>
          </ClickedContext.Provider>
        </View >
      </View>
      <View style = {{width:'100%',alignItems:'flex-end', paddingRight: 10, padding: 10}} >
          <TouchableOpacity onPress={()=>handleNextPress()} style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}}>
            <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>:<AlertQuestion/>}
    </View>
  );
}
class Sensor extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      Measurements:{}
    }
  }

  LayoutInfo(event) {
    const layout = event.nativeEvent.layout;
  }
  render(){
    return(
      <Draggable x={0} y={0}  isCircle renderColor='green'>
      <TouchableOpacity onLayout={(e)=>this.LayoutInfo(e) } style={{width:100, height:100, borderWidth:3}}>
        <Text>X: {this.state.Measurements.x}</Text>
        <Text>Y: {this.state.Measurements.y}</Text>
      </TouchableOpacity>
      </Draggable>
    )
  }
}

function Sign(props){
  const[RoomDrawings,addRoomDrawing]=useContext(DrawingContext)
  const [RoomSensors, addRoomSensor] = useContext(SensorsContext)
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
    addRoomSensor(filteredList);
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
        x={InitialSensorsPosition[0]+35} 
        y={InitialSensorsPosition[1]}
        disabled
        renderSize={70}>
      <View style={{height:70, width:70}}>
      <Text style={{fontSize:20, fontFamily: 'Montserrat_300Light', color: '#6D9AB0',}}>Sensor</Text></View>
      </Draggable>

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
  useEffect(()=>{
    if(props.last && props.ApplyClicked && props.Drawing==null){
      console.log("test")
      if(props.Drawing==null){
        setshowPopup(true);
      }
    }
  },[])
  return(
    <View>
    <TouchableOpacity onPress={()=>handleRoomClick()}>
      <View style={{flexDirection:'row', marginBottom:7, marginLeft:5,}}>
        <Fold style={{alignSelf:'center'}} width={20} height={20}/>
        <Text style={{flex:3,fontFamily: 'Montserrat_300Light',fontSize:20,color:'#6D9AB0'}}>{props.roomName}</Text>
      </View>
    </TouchableOpacity>
      {RoomClicked ||(props.last && props.ApplyClicked) ?
        (props.Drawing==null ? 
          <View style={{flex:1, justifyContent:'center', alignItems:'center', marginTop:30}}>
          <Modal animationType='fade' transparent={true} visible={showPopup}>
            <Sign handlepopup={handlePopup}/>
          </Modal>
          </View>
          :
        props.Drawing!==null && console.log("Show")? 
        <Image style={{width: "80%", height:255, alignSelf:'center'}}
        source={{uri: props.Drawing}}></Image>:null)
      :null
      } 
      </View>
  );
}

export function EditRoomline(props){
  const [currentRoom, setcurrentRoom] = useState('')

  const modRoom = (room) =>{
    setcurrentRoom(room)
  }
  const[room, addRoom] = useContext(ClickedContext);
  const ApplyHandle = (value) =>{
    props.setApplyClicked(true)
    addRoom(value)
  }

  return(
    <View style={{flexDirection:'row', marginBottom:7, marginLeft:5, }}>
      <Fold style={{alignSelf:'center'}} width={20} height={20}/>
      <View style={styles.roomName}>
      <TextInput 
        onSubmitEditing = {() =>addRoom(currentRoom) }//on enter click
        placeholder="New Name" 
        style={styles.roomNameText}
        onChangeText={text=>modRoom(text)}
      ></TextInput>
      </View>
      <View style={styles.applyButton}>
        <TouchableOpacity onPress={()=>ApplyHandle(currentRoom)}> 
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

function AlertQuestion(){
  const [AcceptQuestion, setAccept] = useState(false);//moet later weer false
  const [RejectQuestion, setRejectQuestion] = useState(false);//moet later weer false  
  const [headerText, setText] = useContext(headerTextContext);

  let [fontsloaded] = useFonts({ Montserrat_400Regular})

  //remove mode buffer ==> mode==null =>ConfigMode else Usage
  async function handleRejectPress(){
    setText("Usage")
    setRejectQuestion(true)
    try{
      await AsyncStorage.setItem("Mode", "Usage")
    }catch(e){
      console.log("ERROR: "+e)
    }

  }

  if(!fontsloaded){
    return (<AppLoading/>)
  }
return (
  <View style = {{flex:1}}>
  {!AcceptQuestion&&!RejectQuestion ?<View style = {{flex:1}}>
    <View style={{flex:0.2,  justifyContent:'flex-end', width: '95%' }}>
    <Text style={{
       fontSize: 30,
       fontFamily: 'Montserrat_400Regular',
       color: '#6D9AB0',
       alignItems:'center',
       textAlign:'center',
    }}>Would you like to enable alerts?</Text>
    </View>
    <View style = {{flex:0.4,justifyContent:'center', width:'95%'}}>
      <Text style={{
       fontSize: 20,
       fontFamily: 'Montserrat_400Regular',
       color: '#3E3E3E',
       alignItems:'center',
       textAlign:'center',
    }}>
      With alerts, you can receive notifications when the door or window is open or closed.At a certain time,
      Above or below a specific temperature,
      or if it's raining.
      </Text>
    </View>
      <View style={{flex:0.2 ,  flexDirection:'row', justifyContent: 'space-evenly'}}>
      <Reject width={60} height={60} onPress={()=>handleRejectPress()}/>
      <Accept width={55} height={55} onPress={()=>setAccept(true)}/>
      </View>
  </View>: !RejectQuestion?<AlertsScreen/>:<RoomsScreen/>}        
  </View>

);
}


export function AlertsScreen(){
  const [weatherClicked, setWeatherClicked] = useState(true);
  const [timeClicked, settimeClicked] = useState(true);
  const [NextPressed,setNextPressed]=useState(false) // Moet later weer op false

  
  const [FirstTempChecked, setFirstTempChecked] = useState(false);
  const [FirstTemp,setFirstTemp ] = useState();
  const [FirstTempValue,setFirstTempValue ] = useState();
  const [FirstOpened,setFirstOpened ] = useState();
  
  const [SecondTempChecked, setSecondTempChecked] = useState(false);
  const [SecondTemp,setSecondTemp ] = useState();
  const [SecondTempValue,setSecondTempValue ] = useState("");
  const [SecondOpened,setSecondOpened ] = useState();
  
  const [RainChecked, setRainChecked] = useState(false);

  
  const [BetweenChecked, setBetweenChecked] = useState(false);
  const [startTime, setstartTime] = useState(false);
  const [startTimeValue, setstartTimeValue] = useState("");
  const [endTime, setendendTime] = useState();
  const [endTimeValue, setendTimeValue] = useState("");

  const [headerText, setText] = useContext(headerTextContext);

  const [TempBelow, setTempBelow] = useState("");
  let [fontsloaded] = useFonts({ Montserrat_500Medium})

  if(!fontsloaded){
    return (<AppLoading/>)
  }

  async function handleNextPress(){
    setText("Usage")
    setNextPressed(!NextPressed)
    //finished configuration 
    try{
      await AsyncStorage.setItem("Mode", "Usage")
    }catch(e){
      console.log("ERROR: "+e)
    }
  }

  const handleWeather = ()=>{
    setWeatherClicked(!weatherClicked)
    if(timeClicked)
      settimeClicked(!timeClicked)
  }

  const handleTime = ()=>{
    settimeClicked(!timeClicked)
    if(weatherClicked)
      setWeatherClicked(!weatherClicked)
  }

  function MyCheckbox({
    checked,
    onChange ,
  }) {
    function onCheckmarkPress() {
      onChange(!checked);
    }
  
    return (
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onCheckmarkPress}>
        {checked && <Ionicons name="checkmark" size={21} color="white" />}
      </Pressable>
    );
  }
  const handlestartTime = (value)=>{
    setstartTime(false);
    setstartTimeValue(value);
  }
  const handleEndtTime = (value)=>{
    setendendTime(false);
    setendTimeValue(value);
  }


return (
  <View style = {{flex:1,}}>
  {!NextPressed ? <View style = {{flex:1,}}>
    <View style={{flex:0.1}}></View>
    <View style={styles.Alert}>
      <View style ={{}}>
        <TouchableOpacity style={{flexDirection: 'row', }} onPress={()=>handleWeather()}>
          <Fold width={30} height={30}/>
          <Text style={{
            fontSize: 25,
            fontFamily: 'Montserrat_400Regular',
            color: '#3E3E3E',
          }}>Weather</Text>
        </TouchableOpacity>
        {weatherClicked ?
        <View style={styles.weatherContainer}>
          <View style={{flexDirection: 'row', alignItems:'center',}}>
          <MyCheckbox checked={FirstTempChecked} onChange={setFirstTempChecked} />
          <Text style={styles.selectionText}>Notify me if Window/Door</Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <View style={{borderRadius:4, borderWidth:0.3,marginRight:3,marginLeft:8 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
              <Picker
                selectedValue={FirstOpened}
                style={{width: 110, }}
                onValueChange={(value) =>setFirstOpened(value)}>
                <Picker.Item color = '#3E3E3E' label="Open" value="Open" />
                <Picker.Item label="Closed" value="Closed" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={{flexDirection:"row", alignItems:'center',marginLeft:30}}>
        <Text style={styles.selectionText }>And Temperature above</Text>
        <View style={{flexDirection: 'row', backgroundColor:'white',marginTop: 5,width: 100, borderWidth:0.3, borderRadius:4, height: 40,alignItems:'center', justifyContent:'center' }}>
        <TextInput value = {FirstTempValue} onChange = {(value)=>setFirstTempValue(value)}placeholder="Temperature" keyboardType="numeric" ></TextInput>
        </View>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center', marginTop:15}}>
          <MyCheckbox checked={FirstTempChecked} onChange={setFirstTempChecked} />
          <Text style={styles.selectionText}>Notify me if Window/Door</Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <View style={{borderRadius:4, borderWidth:0.3,marginRight:3,marginLeft:8 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
              <Picker
                selectedValue={FirstOpened}
                style={{width: 110, }}
                onValueChange={(value) =>setFirstOpened(value)}>
                <Picker.Item color = '#3E3E3E' label="Open" value="Open" />
                <Picker.Item label="Closed" value="Closed" />
              </Picker>
            </View>
          </View>
        </View>
        <View style={{flexDirection:"row", alignItems:'center',marginLeft:30}}>
        <Text style={styles.selectionText }>And Temperature Below</Text>
        <View style={{flexDirection: 'row', backgroundColor:'white',marginTop: 5,width: 100, borderWidth:0.3, borderRadius:4, height: 40,alignItems:'center', justifyContent:'center' }}>
        <TextInput value = {FirstTempValue} onChange = {(value)=>setFirstTempValue(value)}placeholder="Temperature" keyboardType="numeric" ></TextInput>
        </View>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center',marginTop:15}}>
            <MyCheckbox checked={RainChecked} onChange={(value)=>setRainChecked(value)} />
            <Text style={styles.selectionText}>Raining</Text>
          </View>
      </View>:null}
      </View>
      <View style ={{flex:0.4}}>
        <TouchableOpacity style={{flexDirection: 'row',marginTop: 10,}} onPress={()=>handleTime()}>
          <Fold width={30} height={30}/>
          <Text style={{
            fontSize: 25,
            fontFamily: 'Montserrat_500Medium',
            color: '#3E3E3E',
          }}>Time </Text>
        </TouchableOpacity>
      { timeClicked ?
      <View>
        <View style={styles.weatherContainer}>
        <View style={{flexDirection: 'row', alignItems:'center',}}>
          <MyCheckbox checked={FirstTempChecked} onChange={setFirstTempChecked} />
          <Text style={styles.selectionText}>Notify me if Window/Door</Text>
          <View style={{flexDirection: 'row', alignItems:'center'}}>
            <View style={{borderRadius:4, borderWidth:0.3,marginRight:3,marginLeft:8 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
              <Picker
                selectedValue={FirstOpened}
                style={{width: 110, }}
                onValueChange={(value) =>setFirstOpened(value)}>
                <Picker.Item color = '#3E3E3E' label="Open" value="Open" />
                <Picker.Item label="Closed" value="Closed" />
              </Picker>
            </View>
          </View>
        </View>        
        <View style = {{flexDirection:'row', alignItems:'center', marginVertical:5}}>
          <View style={{marginLeft:30}}>
          <Text style={styles.selectionText}>Between</Text>
          </View>
          <Clock  width={30} height={30} onPress = {()=>setstartTime(!startTime)}/>
          {startTime && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode='time'
              is24Hour={true}
              display="default"
              onChange={(value)=>handlestartTime(JSON.stringify(value.nativeEvent.timestamp).match(/T[0-9]{2}[:][0-9]{2}/i)[0].replace("T", ""))}
            />
          )}
          <Text style={styles.selectionText}>And </Text>
          <Clock  width={30} height={30} onPress = {()=>setendendTime(!endTime)}/>
          {endTime && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode='time'
              is24Hour={true}
              display="default"
              onChange={(value)=>handleEndtTime(JSON.stringify(value.nativeEvent.timestamp).match(/T[0-9]{2}[:][0-9]{2}/i)[0].replace("T", ""))}
            />
          )}
        </View>
        </View>
      </View>: null}
      </View>
    </View>
    <View style = {{width:'100%',alignItems:'flex-end', paddingRight: 10, padding: 10, flex:0.2, justifyContent:'flex-end'}} >
      <TouchableOpacity onPress={()=>handleNextPress()} style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",justifyContent:"center", width:120, height:50, borderRadius:5, borderColor:"#93B3C8"}}>
        <Text style={{fontSize:20, color:'#6D9AB0' }}>Confirm</Text>
      </TouchableOpacity>
    </View>
  </View>:<RoomsScreen/>}</View>
);
}
