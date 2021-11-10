import React from 'react';
import { styles } from '../Styles/StyleHeader';
import {Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Montserrat_300Light, useFonts} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';

export function Header(){
  let [fontsloaded] = useFonts({ Montserrat_300Light})
  if(!fontsloaded)
    return <AppLoading/>

  return( 
    <View style={styles.Header}>
      <Text style={
        {fontFamily:'Montserrat_300Light',fontSize:33, marginBottom: 5,color: "#F2F6F8" }
      } >First Configuration</Text>
      <StatusBar style="auto" />
    </View>
  );
}