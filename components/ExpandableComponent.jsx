import React, { useState } from 'react';
import { Image, Text, TouchableNativeFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { icons } from '../constants';

const ExpandableComponent = ({texto, heig}) => {

  const height = useSharedValue(heig);
  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  const [showExpandable, setShowExpandable] = useState(true)

  const showExpandableAction = () => {
    setShowExpandable(!showExpandable);
    if (showExpandable) {
      height.value = withTiming(300, {duration: 500});
      opacity.value = withTiming(1, {duration: 500});
      rotation.value = withTiming(180, { duration: 500 });
    }
    else {
      height.value = withTiming(heig, {duration: 500});
      opacity.value = withTiming(0, {duration: 500});
      rotation.value = withTiming(0, { duration: 500 });
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }]
    };
  });

  return (
    <View
    style={{ 
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
    elevation: 10,
    shadowColor: '#52006A',
    }}>
        <TouchableNativeFeedback onPress={showExpandableAction}>
            <Animated.View className={`w-[94%] bg-white justify-center flex-row`}
            style={{
                height: height,
                borderRadius: 30
            }}>
                <View className="w-[85%] h-full ml-3 mt-2">
                    <Text className="font-pbold text-2xl">
                        {texto}
                    </Text>
                </View>

                <View className="justify-center mr-2"
                style={{
                    height: heig
                }}>
                    <Animated.Image 
                    source={icons.arrowDown}
                    className="w-[25px] h-[25px]"
                    resizeMode="contain"
                    style={animatedStyle}
                    />
                </View>
            </Animated.View>
        </TouchableNativeFeedback>
    </View>
  );
};

export default ExpandableComponent;