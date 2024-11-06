import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from './CustomButton';
import { images } from '../constants';

const WelcomeComponent = ({ nome, estadoConexao, setEstadoConexao }) => {
  return (
    <View className="items-center justify-center w-full">
      <Text
        className="text-2xl mt-3 pl-2
        rounded-xl"
      >
        Bem-vindo, Visitante!
      </Text>

      <Text
        className="text-2xl font-psemibold mt-2 pl-2
        rounded-xl"
      >
        O que gostaria de fazer hoje?
      </Text>

      <View className="w-full items-center px-4">
      {estadoConexao ? 
        <View className="w-[90vw] h-[210px] mt-3
          justify-around flex-row bg-fifth rounded-2xl items-center"
          style={{
            elevation: 20,
            shadowColor: '#52006A'
          }}
        >
          <View className="w-[39vw] justify-center">
            <Image 
            source={images.foxHappy}
            className="w-[50vw] -ml-7 absolute"
            resizeMode="contain"
            />
          </View>

          <View className="w-[45vw] pl-1 rounded-xl h-[20vh] justify-center">
            <View className="w-[39vw] pl-1 rounded-xl h-[22vh] items-center">
              <Text
                className="text-xl font-bold text-left pl-1"
              >
                Parece que você ainda não conectou seu brinquedo!
              </Text>
              <View>
                <CustomButton 
                  title="Conectar"
                  handlePress={() => setEstadoConexao(!estadoConexao)}
                  containerStyles="w-[35vw] mt-2 border-2 border-third rounded-3xl bg-white"
                  textStyles="text-third"
                />
              </View>
            </View>   
          </View>
        </View>
        :
        <View></View>
      }
      </View> 
    </View>
  );
};

export default WelcomeComponent;