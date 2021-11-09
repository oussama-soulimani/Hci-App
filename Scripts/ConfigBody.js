import React from "react";
import { Montserrat_300Light} from '@expo-google-fonts/montserrat'
import { useFonts } from 'expo-font';
import { View, StatusBar, Text } from 'react-native';
import { styles } from "../Styles/StyleHeader";

export function Body(){
  let [fontsloaded] = useFonts({ Montserrat_300Light})
  return (
    <View style={styles.Body}>
      <Text >Body</Text>
      <StatusBar style="auto" />
    </View>
  );
}