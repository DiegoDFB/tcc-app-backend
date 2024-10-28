import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import images from '../constants/images';
import icons from '../constants/icons';
import { useRouter } from 'expo-router';
import MenuItem from './MenuItem';
import MenuItemLarge from './MenuItemLarge';

const MenuComponent = ({ nome, sobrenome, selectedDateRange, setSelectedDateRange }) => {
  const router = useRouter();

  return (
    <View className="items-center w-[100%]">
      <View className="w-[100%] h-[220px] justify-center items-center">
        <Image 
        source={images.foxHappyCircle}
        className="w-[100%] h-[100%]"
        resizeMode="contain"
        />

      </View>

      <View className="w-[90%] h-[50vw] mt-5 flex-row bg-white rounded-3xl justify-around p-2"
      style={{ elevation: 5, shadowColor: '#52006A' }}>
        
        <MenuItemLarge 
          onPress={() => router.push({ pathname: "/Aprendizado" })}
          imageSource={images.aprendizado}
          label="Aprendizado"
          bgColor="bg-lightgreen"
          extraStyles={"w-[45%] h-[100%] mt-0 justify-center"}
          exStylesTouch={"h-[90%] w-[100%] mb-2"}
          exStylesImage={"h-[90%] w-[100%] -mb-5"}
        />

        <MenuItemLarge 
          onPress={() => router.push({ pathname: "/Aprender" })}
          imageSource={icons.notebook}
          label="Lições"
          bgColor="bg-lightblue"
          extraStyles={"w-[45%] h-[100%] mt-0 justify-center"}
          exStylesTouch={"h-[90%] w-[100%] mb-2"}
          exStylesImage={"h-[70%] w-[70%] mt-3"}
        />
        
      </View>

      <View className="w-[90%] h-[150px] mt-3 flex-row bg-white rounded-3xl justify-around"
      style={{ elevation: 5, shadowColor: '#52006A' }}>
        
        <MenuItem 
          onPress={() => router.push({ pathname: "/Aprender" })}
          imageSource={images.foxToy}
          label="Brinquedo"
          bgColor="bg-lightgreen"
        />

        <MenuItem 
          onPress={() => router.push({ pathname: "/Perfil", params: { nome: nome, sobrenome: sobrenome } })}
          imageSource={images.perfilHeadphones}
          label="Perfil"
          bgColor="bg-lightblue"
        />

        <MenuItem 
          onPress={() => router.push({ pathname: "/Ajuda" })}
          imageSource={icons.interrogation}
          label="Ajuda"
          bgColor="bg-lightorange"
        />
        
      </View>
    </View>
  );
};

export default MenuComponent;