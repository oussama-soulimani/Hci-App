import React, { useContext, useState } from 'react';
import { styles } from '../Styles/StyleHeader';
import {Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Montserrat_300Light, useFonts} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import HomeLogo from '../images/home.svg'
export function Header(){

  
  const [headerText, setheaderText] = useState("Config")
  const setText = (value)=>{
    setheaderText(value);
  }
  let [fontsloaded] = useFonts({ Montserrat_300Light})
  if(!fontsloaded)
    return <AppLoading/>

  return( 
  <View style={styles.Header}>
    <StatusBar style="auto" />
    
    {headerText=="Config" ?<View >
      <Text style={
        {fontFamily:'Montserrat_300Light',fontSize:33, marginBottom: 2,color: "#F2F6F8" }
        } >First Configuration</Text>
    </View>:headerText=="Usage" ?<View style={{flexDirection:"row", alignItems: 'center'}}>
      <HomeLogo width={45} height={45} style={{marginRight: 8,marginBottom:2 }}/>
      <Text style={
        {fontFamily:'Montserrat_300Light',
        fontSize:33, 
        marginBottom: 2,
        color: "#F2F6F8"
      }} >My Home</Text>
    </View>:<View></View>}
  </View>
  );
}