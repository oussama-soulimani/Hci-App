import React, {useState} from 'react';
import {View, Text,ActivityIndicator, Button} from 'react-native';
import { styles } from "../Styles/StyleHeader";
import { useFonts } from 'expo-font';
import { Montserrat_300Light} from '@expo-google-fonts/montserrat'
import AppLoading from 'expo-app-loading';
import {ListDetectedSensors} from './ConfigBody';


export function Body(){
    const [visible, setVisible] = useState(false);
    let [fontsloaded] = useFonts({ Montserrat_300Light})
  
    if(!fontsloaded)
      return (<AppLoading/>)
    return (
      <View style={styles.Body}>
        {visible ?<View style={styles.bodyContent}>
        <Text style={styles.BodyLoadingText}>Detecting sensors </Text>
        <View style={styles.loadingView}>
          <ActivityIndicator size={150} color="#93B3C8" style={{marginBottom: 90,}} />
          <Button title="Press me" onPress={() => setVisible(false)} />
        </View>
        </View>: <View>{<ListDetectedSensors></ListDetectedSensors>}</View>}
    </View>
    );
  }
  