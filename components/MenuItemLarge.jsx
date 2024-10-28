import { Image, Text, TouchableOpacity, View } from "react-native";

const MenuItemLarge = ({ onPress, imageSource, label, bgColor, extraStyles, exStylesTouch, exStylesImage }) => {
    return (
      <View className={`w-[100px] h-[140px] items-center flex-column mt-3 ${extraStyles}`}>
        <TouchableOpacity 
          onPress={onPress}
          className={`w-[100px] h-[100px] rounded-3xl 
          flex-column ${bgColor} items-center ${exStylesTouch} `}
          style={{ elevation: 5, shadowColor: '#52006A' }}
        >
          <Image 
            source={imageSource}
            className={`w-[80%] h-[80%] ${exStylesImage}`}
            resizeMode="contain"
          />

          <Text className="text-xl font-bold">{label}</Text>

        </TouchableOpacity>
      </View>
    );
  };
  
  export default MenuItemLarge;