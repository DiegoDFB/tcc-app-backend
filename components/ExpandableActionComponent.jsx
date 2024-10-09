import React, { useEffect, useState } from 'react';
import { TouchableOpacity, View, Text, TextInput, TouchableNativeFeedback } from 'react-native';
import Animated, { useAnimatedProps, useDerivedValue, useSharedValue, withTiming } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedText = Animated.createAnimatedComponent(TextInput);

const radius = 45;
const circunference = radius * Math.PI * 2;
const duration = 2000;

const ExpandableActionComponent = ({ title, extraStyles }) => {

  useEffect(() => {
    strokeOffset.value = 0;
  }, []);

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

  const updateProgress = (newProgress) => {
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

        
          <AnimatedText 
          editable={false}
          className="text-xl text-black absolute font-psemibold mt-32"
          style={{
            opacity: opacity
          }}
          >
          Testando Expansivel!!!
          </AnimatedText>
        
      </Animated.View>
    </TouchableNativeFeedback>
  );
};

export default ExpandableActionComponent;