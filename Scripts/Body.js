import React, {useEffect, useState} from 'react';
import {View, Text,ActivityIndicator, Button} from 'react-native';
import { styles } from "../Styles/StyleHeader";
import { useFonts } from 'expo-font';
import { Montserrat_300Light, Montserrat_400Regular,Montserrat_500Medium} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import {ListDetectedSensors} from './ConfigBody';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RoomsScreen } from './UseBody';

export function Body(){
  const [visible, setVisible] = useState(true);
  let [fontsloaded] = useFonts({ Montserrat_300Light,Montserrat_500Medium})
  const [ConfigMode, setConfigMode] = useState("None");

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
    setTimeout(() => {
      setVisible(false);
      }, 5000);
  }, [])
  if(!fontsloaded)
    return (<AppLoading/>)
  return (
    <View style={styles.Body}>
      {visible && ConfigMode!="Usage"?<View>
      <Text style={styles.BodyLoadingText}>Detecting sensors </Text>
      <View style={styles.loadingView}>
        <ActivityIndicator size={150} color="#93B3C8" style={{marginBottom: 90,}} />
      </View>
      </View>: ConfigMode!="Usage"?<View>{<ListDetectedSensors></ListDetectedSensors>}</View>:<RoomsScreen/>}
  </View>
  );
}
  