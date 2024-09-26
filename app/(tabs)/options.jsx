import { Text, View, Image, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { icons } from '../../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';

const Options = () => {
  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full h-[100vh] bg-fifth">
          <View className="w-full h-[100px] items-center justify-center">
            <Text className="text-3xl font-pbold">
              Opções
            </Text>
          </View>
          <View className="w-full h-[100px] absolute items-start justify-center ml-5">
            <TouchableOpacity 
            onPress={ () => router.push('/sign-in') }
            className="w-[30px] h-[30px]"
            >
              <Image 
              source={icons.leftArrow}
              className="w-full h-full"
              resizeMode="contain"
              />
            </TouchableOpacity>
          </View>

          <View className="w-full items-center -mt-3">
            <View className="bg-white h-[70px] rounded-xl w-[95vw] mb-5">

            </View>

            <View className="bg-white h-[70px] rounded-xl w-[95vw] mb-5">

            </View>

            <View className="bg-white h-[70px] rounded-xl w-[95vw] mb-5">

            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor='#FF8229' 
      style='light' />
    </SafeAreaView>
  );
}

export default Options