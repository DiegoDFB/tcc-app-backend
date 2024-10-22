import { ScrollView, Text, View } from "react-native"
import { RootSiblingParent } from "react-native-root-siblings"
import { SafeAreaView } from "react-native-safe-area-context"
import ExpandableComponent from "../components/ExpandableComponent"

const Ajuda = () => {
    return (
    <RootSiblingParent>
        <SafeAreaView className="bg-white h-full w-full">
            <ScrollView>

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