import React from 'react';
import { Header } from './Header';
import {Body} from './ConfigBody';
import { View } from 'react-native';

export default function App() {

  return (
    <View style={{flex:1}}>
      <Header name="Configuration"/>
      <Body />
    </View>
  );
}
