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
  const [selecting, setSelecting] = useState(0);

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
  },[profileSelected, selecting])

  const editPic = () => {
    setSelecting(!selecting);
  };
  
  const addPic = () => {
    if (profileSelected !== 1) {
      setProfileSelected(profileSelected + 1);
      translateX.value = withSpring(translateX.value - 190);
      width.value = withSpring(width.value - 60);
      height.value = withSpring(height.value + 60);
    }
  };
  
  const subPic = () => {
    if (profileSelected !== 0) {
      setProfileSelected(profileSelected - 1);
      translateX.value = withSpring(translateX.value + 190);
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

        <View className="w-full h-[100px] bg-white">
          <View className="w-full h-[100px] items-center justify-center">
            <Text className="text-3xl font-pbold">
            Perfil
            </Text>
          </View>
        </View>

        {selecting ?
        <View>
          <View className="w-[95vw] h-[300px] items-center justify-around rounded-3xl flex-row bg-fifth">
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
              marginLeft: 40,
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
          containerStyles="mt-60 ml-32 absolute h-[20px]"
          />
        </View>
        
        : 

        <View>
          <View className="w-[95vw] h-[300px] items-center justify-around rounded-3xl flex-row bg-fifth absolute">
            <Image 
              source={imagePaths[0]}
              className="w-[150px] h-[150px]"
              resizeMode="contain"
            />
          </View>

          <View className="w-[95vw] h-[300px] items-center justify-end">
            <TouchableOpacity className="w-[50px] h-[50px] rounded-3xl bg-white mb-16 ml-28 items-center justify-center"
            onPress={editPic}>
              <Image 
              source={icons.pencil}
              className="w-[35px] h-[35px]"
              resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
        }

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