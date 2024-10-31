import React from 'react';
import { View, Text, Image, TextInput, ScrollView } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import icons from '../constants/icons';
import Animated from 'react-native-reanimated';
import ExpandableActionComponent from './ExpandableActionComponent';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;

const ResultSummary = ({ questTotal, animatedTextProps, animatedCircleProps, categorias, filteredAnswers }) => {
  return (
    <>
        <View className="w-full h-[480px] bg-white rounded-3xl items-center mt-5">
        <AnimatedText className="text-3xl font-pbold absolute mt-10" editable={false} style={{ color: 'black' }} animatedProps={animatedTextProps} />
        <Text className="absolute mt-20 text-xl font-pbold">de acertos</Text>

        <Svg height="50%" width="50%" viewBox="0 0 100 100" className="-mt-10">
            <Circle cx="50" cy="50" r="45" stroke="#E7E7E7" fill="transparent" strokeWidth={10} />
            <AnimatedCircle animatedProps={animatedCircleProps} cx="50" cy="50" r="45" fill="transparent" strokeWidth={10} strokeDasharray={`${radius * Math.PI * 2}`} strokeLinecap={'round'} />
        </Svg>

        <Text className="text-black text-2xl font-bold mt-2">de {questTotal[0]} questões respondidas</Text>
        </View>

        <ResultDetails questTotal={questTotal} filteredAnswers={filteredAnswers} />
        <ExpandableCategories
        categorias={categorias} filteredAnswers={filteredAnswers}
        animatedCircleProps={animatedCircleProps} animatedTextProps={animatedTextProps} />
    </>
  );
};

const ResultDetails = ({ questTotal }) => (
  <>
    <View className="flex-row items-center -mt-52">
      <Image source={icons.check} className="w-[50px] h-[50px]" resizeMode="contain" />
      <Text className="text-xl font-pbold ml-5">{questTotal[1]} acertos</Text>
    </View>
    <View className="flex-row items-center mt-5 -ml-6">
      <Image source={icons.x} className="w-[50px] h-[50px]" resizeMode="contain" />
      <Text className="text-xl font-pbold ml-5">{questTotal[2]} erros</Text>
    </View>
  </>
);

const ExpandableCategories = ({ categorias, filteredAnswers, animatedCircleProps, animatedTextProps }) => {
  return (
    <>
      {Object.keys(categorias.reduce((acc, item) => {
        if (!acc[item.nome]) {
          acc[item.nome] = item;
        }
        return acc;
      }, {})).map((nome) => (
        <ExpandableActionComponent
          key={nome}
          title={nome}
          animatedCirclePropsAdd={animatedCircleProps}
          animatedTextPropsAdd={animatedTextProps}
          acertos={filteredAnswers[nome] ? filteredAnswers[nome].reduce((acc, item) => acc + item.acertos, 0) : 0}
          erros={filteredAnswers[nome] ? filteredAnswers[nome].reduce((acc, item) => acc + item.erros, 0) : 0}
        />
      ))}
    </>
  );
};

export default ResultSummary;