import React, {useEffect, useState} from 'react';
import {View, Text,ActivityIndicator, Button, TouchableOpacity} from 'react-native';
import { styles } from "../Styles/StyleHeader";
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular,Montserrat_500Medium} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import {ListDetectedSensors} from './ConfigBody';
import { screenWidth, screenHeight } from "../Styles/StyleHeader";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoomsScreen } from './UseBody';
import Reject from '../images/reject.svg';
import Sensor from '../images/sensor.svg';
export function Load(){
  const [visible, setVisible] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setVisible(false);
      }, 5000);
}, [])
  return (
    <View style={styles.Body}>
      {visible ?<View>
      <Text style={styles.BodyLoadingText}>Detecting sensors </Text>
      <View style={styles.loadingView}>
        <ActivityIndicator size={150} color="#93B3C8" style={{marginBottom: 90,}} />
      </View>
      </View>: <View>{<ListDetectedSensors></ListDetectedSensors>}</View>}
  </View>
  );

}

export function Body(){
  const [visible, setVisible] = useState(true);
  let [fontsloaded] = useFonts({ Montserrat_300Light,Montserrat_500Medium})
  const [ConfigMode, setConfigMode] = useState("None");
  const [start, setStart] = useState(false)

  async function getMode(){
    try{
      var mode = await AsyncStorage.getItem("Mode");
      if(mode==null){
        setConfigMode("Config")
      }else{
        setConfigMode("Usage")
      }
    }catch(e){
      return null;
    }
  }
  useEffect(()=>{
    getMode()    
  }, [])
  if(!fontsloaded)
    return (<AppLoading/>)
  return (
    <View style={styles.Body}>
      
      {ConfigMode!="Usage"?<View>
      {!start? <View style={{flex:1, alignItems:'center'}}>
        <View style={{flex:0.1, justifyContent:"flex-end"}}><Text style={{fontSize: 45, fontFamily: 'Montserrat_300Light', color: '#6D9AB0'}}>Welcome</Text></View>
        <View style={{flex:0.5, justifyContent:'center', alignItems:'center',}}><Sensor/></View>
        <View style={{ width: screenWidth, alignItems:'center', flex:0.4, }}>
        <TouchableOpacity style={{borderWidth:2, backgroundColor:"#E5EDF0", alignItems:"center",marginTop:20, justifyContent:"center", width:200, height:50, borderRadius:5, borderColor:"#93B3C8"}} onPress={()=>setStart(true)}>
          <Text style={{fontSize:20, color:'#6D9AB0' }}>Start Configuration</Text>
        </TouchableOpacity>
        </View>
      </View>:<Load/>}
      </View>: ConfigMode!="Usage" && start!=false?<View>{<ListDetectedSensors></ListDetectedSensors>}</View>:<RoomsScreen/>}
  </View>
  );
}

