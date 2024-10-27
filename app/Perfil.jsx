import { Button, Image, ScrollView, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../components/CustomButton'
import axios from 'axios';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../constants';
import { TouchableOpacity } from 'react-native';
import Animated, { withSpring } from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';

const Profile = () => {

  const { nome } = useLocalSearchParams();
  const { sobrenome } = useLocalSearchParams();

  const desconectar = async (values) => {
    router.push("/sign-in");
  };

  const imagePaths = [
    require('../assets/images/foxPerfilGlasses.png'),
    require('../assets/images/foxPerfilHeadphones.png'),
    require('../assets/images/foxFemale.png'),
  ];

  const [profileSelected, setProfileSelected] = useState(0);
  const [lastSelect, setLastSelect] = useState(1);
  const [firstSelect, setFirstSelect] = useState(0);
  const [selecting, setSelecting] = useState(0);
  const [buttonCool, setButtonCool] = useState(0);

  useEffect(()=>{
    if (profileSelected === 0) {
      setLastSelect(true);
      setFirstSelect(false);
    }
    else if (profileSelected === 2) {
      setLastSelect(false);
      setFirstSelect(true);
    }
    else {
      setLastSelect(true);
      setFirstSelect(true);
    }
  },[profileSelected, selecting])

  const editPic = () => {
    setSelecting(!selecting);
  };
  
  const addPic = () => {
    if (profileSelected !== 2 && buttonCool === 0) {
      setButtonCool(1);
      setTimeout(() => {
        setButtonCool(0);
      }, 1000);
      setProfileSelected(profileSelected + 1);
      translateX.value = withSpring(translateX.value - 190);

      if (profileSelected === 0) {
        width.value = withSpring(width.value - 60);
        height.value = withSpring(height.value + 60);
      }
      if (profileSelected === 1) {
        height.value = withSpring(height.value - 60);
        height2.value = withSpring(height.value + 60);
      }
    }
  };
  
  const subPic = () => {
    if (profileSelected !== 0 && buttonCool === 0) {
      setButtonCool(1);
      setTimeout(() => {
        setButtonCool(0);
      }, 1000);
      setProfileSelected(profileSelected - 1);
      translateX.value = withSpring(translateX.value + 190);
      
      if (profileSelected === 1) {
        width.value = withSpring(width.value + 60);
        height.value = withSpring(height.value - 60);
      }
      if (profileSelected === 2) {
        height.value = withSpring(height.value + 60);
        height2.value = withSpring(height.value - 10);
      }
    }
  };

  const translateX = useSharedValue(0);
  const width = useSharedValue(150);
  const height = useSharedValue(90);
  const height2 = useSharedValue(90);

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
          <View className="w-[95vw] h-[300px] items-center justify-around
          rounded-3xl flex-row bg-fifth">
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
              marginLeft: 38,
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
              marginLeft: 228,
              transform: [{ translateX }],
            }}
            >
              <Image 
                source={imagePaths[1]}
                className="w-full h-full"
                resizeMode="contain"
              />
            </Animated.View>

            <Animated.View
            style={{
              width: 150,
              height: height2,
              position: 'absolute',
              marginLeft: 418,
              transform: [{ translateX }],
            }}
            >
              <Image 
                source={imagePaths[2]}
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

          <View className="w-full absolute mt-56 justify-center items-center">
            <CustomButton
              title="Selecionar"
              handlePress={editPic}
              containerStyles="w-[200px]"
            />
          </View>
        </View>
        
        : 

        <View>
          <View className="w-[95vw] h-[300px] items-center justify-around rounded-3xl flex-row bg-fifth absolute">
            <Image 
              source={imagePaths[profileSelected]}
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

            <Text className="text-3xl absolute pb-5 font-pbold">
            {nome} {sobrenome}
          </Text>
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