import React, { useState } from 'react';
import { Montserrat_300Light} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font';
import { View, StatusBar, Text } from 'react-native';
import { styles } from "../Styles/StyleHeader";
import AppLoading from 'expo-app-loading';
import { ActivityIndicator } from 'react-native';



export function Body(){
  let [fontsloaded] = useFonts({ Montserrat_300Light})
  if(!fontsloaded)
    return <AppLoading/>

  return (
    <View style={styles.Body}>
      <Text style={styles.BodyLoadingText}>Detecting sensors </Text>
      <View style={styles.loadingView}>
      <ActivityIndicator size={150} color="#93B3C8" style={{marginBottom: 90,}} />
      </View>
    </View>
  );
}
