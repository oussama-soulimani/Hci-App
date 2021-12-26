import React, {useState, useContext} from 'react';
import { Header } from './Header';
import {Body} from './Body';
import { View } from 'react-native';

export const headerTextContext = React.createContext();
export const settingsButtonContext = React.createContext();

export default function App() {
  const [headerText, setheaderText] = useState("Config")
  const [SettingsPressed, setSettingsPressed] = useState([false,""]);//true moet later false
  const setText = (value)=>{
    setheaderText(value);
  }
  const setSettings = (value)=>{
    setSettingsPressed(value);
  }
  
  
  return (
    <View style={{flex:1}}>
      <headerTextContext.Provider value = {[headerText, setText]}>
      <settingsButtonContext.Provider value = {[SettingsPressed, setSettings]}>
      <Header/>
      <Body/>
      </settingsButtonContext.Provider>
      </headerTextContext.Provider>
    </View>
  );
}
