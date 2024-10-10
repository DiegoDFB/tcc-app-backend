import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { icons } from '../constants';
import { Image } from 'react-native';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 2000;

const ExpandableActionComponent = ({ title, extraStyles, acertos, erros }) => {

  useEffect(() => {
    strokeOffset.value = circunference * (1 - ((acertos / (acertos + erros)) * 100) / 100);
  }, [acertos, erros]);

  const height = useSharedValue(130);
  const opacity = useSharedValue(0);

  const [showExpandable, setShowExpandable] = useState(true)

  const showExpandableAction = () => {
    setShowExpandable(!showExpandable);
    if (showExpandable) {
      height.value = withTiming(300, {duration: 500});
      opacity.value = withTiming(1, {duration: 500});
    }
    else {
      height.value = withTiming(130, {duration: 500});
      opacity.value = withTiming(0, {duration: 500});
    }
  }

  const updateProgress = () => {
    strokeOffset.value = withTiming(circunference * (1 - newProgress / 100), { duration: 2000 });
  }

  const strokeOffset = useSharedValue(circunference);

  const percentage = useDerivedValue(() => {
    const number = ((circunference - strokeOffset.value) / circunference ) * 100;
    return withTiming(number, { duration: duration });
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: withTiming(strokeOffset.value, { duration: duration }),
      stroke: "#75BFEC",
    };
  });

  const animatedTextProps = useAnimatedProps(() => {
    return {
      text: `${Math.round(percentage.value)}% `
    }
  });

  return (
    <TouchableNativeFeedback onPress={showExpandableAction} className="w-full h-fit rounded-3xl">
      <Animated.View className={`w-[94%] bg-white rounded-3xl -mt-60 flex-row ml-3 ${extraStyles}`}
      style={{
        height: height,
        elevation: 10,
        shadowColor: '#52006A'
      }}>
        <Svg height="110px" width="110px" viewBox="0 0 100 100" className="mt-3 ml-2">
          <Circle
          cx="50"
          cy="50"
          r="45"
          stroke="#E7E7E7"
          fill="transparent"
          strokeWidth={10} />
          <AnimatedCircle
          animatedProps={animatedCircleProps}
          cx="50"
          cy="50"
          r="45"
          fill="transparent"
          strokeWidth={10}
          strokeDasharray={`${radius * Math.PI * 2}`}
          strokeLinecap={'round'} />
        </Svg>
        <View className="w-[240] h-[100] justify-center mt-3 ml-3">
          <Text className="text-2xl font-pbold mb-3">
          {title}
          </Text>
          <AnimatedText
          animatedProps={animatedTextProps}
          className="text-xl font-pbold"
          editable={false}
          style={{ color: 'black' }}>
          de acertos
          </AnimatedText>
        </View>
        <View className="w-full h-full absolute mt-36 items-center">
          <Animated.View className="w-[92%] h-[50%] justify-around"
          style={{
            opacity: opacity
          }}>
            <View className="flex-row items-center">
              <Image
              source={icons.check}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
              />

              <Text
              className="text-xl font-pbold ml-5">
              {acertos} acertos
              </Text>
            </View>

            <View className="flex-row items-center">
              <Image
              source={icons.x}
              className="w-[50px] h-[50px]"
              resizeMode="contain"
              />

              <Text
              className="text-xl font-pbold ml-5">
              {erros} erros
              </Text>
            </View>

          </Animated.View>
          
        </View>
        </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default ExpandableActionComponent;