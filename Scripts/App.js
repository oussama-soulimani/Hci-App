import React, {useState} from 'react';
import { Header } from './Header';
import {Body} from './Body';
import { View } from 'react-native';


export default function App() {

  
  return (
    <View style={{flex:1}}>
      <Header/>
      <Body/>
    </View>
  );
}
