import { Image, Text, TouchableOpacity, View } from "react-native";

const MenuItem = ({ onPress, imageSource, label, bgColor, extraStyles, exStylesTouch }) => {
    return (
      <View className={`w-[100px] h-[140px] items-center flex-column mt-3 ${extraStyles}`}>
        <TouchableOpacity 
          onPress={onPress}
          className={`w-[100px] h-[100px] rounded-3xl 
            justify-center flex-row ${bgColor} items-center ${exStylesTouch} `}
          style={{ elevation: 10, shadowColor: '#52006A' }}
        >
          <Image 
            source={imageSource}
            className="w-[80%] h-[80%]"
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text className="text-xl font-bold">{label}</Text>
      </View>
    );
  };
  
  export default MenuItem;