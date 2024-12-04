import { Image, ScrollView, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import ExpandableComponent from "../components/ExpandableComponent"
import { TouchableOpacity } from "react-native"
import { icons } from "../constants"
import { router } from "expo-router"

const Ajuda = () => {
    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
            <ScrollView>
                {/* Header */}
                <View className="w-full h-[100px] items-center justify-center">
                    <Text className="text-3xl font-pbold" style={{ color: '#333' }}>Ajuda</Text>
                </View>
                {/* Back Button */}
                <View className="w-full h-[100px] absolute items-start justify-center ml-5 -mt-1">
                    <TouchableOpacity
                    onPress={() => {
                        router.push({ pathname: '/home' });
                    }}
                    className="w-[30px] h-[30px]"
                    >
                    <Image
                        source={icons.leftArrow}
                        className="w-full h-full"
                        resizeMode="contain"
                        style={{ tintColor: '#333' }}
                    />
                    </TouchableOpacity>
                </View>

                <View className="bg-white items-center justify-center w-full h-[100px]">
                    <Text className="font-pbold text-3xl">
                        Perguntas Frequentes
                    </Text>
                </View>

                <View className="bg-white h-[1000px] w-full items-center">
                    <ExpandableComponent 
                    texto={"Como conectar o brinquedo ao aplicativo?"}
                    heig={82}
                    />

                    <ExpandableComponent 
                    texto={"Como utilizar o brinquedo?"}
                    heig={82}
                    />

                    <ExpandableComponent 
                    texto={"Pergunta"}
                    heig={50}
                    />
                </View>

            </ScrollView>
        </SafeAreaView>

    </RootSiblingParent>
    )
}

export default Ajuda