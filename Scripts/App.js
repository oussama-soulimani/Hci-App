import React, {useState} from 'react';
import { Header } from './Header';
import {Body} from './Body';
import { View } from 'react-native';
export const HeaderTextContext = React.createContext();
export default function App() {

  const [HeaderText, setHeaderText] = useState("");

  return (
    <View style={{flex:1}}>
      <Header name="Configuration"/>
      <Body/>
    </View>
  );
}
