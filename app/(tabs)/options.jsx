import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';

const Options = () => {
  return (
    <LinearGradient
      colors={['rgba(250,198,142,1)', 'rgba(240,129,48,1)']}
      className="w-full h-full"
    />
  );
}

export default Options

//require('../../assets/images/cards.png')