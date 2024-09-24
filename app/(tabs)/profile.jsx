import { Button, Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../../components/CustomButton'
import axios from 'axios';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../../constants';
import { TouchableOpacity } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

const Profile = () => {

  const desconectar = async (values) => {
    router.push("/sign-in");
  };

  const imagePaths = [
    require('../../assets/images/foxPerfilGlasses.png'),
    require('../../assets/images/foxPerfilHeadphones.png'),
  ];

  const [profileSelected, setProfileSelected] = useState(0);
  const [lastSelect, setLastSelect] = useState(1);
  const [firstSelect, setFirstSelect] = useState(0);

  useEffect(()=>{
    if (profileSelected === 0) {
      setTimeout(() => {
        setLastSelect(true);
      }, 800);
      setTimeout(() => {
        setFirstSelect(false);
      }, 800);
    }
    else if (profileSelected === 1) {
      setTimeout(() => {
        setLastSelect(false);
      }, 800);
      setTimeout(() => {
        setFirstSelect(true);
      }, 800);
    }
    else {
      setTimeout(() => {
        setLastSelect(false);
      }, 800);
      setTimeout(() => {
        setFirstSelect(false);
      }, 800);
    }
  },[profileSelected])
  
  const addPic = () => {
    if (profileSelected !== 1) {
      setProfileSelected(profileSelected + 1);
      translateX.value = withSpring(translateX.value - 185);
      width.value = withSpring(width.value - 60);
      height.value = withSpring(height.value + 60);
    }
  };
  
  const subPic = () => {
    if (profileSelected !== 0) {
      setProfileSelected(profileSelected - 1);
      translateX.value = withSpring(translateX.value + 185);
      width.value = withSpring(width.value + 60);
      height.value = withSpring(height.value - 60);
    }
  };

  const translateX = useSharedValue(0);
  const width = useSharedValue(150);
  const height = useSharedValue(90);

  return (
    <SafeAreaView className="bg-white h-full items-center">
      <ScrollView>

        <View className="w-[100vw] h-[50vh] items-center justify-around flex-row">
        {firstSelect ?
          <TouchableOpacity className="w-[10vw] h-[5vh]"
          onPress={subPic}>
            <Image 
              source={icons.leftArrow}
              className="w-[10vw]"
              resizeMode="contain"
            />
          </TouchableOpacity>
          :
          <TouchableOpacity className="w-[10vw] h-[5vh]"></TouchableOpacity>
        }
          <Animated.View
          style={{
            width,
            height: 150,
            position: 'absolute',
            marginLeft: 52,
            transform: [{ translateX }],
          }}
          >
            <Image 
              source={imagePaths[0]}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Animated.View>

          <Animated.View
          style={{
            width: 150,
            height,
            position: 'absolute',
            marginLeft: 232,
            transform: [{ translateX }],
          }}
          >
            <Image 
              source={imagePaths[1]}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Animated.View>

          {lastSelect ?
          <TouchableOpacity className="w-[10vw] h-[5vh]"
          onPress={addPic}>
            <Image 
              source={icons.rightArrow}
              className="w-[10vw]"
              resizeMode="contain"
            />
          </TouchableOpacity>
          :
          <TouchableOpacity className="w-[10vw] h-[5vh]"></TouchableOpacity>
        }
        </View>
        <CustomButton
          title="Desconectar"
          handlePress={desconectar}
          containerStyles="mt-10"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile