import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import images from '../constants/images';
import icons from '../constants/icons';
import { useRouter } from 'expo-router';
import MenuItem from './MenuItem';

const MenuComponent = ({ nome, sobrenome }) => {
  const router = useRouter();

  return (
    <View className="items-center">
      <View className="w-[90vw] h-[150px] mt-3 flex-row bg-white rounded-3xl justify-around"
      style={{ elevation: 20, shadowColor: '#52006A' }}>
        
        <MenuItem 
          onPress={() => router.push({ pathname: "/Perfil", params: { nome: nome, sobrenome: sobrenome } })}
          imageSource={images.perfilHeadphones}
          label="Perfil"
          bgColor="bg-lightblue"
        />

        <MenuItem 
          onPress={() => router.push({ pathname: "/Aprender" })}
          imageSource={icons.notebook}
          label="Aprender"
          bgColor="bg-lightgreen"
        />

        <MenuItem 
          onPress={() => router.push({ pathname: "/Ajuda" })}
          imageSource={icons.interrogation}
          label="Ajuda"
          bgColor="bg-lightyellow"
        />
        
      </View>
    </View>
  );
};

export default MenuComponent;