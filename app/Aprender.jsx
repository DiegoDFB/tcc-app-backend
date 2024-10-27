import { ScrollView, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import MenuItem from "../components/MenuItem"
import icons from '../constants/icons';
import { router } from "expo-router";

const Ajuda = () => {
    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
            <ScrollView>

            <View className="flex-row justify-around">

                <MenuItem 
                onPress={() => router.push({ pathname: "/Aprender" })}
                imageSource={icons.notebook}
                label="Adição"
                bgColor="bg-white"
                extraStyles={'w-[200px] h-[200px] mt-5'}
                exStylesTouch={'w-[150px] h-[150px] mb-2'}
                />

                <MenuItem 
                onPress={() => router.push({ pathname: "/Aprender" })}
                imageSource={icons.notebook}
                label="Subtração"
                bgColor="bg-white"
                extraStyles={'w-[200px] h-[200px] mt-5'}
                exStylesTouch={'w-[150px] h-[150px]  mb-2'}
                />

            </View>

            <View className="flex-row justify-around">

                <MenuItem 
                onPress={() => router.push({ pathname: "/Aprender" })}
                imageSource={icons.notebook}
                label="Multiplicação"
                bgColor="bg-white"
                extraStyles={'w-[200px] h-[200px] mt-5'}
                exStylesTouch={'w-[150px] h-[150px]  mb-2'}
                />

                <MenuItem 
                onPress={() => router.push({ pathname: "/Aprender" })}
                imageSource={icons.notebook}
                label="Divisão"
                bgColor="bg-white"
                extraStyles={'w-[200px] h-[200px] mt-5'}
                exStylesTouch={'w-[150px] h-[150px]  mb-2'}
                />

            </View>

            </ScrollView>
        </SafeAreaView>

    </RootSiblingParent>
    )
}

export default Ajuda