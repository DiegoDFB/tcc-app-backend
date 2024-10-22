import React from 'react';
import { View, Text, Image } from 'react-native';
import CustomButton from './CustomButton';
import { images } from '../constants';

const WelcomeComponent = ({ nome, estadoConexao, setEstadoConexao }) => {
  return (
    <View>
      <Text
        className="text-3xl font-bold text-white mt-2 pl-2 ml-5
          text-left bg-third rounded-xl w-[90vw]"
        style={{
          elevation: 20,
          shadowColor: '#52006A'
        }}
      >
        Bem-vindo, {nome}!
      </Text>

      <View className="w-full items-center px-4">
        <View className="w-[90vw] h-[210px] mt-3
          justify-around flex-row bg-fifth rounded-2xl"
          style={{
            elevation: 20,
            shadowColor: '#52006A'
          }}
        >
          {estadoConexao ? 
            <View className="w-[39vw] justify-center">
              <Image 
                source={images.foxHappy}
                className="w-[50vw] -ml-7 absolute"
                resizeMode="contain"
              />
            </View>
          : <View className="w-[39vw] justify-center">
              <Image 
                source={images.foxHappy}
                className="w-[50vw] -ml-7 absolute"
                resizeMode="contain"
              />
            </View>}
          {estadoConexao ? 
            <View className="w-[45vw] pl-1 rounded-xl h-[20vh] mt-10 justify-center">
              <Text
                className="text-xl font-bold text-left -ml-3 text-center"
              >
                Seu brinquedo está
              </Text>
              <View>
                <CustomButton 
                  title="Conectado"
                  containerStyles="w-[35vw] mt-5 ml-3 border-2 border-third rounded-3xl bg-third"
                  textStyles="text-white"
                />
              </View>
            </View> :
            <View className="w-[39vw] pl-1 rounded-xl h-[22vh] mt-5 items-center">
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
          }
        </View>
      </View>
    </View>
  );
};

export default WelcomeComponent;