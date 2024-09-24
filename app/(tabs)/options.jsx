import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { icons } from '../../constants';

const Options = () => {
  return (
    <View className="bg-white h-[100vh]">
      <View className="bg-fifth h-[50px] items-center flex-row">
        <View className="">
          <Image 
            source={icons.leftArrow}
            className="w-[30px] h-[30px]"
            resizeMode="contain"
          />
        </View>

        <View className="bg-fifth h-[50px] justify-center items-center flex-row w-[100%]">
          <Text className="text-3xl">Opções</Text>
        </View>
      </View>
    </View>
  );
}

export default Options