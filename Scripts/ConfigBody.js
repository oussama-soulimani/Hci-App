import React, { useState,useContext } from 'react';
import {Image,View, Text,TextInput,ActivityIndicator, Button,TouchableOpacity,ScrollView, Pressable} from 'react-native';
import { styles } from "../Styles/StyleHeader";
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
const ClickedContext = React.createContext();
const DrawingContext = React.createContext();

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


function DrawScreen(){
  const [NextPressed,setNextPressed]=useState(true) // state of next screen button
  const [Rooms,setRooms]=useState([]) //all name of rooms
  const [RoomDrawings,setRoomDrawings]=useState([]) //all name of rooms
  const [Drawing, setDrawing] = useState("");

  getData = async ()=>{
    try{
      var value = await AsyncStorage.getItem('Drawing');
      if(value!=null){
        setDrawing(value);
        console.log("Data fetched")
        console.log(value);
      }else{
        console.log("No data to fetch");
      }
    }catch(e){
      console.log("Error fetching: "+e);
    }
  }
  function handleNextPress(){
    getData();
    setNextPressed(!NextPressed)
  }
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
          <DrawingContext.Provider value={[RoomDrawings,addRoomDrawing]}>
          <LoadRooms/>
          </DrawingContext.Provider>
          <ClickedContext.Provider value={[Rooms, addRoom]}>
             <EditRoomline/>
          </ClickedContext.Provider>
        </View >
        {Drawing!="" ? <Image style={{width: "80%", height:255, borderWidth:3,borderColor:'red', alignSelf:'center'}}
        source={{uri: Drawing}}></Image>:<Text>No Drawing</Text>}
      </View>
      <View style = {styles.NextButton} >
        <Next width={60} height={60} onPress={()=>handleNextPress()}/>
      </View>
      </View>:<AlertQuestion/>}
    </View>
  );
}

function Sign(){
  const[RoomDrawings,addRoomDrawing]=useContext(DrawingContext)

  const handleSignature = async signature => {
    const storeData = async () =>{
      console.log("Storing Data");
      try{
        console.log(signature[0])
        await AsyncStorage.setItem('Drawing', signature)
      }catch(e){
        console.log("Error storing: "+e);
      }
    }
    storeData();
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

function AlertQuestion(){
  const [AcceptQuestion, setAccept] = useState(true);//moet later weer false
  let [fontsloaded] = useFonts({ Montserrat_400Regular})

  if(!fontsloaded){
    return (<AppLoading/>)
  }
return (
  <View style = {{flex:1}}>
  {!AcceptQuestion ?<View style = {{flex:1}}>
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
      <Reject width={60} height={60} onPress={()=>console.log("reject")}/>
      <Accept width={55} height={55} onPress={()=>setAccept(true)}/>
      </View>
  </View>: <AlertsScreen/>}        
  </View>

);
}


function AlertsScreen(){
  const [weatherClicked, setWeatherClicked] = useState(true);
  const [timeClicked, settimeClicked] = useState(true);

  
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



  const [TempBelow, setTempBelow] = useState("");
  let [fontsloaded] = useFonts({ Montserrat_500Medium})

  if(!fontsloaded){
    return (<AppLoading/>)
  }
  const handleWeather = ()=>{
    setWeatherClicked(!weatherClicked)
    if(timeClicked)
      settimeClicked(!timeClicked)
  }
  const handleTime = ()=>{
    console.log("Clicked")
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
    console.log("starttime: "+ value);
    setstartTimeValue(value);
  }
  const handleEndtTime = (value)=>{
    setendendTime(false);
    console.log("endtime: "+ value);
    setendTimeValue(value);
  }
return (
  <View style = {styles.AlertScreenContainer}>
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
            <Text style={styles.selectionText}>Temperature</Text>
            <View style={{borderRadius:4, borderWidth:0.3,marginRight:3 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
            <Picker
              selectedValue={FirstTemp}
              style={{width: 110, }}
              onValueChange={(value) =>setFirstTemp(value)}>
              <Picker.Item color = '#3E3E3E' label="Above" value="Above" />
              <Picker.Item label="Below" value="Below" />
            </Picker>
          </View>
          <View style={{backgroundColor:'white',marginTop: 5,width: 100, borderWidth:0.3, borderRadius:4, height: 40,alignItems:'center', justifyContent:'center' }}>
            <TextInput value = {FirstTempValue} onChange = {(value)=>setFirstTempValue(value)}placeholder="Temperature" keyboardType="numeric" ></TextInput>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center'}}>
          <Text style={styles.selectionText,  {marginLeft:36}}>Notify me if
          </Text>
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
        <View style={{flexDirection: 'row', alignItems:'center',marginTop:15}}>
            <MyCheckbox checked={SecondTempChecked} onChange={(value) =>setSecondTempChecked(value)} />
            <Text style={styles.selectionText}>Temperature</Text>
            <View style={{borderRadius:4, borderWidth:0.3,marginRight:3 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
            <Picker
              selectedValue={SecondTemp}
              style={{width: 110, }}
              onValueChange={(value) =>setSecondTemp(value)}>
              <Picker.Item color = '#3E3E3E' label="Above" value="Above" />
              <Picker.Item label="Below" value="Below" />
            </Picker>
          </View>
          <View style={{backgroundColor:'white',marginTop: 5,width: 100, borderWidth:0.3, borderRadius:4, height: 40,alignItems:'center', justifyContent:'center' }}>
            <TextInput value = {SecondTempValue} onChange={(value)=>setSecondTempValue(value)}placeholder="Temperature" keyboardType="numeric" ></TextInput>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center',}}>
          <Text style={styles.selectionText, {marginLeft:36}}>Notify me if
          </Text>
          <View style={{borderRadius:4, borderWidth:0.3,marginRight:3,marginLeft:8 ,backgroundColor:'white',marginTop: 5,width: 100, height: 40,alignItems:'center', justifyContent:'center' }}>
            <Picker
              selectedValue={SecondOpened}
              style={{width: 110, }}
              onValueChange={(value) =>setSecondOpened(value)}>
              <Picker.Item color = '#3E3E3E' label="Open" value="Open" />
              <Picker.Item label="Closed" value="Closed" />
            </Picker>
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
      { timeClicked ?<View>
        <View style={styles.weatherContainer}>
        <View style = {{flexDirection:'row', alignItems:'center', marginVertical:5}}>
        <MyCheckbox checked={BetweenChecked} onChange={(value)=>setBetweenChecked(value)} />
        <Text style={styles.selectionText}>Between</Text>
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
  </View>
);
}
