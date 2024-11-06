import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { useFonts } from 'expo-font'
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons, images } from '../constants'
import CustomButton from '../components/CustomButton';
import { LinearGradient } from 'expo-linear-gradient';
import Toast from 'react-native-toast-message';
import { RootSiblingParent } from "react-native-root-siblings";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuItemLarge from '../components/MenuItemLarge';

export default function StartPage() {

  const router = useRouter();

  return (
    <View className="bg-lightblue h-full items-center flex-column">
      <View className="h-[30%] items-center justify-center">
        <Text className="text-3xl font-pbold mt-10">Vamos começar!</Text>
        <View className=" w-[85%] items-center mt-5">
          <Text className="text-2xl font-psemibold text-center">
            Gostaria de ajuda para configurar seu brinquedo?
          </Text>
        </View>
      </View>

      <View className="h-[60%] w-full items-center justify-center -mt-3">
        <Image 
        source={images.foxConfused}
        className="w-[55%] h-[55%]"
        resizeMode="contain"
        />

      <View className="w-[90%] h-[70%] items-center justify-around flex-row -mt-5">
        <MenuItemLarge 
          onPress={() => router.push({ pathname: "/sign-in" })}
          imageSource={icons.check}
          label="Vamos lá!"
          bgColor="bg-white"
          extraStyles={"w-[45%] h-[90%] mt-0 justify-center"}
          exStylesTouch={"h-[90%] w-[100%] mb-2"}
          exStylesImage={"h-[70%] w-[70%] mt-3"}
        />

        <MenuItemLarge 
          onPress={() => router.push({ pathname: "/sign-in" })}
          imageSource={icons.redArrow}
          label="Já sei como usar / Pular"
          bgColor="bg-white"
          extraStyles={"w-[45%] h-[90%] mt-0 justify-center"}
          exStylesTouch={"h-[90%] w-[100%] mb-2"}
          exStylesImage={"h-[70%] w-[70%] mt-3"}
        />
      </View>
      </View>
    </View>
  );
}
