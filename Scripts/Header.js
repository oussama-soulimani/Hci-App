import React, { useContext, useState } from 'react';
import { styles } from '../Styles/StyleHeader';
import {Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Montserrat_300Light, useFonts} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import HomeLogo from '../images/home.svg'
import { headerTextContext, settingsButtonContext } from './App';
import SettingsLogo from '../images/settings.svg'
import WhiteSettingsLogo from '../images/settingsWhite.svg'
import { GetIcon } from './UseBody';
import { DefaultRoom } from './Icons';
export function Header(props){

  const [headerText, setText] = useContext(headerTextContext);
  const [SettingsPressed, setSettings]= useContext(settingsButtonContext);
 
  let [fontsloaded] = useFonts({ Montserrat_300Light})
  if(!fontsloaded)
    return <AppLoading/>

  return( 
  <View style={styles.Header}>
    <StatusBar />
    {headerText=="Config" ?
    <View >
      <Text style={styles.HeaderText} >First Configuration</Text>
    </View>:(headerText=="Usage"&&!SettingsPressed[0]) || !SettingsPressed[0]&& SettingsPressed[1]=="RoomsScreen" ?
    <View style={{flex:1, flexDirection:"row", alignItems: 'flex-end', marginBottom: 2}}>
      <View style={{flex:0.1}}></View>
      <View style={{flex:0.8, flexDirection:'row', justifyContent:'center'}}>
        <HomeLogo width={45} height={45} style={{marginRight: 8,}}/>
        <Text style={styles.HeaderText} >My Home</Text>
      </View>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end', flex:0.1,  height: '100%', }}>
      <SettingsLogo onPress = {()=>setSettings([!SettingsPressed[0],SettingsPressed[1]])} width={25} height={25} style={{marginBottom:10, marginRight:10}}/>
      </View>
    </View>:SettingsPressed[0] ?
    <View style={{flex:1, flexDirection:'row', justifyContent:'center', alignItems:'flex-end',marginBottom: 2}}>
      <View style={{flexDirection:'row',justifyContent:'center', alignItems:'center',}}>
      <WhiteSettingsLogo style={{marginBottom:2, marginRight:10}}/>
      <Text style={styles.HeaderText} >Settings</Text>
      </View>
    </View>:
    ((headerText!="Usage" && headerText!="Config") ||( !SettingsPressed[0]&& SettingsPressed[1]=="RoomScreen")) &&
    <View style={{flex:1, flexDirection:"row", alignItems: 'flex-end', marginBottom: 2}}>
      <View style={{flex:0.1}}></View>
      <View style={{flex:0.8, flexDirection:'row', justifyContent:'center'}}>
      <GetIcon name={headerText} color={"White"}/>
      <Text style={{fontFamily:'Montserrat_300Light',fontSize:33, marginBottom:2,color:"#F2F6F8",marginLeft:5}}>{headerText}</Text>
      </View>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end', flex:0.1,  height: '100%', }}>
      <SettingsLogo onPress = {()=>setSettings([!SettingsPressed[0],SettingsPressed[1]])} width={25} height={25} style={{marginBottom:10, marginRight:10}}/>
      </View>
    </View>}
  </View>
  );
}